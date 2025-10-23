<template>
	<div>
		<div class="grid gap-2">
			<div class="flex gap-x-2 items-center">
				<div class="expand relative">
					<ui-input :type="searching ? 'text' : 'search'" :disabled="loading || searching" v-model="searchQuery" placeholder="Search teams & partners" class="md:h-12"  @search.prevent="searchQuery?.length > 2 ? searchData() : fetchData()"></ui-input>
					<div class="absolute inset-y-0 right-0 center cursor-pointer pr-3" v-if="searching">
						<span class="icon-loading animate-spin"></span>
					</div> 
				</div>

				<ui-button class="md:h-12" @click.prevent="searchData" :disabled="loading || searching">
					Search
				</ui-button>
			</div>

			
			

			<div class="grid grid-cols-2 gap-2">
				<div>
					<ui-popover v-model:open="openLocations">
						<ui-popover-trigger as-child>
							<div class="w-full relative border rounded-md cursor-pointer flex flex-col" :class="openLocations ? 'ring-2 ring-ring' : ''">
								
								<div class="flex flex-col my-auto">
									<template v-if="country?.name">
										<div class="flex gap-x-3 py-2 px-2 items-center cursor-pointer h-10 md:h-12">
											<div class="-mt-[5px]">
												<country-flag :country="country?.alpha_2_code"></country-flag>
											</div>
											<div class="expand truncate text-sm">
												{{country?.name}}
											</div>

											<span class="icon-down"></span>
										</div>
									</template>
									<template v-else>
										<div class="flex items-center gap-x-3 py-2 px-2 h-10 md:h-12">
											<span class="icon-international"></span>
											<div class="expand">
												International
											</div>
											<span class="icon-down"></span>
										</div>
									</template>
								</div>
							</div>
						</ui-popover-trigger>
						<ui-popover-content class="w-md md:w-sm p-0 border bg-background ml-3">
							<ui-command class="max-w-full w-full p-0 !shadow-none bg-background text-foreground !divide-none" :filterFunction="filterFunction">
								<ui-command-input placeholder="Search country" class="min-w-full w-full h-12"/>
								<ui-command-list>
									<ui-command-empty>
										<div>No country found </div>	
									</ui-command-empty>
									<ui-command-group class="p-0 flex flex-col w-full !shadow-none">

										<ui-scroll-area class="w-full h-[200px]">
											<ui-command-item class="cursor-pointer rounded-none" :value="null" @select="(ev) => { openLocations = false; country = null }">
												<div class="flex items-center gap-x-3 !px-2">
													<div>
														<span class="icon-international text-xl"></span>
													</div>
													<span class="expand line-clamp-1">
														International
													</span>
												</div>
											</ui-command-item>

											<ui-command-item class="cursor-pointer rounded-none" v-for="(c, key) in $locations" :key="key" :value="c" @select="(ev) => { openLocations = false; country = c }">
												<div class="flex items-center gap-x-2">
													<div class="-mt-[5px]">
														<country-flag :country="c?.alpha_2_code"></country-flag>
													</div>
													<span class="expand line-clamp-1">
														{{c.name}}
													</span>
												</div>
											</ui-command-item>
										</ui-scroll-area>
									</ui-command-group>
								</ui-command-list>
							</ui-command>
						</ui-popover-content>
					</ui-popover>
				</div>
				<div>
					<ui-popover v-model:open="openSports">
						<ui-popover-trigger as-child>
							<div class="w-full relative border rounded-md cursor-pointer flex flex-col" :class="openSports ? 'ring-2 ring-ring' : ''">
								
								<div class="flex flex-col my-auto">
									<template v-if="sport?.name">
										<div class="flex gap-x-3 px-2 items-center cursor-pointer h-10 md:h-12">
											<ui-avatar class="w-[25px] h-[25px]">
												<ui-avatar-image :src="`/sports/${sport?.slug.split('-').join('')}.svg`"></ui-avatar-image>
												<ui-avatar-fallback class="uppercase">{{sport?.name?.substring(0,2)}}</ui-avatar-fallback>
											</ui-avatar>
											<div class="expand truncate text-sm">
												{{sport?.name}}
											</div>

											<span class="icon-down"></span>
										</div>
									</template>
									<template v-else>
										<div class="flex items-center gap-x-3 py-2 px-2 h-10 md:h-12">
											<div>
												<span class="icon-sort-numeric-down text-xl"></span>
											</div>
											<div class="expand">
												All Sports
											</div>
											<span class="icon-down"></span>
										</div>
									</template>
								</div>
							</div>
						</ui-popover-trigger>
						<ui-popover-content class="w-md md:w-sm p-0  border bg-background ml-3">
							<ui-command class="max-w-full w-full p-0 !shadow-none bg-background text-foreground !divide-none" :filterFunction="filterSports">
								<ui-command-input placeholder="Search sports" class="min-w-full w-full h-12"/>
								<ui-command-list>
									<ui-command-empty>
										<div>No sport found </div>	
									</ui-command-empty>
									<ui-command-group class="p-0 flex flex-col w-full !shadow-none">

										<ui-scroll-area class="w-full h-[200px]">
											<ui-command-item class="cursor-pointer rounded-none" :value="null" @select="(ev) => { openSports = false; sport = null }">
												<div class="flex items-center gap-x-2 px-1">
													<div>
														<span class="icon-sort-numeric-down text-xl"></span>
													</div>
													<span class="expand line-clamp-1">
														All Sports
													</span>
												</div>
											</ui-command-item>

											<ui-command-item class="cursor-pointer rounded-none" v-for="(sp, key) in $sports" :key="sp?.uuid" :value="sp" @select="(ev) => { openSports = false; sport = sp }">
												<div class="flex items-center gap-x-2">

													<ui-avatar class="w-[25px] h-[25px]">
														<ui-avatar-image :src="`/sports/${sp?.slug.split('-').join('')}.svg`"></ui-avatar-image>
														<ui-avatar-fallback class="uppercase">{{sp?.name?.substring(0,2)}}</ui-avatar-fallback>
													</ui-avatar>

													<span class="expand line-clamp-1">
														{{sp.name}}
													</span>
												</div>
											</ui-command-item>
										</ui-scroll-area>
									</ui-command-group>
								</ui-command-list>
							</ui-command>
						</ui-popover-content>
					</ui-popover>
				</div>
			</div>
		</div>


		<div>
			<ui-scroll-area class="h-[40dvh] md:h-[50dvh] pt-4">

				<template v-if="loading">
					<div class="p-4 center">
						<span class="icon-loading animate-spin text-2xl"></span>
					</div>
				</template>

				<template v-else>
					<template v-if="list && list.length > 0">
						<div class="w-full grid gap-[3px]">
							
							<template v-for="(entity, index) in list" :key="entity?.uuid">
								<div class="flex gap-2 md:gap-3 items-center cursor-pointer hover:!bg-muted/70 p-2 rounded-md uk-animation-slide-top-small" :class="teams?.includes(entity?.uuid) ? 'bg-gray-100/[5%]' : ''" @click="syncTeam(entity?.uuid)" :style="`animation-delay: ${index*50}ms`">

									<ui-avatar class="w-[25px] h-[25px] md:w-[35px] md:h-[35px]" :class="entity?.logo_url ? 'bg-transparent' : 'bg-primary text-white'">
										<ui-avatar-image :src="entity?.logo_url"></ui-avatar-image>
										<ui-avatar-fallback class="uppercase">{{entity?.name?.substring(0,2)}}</ui-avatar-fallback>
									</ui-avatar>

									<div class="expand flex flex-col my-auto">
										<span class="line-clamp-1 text-sm md:text-base">
											{{entity?.name}}
										</span>
									</div>

									<country-flag size="large" class="my-auto !-mt-3 !mr-4 md:mr-6" :country="entity?.country?.alpha_2_code"></country-flag>

									<span class="text-xl" :class="teams?.includes(entity?.uuid) ? 'icon-star-filled text-primary' : 'icon-star-outline'"></span>
								</div>
							</template>
						</div>


						<template v-if="pagination && pagination.total_pages > pagination.current_page">
							<div class="px-0 py-2">
								<ui-button @click="fetchMore()" class="w-full dark:hover:bg-accent/10 gap-x-4" variant="outline">
									<span class="icon-loading animate-spin" v-if="fetching"></span>
									<span>
										Load More
									</span>
								</ui-button>
							</div>
						</template>

					</template>

					<template v-else>
						<div class="mx-auto max-w-[550px] flex flex-col items-center pt-10">
							<span class="icon-shield-filled text-4xl md:text-6xl text-foreground/70"></span>
							<div class="flex flex-col items-center mt-3 mb-4">
								<h2 class="text-xl md:text-2xl text-center font-medium">No teams/partners found</h2>
								<p class="text-center text-sm md:text-base text-foreground/70">
									Sorry we could not find a teams/partners at the moment
								</p>
							</div>
							<ui-button class="h-10" @click="resetFilters(); fetchData()" variant="outline">
								{{searchQuery || (country || sport) ? "Load all Partners" : "Try Again"}}
							</ui-button>
						</div>
					</template>
				</template>
			</ui-scroll-area>
		</div>

	</div>
