<template>

	<div class="w-full">
		<div class="cursor-pointer" @click="openOverlay = true;">
			<slot name="action-button">
				<ui-button class="text-xs h-8 uppercase font-medium hidden md:block">
					Get Started
				</ui-button>
				<ui-button size="icon" class="md:hidden rounded-full h-7 w-7">
					<span class="icon-user"></span>
				</ui-button>


			</slot>
		</div>


		<ui-drawer v-model:open="openOverlay" v-if="smAndDown">
			<ui-drawer-content  class="p-0 rounded-t-2xl flex flex-col items-center gap-y-0 max-w-screen" @interactOutside.prevent="" @escapeKeyDown.prevent="" :hideClose="loading">

				<div class="center pt-6">
					<partials-logo class="fill-primary w-[120px] h-fit"></partials-logo>
				</div>
				<ui-drawer-header class="pb-0 w-full pt-2 !hidden">
					<ui-drawer-title class="font-medium text-lg line-clamp-1">{{heading}}</ui-drawer-title>
					<ui-drawer-description class="hidden font-normal">{{description}}</ui-drawer-description>
				</ui-drawer-header>


				


				<div class="p-4 pb-2 w-full">
					<div class="grid grid-cols-2 border rounded-md">
						<div class="p-[2px] cursor-pointer pr-0" @click="intent = 'register'">
							<div class="p-2 rounded-l text-center text-xs font-medium transition-colors uppercase" :class="intent === 'register' ? 'bg-primary text-primary-foreground' : 'bg-muted/60'">Get Started</div>
						</div>
						<div class="p-[2px] cursor-pointer" @click="intent = 'login'">
							<div class="p-2 rounded-r text-center text-xs font-medium transition-colors uppercase" :class="intent === 'login' ? 'bg-primary text-primary-foreground' : 'bg-muted/60'">Login</div>
						</div>
					</div>
				</div>
				
				<ui-scroll-area class="-mt-2 w-full h-fit" :class="intentHeight">
					<div class="w-full p-4">


						<auth-register v-if="intent === 'register'">
						</auth-register>

						<auth-login v-else-if="intent === 'login'" @forgot="intent = 'reset'">
						</auth-login>

						<auth-reset v-else>
							<template #ext>
								<div class="mb-4">
									<p class="text-foreground/70">
										Enter your email address and we'll send you instructions to recover your account.
									</p>
								</div>
							</template>
						</auth-reset>
					</div>
				</ui-scroll-area>
			</ui-drawer-content>
		</ui-drawer>

		<ui-dialog v-model:open="openOverlay" v-else>
			<ui-dialog-content class="p-0 flex flex-col gap-y-0 md:w-[500px]"  @interactOutside.prevent="" @escapeKeyDown.prevent="" :hideClose="loading">
				<div class="hidden">
					<ui-dialog-header class="p-4 w-full">
						<ui-dialog-title class="text-center">{{heading}}</ui-dialog-title>
						<ui-dialog-description class="text-center font-normal">{{description}}</ui-dialog-description>
					</ui-dialog-header>
				</div>
				<div class="@container">
					<div class="w-full">


						<div class="h-full flex flex-col items-start relative">


							<div class="flex flex-col w-full my-auto p-4 md:p-8">

								<div class="mb-2 center">
									<partials-logo class="fill-primary w-[200px] h-fit mb-4"></partials-logo>
								</div>
								

								<div class="grid grid-cols-2 mb-4 border rounded-md">
									<div class="p-[2px] cursor-pointer pr-0" @click="intent = 'register'">
										<div class="p-2 rounded-l text-center text-xs font-medium transition-colors uppercase" :class="intent === 'register' ? 'bg-primary text-primary-foreground' : 'bg-muted/60'">Get Started</div>
									</div>
									<div class="p-[2px] cursor-pointer" @click="intent = 'login'">
										<div class="p-2 rounded-r text-center text-xs font-medium transition-colors uppercase" :class="intent === 'login' ? 'bg-primary text-primary-foreground' : 'bg-muted/60'">Login</div>
									</div>
								</div>


								
								<div>
									<auth-register v-if="intent === 'register'"  @close="openOverlay = false">
									</auth-register>

									<auth-login v-else-if="intent === 'login'" @forgot="intent = 'reset'" @close="openOverlay = false">
									</auth-login>

									<auth-reset v-else>
										<template #ext>
											<div class="mb-4">
												<p class="text-foreground/70">
													Enter your email address and we'll send you instructions to recover your account.
												</p>
											</div>
										</template>

										<template #action>
											<p class="text-foreground/70 text-sm">
												Remembered your password? <span @click="intent = 'login'" class="underline text-primary font-medium cursor-pointer">Sign in to your account</span>
											</p>
										</template>
									</auth-reset>
								</div>
							</div>
						</div>

					</div>
				</div>
			</ui-dialog-content>
		</ui-dialog>



	</div>

</template>
<script setup lang="ts">
const {authenticated} = storeToRefs(useAuthStore())
import {useStorage} from "@vueuse/core"
const loading = useStorage('BRGA_GO_LOADER', false)

const {smAndDown} = useScreenSize()
const openOverlay = ref(false)

const props = defineProps({
	intention : {
		type : String,
		default: 'register'
	}

})


const intent = ref(props?.intention)

const emit = defineEmits(['updated'])
const heading = computed(() => {
	if (intent.value === 'register') return "Sign up for exclusive offers";
	if (intent.value === 'login') return "Sign in for a personalized shopping experience";
	if (intent.value === 'reset') return "Forgot your password?";
	return "Create a new account"
})


const description = computed(() => {
	if (intent.value === 'register') return "Create a new account";
	if (intent.value === 'login') return "Sign in to your account";
	if (intent.value === 'reset') return "Enter your email address and we'll send you a link to reset your password";
	return "Create a new account"
})


const intentHeight = computed( ()=> {
	if (intent.value === 'register') return "h-[50vh]";
	if (intent.value === 'login') return "h-[45vh]";
	return "40vh"

})




watch(intent, ()=>{
	useValidationStore().clear()
})

watch(authenticated, ()=>{
	loading.value = false
})

</script>
