export default defineNuxtConfig({
  devtools: { enabled: false },
  compatibilityDate: '2024-04-03',

  devServer : {
    port : 9999
  },


  runtimeConfig : {
    public : {
      api : process.env.API,
      root : process.env.ROOT,
      ga : process.env.GA
    },
  },


  app : {
    head : {
     meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link : [ {rel : 'stylesheet',  href:'https://dev.iconly.io/public/KvbrUujMoWsJ/iconly.css'}],
     script  : [ {src : "https://js.paystack.co/v2/inline.js", defer : true}]
   }
 },

 css : [
  {src : '~/assets/css/uikit.scss', lang : 'scss'},
],

modules: [
  "shadcn-nuxt",
  "@nuxtjs/tailwindcss",
  "@vueuse/nuxt",
  "@pinia/nuxt",
  "@pinia-plugin-persistedstate/nuxt",
  '@nuxt/scripts',
],

$production: {
  scripts: {
    registry: {
      googleAnalytics: {
        id: process.env.GA
      }
    }
  }
},

shadcn: { prefix: 'ui', componentDir: './components/ui'},

vite: {
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
},

})