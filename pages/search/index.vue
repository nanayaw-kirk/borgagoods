<template>
	<div>

		<Head>
			<Title>Search for Products | {{$appName}}</Title>
			<Meta name="description" :content="`Official Team Merchandise Store`" />
			<Meta name="keywords" :content="$keywords"></Meta>
			<Meta name="robots" content="index, follow"></Meta>
		</Head>

		<div class="container">
			<template v-if="!searchQuery">
				<div class="w-full flex flex-col items-center p-16 rounded-md">
					<span class="icon-search text-4xl md:text-6xl text-foreground/70"></span>
					<div class="flex flex-col items-center mt-3 mb-4">
						<h2 class="text-xl md:text-2xl text-center font-medium">Search for products</h2>
						<p class="text-center text-sm md:text-base text-foreground/70">
							Find your next memorable piece faster by searching our catalog
						</p>
					</div>
				</div>
			</template>
			<template v-else>
				<div>
					<template v-if="searching">
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
							<div class=" w-full grid gap-4">
								<div>
									<h2 class="text-xl md:text-2xl font-bold">{{searchQuery}}</h2>
								</div>
								<div class="w-full grid gap-2 md:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
									<product-card v-for="(entity, index) in list" :key="entity?.uuid" :entry="entity"></product-card>
								</div>
							</div>

						</template>

						<template v-else>
							<div class="mx-auto max-w-[550px] flex flex-col items-center pt-10">
								<span class="icon-tags-filled text-4xl md:text-6xl text-foreground/70"></span>
								<div class="flex flex-col items-center mt-3 mb-4">
									<h2 class="text-xl md:text-2xl text-center font-medium">No products found</h2>
									<p class="text-center text-sm md:text-base text-foreground/70">
										No products found for the search {{searchQuery}}. Please try again with another keyword.
									</p>
								</div>
								<div class="flex items-center gap-x-2">
									<ui-button class="h-8 md:h-10" @click="$emit('reset')" variant="outline">
										Try Another Search
									</ui-button>

									<ui-button class="h-8 md:h-10" @click.prevent="performSearch()">
										Retry
									</ui-button>
								</div>
							</div>
						</template>
					</template>
				</div>
			</template>
		</div>
	</div>  
</template>
<script setup lang="ts">


const emit = defineEmits(['reset'])

const searchQuery = computed(()=> useRoute()?.query?.q?.trim())


const list = ref([])
const searching = ref(false)


const filterOptions = computed(() => {
	return { include : 'tags,image,products', paginate : 100, query : searchQuery.value}
})


async function performSearch(){

	searching.value = true

	let {data, error, pending} = await useApiFetch(`/products?include=partner,partner.country,media,minimum_variation,variations,variations.variation&paginate=100&query=${searchQuery?.value}`)
	if (data?.value) {
		list.value = data?.value?.data
	}

	if (error?.value) {

		console?.log(error?.value)
	}

	searching.value = false
}

performSearch()
</script>
