	export function usePaystack() {

		const retrying  = ref(false)
		const paymentStatus = ref(null)
		
		const showNotice = computed(() => paymentStatus.value ? true : false)

		function processPayment(setup) {
			paymentStatus.value = null
			
			let handler = new PaystackPop()
			handler.newTransaction({ ...setup, channels : ['card', 'mobile_money'],

				onSuccess : (transaction) => {
					paymentStatus.value = 'SUCCESS'
				},

				onCancel : () => {
					paymentStatus.value = 'FAILED'
				}

			})
		}

		async function retryPayment(order){
			retrying.value = true
			const { data, error } = await useCrud()?.post(`/orders/${order}/initialize-payment`)
			if(data?.value){
				await processPayment({
					...data?.value?.data?.payment, 
					key : data?.value?.data?.payment?.client_secret
				})
			}


			if(error?.value){

				console.log(error?.value)
			}

			retrying.value = false
		}

		onMounted(() => paymentStatus.value = null )

		return { retrying , processPayment  , retryPayment, paymentStatus , showNotice }

	}