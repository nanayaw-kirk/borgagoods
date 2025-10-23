<template>
	<div>
		<template v-if="loading">
			<div class="w-full">
				<div class="w-full grid gap-2 md:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
					<div v-for="i in 18">
						<div class="w-full relative rounded cursor-pointer p-[5px]  dark:bg-muted/50 group border dark:border-none shadow-sm dark:shadow-none">

							<div>
								<div class="w-full flex flex-col relative">

									<ui-skeleton class="rounded w-full aspect-square"></ui-skeleton>

									<div class="flex flex-col w-full py-2 px-1">
										<ui-skeleton class="h-3 md:h-4 mb-1"/>
										<ui-skeleton class="h-2 md:h-3 mb-2"/>
										<div class="flex justify-between items-center p-1 pb-0 gap-4">
											<ui-skeleton class="expand h-3 md:h-6 rounded"/>
											<ui-skeleton class="h-3 w-3 md:w-6 md:h-6 rounded"></ui-skeleton>
										</div>
									</div>
								</div>
							</div>

							<div class="w-full bottom-0 absolute flex items-center justify-between z-10  mb-[100px] md:mb-[110px] pr-4 pl-2">

								<div>
									<ui-skeleton class="w-20 h-7 hidden md:inline-flex"></ui-skeleton>
									<ui-skeleton class="w-7 h-7 md:hidden"></ui-skeleton>
								</div>
								<div>
									<ui-skeleton class="w-7 h-7"></ui-skeleton>
								</div>

							</div>

						</div>
					</div>
				</div>
			</div>
		</template>

		<template v-else>
			<template v-if="list && list.length > 0">
				<div class=" w-full">
					<div class="w-full grid gap-2 md:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
						<product-card v-for="(entity, index) in list" :key="entity?.uuid" :entry="entity"></product-card>
					</div>
				</div>


				<template v-if="pagination && pagination.total_pages > pagination.current_page">
					<div class="px-0 py-2 flex justify-center mt-4">
						<ui-button @click="fetchMore()" class="w-fit  gap-x-4" variant="ghost">
							<span class="icon-loading animate-spin" v-if="fetching"></span>
							<span>
								Load More Products
							</span>
						</ui-button>
					</div>
				</template>

			</template>

			<template v-else>
				<slot name="notFound">
					<div class="mx-auto max-w-[550px] flex flex-col items-center pt-10">
						<span class="icon-tags-filled text-4xl md:text-6xl text-foreground/70"></span>
						<div class="flex flex-col items-center mt-3 mb-4">
							<h2 class="text-xl md:text-2xl text-center font-medium">No products found</h2>
							<p class="text-center text-sm md:text-base text-foreground/70">
								Sorry we could not find a products at the moment
							</p>
						</div>
						<ui-button class="h-10" @click="fetchData()" variant="ghost">
							Try Again
						</ui-button>
					</div>
				</slot>
			</template>
		</template>
	</div>	
</template>
<script setup lang="ts">
const props = defineProps({
	category : {
		type : Object,
		required : true
	}
})

const filterOptions = computed(() => {
	return {
		include : 'partner,partner.country,media,minimum_variation,variations,variations.variation',
		paginate : 18,
		category : props?.category?.slug
	}
})

const {list , loading, fetching, pagination, failed, errData, fetchData, fetchMore} = await useDataLoader(`/products`, filterOptions)


watch(()=> filterOptions?.value, (newVal, oldVal) => {
	if(!loading.value && !fetching.value){
		fetchData()
	}
},  { deep: true })

</script>
