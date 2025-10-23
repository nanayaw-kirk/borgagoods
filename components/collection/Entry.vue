<template>
	<nuxt-link :to="{name: 'collections-collection', params:{collection : entry?.slug}}" class="flex flex-col gap-2 items-center group">
		<div class="grid gap-1 w-full">
			
			<div class="w-full h-40 md:h-full bg-muted/30 dark:bg-muted/50 rounded-t-lg relative">
				<ui-avatar class="w-full h-full bg-transparent rounded-[inherit] md:group-hover:shadow-2xl transition-all ease-in-out">
					<ui-avatar-image class="!object-cover object-top" :src="entry?.image?.web ? entry?.image?.web : '/collection_placeholder.png'"></ui-avatar-image>
				</ui-avatar>

				<div class="absolute right-2 -bottom-3 hidden md:block">
					<ui-button class="text-[11px] h-7 !bg-primary-foreground hover:bg-primary-foreground text-primary " size="sm">
						Shop Now &rarr;
					</ui-button>
				</div>
			</div>

			<div class="grid grid-cols-3 gap-1">
				<div class="w-full rounded-bl-lg h-[100px] md:h-16 bg-muted/30 dark:bg-muted/50">
					<ui-avatar class="w-full h-full bg-transparent rounded-[inherit]" v-if="showcase?.[0]">
						<ui-avatar-image class="!object-cover object-top" :src="showcase?.[0].media?.[0]?.web"></ui-avatar-image>
					</ui-avatar>
				</div>
				<div class="w-full h-[100px] md:h-16 bg-muted/30 dark:bg-muted/50 rounded-none">
					<ui-avatar class="w-full h-full bg-transparent rounded-[inherit]" v-if="showcase?.[1]">
						<ui-avatar-image class="!object-cover object-top" :src="showcase?.[1].media?.[0]?.web"></ui-avatar-image>
					</ui-avatar>
				</div>
				<div class="w-full rounded-br-lg h-[100px] md:h-16 bg-muted/30 dark:bg-muted/50">
					<ui-avatar class="w-full h-full bg-transparent rounded-[inherit]" v-if="showcase?.[2]">
						<ui-avatar-image class="!object-cover object-top" :src="showcase?.[2].media?.[0]?.web"></ui-avatar-image>
					</ui-avatar>
				</div>

			</div>
		</div>

		<div class="flex items-center gap-4 p-1">

			<div class="w-full flex flex-col expand">
				<h5 class="line-clamp-1 text-sm sm:text-base font-medium">
					{{entry?.name}}
				</h5>
				<span class="text-xs md:text-sm text-foreground/70 line-clamp-2 sm:line-clamp-1">
					{{entry?.description ? entry?.description : `Explore ${entry?.name} on ${$appName}`}}
				</span>
			</div>


			<ui-button class="text-[11px] h-7 !bg-primary-foreground hover:bg-primary-foreground text-primary md:hidden" size="sm">
				Shop Now &rarr;
			</ui-button>
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


const showcase = computed(() => props?.entry?.products?.slice(0,3))

provide('collection', props?.entry)
</script>
