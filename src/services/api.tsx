import axios, { AxiosError } from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestQueue: any[] = [];

const api = axios.create({
	baseURL: "  http://localhost:3000/api/",
	headers: {
		Authorization: `Bearer ${cookies["grupoboticario.token"]}`,
	},
});

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error: AxiosError) => {
		if (error.response?.status === 401) {
			if (error.response.data?.code === "token.expired") {
				cookies = parseCookies();

				const { "grupoboticario.refreshToken": refreshToken } = cookies;
				const originalConfig = error.config;

				if (!isRefreshing) {
					isRefreshing = true;
					api
						.post("refresh", refreshToken)
						.then((response) => {
							const { token } = response.data;

							setCookie(undefined, "grupoboticario.token", token, {
								maxAge: 60 * 60 * 24, // 24h
								path: "/",
							});

							setCookie(
								undefined,
								"grupoboticario.refreshToken",
								response.data.refreshToken,
								{
									maxAge: 60 * 60 * 24, // 24h
									path: "/",
								}
							);

							api.defaults.headers["Authorization"] = `Bearer ${token}`;
							failedRequestQueue.forEach((request) => request.onSuccess(token));
							failedRequestQueue = [];
						})
						.catch((error) => {
							failedRequestQueue.forEach((request) => request.onFailure(error));
							failedRequestQueue = [];
						})
						.finally(() => {
							isRefreshing = false;
						});
				}

				return new Promise((resolve, reject) => {
					failedRequestQueue.push({
						onSuccess: (token: string) => {
							originalConfig.headers["Authorization"] = `Bearer ${token}`;
							resolve(api(originalConfig));
						},
						onFailure: (error: AxiosError) => {
							reject(error);
						},
					});
				});
			} else {
				destroyCookie(undefined, "grupoboticario.token");
				destroyCookie(undefined, "grupoboticario.refreshToken");
			}
		}

		return Promise.reject(error);
	}
);

export default api;
