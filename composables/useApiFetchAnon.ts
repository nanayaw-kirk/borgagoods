import type {UseFetchOptions} from 'nuxt/app'
import {useValidationStore} from "@/stores/useValidationStore"
import {storeToRefs} from "pinia"

export async function useApiFetchAnon<T>(path: string, options: UseFetchOptions<T> = {}, base = false) {
	let headers: any = {
		accept : "application/json",
		"Cache-Control": "no-cache",
	}

	const {errors} = storeToRefs(useValidationStore())

	const config = useRuntimeConfig()

	if (process.server) {
		headers = {
			...headers,
		}
	}


	let url = base ? path : `${config.public.api}${path}`

	const fetcher =  await useFetch(url, {
		withCredentials: true,
		watch: false,
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