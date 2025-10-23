<template>
	<div>
		<div class="p-3 grid gap-y-3">
			<ui-label>Select your gender</ui-label>
			<div>
				<ui-radio-group default-value="male" v-model="form.gender">
					<div class="flex items-center space-x-2">
						<ui-radio-group-item class="size-6" id="male" value="male" />
						<ui-label class="font-normal" for="male">Male</ui-label>
					</div>
					<div class="flex items-center space-x-2">
						<ui-radio-group-item class="size-6" id="female" value="female" />
						<ui-label class="font-normal" for="female">Female</ui-label>
					</div>
				</ui-radio-group>
			</div>
		</div>

		<div class="border-t p-3 flex gap-x-3 items-center">
			<ui-button class="h-12" variant="ghost" @click="$emit('cancel')" :disabled="loading">
				Cancel
			</ui-button>

			<ui-button class="expand h-12" @click.prevent="submit" :disabled="loading">
				Update Gender
			</ui-button>
		</div>
	</div>
</template>
<script setup lang="ts">

import {useStorage} from "@vueuse/core"
const emit = defineEmits(['cancel', 'done'])
const loading = useStorage('BRGA_GO_LOADER', false)

const {user} = storeToRefs(useAuthStore())
const {updateProfile} = useAuthStore()
const notify = useToaster()

const form = reactive({
	gender : user?.value?.gender
})



async function submit() {
	loading.value = true
	const { data, error } = await updateProfile(form)
	
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
