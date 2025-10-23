
<template>
  <div>
    <Head>
      <Title>Buy Licensed Jerseys, Hats, and Fan Gear | {{$appName}}</Title>
      <Meta name="description" :content="`Official Team Merchandise Store`" />
      <Meta name="keywords" :content="$keywords"></Meta>
      <Meta name="robots" content="index, follow"></Meta>
    </Head>

    <div class="container grid gap-6 md:gap-8 lg:gap-12 md:pt-4">

      <nuxt-link :to="{name: 'black-friday'}" class="w-full aspect-video md:h-[450px] bg-black relative">
        <img src="https://images.samsung.com/is/image/samsung/assets/us/peaceofmind/06012023/SDSAC-5956-peaceOfMind-HP-Hero-Carousel-DT-1440x640.jpg?imwidth=1366" class="w-full h-full object-cover" alt="">

        <div class="top-0 absolute h-full w-full flex flex-col p-4">
          <div class="sm:max-w-xs md:m-auto flex flex-col items-center">
            <h2 class="text-center text-2xl md:text-4xl font-black">Black Friday Deals</h2>
            <p class="text-center text-xs md:text-base my-2 md:my-3 w-full max-w-[70%] sm:max-w-full">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

            <ui-button>Shop Now</ui-button>
          </div>
        </div>
      </nuxt-link>



      <div class="px-2 md:px-0" v-if="homePage?.products?.length > 0">
        <home-offers :data="homePage?.products"></home-offers>
      </div>


      <div class="px-2 md:px-0">
        <home-featured-categories></home-featured-categories>
      </div>


      <div class="px-2 md:px-0">
        <product-loader endpoint="products?limit=5"></product-loader>
      </div>



      <div class="px-2 md:px-0" v-if="homePage?.categories?.length > 0">
       <home-categories :list="homePage?.categories"></home-categories>
     </div>

   </div>

 </div>
</template>

<script setup lang="ts">


import {useStorage} from "@vueuse/core"
const loading = useStorage('BRGA_GO_LOADER', false)

const {homePage} = storeToRefs(useHomeStore())

async function loadData(){
  loading.value = true
  const {data} = await useApiFetch("/pages/home")
  if(data?.value){
    useHomeStore()?.fill(data?.value?.data)
  }

  loading.value = false

}

loadData()


</script>

