import {useAuthStore} from "~/stores/useAuthStore";

export function useAuth(){
	const {authenticated , fetchUser, user} = useAuthStore();

	return {authenticated , fetchUser, user}
}