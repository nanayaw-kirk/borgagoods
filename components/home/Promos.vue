<template>
	<div>
		<div class="flex justify-between items-center py-4">
			<div class="flex flex-col expand mr-2">
				<h2 class="text-lg md:text-2xl font-bold line-clamp-1">
					Unmissable Deals. Limited-Time Offers.
				</h2>
				<p class="text-foreground/70 text-sm md:text-base">
					Score big on exclusive discounts and special bundles. Shop now before they are gone!
				</p>
			</div>

			<nuxt-link :to="{name: 'promos'}" class="items-center group cursor-pointer hidden md:flex">
				<span class="mr-1 text-sm text-primary expand">
					<span class="hidden md:inline text-primary">Browse</span> Promos
				</span>
				<span class="square-20 center bg-primary rounded-2xl text-white icon-right"></span>
			</nuxt-link>

		</div>
		

		<div class="w-full pb-2 relative group max-w-[96dvw] lg:max-w-[1300px]" uk-slider="finite:true">
			<div class="w-full flex gap-1 md:gap-4 uk-slider-items">
				<nuxt-link :to="{name : 'promos-promo', params :{ promo : promo?.promo_code}}" v-for="promo in list" class="w-3/4 md:w-[400px] flex flex-col rounded-2xl cursor-pointer dark:bg-muted shadow" :key="promo?.slug">

					<ui-avatar class="w-full h-[150px] md:h-[200px] rounded-t-2xl rounded-b-none bg-muted relative">
						<ui-avatar-image :src="promo?.image?.web ? promo?.image?.web : '/placeholder.svg'" class="w-full h-full object-cover object-center rounded-t-2xl rounded-b-none" alt="promo Image"> </ui-avatar-image>

						<div class="absolute top-2 left-2 p-1">
							<ui-badge class="bg-primary text-primary-foreground font-medium rounded-lg xl p-1 px-2 md:px-3">
								<span class="text-[10px] uppercase font-medium">
									{{$percentize(promo?.discount)}} Off
								</span>
							</ui-badge>
						</div>
					</ui-avatar>

					<div class="flex flex-col divide-y divide-dashed dark:divide-white/10 divide-y-2">
						<div class="flex flex-col px-3 py-2">
							<span class="line-clamp-1 text-base md:text-lg font-medium">{{promo?.name}}</span>
							<span class="line-clamp-1 text-xs md:text-sm text-foreground/70">{{promo?.description ? promo?.description : `Enjoy ${promo?.discount} off selected products`}}</span>
						</div>
						<div class="px-3 py-2 flex gap-x-2 items-center">
							<span class="text-foreground/70 icon-hourglass"></span>
							<span class="line-clamp-1 text-xs text-foreground/70">
								Ends on {{$formatDate(promo?.ends_at)}}
							</span>
						</div>
					</div>
				</nuxt-link>
			</div>


			<a class="hidden group-hover:md:inline-flex absolute top-[33%] left-2 size-10 center rounded bg-black/50" href="#"  uk-slider-item="previous">
				<span class="icon-left text-2xl text-primary-foreground"></span>
			</a>
			<a class="hidden group-hover:md:inline-flex absolute top-[33%] right-2 size-10 center rounded bg-black/50" href="#" uk-slider-item="next">
				<span class="icon-right text-2xl text-primary-foreground"></span>
			</a>
		</div>


		<nuxt-link :to="{name: 'promos'}" class="md:hidden w-full">
			<ui-button class="w-full" size="lg" variant="outline">
				Browse Promos
			</ui-button>
		</nuxt-link>


		
	</div>
</template>


<script setup lang="ts">
const props = defineProps({
	list : {
		type : Array
	}
})
</script>

