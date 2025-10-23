<template>
	<div>
		<div class="flex flex-col divide-y">
			<div class="flex flex-col justify-end py-2 px-3">
				<span class="md:text-xl uppercase text-right font-bold">
					Total : {{$CURRENCY(cartTotal)}}
				</span>
				<span class="text-xs text-right text-foreground/70">
					Deliveries fees & discounts calculated at checkout
				</span>
			</div>

			<template v-if="mdAndUp">
				<div class="hidden md:flex items-start gap-x-4 py-2 px-3">
					<icons-sale class="text-4xl md:text-5xl text-primary"></icons-sale>
					<div class="expand flex flex-col">
						<ui-input v-model="promo_code" id="discount_code" placeholder="Enter promo code" class="w-full bg-background"></ui-input>
						<ui-label for="discount_code" class="text-xs text-foreground/70 mt-1 line-clamp-1"> Apply a promo code for a discount at checkout</ui-label>
					</div>
				</div>

				<div class="py-2 px-3 flex flex-col">
					<span class="text-xs text-foreground/70 mb-2 font-medium">
						Delivery Location
					</span>
					<cart-user-address-picker v-model:location_id="location_id" :key="$route?.fullPath"></cart-user-address-picker>
				</div>

				<div class="py-2 px-3">
					<ui-button class="h-12 w-full uppercase text-xs font-bold" @click="preview" :disabled="!location_id">
						Proceed to Checkout
					</ui-button>
				</div>
			</template>

			<template v-else>
				<div class="py-2 px-3">
					<ui-button class="h-12 w-full uppercase text-xs font-bold" @click="initializeCheckout = true">
						Proceed to Checkout
					</ui-button>
				</div>
			</template>
			
		</div>


		<partials-dialog :ctaTitle="headings?.title" :ctaDesc="headings?.description" v-model:md_size="size" v-model:open="initializeCheckout" :key="`dialog-${initializeCheckout}`" persist>
			<template #content>
				<div>
					<template v-if="stage === 'SHIPPING_ADDRESS'">
						<div class="grid divide-y">
							<div class="flex items-start gap-x-4 py-2 px-3">
								<icons-sale class="text-4xl md:text-5xl text-primary"></icons-sale>
								<div class="expand flex flex-col">
									<ui-input v-model="promo_code" id="discount_code" placeholder="Enter promo code" class="w-full bg-background"></ui-input>
									<ui-label for="discount_code" class="text-xs text-foreground/70 mt-1 line-clamp-1"> Apply a promo code for a discount at checkout</ui-label>
								</div>
							</div>

							<div class="py-2 px-3 flex flex-col">
								<span class="text-xs text-foreground/70 mb-2 font-medium">
									Delivery Location
								</span>
								<cart-user-address-picker v-model:location_id="location_id" :key="$route?.fullPath"></cart-user-address-picker>
							</div>

							<div class="py-2 px-3 flex gap-3">
								<div class="w-fit">
									<ui-button class="h-12 uppercase text-xs font-medium" variant="ghost" @click.prevent="stage  = 'SHIPPING_ADDRESS'; initializeCheckout = false">
										Cancel
									</ui-button>
								</div>

								<ui-button class="h-12 expand uppercase text-xs font-bold" :disabled="!location_id" @click.prevent="preview">
									Continue
								</ui-button>
							</div>
						</div>
					</template>

					<template v-else-if="stage === 'PAYMENT'">
						<div class="grid" v-if="stage === 'PAYMENT'">
							<ui-scroll-area class="h-[70dvh] md:h-auto">
								<div class="flex gap-2 items-center p-3 bg-muted dark:bg-neutral-100/5" v-if="validatedCart?.promo">
									<icons-discount class="text-primary text-5xl"></icons-discount>
									<div class="expand flex flex-col">
										<span class="text-xs text-foreground/70"> Promo applied</span>
										<span class="line-clamp-1">{{validatedCart?.promo?.name}}</span>
									</div>
									<ui-badge>
										{{$formatNum(validatedCart?.promo?.discount)}}% Off
									</ui-badge>
								</div>

								<div class="grid divide-y">

									<template v-for="item in validatedCart?.order_items" :key="`order-i-${item?.uuid}`">
										<div class="flex items-center p-2 gap-x-2">
											<div class="size-10 md:size-12 rounded">
												<product-media class="rounded" :media="item?.product?.media?.[0]?.web"></product-media>
											</div>
											<div class="expand flex flex-col">
												<span class="line-clamp-1 text-xs text-foreground/70 md:text-sm">
													{{item?.product?.name}}
												</span>
												<div class="flex items-center gap-x-2">
													<span class="text-sm line-through text-primary font-medium" v-if="item?.promo_applied">{{$CURRENCY(item?.actual_price)}}</span>
													<span class="text-sm font-medium">{{$CURRENCY(item?.discounted_price)}}</span>

													<span>&bull;</span>

													<span class="text-xs text-foreground/70">{{item?.quantity}} {{item?.quantity === 1 ? 'Unit' : 'Units'}}</span>
												</div>
											</div>
										</div>
									</template>
								</div>
								<div class="border-t border-dashed grid divide-y divide-dashed">

									<div class="flex items-center p-2 md:pr-4">
										<div class="expand flex items-center gap-x-2">
											<icons-cart-check class="text-2xl"></icons-cart-check>
											<div class="expand text-sm line-clamp-1 text-foreground/70">Items</div>
										</div>

										<span class="text-right text-sm">
											{{$CURRENCY(validatedCart?.gross_amount)}}
										</span>
									</div>

									<div class="flex items-center p-2 md:pr-4">
										<div class="expand flex items-center gap-x-2">
											<icons-discount class="text-2xl"></icons-discount>
											<div class="expand text-sm line-clamp-1 text-foreground/70">Discount</div>
										</div>

										<span class="text-right text-sm">
											{{$CURRENCY(validatedCart?.total_discount)}}
										</span>
									</div>

									<div class="flex items-center p-2 md:pr-4">
										<div class="expand flex items-center gap-x-2">
											<icons-bike class="text-2xl"></icons-bike>
											<div class="expand text-sm line-clamp-1 text-foreground/70">Delivery Fee</div>
										</div>

										<span class="text-right text-sm">
											{{$CURRENCY(validatedCart?.delivery_fee)}}
										</span>
									</div>


									<div class="flex items-center p-2 md:pr-4">
										<div class="expand flex items-center gap-x-2">
											<icons-pay class="text-3xl"></icons-pay>
											<div class="expand text-sm line-clamp-1 text-foreground/70">Grand Total</div>
										</div>

										<span class="text-right font-medium">
											{{$CURRENCY(validatedCart?.total_amount)}}
										</span>
									</div>
								</div>
							</ui-scroll-area>

							<div class="flex gap-x-2 p-3 border-t">
								<div class="w-fit">
									<ui-button class="h-12 uppercase text-xs font-medium" variant="ghost" @click.prevent="stage  = 'SHIPPING_ADDRESS'">
										Back
									</ui-button>
								</div>
								<div class="expand">
									<ui-button class="w-full h-12 gap-x-2" @click.prevent="submiteOrder">
										<span class="uppercase text-xs font-medium">
											Pay to Confirm Order
										</span>
									</ui-button>
								</div>
							</div>
						</div>
					</template>
				</div>
			</template>

			<template #loader>
				<partials-loading-overlay v-if="loading">
					<template #message>
						<p class="text-center text-sm text-foreground/70 w-40" v-if="stage === 'SHIPPING_ADDRESS'">
							Applying discount & calculating delivery fees...
						</p>

						<p class="text-center text-sm text-foreground/70 w-40" v-else-if="stage === 'PAYMENT'">
							Submiting your order...
						</p>
					</template>
				</partials-loading-overlay>
			</template>
		</partials-dialog>

		<ui-dialog v-model:open="showNotice">
			<div class="w-full relative">
				<ui-dialog-content class="rounded-xl border  p-0 gap-0 md:min-w-[300px] max-w-[350px]"  @interactOutside.prevent="" @escapeKeyDown.prevent="" :hideClose="true">

					<ui-dialog-header class="gap-y-0 p-3 hidden">
						<slot name="icon"></slot>
						<ui-dialog-title class="font-medium mb-0 text-center">{{paymentHeadings?.title}}</ui-dialog-title>
						<ui-dialog-description class="!mt-1 text-center text-foreground/70 md:px-4 line-clamp-2 md:line-clamp-1">{{paymentHeadings?.description}}</ui-dialog-description>
					</ui-dialog-header>

					<div class="flex flex-col items-center p-4">

						<template v-if="paymentStatus === 'SUCCESS'">
							<icons-confetti class="text-6xl md:text-8xl mb-1 text-primary"></icons-confetti>

							<h3 class="text-center text-xl font-medium">Your order has been submitted!</h3>
							<p class="text-center text-foreground/70 mb-4">
								Thank you for your purchase! We'll keep you updated on your order status.
							</p>

							<div class="flex flex-col gap-y-2 w-full md:w-10/12 mx-auto">

								<nuxt-link :to="{name: 'me-orders'}" class="w-full">
									<ui-button class="w-full" @click="finlaize">
										My Orders
									</ui-button>
								</nuxt-link>
								<ui-button class="w-full" variant="ghost" @click.prevent="finlaize">
									Close
								</ui-button>
							</div>
						</template>

						<template v-else>
							<icons-sad class="text-6xl md:text-8xl mb-1 text-foreground/70"></icons-sad>

							<h3 class="text-center text-xl font-medium">Payment Failed</h3>
							<p class="text-center text-foreground/70 mb-4">
								We couldn’t confirm your payment. Please try again to complete your order.
							</p>

							<div class="flex flex-col items-center gap-y-1 w-full">

								<ui-button class="w-full" @click.prevent="retryPayment(order?.uuid)">
									Try Again
								</ui-button>
								<ui-button  variant="link" class="w-fit text-foreground/70" @click.prevent="paymentStatus = null">
									Cancel Order
								</ui-button>
							</div>
						</template>
					</div>
					<partials-loading-overlay v-if="retrying">
						<template #message>
							<p class="text-center text-sm text-foreground/70">
								Retrying payment...
							</p>
						</template>
					</partials-loading-overlay>
				</ui-dialog-content>
			</div>
		</ui-dialog>
	</div>
