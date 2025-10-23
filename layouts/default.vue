<template>
  <div>
    <ui-scroll-area class="w-full h-[100dvh] relative">
      <div class="top-0 w-full sticky bg-background/90 backdrop-blur z-[20] border-b flex">
        <navs-main :key="$route?.fullPath"></navs-main>
      </div>
      <div class="pb-[80px] md:min-h-[80dvh] max-w-[100dvw]">

        <slot v-if="isOnline"/>
        <offline class="max-w-lg mx-auto p-4 py-8" v-else /> 
      </div>
      <template v-if="isOnline">
        <div class="absolute bottom-0 w-full bg-background/80 backdrop-blur border-t md:hidden p-1 z-10 w-full flex" v-if="!hiddenBottom?.includes($route?.name)">
          <navs-bottom class="w-full" :key="`path-${$route?.fullPath}`"></navs-bottom>
        </div>

        <div class="hidden md:block">
          <navs-footer class="pb-8"></navs-footer>
        </div>

      </template>

    </ui-scroll-area>
  </div>
</template>

<script setup lang="ts">
import { useOnline } from '@vueuse/core'
const isOnline = useOnline()

const hiddenBottom = ref(['cart', 'partner', 'products-product'])
</script>