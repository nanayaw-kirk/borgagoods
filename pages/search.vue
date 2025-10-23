<template>
  <div>
   <Head>
    <Title>Search | {{$appName}}</Title>
    <Meta name="description" :content="`Search ${$appName}`" />
    <Meta name="keywords" content="search,merch,team"></Meta>
    <Meta name="robots" content="index, follow"></Meta>
  </Head>

  <div class="container grid gap-4  pt-2 md:pt-4 px-2">

    <div>
      <div class="w-full relative group">
        <ui-input class="w-full h-12 md:h-14" v-model="searchQuery" autofocus placeholder="Search for products, collections, and partner stores" @keyup.enter="handleSearch"></ui-input>
        <span class="icon-close text-sm md:text-xl absolute top-0 right-0 size-12 md:size-14 center bg-border rounded-r cursor-pointer uk-animation-slide-top-small uk-animation-fast" v-show="searchQuery" @click.prevent="resetSearch"></span>
      </div>
    </div>

    <nuxt-page :key="`key-${$route?.query?.q}`" @reset="resetSearch"/>
  </div>
</div>
</template>
<script setup lang="ts">

const currentTab = ref('products')

const searchStore = useSearchStore()

const searchQuery = ref(useRoute()?.query?.q)


// Filter recent searches based on current input
const filteredRecentSearches = computed(() => {
  if (!searchQuery.value.trim()) {
    return searchStore.getRecentSearches
  }

  return searchStore.getRecentSearches.filter(search =>
    search.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

const allRecentSearches = computed(() => searchStore.getRecentSearches)


function handleSearch() {
  if (!searchQuery.value.trim()) return
    const query = searchQuery.value.trim()
  searchStore.addSearch(query)

  // Here you would typically perform the actual search
  navigateTo({name: useRoute()?.name, query : { q : query}})
}

function selectSearch(search){
  searchQuery.value = search
  handleSearch()
}

function removeSearch(search){
  searchStore.removeSearch(search)
}

function clearSearches() {
  if (confirm('Clear all recent searches?')) {
    searchStore.clearAllSearches()
  }
}


function resetSearch(){
  searchQuery.value = ''
  navigateTo({name: useRoute()?.name})
}

</script>


