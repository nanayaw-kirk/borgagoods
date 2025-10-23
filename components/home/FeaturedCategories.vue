<template>
	<div>

		<div class="grid md:grid-cols-3 gap-4">
			
			<template  v-for="cat in data" :key="cat?.text">
				<nuxt-link :to="cat?.path" class="rounded-2xl md:rounded-[50px] flex flex-col dark:bg-muted bg-border/30">
					<div class="p-8 md:px-12 flex flex-col">
						<h2 class="text-2xl md:text-4xl">{{cat?.text}}</h2>
						<p class="text-lg">
							{{cat?.foreword}}
						</p>

						<span class="font-medium text-lg mt-2 underline line-clamp-1">
							{{cat?.cta}}
						</span>
					</div>

					<div class="w-full -mt-12 md:-mt-8 aspect-[3/2] overflow-hidden">
						<img class="w-full h-full object-cover object-right object-top" :src="cat?.image" alt="">
					</div>
				</nuxt-link>
			</template>
		</div>
	</div>	
</template>
<script setup lang="ts">

const data = ref([
	

	{
		text : 'Phones',
		foreword: 'Bold looks. Fierce spirit. Game on.',
		cta : 'Shop Now',
		path : '/products?target=men',
		image : 'https://cdn.prod.website-files.com/630784cc70ef0552ae1e91dc/6307c97f46c9ebfef68713c1_gear-category-image-shopper-webflow-ecommerce-template-p-800.png'
	},

	{
		text : 'Computers',
		foreword: 'Trendsetters never, rep loud.',
		cta : 'Shop Now',
		path : '/products?demographic=teens',
		image : 'https://cdn.prod.website-files.com/630784cc70ef0552ae1e91dc/6307c97e7a550c7ef7698768_computers-category-image-shopper-webflow-ecommerce-template-p-800.png'
	},

	{
		text : 'Kitchen',
		foreword: 'Little fans, journey right.',
		cta : 'Shop Now',
		path : '/products?demographic=kids,toddlers',
		image : 'https://cdn.prod.website-files.com/630784cc70ef0552ae1e91dc/6307c97edc3ca518cbb73c3c_audio-category-image-shopper-webflow-ecommerce-template.png'
	},

])

</script>
