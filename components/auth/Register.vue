<template>
	<div>

		<div class="top-0 bg-background h-full w-full  rounded absolute z-10 center -ml-4 md:-ml-8 rounded-r-xl"  v-if="loading">
			<div>
				<span class="icon-spinner text-4xl animate-spin"></span>
			</div>
			<span class="text-center">Creating your account...</span>
		</div>

		<div class="w-full grid md:grid-cols-2 gap-4">
			<div class="md:col-span-2 w-full group flex flex-col gap-y-1">
				<div class="w-full relative">
					<div class="absolute inset-y-0 left-4 center"> 
						<i class="icon-user text-lg text-foreground/70 group-focus-within:text-primary"></i> 
					</div>
					<ui-input placeholder="Your Name" v-model="form.name" class="h-14 px-10"></ui-input>
				</div>
				<span class="text-xs text-primary" v-if="errors && errors.name" v-text="errors.name[0]"></span>
			</div>

			<div class="md:col-span-2 w-full group flex flex-col gap-y-1">
				<div class="w-full relative">
					<div class="absolute inset-y-0 left-4 center"> 
						<i class="icon-email text-lg text-foreground/70 group-focus-within:text-primary"></i> 
					</div>
					<ui-input placeholder="Email Address" v-model="form.email" class="h-14 px-10"></ui-input>
				</div>
				<span class="text-xs text-primary" v-if="errors && errors.email" v-text="errors.email[0]"></span>
			</div>

			<div class="md:col-span-2 w-full group flex flex-col gap-y-1">
				<div class="w-full relative">
					<div class="absolute inset-y-0 left-4 center"> 
						<i class="icon-lock text-lg text-foreground/70 group-focus-within:text-primary"></i> 
					</div>
					<ui-input placeholder="Create a password" v-model="form.password" :type="visible ? 'text' : 'password'" class="h-14 px-10"></ui-input>
					<div class="absolute inset-y-0 right-4 center" @click="visible = !visible"> 
						<i class="text-lg text-foreground/70 group-focus-within:text-primary" :class="visible ? 'icon-eye-closed' : 'icon-eye'"></i> 
					</div>
				</div>
				<span class="text-xs text-primary" v-if="errors && errors.password" v-text="errors.password[0]"></span>
			</div>




			<div class="md:col-span-2">
				<ui-button class="w-full font-bold text-xs uppercase h-14" :disabled="loading || !isvalid" @click="signup">
					Create My Account
				</ui-button>
			</div>

			<div class="md:col-span-2">
				<slot name="ext"></slot>
				<ui-label for="terms_accepted" class="expand text-xs text-foreground/70 font-normal">By creating an account, you agree to 
					<nuxt-link to="/terms" class="underline">our terms of service</nuxt-link>
				</ui-label> 
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import {z} from "zod"
import {useStorage} from "@vueuse/core"
const loading = useStorage('BRGA_GO_LOADER', false)
const path = inject('redirectPath')

import {useValidationStore} from "@/stores/useValidationStore"
const emit = defineEmits(['close'])
const {errors} = storeToRefs(useValidationStore())
const auth = useAuthStore();
const notify = useToaster()
const visible = ref(false)

const schema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	password: z.string().min(6),
	terms_accepted : z.boolean(),
	create_fsl_profile : z.boolean()
}).passthrough()

const form = reactive({
	name: "",
	email: "",
	password: "",
	terms_accepted : true,
	create_fsl_profile : true
});


const isvalid = computed(() => schema.safeParse(form).success)

async function signup() {
	let payload = {...form}
	payload.password_confirmation = form.password
	loading.value = true
	const { data, error } = await auth.register(payload)

	

	if (data?.value) {
		notify({title: `Welcome to ${useNuxtApp().$appName}`,	description: 'Your account has been created'})
		navigateTo(`${path ? path : useRoute()?.fullPath+'?registered'}`)
		return
	}


	if (error?.value) {
		notify({ title: 'Uh oh! Something went wrong.', description: `${error?.value?.data?.message as string}` })
	}
	loading.value = false
}


onMounted(() => loading.value = false)
</script>

