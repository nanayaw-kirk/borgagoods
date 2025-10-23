<template>
	<div>
		<div class="cursor-pointer" @click.prevent="mdAndUp ? open = true : navigateTo({name: 'search'})">
			<slot name="trigger">
				<div class="w-[200px] relative" v-if="mdAndUp">
					<ui-input class="!ring-0" placeholder="Search" readonly></ui-input>
					<span class="icon-search text-xl absolute top-1 right-2"></span>
				</div>
				<span class="icon-search text-2xl" v-else></span>

			</slot>
		</div>

		<ui-sheet v-model:open="open">
			<div class="w-full relative">
				<ui-sheet-content side="top" class="!transition-none data-[state=closed]:duration-100 data-[state=open]:duration-100 rounded-b-xl border p-0 gap-0 md:max-w-[1300px] mx-auto z-[9999]" :hideClose="true"  @interactOutside.prevent="open = false" @escapeKeyDown.prevent="open = false">
					<ui-sheet-header class="gap-y-0 p-3 border-b hidden">
						<ui-sheet-title class="font-medium mb-0 text-center">Search</ui-sheet-title>
						<ui-sheet-description class="!mt-1 text-center text-foreground/70 md:px-4 line-clamp-2 md:line-clamp-1">Search for products</ui-sheet-description>
					</ui-sheet-header>
					<div class="md:max-w-[1300px] mx-auto p-4 grid gap-6">
						<div class="w-full relative">
							<ui-input class="w-full h-14" v-model="searchQuery" autofocus placeholder="Search for products" @keyup.enter="handleSearch"></ui-input>
							<span class="icon-close text-xl absolute top-0 right-0 size-14 center bg-border rounded-r cursor-pointer" @click.prevent="open = false; searchQuery = ''"></span>
						</div>
						<div class="grid gap-4">
							<template v-if="allRecentSearches?.length > 0">
								<div class="flex flex-col gap-y-2">
									<span class="text-sm font-medium">Recent Searches</span>
									<div class="flex flex-wrap gap-2">
										<div class="max-w-[150px] flex gap-x-2 items-center py-1 px-2 bg-border/70 border rounded-md cursor-pointer" @click.prevent="selectSearch(sch)" v-for="(sch, key) in allRecentSearches" :key="`sch-${index}`">
											<span class=" line-clamp-1 expand text-sm">
												{{sch}}
											</span>
											<span class="icon-close size-5 rounded-md bg-border text-xs center hover:bg-background" @click.stop="removeSearch(sch)"></span>
										</div>
									</div>
								</div>
							</template>
						</div>
					</div>
				</ui-sheet-content>
			</div>
		</ui-sheet>
	</div>	
</template>
<script setup lang="ts">


const open = ref(false)
const {mdAndUp} = useScreenSize()


const searchStore = useSearchStore()

const searchQuery = ref('')


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
	navigateTo({name: 'search', query : { q : query}})
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

</script>
