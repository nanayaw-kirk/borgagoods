import {defineStore} from "pinia";
export const enumsStore = defineStore('enumsStore', {
	state : () => {
		return {
			data : {}
		}
	},
	getters : {
		currencies(){
			return this.data?.currencies
		},
		employment_types(){
			return this.data?.employment_types
		},
		location_type(){
			return this.data?.location_type
		},
		rate_periods(){
			return this.data?.periods
		},
		seniorities(){
			return this.data?.seniorities
		},

	},
	actions : {
		fill(data){
			this.data = data
		}
	}
}) 