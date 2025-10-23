<template>
	<div>
		

		<div class="flex flex-col items-center p-4 md:px-10">
			<icons-cart-clear class="text-5xl md:text-7xl text-primary mb-4"></icons-cart-clear>
			<h4 class="text-lg md:text-xl font-medium text-center">Cancel Order #{{order?.order_no}}</h4>
			
			<template v-if="STAGE === 'CONFIRM'">
				<p class="text-sm md:text-base text-center text-foreground/70">
					You’re about to cancel your order on {{$appName}}. To confirm, please re-enter your order number below and then click Next.”
				</p>

				<ui-input placeholder="Enter Order No." class="mt-3 h-12" v-model="order_no"></ui-input>
			</template>

			<template v-else>
				<p class="text-sm md:text-base text-center mb-2 text-foreground/70">
					Please share your reason for canceling this order so we can continue to improve.
				</p>
				<template v-if="!useOther">
					<ui-scroll-area class="h-[55dvh] md:h-[40dvh] w-full">
						<template v-for="rs in reasons" :key="rs?.reason_id">
							<div class="flex p-1 md:p-2 items-start gap-2 rounded w-full cursor-pointer md:hover:bg-border uk-animation-slide-bottom-small" :style="`animation-delay: ${rs?.reason_id*50}ms`" @click="reason = rs?.reason">
								<ui-checkbox :checked="reason === rs?.reason" class="rounded-full size-4 md:size-6 mt-1"></ui-checkbox>
								<div class="expand flex flex-col">
									<span class="text-sm line-clamp-1 font-medium">{{rs?.reason}}</span>
									<span class="text-xs text-foreground/70">{{rs?.description}}</span>
								</div>
							</div>
						</template>

						<div class="flex items-start gap-2 p-1 md:p-2 rounded w-full cursor-pointer md:hover:bg-border" @click="useOther = true">
							<ui-checkbox class="rounded-full size-4 md:size-6 mt-1"></ui-checkbox>
							<div class="expand flex flex-col">
								<span class="text-sm line-clamp-1 font-medium">Some other reason</span>
								<span class="text-xs text-foreground/70">Cancel order for an unlisted reason</span>
							</div>
						</div>
					</ui-scroll-area>
				</template>

				<template v-else>
					<div class="flex flex-col w-full gap-y-2">
						<ui-textarea class="w-full h-20 resize-none" v-model="reason" placeholder="Tell us your reason for canceling..." id="other_reason"></ui-textarea>

						<div>
							<ui-button variant="link" class="px-0 text-foreground/70 h-0" @click="useOther = false">&larr; Select reason</ui-button>
						</div>
					</div>
				</template>
			</template>

		</div>		

		<div class="flex items-center gap-3 p-3 border-t">
			<ui-button class="md:h-12" @click.prevent="STAGE !== 'REASON' ? $emit('cancel') : STAGE = 'CONFIRM'">
				Go Back
			</ui-button>

			<template v-if="STAGE === 'CONFIRM'">
				<ui-button variant="ghost" class="text-primary expand md:h-12 disabled:!cursor-not-allowed" :disabled="order_no !== order?.order_no" @click="STAGE = 'REASON'">
					Next
				</ui-button>
			</template>

			<template v-else>
				<ui-button variant="ghost" class="text-primary expand md:h-12 disabled:!cursor-not-allowed" :disabled="order_no !== order?.order_no || !reason" @click="cancelOrder">
					Cancel Order
				</ui-button>
			</template>
		</div>
	</div>	
</template>
<script setup lang="ts">
import {useStorage} from "@vueuse/core"

const props = defineProps({
	order : {
		type : Object,
		required : true
	}
})
const emit = defineEmits(['cancel', 'order-cancelled'])
const notify = useToaster()

const loading = useStorage('BRGA_GO_LOADER', false)
const order_no = ref('')
const STAGE = ref('CONFIRM')
const reason = ref('')

const useOther = ref(false)
const reasons = [
	{
		"reason_id": 1,
		"reason": "Change of Mind",
		"description": "I no longer want the order."
	},
	{
		"reason_id": 2,
		"reason": "Ordered by Mistake",
		"description": "I unintentionally placed an order I did not intend to."
	},
	{
		"reason_id": 5,
		"reason": "Incorrect Details Provided",
		"description": "I entered the wrong address or other information."
	},
	{
		"reason_id": 4,
		"reason": "Delivery Time Too Long",
		"description": "The estimated delivery time does not meet my expectations."
	},
	{
		"reason_id": 6,
		"reason": "Payment Issues",
		"description": "I faced difficulties completing the payment."
	},
	{
		"reason_id": 3,
		"reason": "Found a Better Option",
		"description": "I discovered a more preferred item or deal elsewhere."
	},

	{
		"reason_id": 8,
		"reason": "Promotional Discount Not Applied",
		"description": "I expected a discount that was not reflected in the final price."
	}
]



async function cancelOrder(){
	loading.value = true
	const {data, error}  = await useCrud().post(`/orders/${props?.order?.uuid}`, {reason : reason.value})

	if (data?.value) {
		notify({title : 'Order Cancelled', description : `Your order #${props?.order?.order_no} has been been cancelled`})
		emit('order-cancelled')
	}

	if (error?.value) {
		notify({title : 'Ooops', description:`${error?.value?.data?.message as string}`,})
	}

	loading.value  = false
}


watch(useOther, ()=> {
	reason.value = ""
})
</script>
