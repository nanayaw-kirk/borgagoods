<template>
	<div>

		<template v-if="STAGE === 'error'">
			<div class="flex flex-col items-center w-full">
				
				<div class="flex flex-col items-center p-6 md:px-10">
					<icons-sad class="text-6xl md:text-7xl text-orange-600 dark:text-orange-400 mb-4"></icons-sad>
					<h4 class="text-xl md:text-2xl font-medium mb-2 text-center">Payment Unsuccessful</h4>
					<p class="text-sm md:text-base text-center text-foreground/70">
						We’re sorry, but we couldn’t process your payment at this time. Please try again later or contact support if the issue persists.
					</p>
				</div>				

				<div class="flex items-center gap-3 p-3 border-t w-full">
					<ui-button variant="ghost" class="md:h-12" @click.prevent="$emit('cancel')">
						Cancel
					</ui-button>

					<ui-button class="expand md:h-12" @click.prevent="STAGE = 'retry'">
						Try Again
					</ui-button>
				</div>
			</div>
		</template>
		
		<template v-else>
			<div class="flex flex-col items-center p-6 md:px-10">
				<icons-money class="text-6xl md:text-7xl text-foreground mb-4"></icons-money>
				<h4 class="text-lg md:text-xl font-medium mb-2 text-center">Complete Payment for Order #{{order?.order_no}}</h4>
				<p class="text-sm md:text-base text-center text-foreground/70">
					Please submit your payment to secure this order. Orders without verified payments will be automatically canceled after 48 hours.
				</p>
			</div>		

			<div class="flex items-center gap-3 p-3 border-t">
				<ui-button variant="ghost" class="md:h-12" @click.prevent="$emit('cancel')">
					Cancel
				</ui-button>

				<ui-button  class="expand md:h-12" @click.prevent="init">
					Process Payment
				</ui-button>
			</div>
		</template>

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

const emit = defineEmits(['cancel', 'defer-payment'])

const loading = useStorage('BRGA_GO_LOADER', false)
const STAGE = ref('retry')


async function init(){
	loading.value = true
	const {data, error}  = await useCrud().post(`/orders/${props?.order?.uuid}/initialize-payment`)

	if (data?.value?.data?.payment) {

		emit('defer-payment' , {...data?.value?.data.payment,  key : data?.value?.data.payment?.client_secret })
		// processPayment({
		// 	...data?.value?.data.payment, 
		// 	key : data?.value?.data.payment?.client_secret
		// })
	}

	if (error?.value) {
		STAGE.value = 'error'
	}

	loading.value  = false
}

</script>
