import {defineStore} from "pinia";
const notify = useToaster()
export const useCartStore = defineStore('useCartStore', {
	state : () => {
		return {
			data : [],
			promo_code : '' 
		}
	},
	getters : {
		cart(){
			return this.data
		},

		cartQuantity(){
			let quantity = 0
			this.data.forEach(item => {
				quantity = parseInt(quantity) + parseInt( item?.quantity)
			})

			return parseInt(quantity)
		},


		cartTotal(){
			let total = 0
			this.data.forEach(item => {
				total = parseInt(total) + (parseInt( item?.variant && item?.variant?.price ? item?.variant?.price : item?.product?.price) * item?.quantity)
			})

			return parseInt(total)
		},


		netWeight(){
			let weight = 0
			this.data.forEach(item => {
				weight = parseFloat(weight) + (parseFloat( item?.variant && item?.variant?.weight ? item?.variant?.weight : item?.product?.weight) * item?.quantity)
			})

			return parseFloat(weight).toFixed(2)
		}

	},
	actions : {
		addToCart(payload){

			const entry = this.data.find(item =>  item.product.uuid === payload.product.uuid)

			if (entry) {
				if((payload.quantity > entry?.product?.quantity) || (payload?.quantity + entry?.quantity) > entry?.product?.quantity){
					entry.quantity = entry?.product?.quantity
					notify({ title : 'Added to cart', description : `${payload?.product?.name} added to cart`})

					return
				}

				if( (payload?.quantity + entry?.quantity) < entry?.product?.quantity){
					entry.quantity = entry.quantity + payload?.quantity 
					notify({ title : 'Added to cart', description : `${payload?.product?.name} added to cart`})

					return
				}

				entry.quantity = payload?.quantity 
				notify({ title : 'Added to cart', description : `${payload?.product?.name} added to cart`})
				return
			}

			this.data.unshift({product : payload.product, quantity : payload?.quantity ? payload?.quantity  : 1})
			notify({ title : 'Added to cart', description : `${payload?.product?.name} added to cart`})
		},
		
		removeFromCart(index){
			this.data = this.data?.filter((item, id) => id !== index)
		},

		resetCart(){
			this.data = []
			this.promo_code = ""
		}
	},

	persist: {
		storage: persistedState.localStorage,
	},
}) 