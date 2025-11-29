<template>
	<div>
		<div class="flex items-center justify-center gap-x-3 w-full ">
			<div class="transition-colors rounded p-1 cursor-pointer" :class="$route.name === 'index' ? 'text-primary' : 'text-foreground/70' ">
				<nuxt-link :to="{name: 'index'}" class="w-full flex flex-col items-center">
					<span class="icon-home text-xl"></span>
					<span class="text-[10px] uppercase font-medium">
						Home
					</span>
				</nuxt-link>
			</div>

			<div class="transition-colors rounded p-1 cursor-pointer" :class="$route.name.startsWith('products') ? 'text-primary' : 'text-foreground/70' ">
				<nuxt-link :to="{name: 'products'}" class="w-full flex flex-col items-center">
					<span class="text-xl" :class="$route.name.startsWith('products') ? 'icon-tags-filled' : 'icon-tags'"></span>
					<span class="text-[10px] uppercase font-medium">
						Products
					</span>
				</nuxt-link>
			</div>


			<div class="transition-colors rounded p-1 cursor-pointer" :class="$route.name.startsWith('brands') ? 'text-primary' : 'text-foreground/70' ">
				<nuxt-link :to="{name: 'brands'}" class="w-full flex flex-col items-center">
					<span class="icon-navigation text-xl"></span>
					<span class="text-[10px] uppercase font-medium">
						Brands
					</span>
				</nuxt-link>
			</div>

			<div class="transition-colors rounded p-1 cursor-pointer" :class="$route.name.startsWith('promos') ? 'text-primary' : 'text-foreground/70' ">
				<nuxt-link :to="{name: 'promos'}" class="w-full flex flex-col items-center">
					<span class="icon-navigation text-xl"></span>
					<span class="text-[10px] uppercase font-medium">
						Promos
					</span>
				</nuxt-link>
			</div>

			<div class="transition-colors rounded p-1 cursor-pointer" :class="$route.name.startsWith('cart') ? 'text-primary' : 'text-foreground/70' ">
				<nuxt-link :to="{name: 'cart'}" class="w-full flex flex-col items-center">
					<span class="icon-tote text-xl"></span>
					<span class="text-[10px] uppercase font-medium">
						Cart
					</span>
				</nuxt-link>
			</div>



			<div class="transition-colors rounded p-1 cursor-pointer" :class="$route.name.startsWith('search') ? 'text-primary' : 'text-foreground/70' ">
				<nuxt-link :to="{name: 'search'}" class="w-full flex flex-col items-center">
					<span class="icon-search text-xl"></span>
					<span class="text-[10px] uppercase font-medium">
						Search
					</span>
				</nuxt-link>
			</div>




			

			
			<div class="transition-colors rounded p-1 cursor-pointer text-foreground/70" v-if="authenticated">
				<div class="w-full flex flex-col items-center" @click="open = true">
					<span class="icon-bars text-xl"></span>
					<span class="text-[10px] uppercase font-medium">
						More
					</span>
				</div>
			</div>
		</div>





		<ui-drawer v-model:open="open" v-if="smAndDown">
			<ui-drawer-content class="rounded-t-xl border p-0">

				<div class="hidden">
					<ui-drawer-header>
						<ui-drawer-title>Mobile Options</ui-drawer-title>
						<ui-drawer-description>Mobile Menu Options</ui-drawer-description>
					</ui-drawer-header>
				</div>

				<div class="flex flex-col items-center gap-y-6 p-3">

					

					<div class="grid grid-cols-4 gap-4 w-full">


						<nuxt-link :to="{name: 'tracker'}" class="flex flex-col items-center gap-y-1">
							<div class="w-3/4  rounded-md center text-foreground/70">
								<span class="icon-track text-4xl"></span>
							</div>
							<span class="text-xs line-clamp-1 font-medium text-foreground/70">Tracker</span>
						</nuxt-link>

						<nuxt-link :to="{name: 'cart'}" class="flex flex-col items-center gap-y-1">
							<div class="w-3/4 !flex-row rounded-md center text-foreground/70">
								<span class="icon-tote  text-4xl"></span>
								<span class="bg-primary py-[1px] text-xs rounded-lg -mt-4 -ml-4 uk-animation-scale-up uk-animation-fast" :key="`${$route?.fullPath}-${cartQuantity}`"  :class="cartQuantity > 9 ? 'px-1' : 'px-2'" v-if="cartQuantity">
									<small class="text-white">{{cartQuantity > 9 ? '9+' : cartQuantity}}</small>
								</span>
							</div>
							<span class="text-xs line-clamp-1 font-medium text-foreground/70">Cart</span>
						</nuxt-link>

						<template v-if="authenticated">
							<nuxt-link :to="{name: 'me-orders'}" class="flex flex-col items-center gap-y-1">
								<div class="w-3/4  rounded-md center text-foreground/70">
									<span class="icon-news-outlined text-4xl"></span>
								</div>
								<span class="text-xs line-clamp-1 font-medium text-foreground/70">Orders</span>
							</nuxt-link>

							<nuxt-link :to="{name: 'me-following'}" class="flex flex-col items-center gap-y-1">
								<div class="w-3/4  rounded-md center text-foreground/70">
									<span class="icon-shield-check text-4xl"></span>
								</div>
								<span class="text-xs line-clamp-1 font-medium text-foreground/70">My Teams</span>
							</nuxt-link>


							<nuxt-link :to="{name: 'me-addresses'}" class="flex flex-col items-center gap-y-1">
								<div class="w-3/4  rounded-md center text-foreground/70">
									<span class="icon-delivery text-4xl"></span>
								</div>
								<span class="text-xs line-clamp-1 font-medium text-foreground/70">Addresses</span>
							</nuxt-link>


							<nuxt-link :to="{name: 'me'}" class="flex flex-col items-center gap-y-1">
								<div class="w-3/4  rounded-md center text-foreground/70">
									<span class="icon-user-outlined text-4xl"></span>
								</div>
								<span class="text-xs line-clamp-1 font-medium text-foreground/70">Account</span>
							</nuxt-link>

							<div class="col-span-4">
								<auth-logout class="w-full">
									<template #triggerNode>
										<ui-button class="w-full text-primary bg-muted" variant="ghost">
											Logout
										</ui-button>
									</template>
								</auth-logout>
							</div>
						</template>

					</div>
				</div>
			</ui-drawer-content>
		</ui-drawer>

	</div>	
</template>
<script setup lang="ts">

const {authenticated} = storeToRefs(useAuthStore())
const {cartQuantity} = storeToRefs(useCartStore())

const open = ref(false)
const {smAndDown} = useScreenSize()

const route = computed(() => useRoute().path)

watch(route, ()=> open.value = false)

</script>
