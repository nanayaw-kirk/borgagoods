<template>
	<div>
		<div class="w-full @container">
			<div class="grid @md:grid-cols-4 @lg:grid-cols-5 gap-2 @md:gap-4 items-center">
				<div class="@md:col-span-2 @lg:col-span-3 flex gap-x-3 items-center">

					<div class="size-16 md:size-20 aspect-square rounded-md">
						<product-media :media="entry?.product?.media?.[0]?.web" class="rounded w-full h-full rounded-md"></product-media>
					</div>
					<div class="expand flex flex-col">
						<h3 class="text-sm md:text-lg text-foreground/70 line-clamp-1 md:line-clamp-2">
							{{entry?.product?.name}}
						</h3>
						<span class="text-sm font-medium">
							{{$CURRENCY(price)}} <template v-if="!smAndDown"> &bull; Net Weight : {{weight}}</template>
						</span>

					</div>
				</div>
				<div class="flex gap-2 items-center -mt-8 md:mt-0">
					<div class="max-w-[100px] md:mx-auto ml-auto">
						<client-only>
							<ui-number-field v-model="entry.quantity" :default-value="entry?.quantity" :min="1" :max="entry?.variant?.quantity ? entry?.variant?.quantity : entry?.quantity?.quantity">
								<ui-number-field-content>
									<ui-number-field-decrement/>
									<ui-number-field-input class="!h-7 md:!h-9 !text-xs" />
									<ui-number-field-increment />
								</ui-number-field-content>
							</ui-number-field>
						</client-only>
					</div>

					<slot name="remove"></slot>
				</div>
				<div class="hidden md:flex flex-col items-center gap-y-1">
					<span class="font-medium"> {{$CURRENCY(total)}}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
const {smAndDown} = useScreenSize()
const props = defineProps({
	entry : {
		type : Object
	}
})

const qty = ref(props?.entry?.quantity)


const total = computed(() =>  {
	const price = (props?.entry?.variant && props?.entry?.variant?.price ? props?.entry?.variant?.price : props?.entry?.product?.price)

	return price * props.entry.quantity
})

const price = computed(() => props?.entry?.variant && props?.entry?.variant?.price ? props?.entry?.variant?.price : props?.entry?.product?.price)

const weight = computed(() => parseFloat(props?.entry?.variant?.weight ? props?.entry?.variant?.weight : props?.entry?.product?.weight).toFixed(2))
</script>
