import { message } from "antd"
import { useState } from "react"
import { $authHost } from "../utils/https"
type ReturnType<T> = {
    response?: T
    success: boolean
    error?: string
}

export type ApiResponse = {
    loading: boolean
    request: () => Promise<any>
    error: string | {}
    response: any
}

export const usePostRequest = <T>(options = {}) =>
    useRequest<T>({ method: 'POST', ...options })

export const usePutRequest = <T>(options = {}) =>
    useRequest<T>({ method: 'PUT', ...options })

export const useGetRequest = <T>(options = {}) =>
    useRequest<T>({ method: 'GET', ...options })

export const useDeleteRequest = <T>(options = {}) =>
    useRequest<T>({ method: 'DELETE', ...options })

export const useRequest = <T>(options = {}) => {
    const [response, setResponse] = useState<T>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})

    const request = async <T>(
        overrideOptions = {},
        sync = false
    ): Promise<ReturnType<T>> => {
        setLoading(true)

        try {
            const { data } = await $authHost({
                ...options,
                ...overrideOptions,
            })
            if (!sync) setResponse(data)
            if (data.data !== null) {
                return { response: data as T, success: true }
            } else {
                return { success: false, error: data.error.message }
            }
        } catch (e: any) {
            setError(e.response || {})
            if (e.response === undefined) {
                message.warning('Проверьте интернет соединение')
            } else if (e.response.status >= 500) {
                message.warning('Ошибка сервера.')
            }

            return { error: e.response, success: false }
        } finally {
            if (!sync) setLoading(false)
        }
    }
    return {
        loading,
        request,
        error,
        response,
    }
    
}