<template>
  <div>

      <Head>
        <Title>Explore {{$appName}} - Discover pieces from our wide range of categories inspired by the game, and the fans who live it.</Title>
        <Meta name="description" :content="`Discover pieces from our wide range of categories inspired by the game, and the fans who live it.`" />
        <Meta name="keywords" :content="$keywords"></Meta>
        <Meta name="robots" content="index, follow"></Meta>
    </Head>


    <div class="container py-2 px-4 md:px-2 md:py-4 grid gap-y-4 md:gap-y-8">


      <div class="flex flex-col w-full px-4 sm:px-0">
        <h2 class="text-xl text-center sm:text-left md:text-2xl font-bold">
          Explore {{$appName}} 
      </h2>
      <p class="text-foreground/70 text-center sm:text-left text-sm md:text-base">
       Discover pieces from our wide range of categories inspired by the game, and the fans who live it.
   </p>
</div>


<div class="w-full grid gap-4 lg:grid-cols-4" v-if="filteredCategories?.length > 0">
    <category-preview v-for="(category, index) in filteredCategories" :key="category?.uuid" :category="category"></category-preview>
</div>
</div>
</div>
</template>
<script setup lang="ts">

const { categoriesWithProducts } = storeToRefs(categoriesStore())

const filteredCategories = computed(()=> categoriesWithProducts?.value?.filter(item => item?.total_products >= 2))

</script>
