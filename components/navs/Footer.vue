<template>
	<footer>
		<div class="container grid gap-4 items-start">
		<!-- 	<div class="bg-muted/30 p-8 md:p-16 border rounded-md">
				<div class="grid md:grid-cols-4 gap-4 items-start">
					<div class="grid">
						<partials-logo class="fill-primary w-[80px] md:w-[100px] h-10 md:h-8 mb-4"></partials-logo>
						<p class="text-sm text-forground/70">
							Authentic fan gear for every kind of supporter. Created in direct collaboration with your favorite teams—no middlemen, no noise. This is where loyalty meets impact.
						</p>

						<div class="mt-4" :key="cartQuantity">
							<nuxt-link :to="{ name : !!cartQuantity ? 'cart' : 'products'}">
								<ui-button>
									Shop Now
								</ui-button>
							</nuxt-link>
						</div>
						
					</div>
					

					<div class="md:col-span-2 grid md:grid-cols-3 gap-4 md:pl-6">
						<div class="flex flex-col">
							<span class="font-medium mb-2 md:mb-4">Shop</span>
							<div class="flex flex-col gap-y-1">
								<div><nuxt-link :to="{name: 'products'}">Shop Products</nuxt-link></div>
								<div><nuxt-link :to="{name: 'collections'}">Collections</nuxt-link></div>
							</div>
						</div>

						<div class="flex flex-col">
							<span class="font-medium mb-2 md:mb-4">Platform</span>
							<div class="flex flex-col gap-y-1">
								<div><nuxt-link :to="{name: 'about'}">About {{$appName}}</nuxt-link></div>
								<div><nuxt-link :to="{name: 'join'}">Join {{$appName}}</nuxt-link></div>
								<div><nuxt-link :to="{name: 'tracker'}">Order Tracking</nuxt-link></div>
								<div><nuxt-link :to="{name: 'deliveries'}">Deliveries</nuxt-link></div>
							</div>
						</div>


						<div class="flex flex-col">
							<span class="font-medium mb-2 md:mb-4">Other</span>
							<div class="flex flex-col gap-y-1">
								<div><nuxt-link :to="{name: 'contact'}">Get in touch</nuxt-link></div>
								<div><nuxt-link :to="{name: 'faqs'}">FAQs</nuxt-link></div>
							</div>
						</div>
					</div>

					<div class="flex flex-col">

					</div>
				</div>
			</div> -->

			<div class="grid gap-y-4">
				<div class="flex items-center gap-2">
					<nuxt-link :to="{name: 'terms'}">Terms of Service </nuxt-link> | <nuxt-link :to="{name: 'privacy'}">Privacy Policy</nuxt-link> | <nuxt-link :to="{name: 'delivery-policy'}">Delivery Policy </nuxt-link> | <nuxt-link :to="{name: 'cancellation-and-returns-policy'}">Refund Policy </nuxt-link>
				</div>

				<p class="text-xs text-foreground/70">
					© {{$appName}}., 2025. All Rights Reserved. No portion of this site may be reproduced or duplicated without the express permission of {{$company}}.
				</p>

			</div>
		</div>
	</footer>
</template>
<script setup lang="ts">

const {cartQuantity } = storeToRefs(useCartStore())  


</script>
