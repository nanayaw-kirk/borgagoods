<template>
	<div>
		<!-- {{savedAddresses}} -->
		<template v-if="savedAddresses?.length > 0">
			<div class="grid gap-y-1">
				<ui-select v-model="location_id">
					<ui-select-trigger class="h-14">
						<ui-select-value placeholder="Select delivery location" class="text-left"></ui-select-value>
					</ui-select-trigger>
					<ui-select-content>
						<ui-select-group>
							<template v-for="lc in savedAddresses" :key="lc?.uuid">
								<ui-select-item :value="lc?.uuid" class="h-14">
									<div class="flex">
										<div class="expand flex flex-col">
											<span class="font-medium">
												{{lc?.location?.name}}, {{lc?.country?.name}}
											</span>
											<span class="text-xs">
												{{lc?.landmark}} &bull; From {{$CURRENCY(lc?.location?.base_delivery_charge?.price)}}
											</span>
										</div>
									</div>
								</ui-select-item>
							</template>
						</ui-select-group>
					</ui-select-content>
				</ui-select>

				<ui-button v-if="user?.has_shipping_address_slot_left" size="sm" class="w-full" variant="outline" @click="open = true">Add New Address</ui-button>
			</div>
		</template>
		<template v-else>
			<div class="flex items-center gap-4">

				<icons-map-pin class="text-5xl text-primary"></icons-map-pin>
				<div class="expand flex flex-col">
					<span>No Saved Addresses</span>
					<span class="text-xs text-foreground/70">There are no saved addresses for your account</span>
				</div>

				<ui-button size="sm" @click="open = true">Add</ui-button>
			</div>
		</template>


		<partials-dialog ctaTitle="Add a New Address" ctaDesc="Saved addresses help you checkout faster" v-model:md_sise="size" v-model:open="open" :key="`dialog-${open}`" persist>
			<template #content>
				<delivery-forms-create @done="open = false; getShippingInfo(); fetchUser()"></delivery-forms-create>
			</template>
		</partials-dialog>
		
	</div>	
</template>
<script setup lang="ts">

const location_id = defineModel('location_id', {default : null})

const {savedAddresses} = storeToRefs(useAuthStore())
const {getShippingInfo, fetchUser} = useAuthStore()

const size = ref('x-small')
const open = ref(false)

onBeforeMount(async () => {
	await getShippingInfo()

	let defaultAddress = savedAddresses?.value?.find(item => item?.is_default)
	if (defaultAddress) {
		location_id.value = defaultAddress?.uuid
	}
})

</script>
