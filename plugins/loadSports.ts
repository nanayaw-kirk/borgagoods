import {sportsStore} from "~/stores/sportsStore";

export default defineNuxtPlugin(async (nuxtApp) => {
	const {data} = await useApiFetch("/disciplines")
	if(data.value){
		sportsStore().fill(data?.value?.data)
	}

	const {sports} = sportsStore()
	nuxtApp.provide('sports', sports)
	nuxtApp.provide('sportsWithPartners', sports?.filter(item => item?.has_partners))
})