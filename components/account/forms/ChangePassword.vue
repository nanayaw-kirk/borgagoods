<template>
	<div>
		<div class="grid divide-y gap-y-2">

			<div class="grid gap-y-2 p-2">
				<div class="grid">
					<ui-label class="text-xs">Current Password</ui-label>
					<span class="text-xs text-foreground/70">Enter the current password associated with your account</span>
				</div>
				<div class="w-full relative">
					<div class="absolute inset-y-0 left-4 center"> 
						<i class="icon-lock text-lg text-foreground/70 group-focus-within:text-primary"></i> 
					</div>
					<ui-input placeholder="Current Password" v-model="form.current_password" :type="visible ? 'text' : 'password'" class="h-14 px-10"></ui-input>
				</div>
				<span class="text-xs text-primary" v-if="errors && errors.current_password" v-text="errors.current_password[0]"></span>
			</div>

			<div class="grid gap-y-2 p-2">
				<div class="grid">
					<ui-label class="text-xs">New Password</ui-label>
					<span class="text-xs text-foreground/70">Create a strong new password for future logins</span>
				</div>
				<div class="w-full relative">
					<div class="absolute inset-y-0 left-4 center"> 
						<i class="icon-lock text-lg text-foreground/70 group-focus-within:text-primary"></i> 
					</div>
					<ui-input placeholder="Create a New Password" v-model="form.password" :type="visible ? 'text' : 'password'" class="h-14 px-10"></ui-input>
				</div>
				<span class="text-xs text-primary" v-if="errors && errors.password" v-text="errors.password[0]"></span>
			</div>


			<div class="flex items-center gap-y-2 p-2">
				<ui-label class="text-xs expand font-normal text-foreground/70" for="visible">{{visible ? 'Hide' : 'Show'}} Password Fields</ui-label>
				<ui-switch id="visible" :checked="visible" @update:checked="visible = !visible"></ui-switch>
			</div>
		</div>

		<div class="border-t p-3 flex gap-x-3 items-center">
			<ui-button class="h-12" variant="ghost" @click="$emit('cancel')" :disabled="loading">
				Cancel
			</ui-button>

			<ui-button class="expand h-12" @click.prevent="submit" :disabled="loading || !isvalid">
				Update Password
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
const {changePassword} = useAuthStore()
const notify = useToaster()

const form = reactive({
	current_password : '',
	password : '',
})



const schema = z.object({
	current_password : z.string(),
	password: z.string().min(6),
}).passthrough()

const isvalid = computed(() => schema.safeParse(form).success)



async function submit() {
	loading.value = true
	const payload = {...form, password_confirmation : form.password}
	const { data, error } = await changePassword(payload)
	
	if (data?.value) {
		notify({ title: 'Nicely done!', description: `${data?.value?.message as string}`})
		emit('done')
	}

	if (error?.value) {
		notify({ title: 'Uh oh! Something went wrong.', description: `${error?.value?.data?.message as string}`})
	}

	loading.value = false
	
}


onMounted(() => loading.value = false)


</script>
