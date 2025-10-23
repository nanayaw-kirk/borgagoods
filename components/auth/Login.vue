<template>
	<div>

		<div class="top-0 bg-background h-full w-full  rounded absolute z-10 center -ml-4 md:-ml-8 rounded-r-xl"  v-if="loading">
			<span class="icon-loading text-4xl animate-spin mb-6"></span>
			<span class="text-center">Logging you in...</span>
		</div>

		<div class="w-full grid md:grid-cols-2 gap-4">
			
			<div class="md:col-span-2 w-full group flex flex-col gap-y-2">
				<div class="w-full relative">
					<div class="absolute inset-y-0 left-4 center"> 
						<i class="icon-email text-lg text-foreground/70 group-focus-within:text-primary"></i> 
					</div>
					<ui-input placeholder="Email Address" v-model="form.email" class="h-14 px-10"></ui-input>
				</div>
				<span class="text-xs text-primary" v-if="errors && errors.email" v-text="errors.email[0]"></span>
			</div>

			<div class="md:col-span-2 w-full group flex flex-col gap-y-2">
				<div class="w-full relative">
					<div class="absolute inset-y-0 left-4 center"> 
						<i class="icon-lock text-lg text-foreground/70 group-focus-within:text-primary"></i> 
					</div>
					<ui-input placeholder="Create a password" v-model="form.password" :type="visible ? 'text' : 'password'" class="h-14 px-10"></ui-input>
					<div class="absolute inset-y-0 right-4 center cursor-pointer"> 
						<i class="text-lg text-foreground/70 group-focus-within:text-primary"  @click="visible = !visible" :class="visible ? 'icon-eye-closed' : 'icon-eye'"></i> 
					</div>
				</div>
				<span class="text-xs text-primary" v-if="errors && errors.password" v-text="errors.password[0]"></span>
				<div>
					<p class="text-foreground/70 text-sm">
						Forgot your password? <ui-button @click="$emit('forgot')" class="px-0 underline text-primary text-sm" variant="link">Let's get you back on track</ui-button>
					</p>
				</div>
			</div>


			<div class="md:col-span-2">
				<ui-button class="w-full text-xs uppercase font-bold h-14" :disabled="loading || !isvalid" @click="login">
					Login to {{$appName}}
				</ui-button>
			</div>
			<div class="md:col-span-2">
				<slot name="ext"></slot>
			</div>

		</div>
	</div>
</template>
<script setup lang="ts">
import {useStorage} from "@vueuse/core"
const loading = useStorage('BRGA_GO_LOADER', false)
const path = inject('redirectPath')

defineEmits(['forgot'])


import {z} from "zod"
const {errors} = storeToRefs(useValidationStore())
const auth = useAuthStore();

const notify = useToaster()

const visible = ref(false)


const form = reactive({
	email : "",
	password: "",
});

const schema = z.object({
	email : z.string().email(),
	password: z.string().min(6),
}).passthrough()

const isvalid = computed(() => schema.safeParse(form).success)

async function login() {
	loading.value = true
	
	const { data, error } = await auth.login(form)

	
	if (data?.value) {
		navigateTo(`${path ? path : useRoute()?.fullPath+'?logged_in'}`)
	}

	if (error?.value) {
		notify({ title: 'Uh oh! Something went wrong.', description: `${error?.value?.data?.message as string}`})
	}

	loading.value = false

	
}


onMounted(() => loading.value = false)


</script>
