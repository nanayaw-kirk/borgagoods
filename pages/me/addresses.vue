<template>
	<div>


		<Head>
			<Title>Delivery Addresses | {{$appName}}</Title>
		</Head>


		<div class="container w-full px-0">

			<section class="grid">
				<error-parser :error="errData" v-if="failed && errData"></error-parser>

				<template v-else>

					<template v-if="loading">

						<div class="grid gap-4 p-4 md:border md:rounded-xl">

							<div class="w-full flex gap-4 items-start"  v-for="i in 5">
								<div class="w-2/3 md:w-1/3 flex items-center gap-3">
									<ui-skeleton class="h-7 w-7 md:h-8 md:w-12"></ui-skeleton>
									<div class="expand flex flex-col gap-y-1">
										<ui-skeleton class="h-4 w-full"></ui-skeleton>
										<ui-skeleton class="h-2 w-1/2"></ui-skeleton>
									</div>
								</div>

								<div class="expand grid md:grid-cols-4 gap-4 items-center">
									<div class="hidden md:flex items-center gap-x-4 items-start">
										<ui-skeleton class="h-4 w-full"></ui-skeleton>
									</div>

									<div class="hidden md:flex">
										<ui-skeleton class="h-4 w-full"></ui-skeleton>
									</div>

									<div class="hidden md:flex items-center">
										<ui-skeleton class="h-4 w-full"></ui-skeleton>
									</div>

									<div class="flex items-center gap-x-2 justify-end pr-4">

										<div class="md:hidden">
											<ui-skeleton class="h-7 w-7"></ui-skeleton>
										</div>

										<div>
											<ui-skeleton class="h-7 w-7 md:h-8 md:w-8"></ui-skeleton>
										</div>
									</div>
								</div>
							</div>

						</div>
					</template>
					<template v-else>
						<template v-if="list && list.length > 0">
							<div class="grid divide-y  md:border md:rounded-xl">

								<template  v-for="(location, index) in list" :key="location.uuid">
									<delivery-location  @done="openDialog = false; fetchData(); fetchUser(); processing = false" class="p-1 md:p-2 uk-animation-slide-bottom-small" :style="`animation-delay: ${index*100}ms`"  :entry="location"></delivery-location>
								</template>

								<div class="p-2 pr-4 flex items-center justify-between gap-6">
									<span class="text-xs md:text-sm text-foreground/70">
										{{ user?.shipping_address_slots_left > 0 ? `You can add ${user?.shipping_address_slots_left} more ${user?.shipping_address_slots_left === 1 ? 'address' : 'addresses'}` : 'You have used up all 5 address slots' }}
									</span>

									<ui-button size="sm" @click="openDialog = true; modalSize = 'x-small'; intent = 'create'" :disabled="!user?.shipping_address_slots_left">
										Add Address
									</ui-button>
								</div>


							</div>

						</template>

						<template v-else>

							<div class="p-4 mx-auto max-w-md flex flex-col items-center gap-y-4">
								<span class="icon-delivery text-5xl"></span>
								<div class="flex flex-col">
									<h4 class="text-xl md:text-3xl font-medium text-center">No address found</h4>
									<span class="text-center text-foreground/70">
										There are no saved delivery addresses for your account. Add one now for faster checkout.
									</span>
								</div>
								<ui-button size="sm" @click="openDialog = true; modalSize = 'x-small'; intent = 'create'" :disabled="!user?.shipping_address_slots_left">
									Add Address
								</ui-button>

								<ui-button variant="outline" size="sm" @click="fetchData(); fetchUser()">Try Again</ui-button>

							</div>
						</template>
					</template>
				</template>

			</section>


			<partials-dialog :ctaTitle="headings?.title" :ctaDesc="headings?.description" v-model:modalSize="modalSize" v-model:open="openDialog" :key="`dialog-${openDialog}`" persist>
				<template #content>
					<delivery-forms-create @done="openDialog = false; fetchData(); fetchUser(); processing = false" v-if="intent === 'create'"></delivery-forms-create>
				</template>

				<template #loader v-if="processing">
					<partials-loading-overlay></partials-loading-overlay>
				</template>
			</partials-dialog>

		</div>
	</div>
</template>
<script setup lang="ts">
const processing = ref(false)
const {modalSize} = useModalResize()
const {user} = storeToRefs(useAuthStore())

const {fetchUser} = useAuthStore()

const openDialog = ref(false)
const intent = ref(undefined)

const url = ref("shipping-addresses")
const requestFilters = ref({})

const filterOptions = ref({
	include : 'country,location',
})


const appliedFilters = computed(() => JSON.stringify( filterOptions?.value))


const  {list , loading, fetching, pagination, failed, errData, fetchData, fetchMore, searchQuery, searchData, searching} = useDataLoader(`/${url.value}`, filterOptions)


const headings = computed(() => {
	if (intent.value === 'create') return {title : "Add Delivery Location", description : `Setup a new delivery location on ${useNuxtApp()?.$appName}`};
	return {title : "Options", description : `General Options`}
})

</script>
