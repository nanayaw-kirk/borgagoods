<template>
	<div>
		<div class="hidden md:flex flex-col divide-y">

			<div class="flex flex-col justify-end py-2 px-3">
				<span class="md:text-xl uppercase text-right font-bold">
					Total : {{$CURRENCY(cartTotal)}}
				</span>
				<span class="text-xs text-right text-foreground/70">
					Deliveries fees & discounts calculated at checkout
				</span>
			</div>

			<div class="flex items-start gap-x-4 py-4 px-3">
				<icons-sale class="text-4xl md:text-5xl text-primary"></icons-sale>
				<div class="expand flex flex-col">
					<ui-input v-model="promo_code" id="discount_code" placeholder="Enter promo code" class="w-full bg-background"></ui-input>
					<ui-label for="discount_code" class="text-xs text-foreground/70 mt-1 line-clamp-1"> Apply a promo code for a discount at checkout</ui-label>
				</div>
			</div>
			<div class="divide-y">
				

				<auth-modal :intention="'login'">
					<template #action-button>
						<div class="py-2 px-3 flex items-center gap-x-2 group cursor-pointer">
							<icons-user-check class="text-4xl md:text-5xl text-primary"></icons-user-check>
							<div class="expand flex flex-col">
								<span class="font-medium">Sign in to checkout</span>
								<span class="text-xs text-foreground/70">
									Checkout faster with a {{$appName}} account
								</span>
							</div>
							<span class="icon-right text-xl w-8 h-8 center rounded-md md:group-hover:bg-primary/10 md:dark:group-hover:bg-border"></span>
						</div>
					</template>
				</auth-modal>




				<div class="py-2 px-3 flex items-center gap-x-2 group cursor-pointer" @click="initializeCheckout = true; modalSize = 'small'">
					<icons-cart-check class="text-4xl md:text-5xl text-primary"></icons-cart-check>
					<div class="expand flex flex-col">
						<span class="font-medium">Continue as a guest</span>
						<span class="text-xs text-foreground/70">Complete your purchase anonymously</span>
					</div>
					<span class="icon-right text-xl w-8 h-8 center rounded-md md:group-hover:bg-primary/10 md:dark:group-hover:bg-border"></span>
				</div>
			</div>
		</div>


		<div class="flex flex-col gap-y-2  md:hidden">
			<template v-if="!showCheckoutOptions">
				<div class="flex flex-col justify-end p-2">
					<span class="md:text-xl uppercase text-center font-medium">
						Total : {{$CURRENCY(cartTotal)}}
					</span>
					<span class="text-xs text-center text-foreground/70">
						Deliveries fees & discounts calculated at checkout
					</span>
				</div>
				<div class="pb-2 px-2">
					<ui-button class="h-12 w-full uppercase text-xs font-bold" @click="showCheckoutOptions = true">
						Proceed to Checkout
					</ui-button>
				</div>
			</template>

			<template v-else>
				<div class="divide-y">
					<div class="p-2 flex items-start gap-x-4 pt-4 uk-animation-slide-top-small">
						<ui-button class="size-7" size="icon" variant="ghost" @click="showCheckoutOptions = false">
							<span class="icon-left"></span>
						</ui-button>
						<div class="expand flex flex-col">
							<h3 class="md:text-lg"> Choose your preferred checkout option</h3>
							<span class="text-xs md:text-sm text-foreground/70">
								Sign in for a faster checkout or proceed as a guest.
							</span>
						</div>
					</div>



					<auth-modal :intention="'login'">
						<template #action-button>
							<div class="p-2 flex items-center gap-x-2 group cursor-pointer uk-animation-slide-bottom-small"  style="animation-delay: 50ms">
								<icons-user-check class="text-4xl md:text-5xl text-primary"></icons-user-check>
								<div class="expand flex flex-col">
									<span class="font-medium">Sign in to checkout</span>
									<span class="text-xs text-foreground/70">
										Checkout faster with a {{$appName}} account
									</span>
								</div>
								<span class="icon-right text-xl w-8 h-8 center rounded-md md:group-hover:bg-primary/10 md:dark:group-hover:bg-border"></span>
							</div>
						</template>
					</auth-modal>


					<div class="p-2 flex items-center gap-x-2 group cursor-pointer uk-animation-slide-bottom-small"  style="animation-delay: 100ms"  @click="initializeCheckout = true; modalSize = 'small'">
						<icons-cart-check class="text-4xl md:text-5xl text-primary"></icons-cart-check>
						<div class="expand flex flex-col">
							<span class="font-medium">Continue as a guest</span>
							<span class="text-xs text-foreground/70">Complete your purchase anonymously</span>
						</div>
						<span class="icon-right text-xl w-8 h-8 center rounded-md md:group-hover:bg-primary/10 md:dark:group-hover:bg-border"></span>
					</div>
				</div>
			</template>
		</div>


		<partials-dialog :ctaTitle="headings?.title" :ctaDesc="headings?.description" v-model:open="initializeCheckout" v-if="!showNotice" v-model:modalSize="modalSize">
			<template #content>
				<ui-scroll-area class="h-[85dvh] md:h-auto">
					<div class="grid">
						<div class="grid gap-4  pt-4" v-show="stage === 'SHIPPING_ADDRESS'">
							<div class="grid gap-y-2 px-3">
								<ui-label class="text-xs text-foreground/70" for="name">Recipient Name*</ui-label>
								<div class="w-full relative">
									<ui-input class="h-12 pl-10" id="name" placeholder="Enter the name of the recipient" v-model="shippingAddress.name"></ui-input>
									<span class="icon-user inset-y-0  left-3 top-4 absolute"></span>
								</div>
							</div>

							<div class="grid gap-y-2 px-3">
								<ui-label class="text-xs text-foreground/70" for="name">Delivery Location*</ui-label>
								<div>
									<select-delivery-location v-model:delivery_location_id="shippingAddress.location_id"></select-delivery-location>
								</div>
							</div>

							<div class="grid gap-y-2 px-3">
								<ui-label class="text-xs text-foreground/70" for="landmark">Notable Landmark*</ui-label>
								<ui-textarea class="h-20 resize-none" id="landmark" placeholder="Indicate a notable landmark at your chosen location eg: Shell Filling Station" v-model="shippingAddress.landmark"></ui-textarea>
							</div>


							<div class="grid gap-y-2 px-3">
								<ui-label class="text-xs text-foreground/70" for="phone_number">Recipient Phone Number*</ui-label>
								<div>
									<vue-tel-input class="h-12" id="phone_number" placeholder="Enter the name of the recipient" v-model="shippingAddress.phone"></vue-tel-input>
								</div>
							</div>

							<div class="grid gap-y-2 px-3">
								<ui-label class="text-xs text-foreground/70" for="name">Recipient Email Address*</ui-label>
								<div class="w-full relative">
									<ui-input class="h-12 pl-10" id="name" placeholder="Email Address" v-model="shippingAddress.email"></ui-input>
									<span class="icon-mail inset-y-0  left-3 top-4 absolute"></span>
								</div>
							</div>

							<div class="flex gap-x-2 p-3 border-t">
								<div class="w-fit">
									<ui-button class="h-12 uppercase text-xs font-medium" variant="ghost" @click.prevent="initializeCheckout  = false" :disabled="loading">
										Cancel
									</ui-button>
								</div>
								<div class="expand">
									<ui-button class="w-full h-12 uppercase text-xs font-medium" @click.prevent="preview" :disabled="loading || !validShippingAddress?.success">
										Continue
									</ui-button>
								</div>
							</div>
						</div>


						<div class="grid" v-if="stage === 'PAYMENT'">
							<ui-scroll-area class="h-[60dvh]">
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
										<div class="flex items-center p-3 gap-4">
											<div class="size-12 aspect-square">
												<product-media class="rounded-md" :media="item?.product?.media?.[0]?.web"></product-media>
											</div>
											<div class="expand flex flex-col">
												<span class="line-clamp-1 text-sm font-medium">
													{{item?.product?.name}}
												</span>
												<div class="flex items-center gap-x-2">
													<span class="text-xs line-through text-primary font-medium" v-if="item?.promo_applied">{{$CURRENCY(item?.actual_price)}}</span>
													<span class="text-xs">{{$CURRENCY(item?.discounted_price)}}</span>

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
					</div>
				</ui-scroll-area>
			</template>
			<template #loader>
				<partials-loading-overlay v-if="loading">
					<template #message>
						<p class="text-center text-sm text-foreground/70" v-if="stage === 'SHIPPING_ADDRESS'">
							Applying discount & calculating delivery fees...
						</p>

						<p class="text-center text-sm text-foreground/70" v-else-if="stage === 'PAYMENT'">
							Confirming your order...
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

							<ui-button class="mx-auto" variant="ghost" @click.prevent="finlaize">
								Close
							</ui-button>
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

