import {defineStore} from "pinia";

export const useValidationStore = defineStore('ValidationStore', {
	state : () => {
		return {
			errorStore : {

			}
		}
	},


	getters : {

		hasErrors(){
			return Object.keys(this.errorStore).length > 0
		},

		errors(){
			return this.errorStore
		}

	},


	actions : {
		fill(errors){
			this.errorStore = errors
		},

		clear(){
			this.errorStore = {}
		}
	}
}) 