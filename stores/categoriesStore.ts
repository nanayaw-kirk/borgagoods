import {defineStore} from "pinia";

export const categoriesStore = defineStore('categoriesStore', {
	state : () => {
		return {
			list : []
		}
	},
	getters : {
		acitiveCategories(){
			return this.list.filter(item => item.active)
		},
		categories(){
			return this.list
		},

		categoriesWithProducts(){
			return this.list.filter(item => item.has_products)
		}

	},
	actions : {
		fill(data){
			this.list = data
		}
	}
}) 