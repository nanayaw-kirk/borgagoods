<template>
	<div>
		<div class="w-full relative group w-full contain-slider" uk-slider="finite:true">
			<div class="w-full flex gap-1 md:gap-2 uk-slider-items">
				<nuxt-link class="flex flex-col gap-y-1" :to="{name : 'explore-category', params :{ category : category?.slug}}" v-for="category in list"  :key="category?.slug">
					<div class="w-[110px] md:w-[150px] aspect-square flex flex-col rounded-md cursor-pointer dark:bg-muted bg-border/30">
						<ui-avatar class="w-full h-full aspect-square rounded-md bg-transparent relative">
							<ui-avatar-image :src="category?.product_display_image?.web ?? 'https://s3.wasabisys.com/borga-goods-staging/28/conversions/8500c7aa-898e-4573-96ce-71943667f43e-web.jpg'" class="w-full h-full object-cover object-center rounded-md" alt="Category Image"> </ui-avatar-image>

						</ui-avatar>
					</div>
					<span class="text-sm line-clamp-1 pt-1">
						{{category?.name}}
					</span>
				</nuxt-link>
			</div>

			<!-- <a class="hidden group-hover:md:inline-flex absolute top-[33%] left-2 size-10 center rounded-full shadow-2xl bg-white" href="#"  uk-slider-item="previous">
				<span class="icon-left text-2xl text-black"></span>
			</a>
			<a class="hidden group-hover:md:inline-flex absolute top-[33%] right-2 size-10 center rounded-full shadow-2xl bg-white" href="#" uk-slider-item="next">
				<span class="icon-right text-2xl text-black"></span>
			</a> -->
		</div>


		
	</div>
</template>


<script setup lang="ts">
const props = defineProps({
	list : {
		type : Array
	}
})
</script>

