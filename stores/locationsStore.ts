import {defineStore} from "pinia";

export const locationsStore = defineStore('locationsStore', {
	state : () => {
		return {
			list : [],
			deliveryList : [],
			locale : null
		}
	},
	getters : {
		locations(){
			return this.list
		},

		deliveryLocations(){
			return this.deliveryList
		},

		currentLocale(){
			return this.locale
		}


	},
	actions : {
		fill(data){
			this.list = data
		},

		fillDeliveryList(data){
			this.deliveryList = data
		},

		setLoacale(data){
			this.locale = data
		}
	},

	persist: true
}) 