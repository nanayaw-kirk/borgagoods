<template>
	<nuxt-link :to="{name: 'partner', params : {partner : partner?.slug}}" class="w-full flex gap-2 items-start group">

		<partner-crest :url="partner?.logo_url" class="size-10 md:size-12"></partner-crest>

		<div class="expand flex flex-col">
			<span class="flex items-center gap-x-1">
				<span class="line-clamp-1 font-medium">
					{{partner?.name}}
				</span>
				<span class="icon-verified text-sm"></span>
			</span>

			<div class="flex gap-x-1 items-center -mt-1">
				<div>
					<country-flag  :country="partner?.country?.alpha_2_code" size="small"></country-flag>
				</div>
				<span class="line-clamp-1 text-xs text-foreground/70">
					{{partner?.country?.name}}
				</span>
			</div>
		</div>

		<span class="icon-right text-2xl my-auto md:hidden md:group-hover:inline transition-all ease-in-out text-foreground/70"></span>
	</nuxt-link>
</template>
<script setup lang="ts">
const props = defineProps({
	partner : {
		type : Object
	}
})
</script>
