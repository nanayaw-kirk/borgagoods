export function useHelper(){
	
	function setupForm(form, model){
		Object.assign(form , ...Object.keys(form).map(k => k in model && { [k]: model[k] }))
	}

	return { setupForm }

}