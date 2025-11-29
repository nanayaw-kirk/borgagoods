<template>
	<div>
		<div class="w-full relative rounded cursor-pointer md:p-[5px]  dark:bg-muted bg-border/30 group border-0 dark:border shadow-sm dark:shadow-none @container dark:hover:bg-muted transition-all">

			<nuxt-link :to="{name: 'products-product', params : {product : entry?.slug}}">
				<div class="w-full flex flex-col relative">

					<div class="w-full !aspect-square rounded-md rounded-b-none md:rounded-b-md dark:bg-muted bg-border/30">
						<product-media :media="entry?.media?.[0]?.web" class="w-full rounded-b-none md:rounded-b-[inherit]"></product-media>
					</div>

					<div class="flex flex-col w-full py-2 md:py-0 md:pt-1 px-1">
						<p class="truncate text-foreground/70 text-sm">{{entry?.name}}</p>
						<span class="text-sm md:text-base font-bold truncate">
							{{ $CURRENCY(entry?.minimum_variation?.price ? entry?.minimum_variation?.price : entry?.price) }}
						</span>
					</div>
				</div>
			</nuxt-link>

			<div class="w-full bottom-0 absolute flex items-center justify-end z-2  mb-[70px] md:mb-[75px] pr-2 pl-2">
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
