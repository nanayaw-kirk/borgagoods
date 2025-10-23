import {categoriesStore} from "~/stores/categoriesStore";
export default defineNuxtPlugin(async (nuxtApp) => {
  const {data} = await useApiFetch("/categories?paginate=0&include=art_work,product_display_image")
  if(data.value){
    categoriesStore().fill(data?.value?.data)
  }
})