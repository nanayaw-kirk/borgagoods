    <template>
      <div>
        <Title>Teams | Find official stores on {{$appName}}</Title>
        <Meta name="description" :content="`Find official stores on ${$appName}`" />
        <Meta name="keywords" :content="$keywords"></Meta>
        <Meta name="robots" content="index, follow"></Meta>



        <div class="container p-2 md:p-0 md:py-4 grid gap-4 md:gap-6">


          <div class="flex flex-col items-center gap-y-2">
            <div class="flex flex-col items-center">
              <h2 class="text-center text-lg md:text-2xl font-bold">Find Official Stores</h2>
            </div>

            <div class="w-full md:max-w-sm lg:max-w-xl relative  mx-auto focus-within:ring focus-within:ring-4 ring-offset-4 ring-primary ring-offset-background rounded-md">
              <div class="absolute inset-y-0 right-0 center cursor-pointer bg-primary p-4 rounded-r-md" @click.prevent="searchQuery?.length > 2 ? searchData() : ''">
                <span class="text-lg text-primary-foreground" :class="searching ? 'icon-spinner animate-spin' : 'icon-search' "></span>
              </div> 

              <ui-input :type="searching ? 'text' : 'search'" class="!h-[50px] pr-16 bg-background !ring-0" placeholder="Search for a store..." :disabled="loading || searching || fetching" v-model="searchQuery" @search.prevent="searchQuery?.length > 2 ? searchData() : fetchData()"></ui-input> 
            </div>
          </div>


          <error-parser :error="errData" v-if="failed && errData"></error-parser>

          <template v-else>
            <template v-if="loading">
              <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 lg:gap-6 w-full">
                <ui-skeleton class="h-20 bg-border/30 dark:border" v-for="i in 15" :key="`loader-${i}`"></ui-skeleton>
              </div>
            </template>
            <template v-else>
              <template v-if="list && list.length > 0">
               <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 lg:gap-6 w-full">


                <template v-for="partner in list" :key="partner?.uuid">
                  <nuxt-link :to="{name: 'partner', params:{partner : partner?.slug}}">
                    <div class="w-full  px-2 py-4 flex flex-col items-center gap-2  border-muted/70 dark:border-border rounded-md bg-muted/30 dark:bg-border/60 border border-muted/70 dark:border-border rounded h-full sm:hidden">
                      <div class="size-9 aspect-square mx-auto relative">
                        <ui-avatar class="w-full h-full center" :class="partner?.logo_url ? 'bg-transparent rounded-none' : 'bg-border rounded-md'">
                          <ui-avatar-image class="!object-contain" :src="partner?.logo_url ? partner?.logo_url : '/illustrations/crest.svg'"></ui-avatar-image>
                          <ui-avatar-fallback class="font-black">{{partner?.name?.substring(0,1)}}</ui-avatar-fallback>
                        </ui-avatar>
                      </div>

                      <div class="w-full">
                        <span class="text-[11px] text-foreground/70 font-medium text-center line-clamp-2">
                          {{partner?.name}}
                        </span>
                      </div>
                    </div>

                    <div class="hidden sm:flex items-center gap-4 rounded-md 4 p-3  border-muted/70 dark:border-border rounded-md bg-muted/30 hover:bg-muted/80 dark:bg-border/60 dark:hover:bg-border border border-muted/70 dark:border-border hover:shadow">
                      <div class="size-12 aspect-square">
                        <ui-avatar class="w-full h-full center" :class="partner?.logo_url ? 'bg-transparent rounded-none' : 'bg-border rounded-md'">
                          <ui-avatar-image class="!object-contain" :src="partner?.logo_url ? partner?.logo_url : '/illustrations/crest.svg'"></ui-avatar-image>
                          <ui-avatar-fallback class="font-black">{{partner?.name?.substring(0,1)}}</ui-avatar-fallback>
                        </ui-avatar>
                      </div>

                      <div class="expand flex flex-col my-auto">
                        <span class="text-sm line-clamp-1 font-medium leading-tight">
                          {{partner?.name}}
                        </span>
                        <span class="text-xs text-foreground/70">
                          Explore Products
                        </span>
                      </div>
                    </div>
                  </nuxt-link>
                </template>
              </div>


              <template v-if="pagination && pagination.total_pages > pagination.current_page">
                <div class="md:py-4 px-2 py-2 flex justify-center border-t">
                  <ui-button @click="fetchMore()" class="w-full md:w-fit gap-x-4" variant="ghost">
                    <span class="icon-spinner animate-spin" v-if="fetching"></span>
                    <span>
                      Load More
                    </span>
                  </ui-button>
                </div>
              </template>

            </template>

            <template v-else>

              <div class="p-4 mx-auto max-w-md flex flex-col items-center gap-y-4">
                <icons-crest class="text-5xl text-foreground/70"></icons-crest>
                <div class="flex flex-col">
                  <h4 class="text-xl font-medium text-center">No store found</h4>
                  <span class="text-center text-foreground/70">We could not find any store. <template v-if="searchQuery">Please enter a new search keyword and give it another go.</template></span>
                </div>
                <ui-button size="sm" @click="fetchData()" variant="outline">Try Again</ui-button>
              </div>
            </template>
          </template>
        </template>




      </div>
    </div>  
  </template>
  <script setup lang="ts">

  const url = ref("partners")


  const filterOptions = ref({

  })


  //  const tempFilters = ref({
  //   status : []
  // })



  const  {list , loading, fetching, pagination, failed, errData, fetchData, fetchMore, searchQuery, searchData, searching} = useDataLoader(`/${url.value}`, filterOptions)





  //  function syncArray(key, value){
  //   if(!value){
  //     tempFilters.value[key] = []
  //     return
  //   }

  //   let temp = tempFilters?.value?.[key]
  //   if (temp.includes(value)) {
  //     temp = temp.filter(item => item !== value)
  //   } else{
  //     temp.push(value) 
  //   }

  //   tempFilters.value[key] = temp

  // }

  // function applyFilters(){

  //   const temp = {...filterOptions?.value, ...tempFilters?.value}

  //   filterOptions.value = temp
  // }

  // function resetFilters(){
  //   filterOptions.value = {
  //     include : 'categories',
  //     paginate : 10,
  //     order_by : 'latest',
  //     status : []
  //   }

  //   tempFilters.value = {
  //     status : []
  //   }
  // }


// watch(() => filterOptions, (newVal, oldVal) => {
//   if(!loading.value && !searching.value && !fetching.value){
//     fetchData()
//   }
// }, {deep : true})
  </script>