</template>
<script setup lang="ts">

const emit = defineEmits(['update:entries'])

const props = defineProps({
	entries : {
		type : Array
	},
	preloadSport : {
		type : Object,
	}
})

const openLocations = ref(false)
const openSports = ref(false)
const country = ref(useNuxtApp()?.$currentLocale)
const sport = ref(props?.preloadSport)



const teams = ref(props.entries)

function filterFunction(array, searchTerm) {
	return useNuxtApp()?.$locations?.filter(item => item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
}

function filterSports(array, searchTerm) {
	return useNuxtApp()?.$sports?.filter(item => item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
}



function syncTeam(team){
	if (teams?.value?.includes(team)) {
		teams.value = teams?.value?.filter(opt => opt !== team)
		return
	}

	teams.value.push(team)
}

function resetFilters(){
	country.value = null
	sport.value = null
}


const filterOptions = computed(() => {
	return {
		include : 'country,discipline',
		country : country?.value?.uuid,
		discipline : sport?.value?.uuid,
		paginate : 100
	}
})

const {list , loading, fetching, pagination, failed, errData, fetchData, fetchMore, searchQuery, searchData, searching} = await useDataLoader(`/partners`, filterOptions)


watch(()=> filterOptions?.value, (newVal, oldVal) => {
	if(!loading.value && !searching.value && !fetching.value){
		fetchData()
	}
},  { deep: true })


watch(teams, (newVal, oldVal)=>{
	emit('update:entries', newVal)
})

</script>
