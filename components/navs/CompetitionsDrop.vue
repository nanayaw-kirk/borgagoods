<template>
  <ui-navigation-menu>
    <ui-navigation-menu-list class="gap-x-3">
      <ui-navigation-menu-item>
        <ui-navigation-menu-trigger>Competitions</ui-navigation-menu-trigger>
        <ui-navigation-menu-content>
          <div class="w-[700px]">
            <div class="expand">
             <div class="p-2">
              <div class="flex gap-x-3">
               <template v-for="sp in $sportsWithPartners" :key="sp?.uuid">
                <div class="px-3 py-1 rounded hover:bg-primary/5 cursor-pointer" @click.prevent="urlFilters.discipline = sp?.slug; urlFilters.type = ''" :class="urlFilters?.discipline === sp?.slug ? 'bg-primary/10' : ''">
                  <span class="text-sm">{{sp?.name}}</span>
                </div>
              </template>
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
                  <div class="flex flex-wrap gap-3">
                    <template v-for="partner in list" :key="partner?.uuid">
                      <div>
                        <nuxt-link :to="{name : 'partner', params : {partner: partner?.slug}}" class="flex items-center gap-x-2 p-2 hover:bg-muted rounded">
                          <ui-avatar class="w-6 h-6">
                            <ui-avatar-image :src="partner?.logo_url"></ui-avatar-image>
                            <ui-avatar-fallback class="uppercase">{{partner?.name?.substring(0,2)}}</ui-avatar-fallback>
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
  discipline : 'football',
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