import { formatTimeAgo, useDateFormat } from '@vueuse/core'
export default defineNuxtPlugin((nuxtApp) => {

   nuxtApp.provide('fromNow', (date = new Date()) => {
      return formatTimeAgo(new Date(date))
   })

   nuxtApp.provide('formatDate', (date = new Date(), format = 'Do MMM, YYYY') => {
      let val = useDateFormat(new Date(date), format)
      return val.value
   })

})