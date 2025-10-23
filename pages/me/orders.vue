<template>
	<div>


		<Head>
			<Title>Orders | {{$appName}}</Title>
		</Head>


		<div class="container w-full px-0 md:px-4">


			<div class="px-2 p-4  py-0 md:!px-0 flex flex-col">
				<div class="flex gap-2 md:gap-x-4 md:mb-4">
					<span class="icon-news-outlined text-4xl md:text-5xl"></span>
					<div class="expand flex flex-col">
						<h3 class="text-xl md:text-2xl font-medium">
							Orders
						</h3>
						<span class="text-xs md:text-sm text-foreground/70 -mt-2 md:-mt-1">Manage your orders on {{$appName}}</span>
					</div>

					<div class="flex gap-x-2 items-center">
						<div>
							<ui-button class="size-7 md:size-9 rounded-md  md:rounded-xl" variant="ghost" size="icon" :disabled="loading || fetching">
								<span class="icon-date  md:text-xl"></span>
							</ui-button>
						</div>

						<div>
							<ui-button class="size-7 md:size-9 rounded-md  md:rounded-xl" variant="ghost" size="icon" :disabled="loading || fetching">
								<span class="icon-dots-horizontal  md:text-xl"></span>
							</ui-button>
						</div>

						<div>
							<ui-button class="size-7 md:size-9 rounded-md  md:rounded-xl" variant="ghost" size="icon" :disabled="loading || fetching" @click.prevent="fetchData()">
								<span class="md:text-xl" :class="loading || fetching ? 'icon-spinner animate-spin' : 'icon-reload'"></span>
							</ui-button>
						</div>
					</div>
				</div>


			<!-- 	<div class="py-2 flex items-center gap-x-2 w-full relative max-w-sm md:max-w-full">
					<div class="w-full">
						<div uk-slider="finite:true" class="z-[4]">
							<navs class="flex uk-slider-items gap-x-2 max-w-full md:max-w-full">
								<ui-badge variant="pending">
									Pending
								</ui-badge>

								<ui-badge variant="confirmed">
									Confirmed
								</ui-badge>

								<ui-badge variant="processing">
									Being Processed
								</ui-badge>

								<ui-badge variant="out-for-delivery">
									Out for Delivery
								</ui-badge>

								<ui-badge variant="delivered">
									Delivered
								</ui-badge>

								<ui-badge variant="completed">
									Completed
								</ui-badge>

								<ui-badge variant="cancelled">
									Cancelled
								</ui-badge>


								<ui-badge variant="returned">
									Returned
								</ui-badge>
							</navs>
						</div>
					</div>
				</div> -->
			</div>

			<section class="grid">
				<error-parser :error="errData" v-if="failed && errData"></error-parser>

				<template v-else>

					<template v-if="loading">

						<div class="grid">

							<div class="w-full flex gap-4 items-start p-2"  v-for="i in 5">

								<div class="expand flex gap-4 items-center">
									<ui-skeleton class="size-10 md:size-12"></ui-skeleton>
									<div class="expand md:max-w-md flex flex-col gap-y-1">
										<ui-skeleton class="h-4 w-1/2"></ui-skeleton>
										<ui-skeleton class="h-2 w-full"></ui-skeleton>
									</div>
								</div>
								<div class="flex items-center gap-x-2 justify-end">
									<div>
										<ui-skeleton class="size-7"></ui-skeleton>
									</div>
								</div>
							</div>

						</div>
					</template>
					<template v-else>
						<template v-if="list && list.length > 0">
							<div class="grid divide-y md:divide-y-0 md:gap-2">

								<template  v-for="(order, index) in list" :key="order?.uuid">
									<order-entry :entry="order" class="md:!border md:rounded-xl p-2 md:hover:shadow-md cursor-pointer" @refresh="fetchData()"></order-entry>
								</template>

							</div>


							<template v-if="pagination && pagination.total_pages > pagination.current_page">
								<div class="px-0 py-2 flex justify-center mt-4">
									<ui-button @click="fetchMore()" class="w-fit  gap-x-4" variant="ghost">
										<span class="icon-spinner animate-spin" v-if="fetching"></span>
										<span>
											Show Older Orders
										</span>
									</ui-button>
								</div>
							</template>

						</template>

						<template v-else>

							<div class="p-4 mx-auto max-w-md flex flex-col items-center gap-y-4">
								<span class="icon-assoc-filled text-5xl"></span>
								<div class="flex flex-col">
									<h4 class="text-xl font-medium text-center">No data found</h4>
									<span class="text-center text-foreground/70">We could not find any data at this time</span>
								</div>
								<ui-button size="sm" @click="fetchData(); fetchUser()">Try Again</ui-button>
							</div>
						</template>
					</template>
				</template>

			</section>


		</div>
	</div>
</template>
<script setup lang="ts">
const processing = ref(false)
const {modalSize} = useModalResize()
const {user} = storeToRefs(useAuthStore())

const {fetchUser} = useAuthStore()

const  {list , loading, fetching, pagination, failed, errData, fetchData, fetchMore} = useDataLoader(`/orders?include=user,shipping_address,shipping_address.location&paginate=8`)

</script>
