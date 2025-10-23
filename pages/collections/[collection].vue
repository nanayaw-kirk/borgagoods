<template>
	<div>

		<Head>
			<Title>{{collection?.name ? collection?.name : $clean($route?.params?.collection)}} | {{$appName}}</Title>
			<Meta name="description" :content="collection?.description" v-if="collection?.description" />
			<Meta name="keywords" :content="collectionTags" v-if="collectionTags"></Meta>
		</Head>


		<div class="grid gap-4 md:gap-6">
			<div class="container h-[200px] md:h-[350px] bg-border relative">
				<div class="w-full h-full top-0 absolute bg-gradient-to-b from-transparent to-black"></div>
				<img :src="collection?.image?.web ? collection?.image?.web : '/illustrations/banner_trans.svg'" class="w-full h-full object-cover object-top" alt="" v-if="!loading">
			</div>
			<div class="grid gap-4 md:gap-6 -mt-[50px] md:-mt-[80px] z-1 container relative">
				

				<div class="grid items-start gap-4 md:gap-6 md:grid-cols-3">
					<div class="md:col-span-2">

						<template v-if="loading">
							
							<div class="max-w-[600px] bg-background rounded-tr-[30px] md:rounded-tr-3xl md:rounded-xl !rounded-l-none  p-4 flex items-start shadow-xl md:dark:border">
								<div class="expand flex gap-x-2">
									<ui-skeleton class="size-8 md:size-12"></ui-skeleton>

									<div class="flex flex-col expand">


										<div class="flex items-center gap-x-1">
											<ui-skeleton class="expand h-4"></ui-skeleton>
										</div>
										<div class="flex gap-x-1 items-center mt-2">
											<ui-skeleton class="w-2/3 h-2"></ui-skeleton>
										</div>
									</div>

									<div class="flex items-center gap-x-2">
										<ui-skeleton class="w-14 h-7"></ui-skeleton>
									</div>
								</div>
							</div>
						</template>

						<div class="max-w-[600px] bg-background rounded-tr-[30px] md:rounded-tr-3xl md:rounded-xl !rounded-l-none  p-4 flex items-start shadow-xl md:dark:border" v-else>
							<div class="expand flex items-start gap-x-2">
								<div class="flex flex-col expand">


									<div class="flex items-center gap-x-1">
										<h2 class="text-base md:text-lg font-medium md:font-bold line-clamp-1">{{collection?.name}}</h2>
									</div>
									<div>
										<p class="line-clamp-4 text-xs text-foreground/70">
											{{collection?.description ? collection?.description : `Shop the ${collection?.name} collection on ${$appName}`}}
										</p>
									</div>
								</div>

								<div class="flex items-start gap-x-2 my-auto">
									<share-action :data="shareData">
										<template #trigger>
											<ui-button variant="outline" size="sm" class="h-6">
												Share
											</ui-button>
										</template>
									</share-action>
								</div>
							</div>
						</div>
					</div>
				</div>


				<div class="container px-2">

					<template v-if="loading">
						<div class="w-full">
							<div class="w-full grid gap-2 md:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
								<div v-for="i in 6">
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
						<div class="w-full grid gap-2 md:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6" v-if="collection?.products?.length > 0">
							<product-card v-for="(entity, index) in collection?.products" :key="entity?.uuid" :entry="entity"></product-card>
						</div>

						<div class="mx-auto max-w-[95dvw] md:max-w-[550px] flex flex-col items-center p-6 md:p-16" v-else>
							<div class="flex flex-col items-center mt-3 mb-4">

								<icons-library class="text-7xl text-foreground/70"></icons-library>

								<h2 class="text-xl md:text-2xl text-center font-medium">Nothing here yet...</h2>
								<p class="text-center text-sm md:text-base text-foreground/70">
									This collection currently has no pieces
								</p>

								<ui-button size="sm" variant="ghost" @click="refresh" class="mt-4 w-full">
									Try Again
								</ui-button>


								<nuxt-link :to="{name: 'collections'}" class="mt-2 w-full">
									<ui-button size="sm" class="w-full h-10">
										Chechout other collections
									</ui-button>
								</nuxt-link>
							</div>
						</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">


const filterOptions = ref({
	include : 'tags,image,products,products.media,products.partner,products.minimum_variation,products.variations,products.variations.variation'
})

const  {list : collection , loading, fetchData : refresh} = useDataLoader(`/collections/${useRoute()?.params?.collection}`, filterOptions)

const collectionTags = computed(()=> collection?.value?.tags?.map((item) => item.name)?.toString())

const shareData = computed(()=> {
	return {
		url : window.location.href,
		title : collection?.value?.name,
		text : collection?.value?.description ? collection?.value?.description : `Shop the ${collection?.value?.description} on ${useNuxtApp()?.$appName}`,
		image : collection?.value?.image?.web
	}
})

provide('collection', collection)

</script>
