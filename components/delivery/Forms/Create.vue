<template>
	<div>
		<div class="grid">
			<ui-scroll-area class="h-[65dvh] md:h-[45dvh]">
				<div class="p-3 grid gap-4">


					<div class="grid gap-y-2">
						<ui-label for="typ" class="text-xs">Indicate Address Type</ui-label>

						<div class="grid grid-cols-3 gap-2">
							<div v-for="tp in ['home', 'work', 'other']" class="p-2  flex flex-col items-center gap-y-1 rounded-md cursor-pointer transition-colors" :class="form?.type === tp ? 'bg-primary text-white' : 'border hover:bg-muted/70'" @click="form.type = tp">
								<span :class="`icon-${tp}`" class="text-2xl"></span>
								<span class="text-xs font-medium text-center capitalize">{{tp}}</span>
							</div>
						</div>
					</div>


					<div class="grid gap-y-2">
						<ui-label for="location" class="text-xs">Select location</ui-label>

						<client-only>	
							<select-delivery-location v-model:delivery_location_id="form.location_id" v-model:country_id="form.country_id"></select-delivery-location>
						</client-only>

					</div>

					<div class="grid gap-y-2">
						<ui-label for="landmark" class="text-xs">Nearest landmark</ui-label>

						<ui-textarea class="h-20 resize-none" v-model="form.landmark" placeholder="Indicate a notable landmark at your chosen location eg: Shell Filling Station"></ui-textarea>

					</div>


					<div class="grid gap-y-2">
						<ui-label for="phone_number" class="text-xs">Phone number</ui-label>
						<div>
							<vue-tel-input class="h-12" id="phone_number" placeholder="Enter phone number" v-model="form.phone"></vue-tel-input>
						</div>
					</div>

				</div>
			</ui-scroll-area>


			<div class="p-3  border-t">
				<ui-dialog-footer class="flex flex-row gap-4 !justify-center w-full">
					<ui-dialog-close>
						<ui-button class="line-clamp-1" variant="ghost">
							Cancel
						</ui-button>
					</ui-dialog-close>

					<ui-button class="line-clamp-1" :disabled="loading || !valid?.success" @click.prevent="submit">
						Save Address
					</ui-button>
				</ui-dialog-footer>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import {z} from "zod"
import {useStorage } from "@vueuse/core"
const loading = useStorage('BRGA_GO_LOADER', false)

const {errors} = storeToRefs(useValidationStore())

const notify = useToaster()

const emit = defineEmits(['done'])

const form = reactive({
	type : 'home',
	country_id : '',
	location_id : '',
	name : null,
	email: null,
	phone : '',
	landmark : '',

})

const schema = z.object({
	type : z.string().min(2),
	location_id : z.string().min(8),
	country_id : z.string().optional().nullable(),
	landmark : z.string().min(2),
	phone : z.string().min(8),

}).passthrough()


const valid = computed(() => schema.safeParse(form))



async function submit(){
	loading.value = true
	const { data , error } = await useCrud().post(`/shipping-addresses`, form)
	if (data?.value) {
		notify({ title : 'Address Added', description : `A new delivery address has been added for you on ${useNuxtApp()?.$appName}`})
		emit('done')
	}

	if (error?.value) {
		notify({ title : 'Failed to add address', description : `We couldn't setup your address on ${useNuxtApp()?.$appName}. ${error?.value?.data?.message}`})
	}

	loading.value = false
}


onBeforeMount(() => loading.value = false)
</script>
