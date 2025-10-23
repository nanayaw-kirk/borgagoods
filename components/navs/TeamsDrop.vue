<template>
  <ui-navigation-menu :skipDelayDuration="0">
    <ui-navigation-menu-list class="gap-x-3">
      <ui-navigation-menu-item>
        <ui-navigation-menu-trigger>Stores</ui-navigation-menu-trigger>
        <ui-navigation-menu-content>
          <div class="w-[800px]">
            <div class="background flex divide-x">
              <div class="expand">
               <div class="p-2">
                <div class="flex gap-x-3">

                  <div class="px-3 py-1 rounded hover:bg-border/50 dark:hover:bg-border cursor-pointer" @click.prevent="urlFilters.discipline = ''; urlFilters.type = ''" :class="urlFilters?.discipline === '' ? 'bg-primary hover:!bg-primary text-primary-foreground' : ''">
                    <span class="text-sm">All Stores</span>
                  </div>


                  <template v-for="sp in $sportsWithPartners" :key="sp?.uuid">
                    <div class="px-3 py-1 rounded hover:bg-border/50 dark:hover:bg-border cursor-pointer" @click.prevent="urlFilters.discipline = sp?.slug; urlFilters.type = ''" :class="urlFilters?.discipline === sp?.slug ? 'bg-primary hover:!bg-primary text-primary-foreground' : ''">
                      <span class="text-sm">{{sp?.name}}</span>
                    </div>
                  </template>

            <!--     <div class="px-3 py-1 rounded hover:bg-accent/5 cursor-pointer">
                  <span class="text-sm">Schools & Colleges</span>
                </div> -->
              </div>
            </div>
            <div class="p-2">
              <template v-if="loading">
                <div class="center p-2">
                  <span class="icon-loading text-4xl animate-spin"></span>
                </div>
              </template>
              <template v-else>
                <template v-if="list && list?.length > 0">
                  <div class="@container">
                    <div class="grid @sm:grid-cols-2 @md:grid-cols-3 gap-1">
                      <template v-for="partner in list" :key="partner?.uuid">
                        <div>
                          <nuxt-link :to="{name : 'partner', params : {partner: partner?.slug}}" class="flex items-center gap-x-2 p-1 hover:bg-border/50 dark:hover:bg-border rounded">
                            <ui-avatar class="size-6 bg-border/50" :class="partner?.logo_url ? '' : 'border'">
                              <ui-avatar-image :src="partner?.logo_url"></ui-avatar-image>
                              <ui-avatar-fallback class="uppercase">{{partner?.name?.substring(0,1)}}</ui-avatar-fallback>
                            </ui-avatar>
                            <span class="expand line-clamp-1 text-xs">
                              {{partner?.name}}
                            </span>
                          </nuxt-link>
                        </div>
                      </template>
                    </div>
                  </div>
                </template>
              </template>
            </div>
          </div>
          <div class="p-2 w-[250px]">
            <nuxt-link :to="{name: 'stores'}" class="flex flex-col items-start gap-y-2 px-2">
              <div class="w-full h-[120px] bg-primary rounded"></div>
              <span class="text-lg font-bold">Find Official Partner Stores on {{$appName}}</span>
              <p class="line-clamp-3 text-sm">The hassle free licensed merchandise solution for sports businesses in emerging markets</p>
              <ui-button variant="link" class="px-0">
                Discover Partner Stores
              </ui-button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </ui-navigation-menu-content>
  </ui-navigation-menu-item>
</ui-navigation-menu-list>
</ui-navigation-menu>
</template>

<script setup lang="ts">
const loading = ref(false)
const list = ref([])

const urlFilters = ref({
  paginate : 100,
  discipline : '',
  type : ''
})



async function loadData(){
  loading.value = true
  const {data, error} = await useApiFetch("/partners", {query : urlFilters})
  if (data?.value) {
    list.value = data?.value?.data
  }
  loading.value = false
}


// watch(() => urlFilters, async () => {
//   await loadData()
// }
// )


onMounted(async ()=>{
  await nextTick()
  await loadData()
})


watch(() => 
  urlFilters?.value, async() => {
    await loadData()
  }, 
  { deep: true })
</script>