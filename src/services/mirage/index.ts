import { createServer, Factory, Model } from "miragejs";
import faker from "faker";
import { generate } from "gerador-validador-cpf";

interface UserRouteProps {
	name: string;
	document: number;
	email: string;
	password: string;
	created_at: string;
}

interface PurchasesRouteProps {
	code: number;
	value: number;
	buyed_at: string;
	cashback: number;
	status: "Em validação" | "Reprovado" | "Aprovado";
}

export const initMirageServer = () => {
	const server = createServer({
		models: {
			users: Model.extend<Partial<UserRouteProps>>({}),
			purchases: Model.extend<Partial<PurchasesRouteProps>>({}),
		},

		factories: {
			user: Factory.extend({
				name(i: number) {
					return `Revendedor(a) ${i}`;
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
		},

		routes() {
			this.namespace = "api";
			this.timing = 1000;

			// Esse endpoint retorna junto das outras informações do usuário, a sua senha,
			// algo que DEFINITIVAMENTE não pode acontecer em uma aplicação real em produção (ainda mais descriptografada),
			// mas para esse teste, não terá problemas consideráveis
			this.get("users");
			this.post("users");

			this.get("purchases");
			this.post("purchases");

			this.namespace = "";
			this.passthrough();
		},
	});

	return server;
};
