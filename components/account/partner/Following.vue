<template>
	<div>
		<div class="flex gap-4 items-center">
			<div class="expand flex items-center gap-x-2">
				<div class="size-12 md:size-14">
					<partner-crest :url="entry?.logo_url"></partner-crest>
				</div>

				<div class="expand flex flex-col">
					<span class="line-clamp-1 text-sm md:text-base font-medium">
						{{entry?.name}}
					</span>
					<div class="flex items-center gap-x-1">
						<country-flag :country="entry?.country?.alpha_2_code" size="small"></country-flag>
						<span class="text-xs text-foreground/70">
							{{entry?.country?.name}}
						</span>
					</div>
				</div>
			</div>

			<partner-actions-follow @done="$emit('hideEntry', entry?.uuid)"></partner-actions-follow>
		</div>
	</div>
</template>
<script setup lang="ts">
const emit = defineEmits(['hideEntry'])
const props = defineProps({
	entry : {
		type : Object,
		required : true
	}
})

provide('partner', ref(props?.entry))
</script>
