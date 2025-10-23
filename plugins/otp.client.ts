import VOtpInput from "vue3-otp-input";
export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('otp-input', VOtpInput)
})