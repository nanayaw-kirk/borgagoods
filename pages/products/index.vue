<template>
	<div>

		<Head>
			<Title>Shop exciting merchandise on {{$appName}}</Title>
			<Meta name="description" :content="`Official Team Merchandise Store`" />
			<Meta name="keywords" :content="$keywords"></Meta>
			<Meta name="robots" content="index, follow"></Meta>
		</Head>

		<div class="container p-2 md:py-4">
			
			<div>
				<template v-if="loading">
					<div class="w-full center p-10">
						<span class="icon-spinner animate-spin text-3xl"></span>
					</div>
				</template>

				<template v-else>
					<template v-if="list && list.length > 0">
						<div class=" w-full">
							<div class="w-full grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
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
		</div>
	</div>  
</template>
<script setup lang="ts">


const filterOptions = computed(() => {
	return {
		include : 'partner,partner.country,media,minimum_variation,variations,variations.variation',
		paginate : 18
	}
})

const {list , loading, fetching, pagination, failed, errData, fetchData, fetchMore, searchQuery, searchData, searching} = await useDataLoader(`/products`, filterOptions)


watch(()=> filterOptions?.value, (newVal, oldVal) => {
	if(!loading.value && !searching.value && !fetching.value){
		fetchData()
	}
},  { deep: true })
</script>
