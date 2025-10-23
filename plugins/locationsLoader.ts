import {locationsStore} from "~/stores/locationsStore";
export default defineNuxtPlugin(async (nuxtApp) => {

	const {data} = await useApiFetch("/countries?paginate=0&operates_in=true")
	const {data : list} = await useApiFetch("/countries?paginate=0&available_for_delivery=true")
	
	const myLocale = await fetch("https://ip2c.org/self").then((res)=>{
		return res.text().then(value => {
			return value.substring(2).replace(/;/g, " ").split(" ")[2].toLowerCase().split(' ').join('-')
		})
	})
	.catch((err)=>{
			// log error
	})




	if(data?.value){
		locationsStore().fill(data?.value?.data)
	}

	if(list?.value){
		locationsStore().fillDeliveryList(list?.value?.data)
	}

	if(myLocale){
		locationsStore().setLoacale(myLocale)
	}


	const {locations, deliveryLocations, currentLocale} = locationsStore()

	nuxtApp.provide('locations', locations)
	nuxtApp.provide('deliveryLocations', deliveryLocations)
	nuxtApp.provide('currentLocale', locations?.find(item => item?.slug === currentLocale ))
})