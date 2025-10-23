<template>
	<div>


		<Head>
			<Title>Following | {{$appName}}</Title>
		</Head>


		<div class="container w-full px-0">

			<section class="grid pb-16">
				<error-parser :error="errData" v-if="failed && errData"></error-parser>

				<template v-else>

					<template v-if="loading">

						<div class="grid divide-y">

							<div class="w-full flex gap-4 items-start p-2"  v-for="i in 5">

								<div class="expand flex gap-4 items-center">
									<ui-skeleton class="size-10 md:size-14"></ui-skeleton>
									<div class="expand flex flex-col gap-y-1">
										<ui-skeleton class="h-4 w-full"></ui-skeleton>
										<ui-skeleton class="h-2 w-1/2"></ui-skeleton>
									</div>
								</div>
								<div class="flex items-center gap-x-2 justify-end">
									<div>
										<ui-skeleton class="h-7 md:h-8 w-14"></ui-skeleton>
									</div>
								</div>
							</div>

						</div>
					</template>
					<template v-else>
						<template v-if="list && list.length > 0">
							<div class="grid divide-y">

								<template  v-for="(partner, index) in list" :key="partner.uuid">
									<account-partner-following  @done="fetchData(); fetchUser(); processing = false" @hideEntry="(payload) => hideEntry(payload)" class="p-2" :entry="partner"></account-partner-following>
								</template>

							</div>

						</template>

						<template v-else>

							<div class="p-4 mx-auto max-w-md flex flex-col items-center gap-y-4">
								<span class="icon-team-outline text-5xl"></span>
								<div class="flex flex-col">
									<h4 class="text-xl font-medium text-center">Nothing here yet</h4>
									<span class="text-center text-foreground/70">FFollow your favorite teams on {{$appName}} for merch drops, exclusive deals, and more!</span>
								</div>

								<div class="flex flex-col gap-y-2 w-full">
									<nuxt-link :to="{name: 'stores'}" class="w-full">
										<ui-button class="w-full">Discover Teams</ui-button>
									</nuxt-link>

									<ui-button variant="ghost" @click="fetchData();" class="w-full">Try Again</ui-button>
								</div>
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
const user =  inject('user')

const {fetchUser} = useAuthStore()

const  {list , loading, fetching, pagination, failed, errData, fetchData} = useDataLoader(`/account/followed-partners?include=country`)

function hideEntry(payload){
	list.value = list?.value?.filter(item => item?.uuid !== payload)
}

</script>
