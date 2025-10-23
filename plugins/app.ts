export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('appName', 'Borga Goods')
  nuxtApp.provide('provider', 'Borga')
  nuxtApp.provide('company', 'Borga Goods Enterprise')

  nuxtApp.provide('socials', {
    instagram : 'http://instagram.com/borga_goods',
    whatsapp : 'http://whatsapp.com/borga_goods',
    tiktok : 'http://tiktok.com/borga_goods'
  })
})