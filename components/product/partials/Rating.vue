<template>
	<div class="w-full flex items-end gap-2">
		<span class="font-bold text-5xl">
			{{product?.average_rating}}
		</span>

		<div class="expand flex flex-col gap-y-1">
			<div class="flex gap-x-1 items-center w-full">
				<span v-for="i in 5" :key="i" :class="i <= parseInt(product?.average_rating) ? 'icon-star-filled text-primary-400' : 'icon-star-outline'">
				</span>
			</div>
			<span class="text-xs text-foreground/70">
				{{product?.total_reviews}} {{product?.total_reviews === 1 ? 'Review' : 'Reviews' }}
			</span>
		</div>
	</div>	
</template>
<script setup lang="ts">
const product = inject("product")
</script>
