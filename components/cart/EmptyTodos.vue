<template>
	<div>
		<div class="flex flex-col divide-y md:border md:rounded-md">
			<nuxt-link :to="{name: 'products'}" class="p-2 hover:bg-muted/50 flex gap-2 items-start group uk-animation-slide-bottom-small" style="animation-delay: 50ms">
				<icons-fire class="text-4xl md:text-5xl text-primary dark:text-foreground/70"></icons-fire>
				<span class="expand flex flex-col">
					<span class="text-sm md:text-base font-medium">Discover Arrivals</span>
					<span class="text-xs md:text-sm text-foreground/70">
						Browse the latest products on {{$appName}}.
					</span>
				</span>
				<span class="icon-right text-xl my-auto group-hover:visible md:invisible transition-all ease-in-out"></span>
			</nuxt-link>



			<nuxt-link :to="{name: 'promos'}" class="p-2 hover:bg-muted/50 flex gap-2 items-start group uk-animation-slide-bottom-small" style="animation-delay: 200ms">
				<icons-sale class="text-4xl md:text-5xl text-primary dark:text-foreground/70"></icons-sale>
				<span class="expand flex flex-col">
					<span class="text-sm md:text-base font-medium">Promos & Discounts</span>
					<span class="text-xs md:text-sm text-foreground/70">
						Save big on your next purchase on {{$appName}}!
					</span>
				</span>
				<span class="icon-right text-xl my-auto group-hover:visible md:invisible transition-all ease-in-out"></span>
			</nuxt-link>

		</div>
	</div>	
</template>
<script setup lang="ts">

</script>
