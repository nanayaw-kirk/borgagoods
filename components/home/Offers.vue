<template>
	<div>

		<div class="grid gap-2 w-full">
			
			<div class="grid gap-1 md:gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
				<template v-for="product in list" :key="product?.uuid">
					<nuxt-link :to="{name: 'products-product', params:{product : product?.slug}}" class="flex flex-col rounded-md  dark:bg-muted bg-border/30 group">
						<div class="w-full aspect-square overflow-hidden rounded-t-md !rounded-b-none center dark:bg-muted bg-border/30">
							<product-media class="rounded-b-none md:rounded-b-[inherit]" :media="product?.media?.[0]?.web"></product-media>
						</div>

						<div class="w-full md:expand flex flex-col p-2">
							<span class="line-clamp-1  text-xs md:text-sm dark:text-foreground/70 text-foreground/90">
								{{product?.name}}
							</span>

							<span class="line-clamp-1 font-bold text-xs sm:mt-1">
								{{ $CURRENCY(product?.minimum_variation?.price ? product?.minimum_variation?.price : product?.price) }}
							</span>
						</div>
					</nuxt-link>
				</template>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">

const {authenticated} = storeToRefs(useAuthStore())
const { mdAndUp } = useScreenSize()

const props = defineProps({
	data : {
		type : Array
	}
})


const list = computed(() => mdAndUp?.value ? props?.data : props?.data?.slice(0, 6))

</script>
