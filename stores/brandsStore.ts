import {defineStore} from "pinia";

export const brandsStore = defineStore('brandsStore', {
	state : () => {
		return {
			list : []
		}
	},
	getters : {
		brands(){
			return this.list
		}

	},
	actions : {
		fill(data){
			this.list = data
		}
	}
}) 