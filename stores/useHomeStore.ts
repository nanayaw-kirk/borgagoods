import {defineStore} from "pinia";

export const useHomeStore = defineStore('useHomeStore', {
	state : () => {
		return {
			list : []
		}
	},
	getters : {
		homePage(){
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