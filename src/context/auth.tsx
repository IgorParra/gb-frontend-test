import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { parseCookies, setCookie, destroyCookie } from "nookies";

import api from "services/api";

type SignInCredentials = { email: string; password: string };

type User = {
	name: string;
	email: string;
	permissions: string[];
	roles: string[];
};

type AuthContextData = {
	signIn(credentials: SignInCredentials): Promise<void>;
	signOut(): void;
	isAuthenticated: boolean;
	user: User | undefined;
};

type AuthProviderProps = {
	children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
	const history = useHistory();
	const [user, setUser] = useState<User>();
	const isAuthenticated = !!user;

	useEffect(() => {
		const { "grupoboticario.token": token } = parseCookies();

		if (token) {
			api
				.get("me")
				.then((response) => {
					const { email, permissions, roles, name } = response.data;

					setUser({ email, permissions, roles, name });
				})
				.catch(() => {
					signOut();
				});
		}
		//eslint-disable-next-line
	}, []);

	const signIn = async (credentials: SignInCredentials) => {
		const { email } = credentials;
		try {
			const response = await api.post("session", credentials);

			const { permissions, roles, token, refreshToken, name } = response.data;

			setCookie(undefined, "grupoboticario.token", token, {
				maxAge: 60 * 60 * 24, // 24h
				path: "/",
			});

			setCookie(undefined, "grupoboticario.refreshToken", refreshToken, {
				maxAge: 60 * 60 * 24, // 24h
				path: "/",
			});

			setUser({
				name,
				email,
				permissions,
				roles,
			});

			api.defaults.headers["Authorization"] = `Bearer ${token}`;

			history.push("/dashboard");
		} catch (e) {
			console.log(e);
			const error = e.response.data.errors[0];

			toast.error(
				`Erro ao fazer login:
			\n ${error}`,
				{
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				}
			);
		}
	};

	const signOut = () => {
		setUser(undefined);
		destroyCookie(undefined, "grupoboticario.token");
		destroyCookie(undefined, "grupoboticario.refreshToken");
		history.push("/");
	};

	return (
		<AuthContext.Provider value={{ signIn, isAuthenticated, user, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
