import {defineStore} from "pinia";

export const sportsStore = defineStore('sportsStore', {
	state : () => {
		return {
			list : []
		}
	},
	getters : {
		sports(){
			return this.list
		}

	},
	actions : {
		fill(data){
			this.list = data
		}
	},
	persist: {
		storage: persistedState.localStorage,
	},
}) 