import {z} from "zod"
import {useStorage} from "@vueuse/core"

const { cartTotal, netWeight, promo_code } = storeToRefs(useCartStore())
const {cart, resetCart} = useCartStore()
const { modalSize } = useModalResize()

const {retrying , processPayment  , retryPayment, paymentStatus , showNotice} = usePaystack()


const loading = useStorage('BRGA_GO_LOADER', false)
const showCheckoutOptions = ref(false)
const initializeCheckout = ref(false)

const stage = ref('SHIPPING_ADDRESS')
const validatedCart = ref(null)
const order = ref(null)



const shippingAddress = reactive({
	name : "",
	phone : "",
	email : "",
	location_id : "",
	landmark : "",
})


const ShippingAddressShcema = z.object({
	name : z.string().min(2),
	phone : z.string().min(8),
	email : z.string().email(),
	location_id : z.string().min(2),
	landmark : z.string().min(2),
}).passthrough()


const validShippingAddress  = computed(() => ShippingAddressShcema.safeParse(shippingAddress))


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
	loading.value = true
	const {data, error}  = await useCrud().post('/orders/preview', {order_items : cart, location_id : shippingAddress?.location_id, promo : promo_code?.value})

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
	const {data, error}  = await useCrud().post('/orders', {order_items : cart, shipping_address : shippingAddress, promo : promo_code?.value, share_with_partners :  true})

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
