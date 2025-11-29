<template>
	<footer>
		<div class="container grid gap-4 items-start">
			<div class="grid gap-y-4">
				<div class="flex items-center gap-2">
					<nuxt-link :to="{name: 'terms'}">Terms of Service </nuxt-link>
				</div>

				<p class="text-xs text-foreground/70">
					© {{$appName}}., 2025. All Rights Reserved. No portion of this site may be reproduced or duplicated without the express permission of {{$company}}.
				</p>

			</div>
		</div>
	</footer>
</template>
<script setup lang="ts">

const {cartQuantity } = storeToRefs(useCartStore())  


</script>
