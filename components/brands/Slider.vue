<template>
	<div>
		<div class="w-full relative group w-full contain-slider" uk-slider="finite:true">
			<div class="w-full flex gap-2 uk-slider-items">
				<nuxt-link class="flex flex-col gap-y-1" :to="{name : 'products', query :{ brand : brand?.slug}}" v-for="brand in brands"  :key="brand?.slug">
					<div class="w-[75px] md:w-[120px] aspect-square flex flex-col rounded-md cursor-pointer">
						<ui-avatar class="w-full h-full aspect-square rounded-md bg-transparent relative">
							<ui-avatar-image :src="brand?.product_display_image?.web ?? 'https://s3.wasabisys.com/borga-goods-staging/28/conversions/8500c7aa-898e-4573-96ce-71943667f43e-web.jpg'" class="w-full h-full object-cover object-center rounded-md bg-transparent" alt="brand Image"> </ui-avatar-image>

						</ui-avatar>
					</div>
				</nuxt-link>
			</div>
		</div>


		
	</div>
</template>


<script setup lang="ts">
const {brands : list} = storeToRefs(brandsStore())
const brands = computed(()=> list?.value?.filter(i => i?.product_display_image?.web))
</script>

