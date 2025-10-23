import {defineStore} from "pinia";

export const bankStore = defineStore('bankStore', {
	state : () => {
		return {
			list : []
		}
	},
	getters : {
		banks(){
			return this.list
		}

	},
	actions : {
		fill(data){
			this.list = data
		}
	}
}) 