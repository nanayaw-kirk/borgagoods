import { useStorage, useDark } from '@vueuse/core'
import { ref } from "vue"
export function useTheme(){
	
	const isDark = useStorage('theme', useDark())
	return { isDark}
}