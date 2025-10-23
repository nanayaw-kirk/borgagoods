<template>
	<div>

		<div class="cursor-pointer" @click="open = true">
			<slot name="trigger">
				<ui-button class="shadow-none text-foreground/70 hover:text-foreground/70 rounded-md bg-muted/[2%] hover:bg-muted/5 hover:text-foreground font-normal w-fit flex items-center gap-x-2 px-2 border" variant="secondary">
					<span class="icon-customers-filled text-xl text-primary"></span>
					<span class="text-sm">
						Preview
					</span>
				</ui-button>
			</slot>
		</div>
		

		<ui-sheet v-model:open="open"  v-if="smAndDown">
			<div class="w-full relative">
				<ui-sheet-content side="bottom" class="rounded-t-xl p-0 gap-0" :hideClose="true">
					<div class="flex items-start gap-x-2 p-2 border-b shadow-md">
						<partner-crest :url="product?.partner?.logo_url" class="w-6 h-6 md:w-8 md:h-8 rounded"></partner-crest>
						<ui-sheet-header class="gap-y-0 expand flex flex-col items-start">
							<ui-sheet-title class="font-medium mb-0 line-clamp-1 text-sm">{{product?.partner?.name}}</ui-sheet-title>
							<ui-sheet-description class="!-mt-1 text-xs text-foreground/70 line-clamp-1">{{ product?.partner?.country?.name}}</ui-sheet-description>
						</ui-sheet-header>

						<nuxt-link class="my-auto" :to="{name: 'partner', params :{partner : product?.partner?.slug}}" v-if="$route?.name !== 'partner'">
							<ui-button size="sm" class="h-7 bg-white hover:bg-white text-primary border text-xs">Visit Store</ui-button>
						</nuxt-link>

						<ui-sheet-close class="my-auto">
							<ui-button size="icon" class="size-7" variant="link">
								<span class="icon-close"></span>
							</ui-button>
						</ui-sheet-close>
					</div> 

					<div>
						<ui-scroll-area class="h-[70dvh]">
							<div class="grid">
								<product-media-slider></product-media-slider>

								<div class="grid">
									<div class="flex flex-col p-2 md:p-4">
										<h2 class="text-lg line-clamp-1 font-medium">
											{{product?.name}}
										</h2>
										<p class="text-foreground/70 text-sm -mt-1" :class="product?.description ? 'line-clamp-2' : 'line-clamp-1'">
											{{product?.description ? product?.description  : `Buy ${product?.name} on ${$appName}`}}
										</p>
									</div>
									<div class="border-y p-2 md:p-4">
										<product-partials-rating></product-partials-rating>											
									</div>
									<div class="p-2 md:p-4" v-if="product?.has_variations">
										<product-partials-preview-details></product-partials-preview-details>
									</div>
								</div>
							</div>
						</ui-scroll-area>
					</div>

					<div class="bg-background border-t w-full grid divide-y">
						<div class="flex items-center gap-x-2 p-2">
							<product-actions-like v-if="authenticated"></product-actions-like>
							<product-actions-share></product-actions-share>
							<div class="expand">
								<product-actions-add-to-cart></product-actions-add-to-cart>
							</div>
						</div>

						<div class="grid">
							<nuxt-link class="p-2 gap-x-2 text-primary bg-border/30 flex items-center" :to="{name: 'cart'}" v-if="cartQuantity">
								<span class="expand line-clamp-1 text-xs font-medium">
									View Cart
								</span>
								<span class="px-[6px] rounded py-[2px] !leading-tight bg-primary text-white text-[10px]">
									{{cartQuantity}}
								</span>
								<span class="icon-right"></span>
							</nuxt-link>
						</div>
					</div>

				</ui-sheet-content>
			</div>
		</ui-sheet>

		<ui-dialog v-model:open="open" v-else>
			<div class="w-full relative">
				<ui-dialog-content class="rounded-t-xl border  p-0 gap-0 md:min-w-[800px]"  :hideClose="true">

					<div class="flex items-start gap-x-2 p-2 border-b shadow-md w-full relative">
						<partner-crest :url="product?.partner?.logo_url" class="w-6 h-6 md:w-8 md:h-8 rounded"></partner-crest>
						<ui-dialog-header class="gap-y-0 expand flex flex-col items-start">
							<ui-dialog-title class="font-medium mb-0 line-clamp-1">{{product?.partner?.name}}</ui-dialog-title>
							<ui-dialog-description class="!mt-1 text-xs text-foreground/70 line-clamp-1">{{ product?.partner?.country?.name }}</ui-dialog-description>
						</ui-dialog-header>

						<nuxt-link class="my-auto" :to="{name: 'partner', params :{partner : product?.partner?.slug}}" v-if="$route?.name !== 'partner'">
							<ui-button class="h-8 bg-white hover:bg-white text-primary border">Visit Store</ui-button>
						</nuxt-link>

						<ui-dialog-close class="my-auto">
							<ui-button size="icon" class="size-7" variant="link">
								<span class="icon-close"></span>
							</ui-button>
						</ui-dialog-close>
					</div> 

					<div>
						<div class="grid grid-cols-2 w-full relative p-4 pb-0 gap-x-4">
							<div class="w-full sticky">
								<div class="flex flex-col gap-y-4 pb-4">
									<product-media-slider></product-media-slider>
								</div>
							</div>
							<div class="w-full">
								<ui-scroll-area class="h-[500px]">
									<div class="flex flex-col gap-y-4">

										<div class="flex flex-col">
											<h2 class="text-xl line-clamp-1 text-foreground/70 font-medium">
												{{product?.name}}
											</h2>

											<p class="line-clamp-2 text-foreground/70">
												{{product?.description ? product?.description  : `Buy ${product?.name} on ${$appName}`}}
											</p>
										</div>
										<div class="flex flex-col">
											<h2 class="text-3xl font-bold text-primary">
												{{ $CURRENCY(product?.minimum_variation?.price ? product?.minimum_variation?.price : product?.price )}}
											</h2>
											<div class="flex items-center gap-x-2" v-if="product?.quantity < 101">
												<span class="icon-trend-down text-primary"></span>
												<span>
													Limited stock available
												</span>
											</div>
										</div>

										<div class="border-y py-2">
											<product-partials-rating></product-partials-rating>											
										</div>

										<div class="border-b pb-4">
											<product-actions-add-to-cart></product-actions-add-to-cart>
										</div>

										<product-partials-preview-details v-if="product?.has_variations" class="border-b pb-4"></product-partials-preview-details>


										<div class="flex flex-wrap justify-center gap-2">
											<product-actions-like v-if="authenticated"></product-actions-like>
											<product-actions-share></product-actions-share>
										</div>
									</div>
								</ui-scroll-area>
							</div>
						</div>
					</div>

				</ui-dialog-content>
			</div>
		</ui-dialog>
	</div>	
</template>
<script setup lang="ts">

const {authenticated} = useAuthStore()

const {cartQuantity} = storeToRefs(useCartStore())  

const open = ref(false)
const {smAndDown} = useScreenSize()
const product = inject("product")
const price = computed(() => product?.has_variations && (product?.minimum_variation && product?.minimum_variation.price) ? product?.minimum_variation.price : product?.price )


</script>
