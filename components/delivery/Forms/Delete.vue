<template>
	<div>
		<div class="@container grid gap-4">
			<div class="px-6 py-4 pb-0 flex flex-col items-center gap-y-4">

				<icons-map-remove class="text-6xl text-primary"></icons-map-remove>

				<p class="text-center text-foreground/70 text-sm md:text-base line-clamp-2">
					Are you sure you want to remove <b>{{entry?.location?.name}}</b> from your delivery locations on {{$appName}}. 
				</p>
			</div>


			<ui-separator decorative></ui-separator>

			<div class="p-3 pt-0">
				<ui-dialog-footer class="flex flex-row gap-4 !justify-center w-full">
					<ui-dialog-close>
						<ui-button class="line-clamp-1">
							Cancel
						</ui-button>
					</ui-dialog-close>

					<ui-button class="line-clamp-1"  variant="ghost" :disabled="loading" @click.prevent="submit">
						Remove Location
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
	const { data , error } = await useCrud().purge(`/shipping-addresses/${entry?.uuid}`)
	if (data?.value) {
		notify({ title : 'Delivery location removed', description : `You have removed ${entry?.location?.name} from your delivery locations on${useNuxtApp()?.$appName}`})
		emit('done')
	}

	if (error?.value) {
		notify({ title : 'Failed to Change status', description : `We couldn't remove ${entry?.location?.name} from your delivery locations. ${error?.value?.data?.message}`})
	}

	loading.value = false
}


onBeforeMount(() => loading.value = false)
</script>
