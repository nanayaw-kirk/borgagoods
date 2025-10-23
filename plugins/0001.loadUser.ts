import {useAuthStore} from "~/stores/useAuthStore";

export default defineNuxtPlugin(async (nuxtApp) => {
  const {fetchUser} = useAuthStore()
  const {authenticated , user} = storeToRefs(useAuthStore())

  const token = useCookie('52___BORG__A___WEB___.USER.ACCESS_TOKEN')

  if(!!authenticated?.value || !!token?.value){
    await fetchUser()
  }

  nuxtApp.provide('user', user?.value)
})