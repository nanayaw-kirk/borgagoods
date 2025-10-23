<template>
	<div>
		<div class="flex items-center gap-x-2">
			<div class="w-1/3 pl-[2px]" v-if="showSelect">
				<ui-select v-model="order.quantity" v-if="order.quantity < 10">
					<ui-select-trigger>
						<ui-select-value placeholder="Quantity"></ui-select-value>
					</ui-select-trigger>
					<ui-select-content>
						<template v-for="n in 10" :key="`select-${n}`">
							<ui-select-item :value="n">
								{{n === 10 ? "10+" : n}}
							</ui-select-item>
						</template>
					</ui-select-content>
				</ui-select>
				<ui-input v-else autofocus type="number" v-model.number="order.quantity"></ui-input>
			</div>

			<div class="expand" @click="product?.has_variations ? (open = true) : addToCart(order)">
				<slot name="trigger">
					<ui-button class="w-full" :disabled="order.quantity > product?.quantity">
						Add to cart
					</ui-button>
				</slot>
			</div>
		</div>



		<ui-sheet v-model:open="open"  v-if="smAndDown">
			<div class="w-full relative">
				<ui-sheet-content side="bottom" class="rounded-t-xl border p-0 gap-0" :hideClose="true">
					<div class="flex items-start md:gap-x-2 p-2 border-b shadow-md">
						<partner-crest :url="product?.partner?.logo_url" class="size-10 rounded"></partner-crest>
						<ui-sheet-header class="gap-y-0 expand flex flex-col items-start">
							<ui-sheet-title class="!text-left font-medium mb-0 line-clamp-1 text-sm">{{product?.name}}</ui-sheet-title>
							<ui-sheet-description class="!text-left !-mt-1 text-xs text-foreground/70 line-clamp-1">Select Product Variation</ui-sheet-description>
						</ui-sheet-header>

						<ui-sheet-close class="!size-7">
							<ui-button size="icon" class="size-7">
								<span class="icon-close"></span>
							</ui-button>
						</ui-sheet-close>
					</div> 


					<ui-scroll-area class="h-fit max-h-[400px] overflow-auto">
						<div class="p-2 text-sm text-foreground/70">
							Choose your preferred option and add it to your cart. We’ve got something for everyone!
						</div>
						<div class="grid divide-y">
							<template v-for="variant in product?.variations" :key="variant.uuid">
								<div class="flex gap-4 p-2 cursor-pointer">
									<ui-checkbox class="w-5 h-5  hover:ring-1 ring-offset-2 ring-offset-background ring-primary" :id="`variant-${variant?.uuid}`" :checked="variationOrder?.variations.includes(variant?.uuid)" @update:checked="handleChange(variant?.uuid)"></ui-checkbox>
									<ui-label class="expand flex items-center cursor-pointer" :for="`variant-${variant?.uuid}`">
										<span class="text-xs text-foreground/70 line-clamp-1 w-2/3">{{variant?.variation?.name}}</span>
										<span class="text-sm font-medium line-clamp-1 expand text-right">{{$CURRENCY(variant?.price)}}</span>
									</ui-label>
								</div>
							</template>
						</div>
					</ui-scroll-area>
					<div class="border-t p-2">
						<ui-button class="w-full h-12" :disabled="!variationOrder?.variations?.length" @click="addProductWithVariationToCart(variationOrder); open = false">
							{{variationOrder?.variations?.length > 0 ? (variationOrder?.variations?.length === 1 ? 'Add 1 Variation' : `Add ${variationOrder?.variations.length} Variations`) : 'Add'}} to Cart
						</ui-button>
					</div>

				</ui-sheet-content>
			</div>
		</ui-sheet>

		<ui-dialog v-model:open="open" v-else>
			<div class="w-full relative">
				<ui-dialog-content class="rounded-t-xl border  p-0 gap-0 max-w-[400px] min-w-[400px]"  :hideClose="true">

					<div class="flex items-start gap-x-2 p-2 border-b shadow-md w-full relative">
						<partner-crest :url="product?.partner?.logo_url" class="w-6 h-6 md:w-8 md:h-8 rounded"></partner-crest>
						<ui-dialog-header class="gap-y-0 expand flex flex-col items-start">
							<ui-dialog-title class="font-medium mb-0 line-clamp-1">{{product?.name}}</ui-dialog-title>
							<ui-dialog-description class="!mt-1 text-xs text-foreground/70 line-clamp-1">Select Product Variation</ui-dialog-description>
						</ui-dialog-header>

						<ui-dialog-close class="!size-7">
							<ui-button size="icon" class="size-7">
								<span class="icon-close"></span>
							</ui-button>
						</ui-dialog-close>
					</div> 

					<ui-scroll-area class="h-[400px]">

						<div class="p-2 text-sm text-foreground/70">
							Choose your preferred option and add it to your cart. We’ve got something for everyone!
						</div>
						<div class="grid divide-y">
							<template v-for="variant in product?.variations" :key="variant.uuid">
								<div class="flex gap-4 p-2 cursor-pointer">
									<ui-checkbox class="w-5 h-5  hover:ring-1 ring-offset-2 ring-offset-background ring-primary" :id="`variant-${variant?.uuid}`" :checked="variationOrder?.variations.includes(variant?.uuid)" @update:checked="handleChange(variant?.uuid)"></ui-checkbox>
									<ui-label class="expand flex items-center cursor-pointer" :for="`variant-${variant?.uuid}`">
										<span class="text-xs text-foreground/70 line-clamp-1 w-2/3">{{variant?.variation?.name}}</span>
										<span class="text-sm font-medium line-clamp-1 expand text-right">{{$CURRENCY(variant?.price)}}</span>
									</ui-label>
								</div>
							</template>
						</div>
					</ui-scroll-area>


					<div class="border-t p-2">
						<ui-button class="w-full h-12" :disabled="!variationOrder?.variations?.length" @click="addProductWithVariationToCart(variationOrder); open = false">
							{{variationOrder?.variations?.length > 0 ? (variationOrder?.variations?.length === 1 ? 'Add 1 Variation' : `Add ${variationOrder?.variations.length} Variations`) : 'Add'}} to Cart
						</ui-button>
					</div>

				</ui-dialog-content>
			</div>
		</ui-dialog>
	</div>
</template>
<script setup lang="ts">

const { addToCart , addProductWithVariationToCart } = useCartStore()
const {smAndDown} = useScreenSize()

const open = ref(false)

const props = defineProps({
	showSelect : {
		type : Boolean,
		default : true
	}
})

const product = inject("product")

const order = ref({
	quantity : 1, product
})

const variationOrder = ref({
	variations : [], product
})


function handleChange(variant){
	if (variationOrder.value?.variations?.includes(variant)) {
		variationOrder.value.variations = variationOrder.value?.variations?.filter(item => item !== variant)
		return
	}

	variationOrder.value?.variations?.push(variant)
}
</script>
