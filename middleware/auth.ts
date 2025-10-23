import {useAuthStore} from "~/stores/useAuthStore";
// import { RouteLocationRaw } from 'vue-router';

export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = storeToRefs(useAuthStore());

  if (!authenticated?.value) {
    const endpoint = '/';

    const redirect = { path: endpoint };

    redirect.query = { redirect: to.fullPath };


    return navigateTo(redirect, { replace: true });
  }
})