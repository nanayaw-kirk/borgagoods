<template>
	<div>
		<div class="p-3 grid gap-y-2">
			<ui-label class="text-xs">Full Name</ui-label>
			<ui-input class="h-14" placeholder="Enter your full name" v-model="form.name"></ui-input>
		</div>

		<div class="border-t p-3 flex gap-x-3 items-center">
			<ui-button class="h-12" variant="ghost" @click="$emit('cancel')" :disabled="loading">
				Cancel
			</ui-button>

			<ui-button class="expand h-12" @click.prevent="submit" :disabled="loading">
				Update Name
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
	name : user?.value?.name
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
