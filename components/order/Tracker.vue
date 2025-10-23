<template>
	<div>
		<div class="flex flex-col items-center w-full md:max-w-md mx-auto lg:max-w-md gap-y-4" :key="key">

			<div class="flex flex-col items-center  gap-y-4 w-full" v-if="!order">
				<ui-input placeholder="Order Number*" class="h-12 md:h-14 w-full" :class="loading ? 'bg-border/50' : ''" v-model="code" :disabled="loading"></ui-input>
				<ui-button class="h-12 px-6 gap-x-6 w-full" :disabled="!code || loading" @click="check">
					<span>
						Continue
					</span>
					<span class="icon-spinner animate-spin" v-if="loading"></span>
				</ui-button>
				<div class="flex gap-x-4 p-3 rounded-md border">
					<Mails class="size-9 md:size-12 text-foreground/70"/>
					<div class="expand">
						<small class="text-foreground/70 leading-tight">
							Your order number is in the SMS sent when you ordered. Can't find it? Contact support.
						</small>
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-y-4 w-full"  v-else>

				<div class="grid">

					<div class="p-2 md:p-3 border rounded bg-border flex items-start gap-x-4 cursor-pointer" @click="order = undefined; code = ''">
						<ui-button size="icon" variant="outline" class="rounded-full">
							<span class="icon-left text-lg"></span>
						</ui-button>
						<div class="expand flex flex-col">
							<span class="font-medium">
								Track another order
							</span>
							<span class="text-xs md:text-sm text-foreground/70 line-clamp-1">
								Click to track another order on {{$appName}}
							</span>
						</div>


					</div>

					<div class="border grid mt-4">
						<div class="p-2 md:p-3" v-if="entry?.payment_status !== 'paid' && !['cancelled', 'delivered', 'completed'].includes(entry?.status)">
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

						<div class="px-3 py-4 flex flex-col gap-y-2 border-b">
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


						<div class="px-3 py-4 flex flex-col gap-y-2 border-b">

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
					</div>
				</div>
			</div>
		</div>
	</div>	
</template>
<script setup lang="ts">


import {Mails} from 'lucide-vue-next'

const key = ref(false) 

const code = ref(useRoute()?.query?.code ? useRoute()?.query?.code : '')
const loading = ref(false)
const order = ref(undefined)
const notify = useToaster()


const showStates = ref(true)

async function check(){
	loading.value = true
	const {data, error} = await useApiFetchAnon(`/orders/track?include=order_lines,order_lines.model,order_lines.model.media,order_lines.model.product,order_lines.model.product.media,order_lines.model.variation,promo,shipping_address,shipping_address.location,shipping_address.country,state_history&order_no=${code?.value}`, {pick : ['data']})

	if (data?.value) {
		order.value = data?.value?.data
	}


	if (error?.value) {
		notify({
			title : "Order not found",
			description : `We could not find the order with code ${code.value} on ${useNuxtApp()?.$appName}.`
		})
	}
	loading.value = false
} 


provide('order', order)

if (useRoute()?.query?.code) { check()}


	</script>
