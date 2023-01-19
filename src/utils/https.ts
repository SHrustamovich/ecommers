import axios, { AxiosHeaders, AxiosInstance, AxiosRequestHeaders } from "axios";
import { adminRefresh, domain } from "../utils/urls";

interface Axios extends AxiosInstance {
    [key: string]: any
}
const $host: Axios = axios.create({
    baseURL: `${domain}`
})
const $authHost: Axios = axios.create({
    baseURL: `${domain}`
})

$authHost.interceptors.request.use(
    (config ) => {
        const accessToken: string | null = localStorage.getItem('accessToken')


        if (config.headers) {
            if (Boolean(accessToken)) {

                // config.headers = { ...config.headers } as AxiosHeaders;
                const headers = { ...config.headers } as Partial<AxiosRequestHeaders>;
                headers['Authorization'] = `Bearer ${accessToken}`;
                // config.headers['Authorization'] =  `Bearer ${accessToken}`;
                config.headers = headers
            }
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)
$authHost.interceptors.response.use(
    (response: any) => {
        const originalRequest = response.config
        let refreshToken = localStorage.getItem('refreshToken')
        if (
			(response.data.error === 'JWT_EXPIRED' ||
				response.data.error === 'INVALID_JWT') &&
			!!refreshToken
		) {
			return $authHost
				.post(adminRefresh, {
					id: 1,
					refreshToken: refreshToken,
				})
				.then((res) => {
					if (res.data.code === 200) {
						localStorage.setItem(
							'accessToken',
							res.data.accessToken
						)
						return $authHost(originalRequest)
					}
				})
		}
		return response
    },
    function (error){
        return Promise.reject(error)
    }
)
export { $authHost, $host }