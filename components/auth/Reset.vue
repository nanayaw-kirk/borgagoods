<template>
	<div>

		<div class="top-0 bg-background h-full w-full  rounded absolute z-10 center -ml-4 md:-ml-8 rounded-r-xl"  v-if="loading">
			<span class="icon-loading text-4xl animate-spin mb-6"></span>
			<span class="text-center">Hang on a bit...</span>
		</div>
		<slot name="ext"></slot>
		<div class="flex flex-col items-center gap-y-4 md:gap-y-8">

			<template v-if="!sent">
				<div class="w-full group flex flex-col gap-y-2">
					<div class="w-full relative">
						<div class="absolute inset-y-0 left-4 center"> 
							<i class="icon-email text-lg text-foreground/70 group-focus-within:text-primary"></i> 
						</div>
						<ui-input placeholder="Email Address" v-model="form.email" class="h-14 px-10"></ui-input>
					</div>
					<span class="text-xs text-primary" v-if="errors && errors.email" v-text="errors.email[0]"></span>
				</div>


				<div class="flex flex-col items-center gap-y-4 w-full">
					<ui-button size="lg" class="w-full gap-x-3 h-14" @click="request" :disabled="loading || !isvalid">

						<span class="animate-spin icon-loading" v-if="loading"></span>

						<span class="text-xs uppercase font-bold">
							Send reset instructions
						</span>
					</ui-button>


					<slot name="action"></slot>
				</div>
			</template>

			<template v-else>
				<div class="grid gap-y-4 w-full p-3 border rounded-md">

					<div class="flex flex-col w-full gap-y-1">
						<ui-label class="mb-2" for="token">Enter the token your received</ui-label>
						<otp-input class="gap-x-2" v-model:value="resetForm.token" :num-inputs="6" :should-auto-focus="true"  separator="" input-classes="otp-input">
						</otp-input>
						<span v-if="errors && errors.token" v-text="errors.token[0]" class="text-xs text-red-500/80 transition-all ease-in-out"></span>
					</div>

					<div class="flex flex-col w-full gap-y-1 uk-animation-slide-top-small" v-show="resetForm?.token?.length === 6">
						<ui-label for="password" class="mb-2">Enter your new password</ui-label>
						<div class="w-full relative">
							<ui-input placeholder="Enter your new password" v-model="resetForm.password" id="password" :type="visible ? 'text' : 'password'" required="true" class="w-full h-14"></ui-input>
							<div class="absolute inset-y-0 right-0 pr-3  flex items-center cursor-pointer"  @click="toggle()"> 
								<i :class="visible ? 'icon-eye-closed' : 'icon-eye-open'"></i> 
							</div> 
						</div>

						<span v-if="errors && errors.password" v-text="errors.password[0]" class="text-xs text-red-500/80 transition-all ease-in-out"></span>

					</div>
				</div>


				<div class="flex flex-col items-center w-full gap-y-4">
					<ui-button class="w-full h-14 gap-x-3" @click="reset" :disabled="loading || !resetForm.token || resetForm.token.length < 6 || !resetForm.password || resetForm.password.length < 6">

						<span class="animate-spin icon-loading" v-if="loading"></span>

						<span class="text-xs uppercase font-bold">
							Reset Password 
						</span>
					</ui-button>


					<slot name="action"></slot>

				</div>
			</template>

		</div>
	</div>
</template>
<script setup lang="ts">
import {z} from "zod"
import {useStorage} from "@vueuse/core"
const loading = useStorage('BRGA_GO_LOADER', false)
const {errors} = storeToRefs(useValidationStore())
const notify = useToaster()
const path = inject('redirectPath')

let visible = ref(false)
const toggle = useToggle(visible)
const {requestReset , resetPassword} = useAuthStore()

const sent = ref(false)


const form = reactive({
	email : "",
})


const resetForm = reactive({
	token : '',
	password : ''
})


const schema = z.object({
	email : z.string().email()
}).passthrough()

const isvalid = computed(() => schema.safeParse(form).success)

async function request() {
	loading.value = true
	const { data, error } = await requestReset(form)


	if (!error.value) {
		notify({ title: 'Password reset instructions sent', description: `You will receive password reset instructions on ${form.email}`})
		sent.value = true
	}

	else{
		notify({title: 'Uh oh! Something went wrong.', description: `${error?.value?.data?.message as string}`})
	}

	loading.value = false
}


async function reset() {

	const payload = {...resetForm, ...form}
	payload.password_confirmation = payload.password


	loading.value = true
	const { data, error } = await resetPassword(payload)


	if (data.value) {
		notify({ title: "Awesome. You're back on track", description: `You will be redirected shortly`})
		navigateTo(`${path ? path : useRoute()?.fullPath+'?password_changed'}`)
	}

	if (error?.value) {
		notify({ title: 'Uh oh! Something went wrong.', description: `${error?.value?.data?.message as string}`})
	}

	loading.value = false

}

onMounted(() => loading.value = false)
</script>