</template>
<script setup lang="ts">
import {useStorage} from "@vueuse/core"

const {mdAndUp} = useScreenSize()

const { cartTotal, netWeight, promo_code } = storeToRefs(useCartStore()) 
const {savedAddresses} = storeToRefs(useAuthStore())
const {retrying , processPayment  , retryPayment, paymentStatus , showNotice} = usePaystack()
const {cart, resetCart} = useCartStore()

const location_id = ref(null)
const size = ref('x-small')
const loading = useStorage('BRGA_GO_LOADER', false)
const showCheckoutOptions = ref(false)
const initializeCheckout = ref(false)

const stage = ref('SHIPPING_ADDRESS')
const validatedCart = ref(null)
const order = ref(null)



const selectedLocation = computed(() => savedAddresses?.value?.find(item => item?.uuid === location_id?.value))

const headings = computed(() => {
	if (stage.value === 'SHIPPING_ADDRESS') return {title : "Your Delivery Details", description : "Provide your delivery details to continue"};
	if (stage.value === 'PAYMENT') return {title : "Confirm Your Order", description : "Payment is required to confirm tour order"};
	return {title : "Options", description : "General Options"}
})



const paymentHeadings = computed(() => {
	if (paymentStatus.value === 'SUCCESS') return {title : "Order Submitted", description : "Your order has been submitted for processing"};
	if (paymentStatus.value === 'FAILED') return {title : "Payment Failure", description : "Failed to submit your order due to payment failure"};
	return {title : "Orde Payment Status", description : "General Payment Status"}
})



