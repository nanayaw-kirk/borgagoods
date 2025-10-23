<template>
	<div>
		<div class="flex flex-col gap-y-2" v-if="product?.has_variations">

			<div class="flex justify-between items-center cursor-pointer" @click="showVariations = !showVariations">
				<span class="font-medium text-sm text-foreground/70">
					{{showVariations ? 'Hide' : 'Show'}} Product Variations
				</span>

				<span :class="showVariations ? 'icon-up' : 'icon-down'"></span>
			</div>

			<div class="flex gap-2 flex-wrap" v-if="showVariations">
				<template v-for="variant in product?.variations" :key="variant?.uuid">
					<div class="p-2 rounded bg-muted dark:bg-muted/50 border flex flex-col">
						<span class="text-xs text-foreground/70">
							{{variant?.variation?.name}}
						</span>
						<span class="font-medium">
							{{$CURRENCY(variant?.price)}}
						</span>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
const product = inject("product")
const price = computed(() => product?.has_variations && (product?.minimum_variation && product?.minimum_variation.price) ? product?.minimum_variation.price : product?.price )


const showDescription = ref(true)
const showVariations = ref(true)

const order = ref({
	quantity : 1
})
</script>
