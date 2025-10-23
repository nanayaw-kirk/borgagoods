<template>
	<div>
		<!-- <product-ratings-summary :summary="product?.reviews_summary"></product-ratings-summary> -->


		<div class="grid gap-4">
<!-- 			<div class="flex flex-wrap gap-1">
				<span class="rounded px-3 py-1 bg-border/70 text-xs md:text-sm capitalize"> {{product?.target}}</span>
				<template v-for="dem in product?.demographics" :key="dem">
					<span class="rounded px-3 py-1 bg-border/70 text-xs md:text-sm capitalize">{{dem}}</span>
				</template>
			</div>
			-->
			<template v-if="product?.additional_information?.length > 0">
				<div class="grid divide-y border rounded-md">
					<template v-for="(dd, key) in product?.additional_information" :key="key">
						<div class="grid grid-cols-3 divide-x">
							<div class="p-1">
								<span class="text-sm">
									{{dd?.key}}
								</span>
							</div>
							<div class="md:col-span-2 p-1">
								<span class="text-sm text-foreground/70">
									{{dd?.value}}
								</span>
							</div>
						</div>
					</template>
				</div>
			</template>



			
			<div class="w-full grid grid-cols-3 md:grid-cols-4 gap-x-2 items-start md:items-center">
				<div>
					<div class="flex flex-col items-center bg-primary/[0.15] dark:bg-muted p-4 lg:py-6 rounded-lg">
						<h1 class="font-bold text-4xl md:text-5xl">
							{{product?.average_rating}}
						</h1>
						<small class="text-xs">
							{{ $formatNum( product?.total_reviews) }}	{{ product?.total_reviews === 1 ? 'Review' : 'Reviews' }} 
						</small>
					</div>
				</div>
				<div class="col-span-2 md:col-span-3">
					<div class="w-full flex flex-col">
						<div class="w-full flex items-center" v-for="(value , rating) in product?.reviews_summary">
							<div class="size-6 center mr-2">
								<small>
									{{rating.charAt(0)}} 
								</small>
							</div>
							<div class="square-15 center mr-2">
								<small class="icon-star-filled text-primary"></small>
							</div>
							<div class="expand">
								<div class="w-full rounded-full h-[10px] bg-primary/[0.15]">
									<div class="h-full rounded-full bg-primary" :style="`width: ${parseFloat((getVal(value , product?.total_reviews))*100)}%`"></div>
								</div>
							</div>

							<div class="ml-2">
								<span class="text-xs">
									{{value}}
								</span>	
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
const props = defineProps({
	product : {
		type : Object
	}
})




function getVal(part, whole){
	let val = part/whole
	return val ? val : 0
}
</script>
