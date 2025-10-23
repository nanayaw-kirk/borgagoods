<template>
	<div>
		<div @click="open = true">
			<slot name="trigger">
				<ui-button class="w-full  gap-x-4" variant="ghost">
					<span>
						See All Reviews
					</span>
				</ui-button>
			</slot>
		</div>

		<partials-sheet :ctaTitle="`Product Reviews`" :ctaDesc="`Check out reviews for ${product?.name} on ${$appName}`" v-model:open="open" v-model:md_size="size">
			<template #content>
				<div>
					<ui-scroll-area class="h-[75dvh] md:h-[95dvh]">
						<template v-if="loading">
							<div class="w-full p-4">
								<div class="w-full grid gap-2 md:gap-4">
									<div class="flex flex-col gap-y-1" v-for="i in 3" :key="i">
										<div class="flex gap-x-1">
											<ui-skeleton v-for="ii in 5" class="size-3" :key="`i-${ii}`"/>
										</div>

										<div class="flex gap-2">
											<ui-skeleton class="h-3 expand"/>
											<ui-skeleton class="h-3 w-8"/>
										</div>

										<ui-skeleton class="h-6 w-full"/>
									</div>
								</div>
							</div>
						</template>

						<template v-else>
							<template v-if="list && list.length > 0">
								<div class=" w-full">
									<div class="w-full grid divide-y">
										<review-entry class="p-3"  v-for="(entity, index) in list" :key="entity?.uuid" :entry="entity"></review-entry>
									</div>
								</div>

								<template v-if="pagination && pagination.total_pages > pagination.current_page">
									<div class="px-0 py-2 flex justify-center pt-4 border-t">
										<ui-button @click="fetchMore()" class="w-fit  gap-x-4" variant="ghost">
											<span class="icon-loading animate-spin" v-if="fetching"></span>
											<span>
												Load More
											</span>
										</ui-button>
									</div>
								</template>

							</template>

							<template v-else>
								<div class="mx-auto max-w-[550px] flex flex-col items-center p-10">
									<span class="icon-chat-filled text-4xl md:text-6xl text-foreground/70"></span>
									<div class="flex flex-col items-center mt-3 mb-4">
										<h2 class="text-xl md:text-2xl text-center font-medium">No Reviews</h2>
										<p class="text-center text-sm md:text-base text-foreground/70">
											Be the first to review {{product?.name}} on {{$appName}}
										</p>
									</div>
									<ui-button class="h-10" @click="fetchData()" variant="outline">
										<!-- {{searchQuery || (country || sport) ? "Load all Partners" : "Try Again"}} -->

										Try Again
									</ui-button>
								</div>
							</template>
						</template>
					</ui-scroll-area>
				</div>
			</template>
		</partials-sheet>

	</div>
</template>
<script setup lang="ts">

const open = ref(false)
const size = ref('large')

const props = defineProps({
	product : {
		type : Object
	}
})

const {list , loading, fetching, pagination, failed, errData, fetchData, fetchMore} = await useDataLoader(`/products/${props?.product?.slug}/reviews?include=user&paginate=15`)
</script>
