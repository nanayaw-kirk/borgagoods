import type {UseFetchOptions} from 'nuxt/app'
import {useRequestHeaders} from "nuxt/app";
import {useValidationStore} from "@/stores/useValidationStore"
import {storeToRefs} from "pinia"

export async function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}, base = false) {
	let headers: any = {
		accept : "application/json",
		"Cache-Control": "no-cache",
	}

	const {errors} = storeToRefs(useValidationStore())

	const config = useRuntimeConfig()

	const token = useCookie('52___BORG__A___WEB___.USER.ACCESS_TOKEN');

	if (token.value) {
		headers['Authorization'] = `Bearer ${token.value as string}`
	}

	if (process.server) {
		headers = {
			...headers,
			...useRequestHeaders(),
		}
	}


	let url = base ? path : `${config.public.api}${path}`

	const fetcher =  await useFetch(url, {
		withCredentials: true,
		watch: false,
		key: Math?.random()?.toString(),
		...options,
		headers: {
			...headers,
			...options?.headers
		},

		onRequest({ request, options }) {
			useValidationStore().clear()
		},

		onResponseError({ response }) {
			useValidationStore().fill(response?._data?.errors as string)
		}
	});


	return fetcher
}