import { createServer, Factory, Model, Response, Collection } from "miragejs";
import faker from "faker";
import jwt from "jsonwebtoken";
import decode from "jwt-decode";

import { v4 as uuid } from "uuid";

import { generate } from "gerador-validador-cpf";

import md5 from "crypto-js/md5";
interface UserProps {
	name: string;
	document: number;
	email: string;
	password: string;
	created_at: string;
}

interface PurchasesRouteProps {
	code: number;
	value: number;
	buyed_at: number;
	cashback: number;
	status: "Em validação" | "Reprovado" | "Aprovado";
}
type RefreshTokensStore = Map<string, string[]>;

export const tokens: RefreshTokensStore = new Map();

export type DecodedToken = {
	sub: string;
};

export const initMirageServer = () => {
	const server = createServer({
		models: {
			users: Model.extend<Partial<UserProps>>({}),
			purchases: Model.extend<Partial<PurchasesRouteProps>>({}),
		},

		factories: {
			user: Factory.extend({
				name(i: number) {
					return faker.fake("{{name.findName}}");
				},
				document() {
					return generate();
				},
				email() {
					return faker.internet.email().toLowerCase();
				},
				password(i: number) {
					return `gb-${i}-rev`;
				},
				createdAt() {
					return faker.date.recent(10);
				},
			}),
		},

		seeds(server) {
			server.createList("user", 10);
			server.db.loadData({
				purchases: <PurchasesRouteProps[]>[
					{
						code: 1,
						value: 1890.51,
						buyed_at: 1629095893,
						cashback: 63.57,
						status: "Aprovado",
					},
					{
						code: 2,
						value: 590.51,
						buyed_at: 1629196693,
						cashback: 0,
						status: "Reprovado",
					},
					{
						code: 3,
						value: 10000.9,
						buyed_at: 1629197293,
						cashback: 0,
						status: "Em validação",
					},
					{
						code: 4,
						value: 2690.51,
						buyed_at: 1629283693,
						cashback: 870.57,
						status: "Aprovado",
					},
					{
						code: 5,
						value: 325.3,
						buyed_at: 1629308893,
						cashback: 12.57,
						status: "Aprovado",
					},
				],
			});
		},

		routes() {
			this.namespace = "api";

			// Esse endpoint retorna junto das outras informações do usuário, a sua senha,
			// algo que DEFINITIVAMENTE não pode acontecer em uma aplicação real em produção,
			// mas para esse teste, não terá problemas consideráveis
			this.get("users");
			this.post(
				"users",
				(schema, request) => {
					const newAccountData = JSON.parse(request.requestBody);
					const { email, document } = newAccountData;

					const userAlreadyExist = schema.db.users.where(
						(user: UserProps) =>
							user.email === email || user.document === document
					)[0];

					if (!!userAlreadyExist) {
						return new Response(
							400,
							{},
							{ errors: ["E-mail ou CPF já cadastrados!"] }
						);
					}

					// Aqui, o a senha deveria ser criptografada, e na hora do login,
					// ser criptografada para fazer a comparação
					schema.db.users.insert(newAccountData);

					return new Response(
						201,
						{},
						{ message: "Usuário criado com sucesso!" }
					);
				},
				{ timing: 1000 }
			);

			this.post("session", (schema, request) => {
				const { email, password } = JSON.parse(request.requestBody);

				const user = schema.db.users.where(
					(user: UserProps) => user.email === email
				)[0];

				if (!user || password !== user.password) {
					return new Response(
						401,
						{},
						{ errors: ["E-mail ou senha incorretos"] }
					);
				}

				const { token, refreshToken } = generateJwtAndRefreshToken(email, {
					permissions: user.permissions,
					roles: user.roles,
				});

				// As permissões e funções estão estáticas,
				// o retorno mais apropriado seria pego de alguma tabela com as infos,
				// mas para esse exemplo, é o suficiente

				return {
					name: user.name,
					token,
					refreshToken,
					permissions: ["permissions"],
					roles: ["roles"],
				};
			});

			this.get("me", (schema, request) => {
				const { Authorization } = request.requestHeaders;

				const email = checkAuthMiddleware(Authorization);

				if (typeof email == "object" && email.error) {
					return new Response(401, {}, email);
				}

				const user = schema.db.users.where(
					(user: UserProps) => user.email === email
				);

				if (!user) {
					return new Response(401, {}, { errors: ["Usuário não encontrato"] });
				}
				return new Response(
					200,
					{},
					{
						name: user.name,
						email,
						permissions: ["permissions"],
						roles: ["roles"],
					}
				);
			});

			this.post("refresh", (schema, request) => {
				// Possível erro pode acontecer usando o MirageJS por limitação da API
				// (já que eu preciso usar um JSON.parte para obter as propriedades do ojbeto), devido a isso, aumentarei o tempo para expirar o token
				const { refreshToken } = JSON.parse(request.requestBody);
				const { Authorization } = request.requestHeaders;

				const email = addUserInformationToRequest(Authorization);

				if (typeof email == "object" && email.error) {
					return new Response(401, {}, email);
				}

				const user = schema.db.users.where(
					(user: UserProps) => user.email === email
				)[0];

				if (!user) {
					return new Response(
						401,
						{},
						{
							error: true,
							message: "User not found.",
						}
					);
				}

				if (!refreshToken) {
					return new Response(
						401,
						{},
						{ error: true, message: "Refresh token is required." }
					);
				}
				const isValidRefreshToken = checkRefreshTokenIsValid(
					user.email,
					refreshToken
				);

				if (!isValidRefreshToken) {
					return new Response(
						401,
						{},
						{ error: true, message: "Refresh token is invalid." }
					);
				}

				invalidateRefreshToken(user.email, refreshToken);

				const { token, refreshToken: newRefreshToken } =
					generateJwtAndRefreshToken(user.email, {
						permissions: user.permissions,
						roles: user.roles,
					});

				return {
					name: user.name,
					token,
					refreshToken: newRefreshToken,
					permissions: user.permissions,
					roles: user.roles,
				};
			});

			this.get("purchases");
			this.post("purchases");

			this.namespace = "";
			this.passthrough();
		},
	});

	const auth = {
		secret: "segredojwt",
	} as const;

	const checkRefreshTokenIsValid = (email: string, refreshToken: string) => {
		const storedRefreshTokens = tokens.get(email) ?? [];

		return storedRefreshTokens.some((token) => token === refreshToken);
	};

	const createRefreshToken = (email: string) => {
		const currentUserTokens = tokens.get(email) ?? [];
		const refreshToken = uuid();

		tokens.set(email, [...currentUserTokens, refreshToken]);

		return refreshToken;
	};

	const generateJwtAndRefreshToken = (email: string, payload: object = {}) => {
		const token = jwt.sign(payload, auth.secret, {
			subject: email,
			expiresIn: 60 * 60 * 24,
		});

		const refreshToken = createRefreshToken(email);

		return {
			token,
			refreshToken,
		};
	};

	const invalidateRefreshToken = (email: string, refreshToken: string) => {
		const storedRefreshTokens = tokens.get(email) ?? [];

		tokens.set(
			email,
			storedRefreshTokens.filter((token) => token !== refreshToken)
		);
	};

	// Funções que seriam  middlewares mas que foram simplificadas para poupar tempo

	const checkAuthMiddleware = (authorization: string) => {
		if (!authorization) {
			return {
				error: true,
				code: "token.invalid",
				message: "Token not present.",
			};
		}

		const [, token] = authorization?.split(" ");

		if (!token) {
			return {
				error: true,
				code: "token.invalid",
				message: "Token not present.",
			};
		}

		try {
			const decoded = jwt.verify(token as string, auth.secret) as DecodedToken;

			return decoded.sub;
		} catch (err) {
			return { error: true, code: "token.expired", message: "Token invalid." };
		}
	};

	const addUserInformationToRequest = (authorization: string) => {
		if (!authorization) {
			return {
				error: true,
				code: "token.invalid",
				message: "Token not present.",
			};
		}

		const [, token] = authorization?.split(" ");

		if (!token) {
			return {
				error: true,
				code: "token.invalid",
				message: "Token not present.",
			};
		}

		try {
			const decoded = decode(token as string) as DecodedToken;

			return decoded.sub;
		} catch (err) {
			return {
				error: true,
				code: "token.invalid",
				message: "Invalid token format.",
			};
		}
	};

	return server;
};
