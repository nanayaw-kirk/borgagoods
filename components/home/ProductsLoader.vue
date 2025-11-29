<template>
	<div>
		
		<div>
			<template v-if="loading">
				<div class="w-full">
					<div class="w-full grid gap-1 md:gap-2 grid-cols-3 lg:grid-cols-6">
						<div v-for="i in 6">
							<div class="w-full relative rounded cursor-pointer p-[5px]  dark:bg-muted/50 group border dark:border-none shadow-sm dark:shadow-none">

								<div>
									<div class="w-full flex flex-col relative">

										<ui-skeleton class="rounded w-full aspect-square"></ui-skeleton>

										<div class="flex flex-col w-full py-2 px-1">
											<ui-skeleton class="h-3 md:h-4 mb-1"/>
											<ui-skeleton class="h-2 md:h-3 mb-2"/>
											<div class="flex justify-between items-center p-1 pb-0 gap-4">
												<ui-skeleton class="expand h-3 md:h-6 rounded"/>
												<ui-skeleton class="h-3 w-3 md:w-6 md:h-6 rounded"></ui-skeleton>
											</div>
										</div>
									</div>
								</div>

								<div class="w-full bottom-0 absolute flex items-center justify-between z-10  mb-[100px] md:mb-[110px] pr-4 pl-2">

									<div>
										<ui-skeleton class="w-20 h-7 hidden md:inline-flex"></ui-skeleton>
										<ui-skeleton class="w-7 h-7 md:hidden"></ui-skeleton>
									</div>
									<div>
										<ui-skeleton class="w-7 h-7"></ui-skeleton>
									</div>

								</div>

							</div>
						</div>
					</div>
				</div>
			</template>

			<template v-else>
				<template v-if="list && list.length > 0">
					<div class=" w-full">
						<div class="w-full grid gap-1 md:gap-2 grid-cols-3 lg:grid-cols-6">
							<product-card v-for="(entity, index) in list" :key="entity?.uuid" :entry="entity"></product-card>
						</div>
					</div>

				</template>
			</template>
		</div>

	</div>
</template>
<script setup lang="ts">


const props = defineProps({
	endpoint : {
		type : String,
		default : 'products'
	}
})



const filterOptions = computed(() => {
	return {
		include : 'media',
		scope : 'new-arrivals',
		paginate : 6
	}
})

const {list , loading, failed, errData, fetchData} = await useDataLoader(`/${props.endpoint}`, filterOptions)


watch(()=> filterOptions?.value, (newVal, oldVal) => {
	if(!loading.value){
		fetchData()
	}
},  { deep: true })



</script>
