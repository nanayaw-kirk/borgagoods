<template>
	<div class="pb-16">
		<Head>
			<Title>{{product?.name ? product?.name : $clean($route?.params?.product)}} | {{$appName}}</Title>
			<Meta name="description" :content="`${ product?.description ? product?.description : 'Buy ' + product?.name + ' on ' + $appName }`" />
			<Meta name="keywords" :content="productTags"></Meta>
		</Head>

		<div class="container p-10 center" v-if="loading">
			<span class="icon-spinner animate-spin text-3xl"></span>
		</div>
		<template v-else>
			<client-only v-if="product">
				<div class="container  mx-auto max-w-[1000px]">
					<div class="lg:pt-6">
						<div class="grid md:grid-cols-2 lg:md:grid-cols-5 gap-4 md:gap-8">

							<div class="lg:col-span-3">
								<product-details-media-slider class="!rounded-md"></product-details-media-slider>
							</div>
							<div class="px-3 md:px-0 flex flex-col lg:col-span-2">


								<h2 class="text-lg md:text-xl font-medium">{{product?.name}}</h2>
								<p class="text-xs md:text-sm text-foreground/70">
									{{product?.description ? product?.description : `Buy ${product?.name} on ${$appName}`}}
								</p>
								<span class="mt-2 text-primary font-bold text-2xl md:text-3xl">
									{{ $CURRENCY(product?.minimum_variation?.price ? product?.minimum_variation?.price : product?.price) }}
								</span>




								<div class="hidden md:flex gap-2 mt-4">
									<product-actions-like @done="product.has_liked = !product.has_liked" v-if="authenticated">
										<template #trigger>
											<ui-button size="icon" variant="outline" class="h-12">
												<span class="text-2xl" :class="product.has_liked ? 'icon-heart-filled text-primary' : 'icon-heart'"></span>
											</ui-button>
										</template>
									</product-actions-like>



									<share-action :data="shareData">
										<template #trigger>
											<ui-button class="w-full h-12 items-center gap-x-2" variant="outline">
												<span class="icon-share"></span>
												<span>
													Share
												</span>
											</ui-button>
										</template>
									</share-action>

									<div class="expand">
										<product-actions-add-to-cart :showSelect="false">
											<template #trigger>
												<ui-button class="w-full h-12">
													Add to cart
												</ui-button>
											</template>
										</product-actions-add-to-cart>
									</div>
								</div>


								<product-details-overview class="mt-4" :product="product"></product-details-overview>

								<product-partials-reviews :product="product" class="mt-4 border rounded-md">
									<template #loadMore>
										<div class="p-4 border-t">
											<product-actions-browse-reviews :product="product"></product-actions-browse-reviews>
										</div>
									</template>
								</product-partials-reviews>




							</div>
						</div>
					</div>


					<div class="mt-8 px-2 md:px-0">
						<div class="grid gap-4 md:gap-8">
							<div class="flex gap-4 items-start">
								<div class="flex flex-col expand">
									<h2 class="text-lg md:text-2xl font-bold">
										Recommended
									</h2>
									<p class="text-xs md:text-sm text-foreground/70">
										You may also be interested in some of these products
									</p>
								</div>

								<nuxt-link :to="{name : 'products'}" class="my-auto">
									<ui-button size="sm" variant="link">						
										See More &rarr;
									</ui-button>
								</nuxt-link>
							</div>
							<product-loader :endpoint="`products/${product?.slug}/related?include=partner,media,minimum_variation,variations,variations.variation&limit=4`"></product-loader>
						</div>
					</div>



					<div class="absolute bottom-0 w-full bg-background backdrop-blur border-t md:hidden divide-y z-10 flex flex-col">
						<div class="flex gap-2 p-2">
							<product-actions-like @done="product.has_liked = !product.has_liked" v-if="authenticated"></product-actions-like>
							<share-action :data="shareData"></share-action>
							<product-actions-review v-if="!product?.has_reviewed"></product-actions-review>

							<div class="expand">
								<product-actions-add-to-cart :showSelect="false"></product-actions-add-to-cart>
							</div>
						</div>
						<navs-bottom></navs-bottom>
					</div>
				</div>
			</client-only>

			<div class="max-w-lg mx-auto lg:pt-6 grid gap-4" v-else>
				<div class="flex flex-col items-center p-4 pb-0">
					<h2 class="text-xl md:text-2xl text-center font-medium">Product not found</h2>
					<p class="text-center text-sm md:text-base text-foreground/70">
						Sorry we couldn't find the product you were looking for. <br> Please try again later
					</p>
				</div>
				<cart-empty-todos></cart-empty-todos>
			</div>
		</template>
	</div>
</template>
<script setup lang="ts">

const {authenticated} = useAuthStore()

const filterOptions = computed(() => {
	return {
		include : 'media,tags,category,variations,variations.variation,partner,partner.country',
		'review-summary' : true
	}
})

const {list : data , loading,  failed, errData, fetchData} = await useDataLoader(`/products/${useRoute().params?.product}`, filterOptions)

const product = computed(()=> data?.value)

provide('product', data)

const productTags = computed(()=> product?.value?.tags?.map((item) => item.name)?.toString())

const shareData = computed(()=> {
	return {
		url : window.location.href,
		title : data?.value?.name,
		text : `${ data?.value?.description ? data?.value?.description : 'Buy ' + data?.value?.name + ' on ' + useNuxtApp()?.$appName}`,
		image : data?.value?.media?.[0]?.web
	}
})

</script>
