export function useDataLoader(path = '/', query = null) {


	const list = ref([])
	const loading  = ref(true)
	const fetching  = ref(false)
	const pagination = ref(undefined)
	const failed = ref(false)
	const errData = ref(undefined)

	const searching = ref(false)
	const searchQuery = ref('')


	const filteredNameSearch = computed(()=> list.value?.filter(item => item?.name.toLowerCase().includes(searchQuery?.value.toLowerCase())))


	async function fetchData(){

		loading.value = true
		failed.value = false
		errData.value = undefined

		let {data, error} = await useApiFetch(path, {pick : ['meta', 'data'], deep: false, query : {...query?.value, query : searchQuery?.value},  watch : false})
		list.value = data?.value?.data
		pagination.value = data?.value?.meta?.pagination

		if(error){
			failed.value = true
			errData.value = error?.value?.data
		}

		loading.value = false

	}


	async function fetchMore(){
		fetching.value = true
		failed.value = false
		errData.value = undefined

		let {data, error} = await useApiFetch(pagination?.value?.links?.next, {pick : ['meta', 'data'], deep: false}, true)
		data?.value?.data.forEach((entry) => {
			list.value.push(entry)
		})
		pagination.value = data?.value?.meta?.pagination

		if(error){
			failed.value = true
			errData.value = error?.value?.data
		}

		fetching.value = false

	}

	async function searchData(){

		searching.value = true
		failed.value = false
		errData.value = undefined

		let {data, error} =  await useApiFetch(path, {pick : ['meta', 'data'], deep: false, query : {...query?.value, query : searchQuery?.value},  watch : false})
		list.value = data?.value?.data ? data?.value?.data : [] 
		pagination.value = data?.value?.meta?.pagination

		if(error){
			failed.value = true
			errData.value = error?.value?.data
		}

		searching.value = false

	}

	onMounted(async ()=>{
		await nextTick()
		fetchData()
	})

	return {list , loading, fetching, pagination, failed, errData, fetchData, fetchMore, searchQuery, searchData,  searching, filteredNameSearch}
}