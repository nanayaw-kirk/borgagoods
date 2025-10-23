<template>
	<div>
		<div class="w-full relative rounded cursor-pointer md:p-[5px]  dark:bg-muted/50 group border-0 dark:border shadow-sm dark:shadow-none @container dark:hover:bg-muted transition-all">

			<nuxt-link :to="{name: 'products-product', params : {product : entry?.slug}}">
				<div class="w-full flex flex-col relative">

					<div class="w-full !aspect-square rounded-md rounded-b-none md:rounded-b-md bg-muted">
						
						<product-media :media="'https://cdn.prod.website-files.com/630784cc70ef0552de1e91e2/6309233ecfd613f8b63332d6_iphone-case-product-image-small-shopper-webflow-ecommerce-template-p-500.jpg'" class="w-full rounded-b-none md:rounded-b-[inherit]"></product-media>

						<!-- <product-media :media="entry?.media?.[0]?.web" class="w-full rounded-b-none md:rounded-b-[inherit]"></product-media> -->
					</div>

					<div class="flex flex-col w-full py-2 px-1">
						<p class="truncate text-foreground/70 text-sm font-medium">{{entry?.name}}</p>
						<p class="truncate text-xs">{{entry?.description ? entry?.description : `Buy ${entry?.name} on ${$appName}`}}</p>
						<div class="flex justify-between items-center p-1 pb-0">
							<span class="text-sm md:text-base font-bold truncate">
								{{ $CURRENCY(entry?.minimum_variation?.price ? entry?.minimum_variation?.price : entry?.price) }}
							</span>
						</div>
					</div>
				</div>
			</nuxt-link>

			<div class="w-full bottom-0 absolute flex items-center justify-end z-2  mb-[90px] md:mb-[95px] pr-4 pl-2">
				<!-- <product-actions-preview>
					<template #trigger>
						<div class="md:hidden md:group-hover:block">
							<ui-button class="bg-white hover:bg-white shadow-lg hover:shadow-xl text-black w-full text-xs rounded-lg hidden md:inline-flex">
								Preview
							</ui-button>

							<ui-button size="icon" class="w-6 h-6 center icon-expand bg-white rounded-lg shadow-lg md:hidden font-bold text-black"></ui-button>
						</div>
					</template>
				</product-actions-preview> -->
				<product-actions-add-to-cart :showSelect="false">
					<template #trigger>
						<ui-button size="icon" class="w-7 h-7 md:w-8 md:h-8 rounded-lg center icon-plus text-lg"></ui-button>
					</template>
				</product-actions-add-to-cart>

			</div>

		</div>
	</div>
</template>
<script setup lang="ts">

const props = defineProps({
	entry : {
		type : Object,
		required : true
	}
})



provide('product', props?.entry)

</script>
