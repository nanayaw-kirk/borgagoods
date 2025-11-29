import {brandsStore} from "~/stores/brandsStore";

export default defineNuxtPlugin(async (nuxtApp) => {
	const {data} = await useApiFetch("/brands?paginate=0&include=product_display_image")
	if(data.value){
		brandsStore().fill(data?.value?.data)
	}
})