<template>
	<div>
		<div class="@container grid gap-4">
			<div class="px-6 py-4 pb-0 flex flex-col items-center gap-y-4">

				<icons-map-point class="text-6xl text-foreground/70"></icons-map-point>

				<p class="text-center text-foreground/70 line-clamp-2">
					Confirm your intention to set <b>{{entry?.location?.name}}</b> as your default checkout address on {{$appName}}. 
				</p>
			</div>


			<ui-separator decorative></ui-separator>

			<div class="p-3 pt-0">
				<ui-dialog-footer class="flex flex-row gap-4 !justify-center w-full">
					<ui-dialog-close>
						<ui-button class="line-clamp-1" variant="ghost" >
							Cancel
						</ui-button>
					</ui-dialog-close>

					<ui-button class="line-clamp-1" :disabled="loading" @click.prevent="submit">
						Confirm
					</ui-button>
				</ui-dialog-footer>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
const notify = useToaster()

import {useStorage} from "@vueuse/core"
const loading = useStorage('BRGA_GO_LOADER', false)
const entry = inject('entry')
const emit = defineEmits(['done'])




async function submit(){
	loading.value = true
	const { data , error } = await useCrud().post(`/shipping-addresses/${entry?.uuid}/set-default`)
	if (data?.value) {
		notify({ title : 'Default location changed', description : `${entry?.location?.name} has been set as your default address`})
		emit('done')
	}

	if (error?.value) {
		notify({ title : 'Action faild', description : `We couldn't set ${entry?.location?.name} as your default checkout address. ${error?.value?.data?.message}`})
	}

	loading.value = false
}


onBeforeMount(() => loading.value = false)
</script>
