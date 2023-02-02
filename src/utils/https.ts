import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
import { adminRefresh, domain, mediaApi } from "../utils/urls";

interface Axios extends AxiosInstance {
    [key: string]: any;
}
const $host: Axios = axios.create({
    baseURL: `${domain}`,
});
axios({
    method: "",
});
const $authHost: Axios = axios.create({
    baseURL: `${domain}`,
});
export const $mediaApi: Axios = axios.create({
    baseURL: `${mediaApi}`,
});
$authHost.interceptors.request.use(
    (config) => {
        const accessToken: string | null = localStorage.getItem("accessToken");

        if (config.headers) {
            if (Boolean(accessToken)) {
                const headers = {
                    ...config.headers,
                } as Partial<AxiosRequestHeaders>;
                headers["Authorization"] = `Bearer ${accessToken}`;
                config.headers = headers;
            }
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);
$authHost.interceptors.response.use(
    (response: any) => {
        return response;
    },
    function (error) {
        const originalRequest = error.config;
        let refreshToken = localStorage.getItem("refreshToken");
        if (
            (error.response.status === 401 || error.response.status === 400) &&
            !!refreshToken
        ) {
            return $authHost
                .post(adminRefresh, {
                    refreshToken: refreshToken,
                })
                .then((res) => {
                    if (res.data.isOk) {
                        localStorage.setItem(
                            "accessToken",
                            res.data.accessToken
                        );
                        return $authHost(originalRequest);
                    }
                });
        }
        return Promise.reject(error);
    }
);
export { $authHost, $host };
