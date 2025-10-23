<template>
	<div>
		<div class="flex border rounded-md divide-x">
			<div class="w-1/3">
				<ui-popover v-model:open="countrySelectControler">
					<ui-popover-trigger as-child>
						<div class="w-full relative hover:bg-border/70 focus-within:bg-muted/70 focus:bg-muted/70 transition-all">
							<div class="py-1 h-12 flex flex-col px-2 cursor-pointer">
								<template v-if="country">
									<div class="flex items-center gap-x-2 w-full my-auto">
										<div class="w-fit -mt-[2px]">
											<country-flag :country="country?.alpha_2_code" size="normal"/>
										</div>

										<div class="expand flex flex-col">
											<span class="line-clamp-1 font-medium text-sm">
												{{country?.name}}
											</span>
										</div>
									</div>
								</template>
								<template v-else>
									<span class="text-sm my-auto text-foreground/70 line-clamp-1">
										Select a country
									</span>
								</template>
							</div>
							<span class="right-4 top-4 absolute inset icon-down"></span>
						</div>
					</ui-popover-trigger>
					<ui-popover-content class="!p-0 w-[300px]">
						<ui-command :filter-function="filterCountries">
							<ui-command-input placeholder="Search Country"></ui-command-input>
							<ui-command-empty>No country available</ui-command-empty>
							<ui-command-list class="overflow-hidden">
								<template v-for="cty in $deliveryLocations" :key="cty?.uuid">
									<ui-command-item :value="cty"  @select="() => { country = cty; country_id = cty?.uuid; countrySelectControler = false; }">
										<div class="flex items-center gap-x-2 w-full group">

											<div class="w-fit">
												<country-flag :country="cty?.alpha_2_code" size="normal"/>
											</div>

											<div class="expand flex flex-col">
												<span class="line-clamp-1 text-sm font-medium">
													{{cty?.name}}
												</span>
											</div>
											<icons-check-circle class="text-emerald-500 text-xl" v-if="country?.uuid === cty?.uuid"></icons-check-circle>
										</div>
									</ui-command-item>
								</template>
							</ui-command-list>
						</ui-command>
					</ui-popover-content>
				</ui-popover>
			</div>





			<div class="expand" :key="`drop-${list?.length}`">
				<ui-popover v-model:open="locationSelectController">
					<ui-popover-trigger as-child>
						<div class="w-full relative hover:bg-border/70 focus-within:bg-muted/70 focus:bg-muted/70 transition-all">
							<div class="py-1 h-12 flex flex-col px-2 cursor-pointer">
								<template v-if="selectedDeliveryLocation">
									<div class="flex items-center gap-x-2 w-full my-auto">
										<span class="icon-location-pin text-xl text-foreground/70"></span>
										<div class="expand flex flex-col">
											<span class="line-clamp-1 text-xs md:text-sm font-medium">
												{{selectedDeliveryLocation?.name}}
											</span>
											<span class="line-clamp-1 text-xs text-foreground/70">
												Starting from {{$CURRENCY(selectedDeliveryLocation?.base_delivery_charge?.price)}}
											</span>
										</div>
									</div>
								</template>
								<template v-else>
									<div class="flex items-center gap-x-2 w-full my-auto">
										<span class="icon-location-pin text-xl text-foreground/70"></span>
										<span class="text-sm my-auto text-foreground/70 line-clamp-1 expand">
											Select your delivery location {{ country?.name ? `in ${country?.name}` : '' }}
										</span>
									</div>
								</template>
							</div>
							<span class="right-4 top-4 absolute inset" :class="loading ? 'icon-spinner animate-spin' : 'icon-down'"></span>
						</div>
					</ui-popover-trigger>
					<ui-popover-content class="!p-0 w-[300px]">
						<ui-command :filter-function="filterFunction">
							<ui-command-input placeholder="Search locations"></ui-command-input>
							<ui-command-empty>No location found</ui-command-empty>
							<ui-command-list class="overflow-hidden">
								<ui-scroll-area class="h-[30dvh] md:h-[calc(50dvh+20px)]">
									<ui-command-item  v-for="entry in availableLocations" :key="entry?.uuid" class="!rounded-none" :value="entry"  @select="() => { delivery_location_id = entry?.uuid; locationSelectController = false; }">
										<div class="flex items-start gap-x-2 w-full group cursor-pointer">


											<div class="w-fit -mt-1">
												<country-flag :country="entry?.country?.alpha_2_code" size="normal"/>
											</div>
											<div class="expand flex flex-col">
												<span class="line-clamp-1 text-xs md:text-sm font-medium">
													{{entry?.name}}
												</span>
												<span class="line-clamp-1 text-xs text-foreground/70">
													Starting from {{$CURRENCY(entry?.base_delivery_charge?.price)}}
												</span>
											</div>

											<icons-check-circle class="text-emerald-500 text-xl my-auto" v-if="selectedDeliveryLocation?.uuid === entry?.uuid"></icons-check-circle>
										</div>
									</ui-command-item>
								</ui-scroll-area>
							</ui-command-list>
						</ui-command>
					</ui-popover-content>
				</ui-popover>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">

const locationSelectController = ref(false)
const countrySelectControler = ref(false)
const country = ref(useNuxtApp()?.$currentLocale)

const country_id = defineModel('country_id', {default : null})
const delivery_location_id = defineModel('delivery_location_id', {default : null})


const filterOptions = computed(() => { 
	return {country :  country_id?.value}
})

const {list, loading, fetchData} = await useDataLoader(`/delivery-locations?include=country`, filterOptions)


const selectedDeliveryLocation = computed(() => list?.value?.find(item => item?.uuid === delivery_location_id?.value))

const availableLocations = computed(() => list?.value)





function filterFunction(array, searchTerm) {
	return list?.value?.filter(item => item?.name.toLowerCase().includes(searchTerm.toLowerCase()))
}


function filterCountries(array, searchTerm) {
	return useNuxtApp()?.$deliveryLocations?.filter(item => item?.name.toLowerCase().includes(searchTerm.toLowerCase()))
}



watch(country_id, async ()=> {
	await fetchData()
	delivery_location_id.value = selectedDeliveryLocation?.uuid
})

onMounted(()=> {
	country_id.value = useNuxtApp()?.$currentLocale?.uuid
})

</script>
