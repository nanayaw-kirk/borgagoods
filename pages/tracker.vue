<template>
  <div>

    <Head>
      <Title>Track Your Order | {{$appName}}</Title>
      <Meta name="description" :content="`Order Tracking`" />
      <Meta name="keywords" content="tracking,delivery,order"></Meta>
      <Meta name="robots" content="index, follow"></Meta>
    </Head>

    <div class="container p-4 py-10 md:py-10 md:pt-8 grid gap-8 md:gap-16">
      <div class="md:mb-8">
        <div class="flex flex-col w-full mb-4">
          <h1 class="text-xl md:text-3xl font-bold text-center">
            Track Your Order
          </h1>
          <p class="text-foreground/70 text-sm md:text-base md:-mt-1 text-center">
            Enter an order number to find your order details.
          </p>
        </div>




        <div class="mx-auto md:max-w-md">
         <order-tracker></order-tracker>
       </div>
     </div>



   </div>
 </div>  
</template>
<script setup lang="ts">

const {smAndDown} = useScreenSize()

const {homePage} = storeToRefs(useHomeStore())

const props = defineProps({
  endpoint : {
    type : String,
    default : 'promos'
  }
})

const filterOptions = computed(() => {
  return {
    include : 'image',
    paginate : 15
  }
})

const {list , loading, fetching, pagination, failed, errData, fetchData, fetchMore} = await useDataLoader(`/${props.endpoint}`, filterOptions)


watch(()=> filterOptions?.value, (newVal, oldVal) => {
  if(!loading.value && !searching.value && !fetching.value){
    fetchData()
  }
},  { deep: true })


</script>
