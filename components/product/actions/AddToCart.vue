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

			<div class="expand" @click="addToCart(order)">
				<slot name="trigger">
					<ui-button class="w-full" :disabled="order.quantity > product?.quantity">
						Add to cart
					</ui-button>
				</slot>
			</div>
		</div>

	</div>
</template>
<script setup lang="ts">

const { addToCart } = useCartStore()
const {smAndDown} = useScreenSize()

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

</script>
