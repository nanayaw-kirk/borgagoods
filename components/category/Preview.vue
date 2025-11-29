<template>
	<div>

		<div class="rounded md:rounded-md  dark:bg-muted bg-border/30 p-4 grid gap-y-3">
			<nuxt-link class="flex items-center gap-x-2 px-3 md:px-0" :to="{name: 'explore-category', params:{ category : category?.slug }}">
				<div class="expand flex flex-col">
					<span class="font-medium line-clamp-1">{{category?.name}}</span>
					<span class="text-xs text-foreground/70">{{$formatNum(category?.total_products)}} {{category?.total_products === 1 ? 'Product' : 'Products'}}</span>
				</div>

				<span class="icon-right text-xl"></span>
			</nuxt-link>


			<div class="grid grid-cols-2 items-end" v-if="loading">
				<ui-skeleton class="w-full h-[160px] rounded-none border-4 border-white shadow-xl"></ui-skeleton>
				<ui-skeleton class="w-full h-[160px] rounded-none border-r-4 border-y-4 border-white"></ui-skeleton>
			</div>

			<template  v-else>
				<div class="grid grid-cols-2 items-end mx-auto w-[95%] md:w-full" v-if="list?.length > 0">
					<div class="w-full flex flex-col items-end z-10">
						<template v-if="list?.[0]?.slug">
							<nuxt-link class="w-full" :to="{name: 'products-product', params : {product : list?.[0]?.slug}}">
								<ui-avatar class="rounded-none bg-transparent w-full h-[160px] border-4 border-white shadow-xl">
									<ui-avatar-image class="!object-cover object-top" :src="list?.[0]?.media?.[0]?.web ? list?.[0]?.media?.[0]?.web : '/illustrations/banner.svg'"></ui-avatar-image>
								</ui-avatar>

								<div class="pl-2 flex flex-col pt-2">
									<span class="text-[11px] text-foreground/70 font-medium line-clamp-1"> {{list?.[0]?.name}}</span>
									<span class="text-xs font-bold line-clamp-1"> {{ $CURRENCY(list?.[0]?.minimum_variation?.price ? list?.[0]?.minimum_variation?.price : list?.[0]?.price) }}</span>
								</div>
							</nuxt-link>
						</template>
					</div>
					<div class="w-fullflex flex-col items-end -ml-2">
						<template v-if="list?.[1]?.slug">
							<nuxt-link class="w-full" :to="{name: 'products-product', params : {product : list?.[1]?.slug}}">
								<ui-avatar class="rounded-none bg-transparent w-full  h-[160px] border-r-4 border-y-4 border-white">
									<ui-avatar-image class="!object-cover object-top" :src="list?.[1]?.media?.[0]?.web ? list?.[1]?.media?.[0]?.web : '/illustrations/banner.svg'"></ui-avatar-image>
								</ui-avatar>
								<div class="pl-4 flex flex-col pt-2">
									<span class="text-[11px] text-foreground/70 font-medium line-clamp-1"> {{list?.[1]?.name}}</span>
									<span class="text-xs font-bold line-clamp-1"> {{ $CURRENCY(list?.[1]?.minimum_variation?.price ? list?.[1]?.minimum_variation?.price : list?.[1]?.price) }}</span>
								</div>
							</nuxt-link>
						</template>
					</div>
				</div>

				<div class="grid grid-cols-2 items-end" v-else>
					<div class="w-full h-[120px] bg-black/10"></div>
					<div class="w-full h-[120px] md:h-[100px] bg-black/10"></div>
				</div>
			</template>
		</div>
	</div>
</template>
<script setup lang="ts">

const props = defineProps({
	category : {
		type : Object,
		required : true
	}
})


const filterOptions = computed(() => {
	return {
		include : 'category,media',
		paginate : 2,
		category : props?.category?.slug
	}
})

const {list , loading, pagination, failed, errData, fetchData} = await useDataLoader(`/products`, filterOptions)

</script>
