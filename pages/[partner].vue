<template>
	<div>

		<Head>
			<Title>{{partner?.name}} - Official Online Store | {{$appName}}</Title>
			<Meta name="description" :content="`The official online store of ${partner?.name}`" />
			<Meta name="keywords" :content="`Official Store, Online Store, Buy ${partner?.name} Jerseys, Buy ${partner?.name} Jerseys Online, ${partner?.name}, ${partner?.name} Merchandise`"></Meta>
		</Head>


		<div class="grid gap-4 md:gap-6">
			<div class="w-full h-[120px] md:h-[200px] bg-border relative">
				<img :src="partner?.banner_url ? partner?.banner_url : '/illustrations/banner_trans.svg'" class="w-full h-full object-cover object-center" alt="" v-if="!loading">
			</div>
			<div class="grid gap-4 md:gap-6 -mt-[50px] md:-mt-[80px] z-1 container relative">
				

				<div class="grid items-start gap-4 md:gap-6 md:grid-cols-3">
					<div class="md:col-span-2">

						<template v-if="loading">
							
							<div class="max-w-[600px] bg-background rounded-tr-[30px] md:rounded-tr-3xl md:rounded-xl  p-4 flex items-start md:shadow-xl shadow-md md:dark:border">
								<div class="expand flex gap-x-2">
									<ui-skeleton class="size-8 md:size-12"></ui-skeleton>

									<div class="flex flex-col expand">


										<div class="flex items-center gap-x-1">
											<ui-skeleton class="expand h-4"></ui-skeleton>
											<ui-skeleton class="size-4"></ui-skeleton>
										</div>
										<div class="flex gap-x-1 items-center mt-2">
											<ui-skeleton class="size-2"></ui-skeleton>
											<ui-skeleton class="w-2/3 h-2"></ui-skeleton>
										</div>
									</div>

									<div class="flex items-center gap-x-2">
										<ui-skeleton class="w-14 h-7"></ui-skeleton>
										<ui-skeleton class="w-14 h-7"></ui-skeleton>
									</div>
								</div>
							</div>
						</template>

						<div class="max-w-[600px] bg-background rounded-tr-[30px] md:rounded-tr-3xl md:rounded-xl  p-4 flex items-start md:shadow-xl shadow-md md:dark:border" v-else>
							<div class="expand flex items-start gap-x-2">
								<partner-crest :url="partner?.logo_url" class="size-8 md:size-12"></partner-crest>

								<div class="flex flex-col expand">


									<div class="flex items-center gap-x-1">
										<h2 class="text-xs md:text-lg font-medium md:font-bold line-clamp-1">{{partner?.name}}</h2>
										<span class="icon-verified text-sm text-primary"></span>
									</div>
									<div class="flex gap-x-1 items-center -mt-1">
										<div>
											<country-flag  :country="partner?.country?.alpha_2_code" size="small"></country-flag>
										</div>
										<span class="line-clamp-1 text-xs text-foreground/70">
											{{partner?.country?.name}}
										</span>
									</div>
								</div>

								<div class="flex items-start gap-x-2">
									<partner-actions-follow @done="refresh"></partner-actions-follow>

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
<!-- 
					<div class="bg-background rounded-tr-3xl md:rounded-xl hidden md:flex md:shadow-xl shadow-md md:dark:border flex-col items-center md:-mt-[50px]">

						<div class="p-4 flex flex-col items-center">
							<h2 class="text-center font-medium text-xl">Are you a true fan?</h2>
							<span class="text-sm text-foreground/70 text-center">Make your support for {{partner?.name}} count.</span>
						</div>

						<div class="w-full h-20 bg-primary rounded-b-xl relative">
							<img src="https://a.storyblok.com/f/274736/471x266/12c6b66503/home-kit-adi-homepagegrid-4.jpg/m/1536x0/filters:quality(85)" class="w-full h-full object-cover rounded-b-xl" alt="">
							<div class="top-0 absolute w-full h-full bg-primary/60 rounded-b-xl center">
								<ui-button variant="outline" size="sm">
									Learn How
								</ui-button>
							</div>
						</div>
					</div> -->
				</div>

				<div class="container px-2">

					<div class="w-full relative max-w-[96dvw] lg:max-w-[1300px]" uk-slider="finite:true" v-if="getting">

						<div class="w-full flex gap-1 md:gap-4 uk-slider-items">
							<ui-skeleton  v-for="ct in 10" class="h-5 w-14 bg-border rounded" :key="`ct-${ct}`"></ui-skeleton>
						</div>
					</div>
					<template v-else>
						<div class="w-full relative max-w-[96dvw] lg:max-w-[1300px]" uk-slider="finite:true" v-if="categories?.length > 0">

							<div class="w-full flex gap-1 md:gap-4 uk-slider-items">
								<ui-badge @click="filterOptions.category = ''" class="cursor-pointer ring-0 focus:ring-0 focus:ring-transparent focus:ring-offset-0" :variant="filterOptions?.category === '' ? 'default' : 'inactive'">
									All Products
								</ui-badge>
								<ui-badge @click="filterOptions.category = category?.slug"   v-for="category in categories" class="cursor-pointer ring-0 focus:ring-0 focus:ring-transparent focus:ring-offset-0" :key="category?.slug" :variant="filterOptions?.category === category?.slug ? 'default' : 'inactive'">
									{{category?.name}}
								</ui-badge>
							</div>
						</div>
					</template>
				</div>
				<div class="container px-2">
					<product-loader :key="filterOptions?.category" :endpoint="`products?partner=${$route?.params?.partner}`">
						<template #notFound>
							<div class="mx-auto max-w-[95dvw] md:max-w-[550px] flex flex-col items-center p-6 md:p-16 ">
								<partner-crest :url="partner?.logo_url" class="size-12 md:size-14"></partner-crest>
								<div class="flex flex-col items-center mt-3 mb-4">
									<h2 class="text-xl md:text-2xl text-center font-medium">Nothing here yet...</h2>
									<p class="text-center text-sm md:text-base text-foreground/70">
										No products available at the moment. 
										<template v-if="!partner?.has_followed">Follow {{partner?.name}} to stay updated on new merch drops!</template> 
										<template v-else>As a follower of {{partner?.name}}, you'll be notified about new merch drops. Stay tuned!</template>
									</p>

									<template v-if="!partner?.has_followed">
										<partner-actions-follow @done="refresh" class="mt-4">
											<template #trigger>
												<div class="flex">
													<ui-button size="lg">
														<span class="line-clamp-1">
															Follow
														</span>
													</ui-button>
												</div>
											</template>
										</partner-actions-follow>
									</template>
								</div>
							</div>
						</template>
					</product-loader>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">


const filterOptions = ref({
	category : '',
	include : 'country'
})

const  {list : partner , loading, fetchData : refresh} = useDataLoader(`/partners/${useRoute()?.params?.partner}`, filterOptions)
const  {list : categories, loading : getting } = useDataLoader(`/categories?partner_id=${useRoute()?.params?.partner}&paginate=0`)

const shareData = computed(()=> {
	return {
		url : window.location.href,
		title : partner?.value?.name,
		text : `Buy licensed merchandise from ${partner?.value?.name} on ${useNuxtApp()?.$appName}`,
		image : partner?.value?.logo_url
	}
})

provide('partner', partner)

</script>