async function preview(){
	initializeCheckout.value = true
	loading.value = true
	const {data, error}  = await useCrud().post('/orders/preview', {
		order_items : cart, 
		location_id : selectedLocation?.value?.location?.uuid, 
		promo : promo_code?.value
	})

	if (data?.value?.data) {
		validatedCart.value = data?.value?.data
		stage.value = 'PAYMENT'
	}

	if (error?.value) {
		stage.value = 'SHIPPING_ADDRESS'
		validatedCart.value = null
	}

	loading.value  = false
}


async function submiteOrder(){
	loading.value = true
	const {data, error}  = await useCrud().post('/orders', {
		order_items : cart, 
		shipping_address : location_id?.value, 
		promo : promo_code?.value, 
		share_with_partners :  true
	})

	if (data?.value?.data?.payment) {
		order.value = data?.value?.data?.order
		showCheckoutOptions.value = false
		initializeCheckout.value = false

		processPayment({
			...data?.value?.data.payment, 
			key : data?.value?.data.payment?.client_secret
		})
	}

	if (error?.value) {
		stage.value = 'PAYMENT'
	}

	loading.value  = false
}


async function handlePaymentStatus(status){
	showCheckoutOptions.value = false
	initializeCheckout.value = false
	await nextTick()
	paymentStatus.value = status
}


function finlaize(){
	order.value = null
	validatedCart.value = null
	showCheckoutOptions.value = false
	initializeCheckout.value = false
	paymentStatus.value = null
	resetCart()
}


watch(initializeCheckout, ()=> stage.value = 'SHIPPING_ADDRESS')

onMounted(() => loading.value = false)

</script>
