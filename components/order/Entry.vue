<template>
	<div>
		<div class="flex gap-x-2 md:gap-x-4 items-center md:items-start" @click.prevent="open = true">
			<ui-badge :variant="entry?.status" class="size-10 md:size-12 center rounded-xl">
				<state-icon :state="entry?.status" class="text-xl md:text-2xl"></state-icon>
			</ui-badge>

			<div class="expand flex flex-col">
				

				<div class="flex items-center gap-x-1">
					<span class="text-xs md:text-sm font-medium dark:text-foreground/70">
						{{entry?.order_no}}
					</span>

					&bull;

					<span class="text-xs md:text-sm font-medium text-foreground/70">
						{{$CURRENCY(entry?.total_price)}}
					</span>
				</div>

				<div class="flex gap-3 -mt-1">
					<div class="flex items-end">
						<span class="icon-cart-check text-sm text-foreground/70 mr-[3px]"></span>
						<span class="text-xs text-foreground/70">{{$formatNum(entry?.total_quantity)}} {{entry?.total_quantity === 1 ? 'Item' : 'Items'}}</span>
					</div>

					<div class="flex items-end">
						<span class="icon-revenue text-sm text-foreground/70 mr-[3px]"></span>
						<span class="text-xs text-foreground/70 capitalize">{{$clean(entry?.payment_status)}}</span>
					</div>

					<div class="flex items-end">
						<span class="icon-location-pin text-sm text-foreground/70 mr-[3px]"></span>
						<span class="text-xs text-foreground/70 line-clamp-1">{{entry?.shipping_address?.location?.name ? entry?.shipping_address?.location?.name : entry?.shipping_address?.landmark }}</span>
					</div>

					<div class="hidden lg:flex items-end">
						<span class="icon-date text-sm text-foreground/70 mr-[3px]"></span>
						<span class="text-xs text-foreground/70">{{ $formatDate(entry?.created_at, 'DD-MM-YYYY') }}</span>
					</div>

					
				</div>

			</div>
			<div class="hidden md:block my-auto">
				<ui-badge :variant="entry?.status" class="capitalize text-[10px]">
					{{$clean(entry?.status)}}
				</ui-badge>
			</div>
			<span class="my-auto icon-dots-horizontal mr-3 text-xl"></span>

			
		</div>

		<partials-dialog v-model:md_size="size" v-model:open="open" :ctaTitle="heading" :ctaDesc="entry?.order_no" :hideHeading="['pay_now', 'review', 'cancel'].includes(intent)" :persist="['pay_now', 'review', 'cancel'].includes(intent)">
			<template #content>
				<div>
					<template v-if="intent === 'cancel'">
						<order-actions-cancel :order="entry" @cancel="intent = 'details'" @order-cancelled="$emit('refresh')"></order-actions-cancel>
					</template>
					<template v-else-if="intent === 'return'">
						<order-actions-file-return :order="entry" @cancel="intent = 'details'" @order-cancelled="$emit('refresh')"></order-actions-file-return>
					</template>
					<template v-else-if="intent === 'review'">
						<order-actions-submit-review :order="entry" @cancel="intent = 'details'" @reviewed="$emit('refresh')"></order-actions-submit-review>
					</template>

					<template v-else-if="intent === 'pay_now'">
						<order-actions-process-payment :order="entry" @cancel="intent = 'details'" @defer-payment="(payload) => { open = false ; processPayment(payload)}"></order-actions-process-payment>
					</template>
					<template v-else>

						<template v-if="processing">
							<div class="p-10 center">
								<span class="icon-spinner animate-spin"></span>
							</div>
						</template>
						<template v-else>
							<ui-scroll-area class="h-[70dvh]">
								<div class="grid">

									<div class="p-2 md:p-3" v-if="entry?.payment_status !== 'paid' && !['cancelled', 'delivered', 'completed'].includes(entry?.status)">
										<div class="p-3 bg-destructive/40 rounded-xl border border-destructive flex items-start gap-2">
											<icons-money class="text-5xl text-primary"></icons-money>
											<div class="expand flex flex-col">
												<span class="font-medium">Complete Order Payment.</span>
												<span class="text-xs text-foreground/70">
													Please be aware that orders left unpaid for 48 hours will be removed from our platform.
												</span>
											</div>

											<ui-button class="my-auto" size="sm" @click="intent = 'pay_now'">
												Pay Now
											</ui-button>
										</div>
									</div>

									<div class="px-3 py-2 flex flex-col gap-y-2">
										<span class="font-medium">
											Order Summary
										</span>

										<div class="flex items-end gap-x-1">
											<span class="text-xs text-foreground/70">Order No.</span>
											<div class="expand border-b border-dashed border-b-2"></div>
											<span class="text-xs text-foreground/70">{{order?.order_no}}</span>
										</div>

										<div class="flex items-end gap-x-1">
											<span class="text-xs text-foreground/70">Date</span>
											<div class="expand border-b border-dashed border-b-2"></div>
											<span class="text-xs text-foreground/70">{{$formatDate(order?.created_at)}}</span>
										</div>

										<div class="flex items-end gap-x-1">
											<span class="text-xs text-foreground/70">Total Units</span>
											<div class="expand border-b border-dashed border-b-2"></div>
											<span class="text-xs text-foreground/70">{{$formatNum(order?.total_quantity)}} {{order?.total_quantity === 1 ? 'Unit' : 'Units'}}</span>
										</div>

										<div class="flex items-end gap-x-1">
											<span class="text-xs text-foreground/70">Net Weight</span>
											<div class="expand border-b border-dashed border-b-2"></div>
											<span class="text-xs text-foreground/70">{{order?.total_weight}}KG</span>
										</div>


										<div class="flex items-end gap-x-1">
											<span class="text-xs text-foreground/70">Discount</span>
											<div class="expand border-b border-dashed border-b-2"></div>
											<span class="text-xs text-foreground/70">{{$CURRENCY(order?.total_discount)}}</span>
										</div>


										<div class="flex items-end gap-x-1">
											<span class="text-xs text-foreground/70">Delivery Charge</span>
											<div class="expand border-b border-dashed border-b-2"></div>
											<span class="text-xs text-foreground/70">{{$CURRENCY(order?.delivery_fee)}}</span>
										</div>


										<div class="flex items-end gap-x-1">
											<span class="text-xs text-foreground/70">Total</span>
											<div class="expand border-b border-dashed border-b-2"></div>
											<span class="text-lg text-foreground/70 font-medium">{{$CURRENCY(order?.total_price)}}</span>
										</div>

										<div class="flex items-end gap-x-1">
											<span class="text-xs text-foreground/70">Payment Status</span>
											<div class="expand border-b border-dashed border-b-2"></div>
											<ui-badge class="capitalize text-[10px]" :variant="order?.payment_status">
												{{$clean(order?.payment_status)}}
											</ui-badge>
										</div>
									</div>

									<div class="px-3 py-4 flex flex-col gap-y-2 bg-border/20">
										<span class="font-medium">
											Order Items
										</span>

										<template v-for="product in order?.order_lines" :key="product?.uuid">
											<div class="flex items-center gap-3">
												<div class="size-12 rounded-md">
													<product-media :media="product?.model_type === 'product' ? product?.model?.media?.[0]?.web : product?.model?.product?.media?.[0]?.web"></product-media>
												</div>
												<div class="expand flex flex-col">
													<span class="font-medium text-sm line-clamp-1">{{ product?.model_type === 'product' ? product?.model?.name : product?.model?.product?.name }}</span>
													<span class="text-xs text-foreground/70">
														{{$CURRENCY(product?.price)}} - {{product?.quantity}} {{product?.quantity === 1 ? 'Item' : 'Items'}}
													</span>
												</div>
											</div>
										</template>
									</div>


									<div class="px-3 py-4 flex flex-col gap-y-2">

										<span class="font-medium">
											Delivery Info
										</span>


										<div class="flex gap-3 items-start">
											<country-flag size="big" :country="order?.shipping_address?.country?.alpha_2_code"></country-flag>
											<div class="expand flex flex-col">
												<span class="font-medium">{{order?.shipping_address?.location?.name}}</span>
												<span class="text-xs text-foreground/70 line-clamp-1">{{order?.shipping_address?.landmark}}</span>

												<div class="flex flex-col gap-y-2 mt-2">
													<div class="flex items-end gap-x-1">
														<span class="text-xs text-foreground/70 line-clamp-1">Deliver to</span>
														<div class="expand border-b border-dashed border-b-2"></div>
														<span class="text-xs text-foreground/70 line-clamp-1">{{order?.shipping_address?.name}}</span>
													</div>

													<div class="flex items-end gap-x-1">
														<span class="text-xs text-foreground/70 line-clamp-1">Phone Number</span>
														<div class="expand border-b border-dashed border-b-2"></div>
														<span class="text-xs text-foreground/70 line-clamp-1">{{order?.shipping_address?.phone}}</span>
													</div>

													<div class="flex items-end gap-x-1">
														<span class="text-xs text-foreground/70 line-clamp-1">Delivery Fee</span>
														<div class="expand border-b border-dashed border-b-2"></div>
														<span class="text-xs text-foreground/70 line-clamp-1">{{$CURRENCY(order?.delivery_fee)}}</span>
													</div>
												</div>
											</div>


										</div>
									</div>

									<div class="px-3 py-4 flex flex-col gap-y-2">

										<span class="font-medium">
											Order History
										</span>
										<order-state-history :states="order?.state_history"></order-state-history>
									</div>

									<div class="px-3 py-4 border-t flex flex-col gap-y-2" v-if="['completed'].includes(entry?.status)">
										<div class="flex flex-col">
											<span class="font-medium">
												Feedback
											</span>
											<span class="text-xs text-foreground/70">{{entry?.reviewed ? 'Thanks for your review' : 'Review your experience with this order to help us improve our service'}}</span>
										</div>
										
										<template v-if="!entry?.reviewed">
											
											<ui-button class="w-full md:h-12" @click="intent = 'review'">
												Review Order
											</ui-button>
										</template>

										<template v-else>
											<div class="flex flex-col">
												<div class="flex gap-x-1">
													<span class="text-xs" v-for="i in 5" :key="i" :class="i <= parseInt(order?.review?.rating) ? 'icon-star-filled text-amber-500' : 'icon-star-outline'"></span>
													</div>


													<div v-if="order?.review?.comment">
														<p class="text-sm text-foreground/70">
															{{order?.review?.comment}}
														</p>
													</div>
												</div>
											</template>
										</div>

										<div class="px-3 py-4 border-t flex flex-col gap-y-2" v-if="['pending' , 'delivered'].includes(entry?.status)">
											<div class="flex flex-col">
												<span class="font-medium">
													Danger Zone
												</span>
												<span class="text-xs text-foreground/70">Please note that the actions below can lead to permanent results</span>
											</div>

											<div class="flex flex-col w-full border rounded-md !divide-y">
												<template v-if="entry?.status === 'pending'">
													<ui-button variant="outline" class="text-foreground/70 hover:text-primary w-full border-0 md:h-12" @click="intent = 'cancel'">
														Cancel Order
													</ui-button>
												</template>
												<template v-if="entry?.status === 'delivered' && entry?.returnable?.status">
													<ui-button variant="outline" class="text-foreground/70 hover:text-primary w-full border-0 md:h-12" @click="intent = 'return'">
														Request Return
													</ui-button>
												</template>
											</div>
										</div>
									</div>
								</ui-scroll-area>


							</template>
						</template>

					</div>
				</template>
			</partials-dialog>



			<ui-dialog v-model:open="showNotice" :key="`notice-${showNotice}`">
				<div class="w-full relative">
					<ui-dialog-content class="rounded-xl border  p-0 gap-0 md:min-w-[300px] max-w-[350px]"  @interactOutside.prevent="" @escapeKeyDown.prevent="" :hideClose="true">

						<div class="hidden">
							<ui-dialog-header class="gap-y-0 p-3">
								<slot name="icon"></slot>
								<ui-dialog-title class="font-medium mb-0 text-center">Process Payment</ui-dialog-title>
								<ui-dialog-description class="!mt-1 text-center text-foreground/70 md:px-4 line-clamp-2 md:line-clamp-1">Process your payment for this order</ui-dialog-description>
							</ui-dialog-header>
						</div>

						<div class="flex flex-col items-center p-4">

							<template v-if="paymentStatus === 'SUCCESS'">
								<icons-confetti class="text-6xl md:text-8xl mb-1 text-primary"></icons-confetti>

								<h3 class="text-center text-xl font-medium">Your payment has been received!</h3>
								<p class="text-center text-foreground/70 mb-4 text-sm">
									Thank you for your purchase! We'll keep you updated on your order status.
								</p>

								<ui-button class="mx-auto" variant="ghost" @click="resetView">
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
									<ui-button  variant="link" class="w-fit text-foreground/70" @click.prevent="paymentStatus = null; open = true; intent = 'cancel'">
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

	const emit = defineEmits(['refresh'])

	const {retrying , processPayment  , retryPayment, paymentStatus , showNotice} = usePaystack()

	const props = defineProps({
		entry : {
			type : Object,
			required : true
		}
	})



	const loading = useStorage('BRGA_GO_LOADER', false)
	const processing = ref(false)
	const intent = ref('details')


	const open = ref(false)
	const order = ref(null)
	const size = ref('small')


	const heading = computed(() => {
		if (intent.value === 'cancel') return "Cancel Order";
		if (intent.value === 'return') return "Submit a Return Request";
		if (intent.value === 'review') return "Review Order";
		if (intent.value === 'pay_now') return "Process Payment";
		return "Order Details"
	})


	async function getOrderDetails() {
		processing.value = true

		const {data} = await useApiFetch(`/orders/${props?.entry?.uuid}?include=order_lines,order_lines.model,order_lines.model.media,order_lines.model.product,order_lines.model.product.media,order_lines.model.variation,promo,shipping_address,shipping_address.location,shipping_address.country,state_history,review`)

		if (data?.value) {
			order.value = data?.value?.data
		}

		processing.value = false

	}


	function resetView(){
		loading.value = false 
		processing.value = false
		paymentStatus.value = null 
		open.value = true
		intent.value = 'details'
		retrying.value = false
		emit('refresh')
	}


	watch(open, async (newVal, oldVal)=> {
	// intent.value = 'details'
		loading.value = false
		if (!order?.value) {
			await getOrderDetails()
		}
	})
	</script>
