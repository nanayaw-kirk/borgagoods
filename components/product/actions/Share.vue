<template>
	<div>
		<div>
			<slot name="trigger">
				<ui-button class="w-full hidden md:flex items-center gap-x-2" variant="outline">
					<span class="icon-share"></span>
					<span>
						Share
					</span>
				</ui-button>

				<ui-button class="md:hidden" size="icon" variant="outline">
					<span class="icon-share text-xl"></span>
				</ui-button>
			</slot>
		</div>
	</div>
</template>
<script setup lang="ts">
const product = inject("product")
</script>
