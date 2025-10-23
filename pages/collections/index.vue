<template>
  <div>

    <Head>
      <Title>Collections | {{$appName}}</Title>
      <Meta name="description" :content="`Shop curated pieces inspired by the game, the culture, and the fans who live it.`" />
      <Meta name="keywords" content="collections,merchandise,merch,sports,apparel,african sports"></Meta>
      <Meta name="robots" content="index, follow"></Meta>
    </Head>
    <div class="container px-4 p-2 md:py-4 md:px-2">


      <div class="flex flex-col w-full px-4 sm:px-0">
        <h2 class="text-xl text-center sm:text-left md:text-2xl font-bold">
          Collections
        </h2>
        <p class="text-foreground/70 text-center sm:text-left text-sm md:text-base">
          Shop curated pieces inspired by the game, the culture, and the fans who live it.
        </p>
      </div>

      <div class="my-4 md:max-w-xl relative">
        <ui-input :type="searching ? 'text' : 'search'" :disabled="loading || searching" v-model="searchQuery" placeholder="Search collections" class="md:h-12"  @search.prevent="searchQuery?.length > 2 ? searchData() : fetchData()"></ui-input>
        <div class="absolute inset-y-0 right-0 flex items-center">
          <div class="center cursor-pointer mr-2" v-if="searchQuery?.length > 0" @click.prevent="searchQuery = ''; fetchData()">
            <span class="icon-close text-foreground/40"></span>
          </div>
          <ui-button size="icon" class="md:h-12 rounded-none rounded-r" :disabled="loading || searching || searchQuery?.length < 3"  @click.prevent="searchQuery?.length > 2 ? searchData() : ''">
            <span :class="searching ? 'icon-spinner animate-spin' : 'icon-search'"></span>
          </ui-button>
        </div> 
      </div>

      <template v-if="loading || searching">
        <div class="w-full">
         <div class="w-full grid gap-2 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          <div v-for="i in 5">
           <div class="grid gap-1 w-full">

            <div class="w-full h-40 bg-border dark:bg-gray-100/30 rounded-t-lg">
            </div>

            <div class="grid grid-cols-3 gap-1">
              <div class="w-full rounded-bl-lg h-[100px] md:h-16 bg-border dark:bg-gray-100/30"></div>
              <div class="w-full h-[100px] md:h-16 bg-border dark:bg-gray-100/30"></div>
              <div class="w-full rounded-br-lg h-[100px] md:h-16 bg-border dark:bg-gray-100/30"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <template v-else>
    <template v-if="list && list.length > 0">
      <div class=" w-full">
        <div class="w-full grid gap-8 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          <collection-entry v-for="(entity, index) in list" :key="entity?.uuid" :entry="entity"></collection-entry>
        </div>
      </div>


      <template v-if="pagination && pagination.total_pages > pagination.current_page">
        <div class="px-0 py-2 flex justify-center mt-4">
          <ui-button @click="fetchMore()" class="w-fit  gap-x-4" variant="ghost">
            <span class="icon-spinner animate-spin" v-if="fetching"></span>
            <span>
              Load More
            </span>
          </ui-button>
        </div>
      </template>

    </template>

    <template v-else>
      <slot name="notFound">
        <div class="mx-auto max-w-[550px] flex flex-col items-center pt-10">
          <icons-library class="text-7xl text-foreground/70"></icons-library>
          <div class="flex flex-col items-center mt-3 mb-4">
            <h2 class="text-xl md:text-2xl text-center font-medium">No collection found</h2>
            <p class="text-center text-sm md:text-base text-foreground/70">
              Sorry we could not find a collection at the moment
            </p>
          </div>
          <ui-button class="h-10" @click="fetchData()" variant="outline">
            Try Again
          </ui-button>
        </div>
      </slot>
    </template>
  </template>
</div>

</div>
</template>
<script setup lang="ts">


const props = defineProps({
  endpoint : {
    type : String,
    default : 'collections'
  }
})


const filterOptions = computed(() => {
  return {
    include : 'tags,image,products,products.media',
    paginate : 20
  }
})

const {list , loading, fetching, pagination, failed, errData, fetchData, fetchMore, searchQuery, searchData, searching} = await useDataLoader(`/${props.endpoint}`, filterOptions)


watch(()=> filterOptions?.value, (newVal, oldVal) => {
  if(!loading.value && !searching.value && !fetching.value){
    fetchData()
  }
},  { deep: true })



</script>
