<template>
	<div>
		<div class="grid divide-y gap-y-2">

			<div class="grid gap-y-2 p-2">

				<div class="w-full aspect-video bg-border flex">
					<img :src="`/illustrations/closure.svg`" class="w-full h-full object-cover" alt="Account Closure Illustration">
				</div>

				<div class="flex flex-col items-center md:p-4">
					<p class="text-sm text-foreground/70 text-center">We hate to see you go but it seems the journey ends here. Thank you for being part of {{$appName}}. Should you choose to return, your account can be reactivated at any time.</p>
				</div>
				<div class="w-full relative">
					<div class="absolute inset-y-0 left-4 center"> 
						<i class="icon-lock text-lg text-foreground/70 group-focus-within:text-primary"></i> 
					</div>
					<ui-input placeholder="Account Password" v-model="form.password" :type="visible ? 'text' : 'password'" class="h-14 px-10"></ui-input>
				</div>
				<span class="text-xs text-primary" v-if="errors && errors.password" v-text="errors.password[0]"></span>
			</div>

			<div class="flex items-center gap-y-2 p-2">
				<ui-label class="text-xs expand font-normal text-foreground/70" for="visible">{{visible ? 'Hide' : 'Show'}} Password</ui-label>
				<ui-switch id="visible" :checked="visible" @update:checked="visible = !visible"></ui-switch>
			</div>
		</div>

		<div class="border-t p-3 flex gap-x-3 items-center">
			<ui-button class="h-12" variant="ghost" @click="$emit('cancel')" :disabled="loading">
				Cancel
			</ui-button>

			<ui-button class="expand h-12" @click.prevent="submit" :disabled="loading">
				Deactivate Your Account
			</ui-button>
		</div>
	</div>
</template>
<script setup lang="ts">
import {z} from "zod"
import {useStorage} from "@vueuse/core"
const emit = defineEmits(['cancel', 'done'])
const loading = useStorage('BRGA_GO_LOADER', false)
const visible = ref(false)

const {user} = storeToRefs(useAuthStore())
const {errors} = storeToRefs(useValidationStore())
const {purgeAccount} = useAuthStore()
const notify = useToaster()

const form = reactive({
	password : '',
})


async function submit() {
	loading.value = true
	const { data, error } = await purgeAccount(form)
	
	if (data?.value) {
		notify({ title: 'Good Bye!', description: `${data?.value?.message as string}`})
		emit('done')
	}

	if (error?.value) {
		notify({ title: 'Uh oh! Something went wrong.', description: `${error?.value?.data?.message as string}`})
	}

	loading.value = false
	
}


onMounted(() => loading.value = false)


</script>
