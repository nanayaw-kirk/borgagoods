export function useCrud() {

	const loading  = ref(true)
	const requestError = ref(null)

	async function get(url){
		loading.value = true
		let {data, error} = await useApiFetch(url, {
			method : 'GET',
		})
		loading.value = false
		return {data, error}

	}


	async function post(url, payload){
		loading.value = true
		let {data, error} = await useApiFetch(url, {
			method : 'POST',
			body : payload
		})
		loading.value = false
		return {data, error}

	}

	async function patch(url, payload){
		let {data, error} = await useApiFetch(url, {
			method : 'PATCH',
			body : payload
		})
		return {data, error}

	}


	async function purge(url){
		let {data, error} = await useApiFetch(url, {
			method : 'DELETE'
		})
		return {data ,error}

	}

	return { loading ,  requestError , get, post, patch, purge}

}