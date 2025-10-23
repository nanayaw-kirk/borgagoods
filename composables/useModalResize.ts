export function useModalResize(){

	const modalSize = ref('default')

	const activeModalSize = computed(() => {

		if (modalSize.value === 'x-small') {
			return 'md:min-w-[300px] max-w-[350px]'
		}

		if (modalSize.value === 'small') {
			return 'md:min-w-[400px]'
		}

		if (modalSize.value === 'mid') {
			return 'md:min-w-[600px]'
		}



		if (modalSize.value === 'medium') {
			return 'md:min-w-[800px]'
		}


		if (modalSize.value === 'large') {
			return 'md:min-w-[1000px]'
		}

		if (modalSize.value === 'x-large') {
			return 'md:min-w-[1200px]'
		}

		if (modalSize.value === 'xx-large') {
			return 'md:min-w-[1400px]'
		}


		if (modalSize.value === 'fullscreen') {
			return 'min-w-full h-screen'
		}


		return 'md:min-w-[600px]'

	})

	return { activeModalSize , modalSize}

}
