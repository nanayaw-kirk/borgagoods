<template>
	<nuxt-link :to="{name : 'promos-promo', params :{ promo : entry?.promo_code}}"class="w-full flex flex-col rounded-lg md:rounded-2xl cursor-pointer dark:bg-muted shadow">

		<ui-avatar class="w-full h-[85px] md:h-[150px] rounded-t-lg md:rounded-t-2xl rounded-b-none bg-muted relative">
			<ui-avatar-image :src="entry?.image?.web ? entry?.image?.web : '/placeholder.svg'" class="w-full h-full object-cover object-center rounded-t-lg md:rounded-t-2xl rounded-b-none" alt="promo Image"> </ui-avatar-image>

			<div class="absolute top-2 right-2 p-1">
				<ui-badge class="bg-white text-primary font-medium rounded-lg xl p-1 px-2 md:px-3">
					<span class="text-[10px] uppercase font-medium">
						{{$percentize(entry?.discount)}} Off
					</span>
				</ui-badge>
			</div>
		</ui-avatar>

		<div class="flex flex-col divide-y divide-dashed dark:divide-white/10 divide-y-2">
			<div class="flex flex-col px-3 py-2">
				<span class="line-clamp-1 text-sm md:text-base font-medium">{{entry?.name}}</span>
				<span class="line-clamp-1 text-xs md:text-sm text-foreground/70">{{entry?.description ? entry?.description : `Enjoy ${entry?.discount} off selected products`}}</span>
			</div>
			<div class="px-3 py-2 flex gap-x-2 items-center">
				<span class="text-foreground/70 icon-hourglass"></span>
				<span class="line-clamp-1 text-xs text-foreground/70">
					Ends on {{$formatDate(entry?.ends_at)}}
				</span>
			</div>
		</div>
	</nuxt-link>
</template>
<script setup lang="ts">
const props = defineProps({
	entry : {
		type : Object,
		required : true
	}
})



provide('promo', props?.entry)
</script>
