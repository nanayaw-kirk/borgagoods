import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export function useScreenSize(){
	const breakpoints = useBreakpoints(breakpointsTailwind)
	const smAndDown = breakpoints.smallerOrEqual('sm')
	const smAndUp = breakpoints.greaterOrEqual('sm')
	const mdAndUp = breakpoints.greater('sm')
	const lgAndDown = breakpoints.smallerOrEqual('lg')
	const mdAndDown = breakpoints.smaller('lg')

	return {smAndUp, smAndDown, mdAndUp, lgAndDown, mdAndDown}
}