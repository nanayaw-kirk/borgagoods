import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'

export function useToaster(){
	const {toast} = useToast()
	const notify = (options) => {
		toast({
			...options,
			action: h(ToastAction, {
				altText: 'Close',
			}, {
			default: () => 'Close',
			}),
		})
	}

	return notify
}