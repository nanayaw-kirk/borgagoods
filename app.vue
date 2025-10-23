<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>

    <ui-toaster class="z-[99999]"></ui-toaster>


    <template v-if="authenticated && $route?.query && Object.keys($route?.query).length > 0" :key="$route?.fullPath">
      <lazy-auth-greeters></lazy-auth-greeters>
    </template>
  </div>
</template>



<script setup lang="ts">

const {authenticated} = storeToRefs(useAuthStore())

</script>

