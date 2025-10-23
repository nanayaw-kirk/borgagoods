<template>
	<div>
<!-- 		<div class="flex justify-between items-center py-4">
			<div class="flex flex-col expand mr-2">
				<h2 class="text-lg md:text-2xl font-bold">
					Discover Variety
				</h2>
				<p class="text-foreground/70 text-sm md:text-base">
					Find products across a range of categories on {{$appName}}
				</p>
			</div>

			<nuxt-link :to="{name: 'explore'}" class="items-center group cursor-pointer hidden md:flex">
				<span class="mr-1 text-sm text-primary expand">
					<span class="hidden md:inline text-primary">Browse</span> Categories &rarr;
				</span>
			</nuxt-link>

		</div> -->
		

		<div class="w-full pb-2 relative group max-w-[96dvw] lg:max-w-[1300px]" uk-slider="finite:true">
			<div class="w-full flex gap-1 md:gap-4 uk-slider-items">
				<nuxt-link class="flex flex-col gap-y-1" :to="{name : 'explore-category', params :{ category : category?.slug}}" v-for="category in list"  :key="category?.slug">
					<div class="w-[250px] aspect-video flex flex-col rounded-md cursor-pointer dark:bg-muted">
						<ui-avatar class="w-full h-full aspect-video rounded-md bg-muted relative">
							<ui-avatar-image :src="category?.product_display_image && category?.product_display_image.web ? category?.product_display_image.web : '/placeholder.svg'" class="w-full h-full object-cover object-center rounded-md" alt="Category Image"> </ui-avatar-image>

						</ui-avatar>
					</div>

					<span class="text-xs md:text-sm font-medium line-clamp-1 px-2">
						{{category?.name}}
					</span>
				</nuxt-link>
			</div>

			<a class="hidden group-hover:md:inline-flex absolute top-[33%] left-2 size-10 center rounded bg-black/50" href="#"  uk-slider-item="previous">
				<span class="icon-left text-2xl text-primary-foreground"></span>
			</a>
			<a class="hidden group-hover:md:inline-flex absolute top-[33%] right-2 size-10 center rounded bg-black/50" href="#" uk-slider-item="next">
				<span class="icon-right text-2xl text-primary-foreground"></span>
			</a>
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

