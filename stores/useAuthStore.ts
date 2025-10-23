import {defineStore} from "pinia";
import {useApiFetch} from "@/composables/useApiFetch";

type Credentials = {
	email: string;
	password: string;
}

type RegistrationInfo = {
	name: string
	email : string
	password: string
	password_confirmation: string
	terms_accepted : boolean
	create_fsl_profile : boolean
}

export const useAuthStore = defineStore('auth', () => {




	const user = useCookie('52___BORG__A___WEB___.USER_DATA')
	const token = useCookie('52___BORG__A___WEB___.USER.ACCESS_TOKEN')
	const addresses = ref([])

	const authenticated = computed(() => !!user?.value && !!token?.value)

	const savedAddresses = computed(() => addresses?.value)


	async function logout() {
		await useApiFetch("/logout", {method: "POST"});
		await nextTick()
		token.value = null
		user.value = null
		await nextTick()
		navigateTo({name:'index' })
	}

	async function fetchUser() {
		const {data, pending, error} = await useApiFetch("/account/profile")
		await nextTick()
		user.value = data?.value?.data
	}

	async function login(credentials: Credentials) {
		const {data, pending, error} = await useApiFetch("/login", {
			method: "POST",
			body: credentials,
		})


		if(data.value){
			token.value = data?.value?.meta?.token
			await nextTick()
			await fetchUser()
		}

		
		return {data, pending, error};
	}

	async function register(info: RegistrationInfo) {
		const {data, pending, error} = await useApiFetch("/register", {
			method: "POST",
			body: info,
		});

		if(data.value){
			await nextTick()
			await login(info)
		}



		return { data, pending, error};
	}

	async function onboard(payload) {
		const {data, pending, error} = await useApiFetch("/vendor/onboarding", {
			method: "POST",
			body: payload,
		});

		if(data.value){
			await nextTick()
			await fetchUser()
		}



		return { data, pending, error};
	}


	async function updateProfile(payload) {
		const {data, pending, error} = await useApiFetch("/account/profile", {
			method: "PATCH",
			body: payload,
		});

		if(data.value){
			await nextTick()
			await fetchUser()
		}
		return { data, pending, error};
	}

		async function purgeAccount(payload) {
		const {data, pending, error} = await useApiFetch("/account/profile", {
			method: "POST",
			body: payload,
		});

		if(data.value){
			await nextTick()
			await logout()
		}
		return { data, pending, error};
	}


	async function changePassword(payload) {
		const {data, pending, error} = await useApiFetch("/account/password", {
			method: "PATCH",
			body: payload,
		});

		if(data.value){
			await nextTick()
			await fetchUser()
		}
		return { data, pending, error};
	}

	async function requestReset(payload){
		const {data, pending, error} = await useApiFetch("/forgot-password", {
			method: "POST",
			body: payload,
		});
		return { data, pending, error};

	}


	async function resetPassword(payload){
		const {data, pending, error} = await useApiFetch("/reset-password", {
			method: "POST",
			body: payload,
		});

		if(data.value){
			await nextTick()
			await login(payload)
		}


		return { data, pending, error};

	}

	async function getShippingInfo(){
		const {data, pending, error} = await useApiFetch("/shipping-addresses?include=country,location")
		await nextTick()
		addresses.value = data?.value?.data
	}

	return {user, login, authenticated, fetchUser, logout, register, onboard, updateProfile, purgeAccount, changePassword, requestReset, resetPassword, getShippingInfo, savedAddresses}
})