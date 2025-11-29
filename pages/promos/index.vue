<template>
	<div>

		<Head>
			<Title>Score big savings on fan gear | {{$appName}}</Title>
			<Meta name="description" :content="`Merchandise Promos & Discounts`" />
			<Meta name="keywords" content="promotions,discounts,savings,jerseys,merchandise,merch,local ssports, sports, african sports"></Meta>
			<Meta name="robots" content="index, follow"></Meta>
		</Head>

		<div class="container p-2 md:py-4">
			<template v-if="loading">
				<div class="w-full">
					<div class="w-full grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
						<div v-for="i in smAndDown ? 4 : 5">
							<div class="flex flex-col gap-2 items-center">
								<ui-skeleton class="aspect-video w-full"></ui-skeleton>
								<div class="w-full flex flex-col">
									<ui-skeleton class="w-full h-5 mb-2"></ui-skeleton>
									<ui-skeleton class="w-3/4 h-3"></ui-skeleton>
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>

			<template v-else>
				<template v-if="list && list.length > 0">
					<div class=" w-full">
						<div class="w-full grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
							<promo-entry v-for="(entity, index) in list" :key="entity?.uuid" :entry="entity"></promo-entry>
						</div>
					</div>


					<template v-if="pagination && pagination.total_pages > pagination.current_page">
						<div class="px-0 py-2 flex justify-center mt-4">
							<ui-button @click="fetchMore()" class="w-fit  gap-x-4" variant="ghost">
								<span class="icon-spinner animate-spin" v-if="fetching"></span>
								<span>
									Load More
								</span>
							</ui-button>
						</div>
					</template>

				</template>

				<template v-else>
					<slot name="notFound">
						<div class="mx-auto max-w-[550px] flex flex-col items-center pt-10">
							<div class="flex flex-col items-center mt-3 mb-4">
								<h2 class="text-xl md:text-2xl text-center font-medium">No promos found</h2>
								<p class="text-center text-sm md:text-base text-foreground/70">
									Sorry there are no ongoing promos
								</p>
							</div>
							<ui-button class="h-10" @click="fetchData()" variant="outline">
								Try Again
							</ui-button>
						</div>
					</slot>
				</template>
			</template>
		</div>
	</div>  
</template>
<script setup lang="ts">

const {smAndDown} = useScreenSize()

const props = defineProps({
	endpoint : {
		type : String,
		default : 'promos'
	}
})

const filterOptions = computed(() => {
	return {
		include : 'image',
		paginate : 15
	}
})

const {list , loading, fetching, pagination, failed, errData, fetchData, fetchMore} = await useDataLoader(`/${props.endpoint}`, filterOptions)


watch(()=> filterOptions?.value, (newVal, oldVal) => {
	if(!loading.value && !searching.value && !fetching.value){
		fetchData()
	}
},  { deep: true })


</script>
