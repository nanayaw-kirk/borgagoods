<template>
	<header class="w-full relative">
		<section class="py-1 md:py-3 w-full h-full">
			<div class="container px-2 md:px-0">
				<nav class="flex items-center justify-between">
					<div class="flex items-center gap-x-3">
						<nuxt-link :to="{name: 'index'}">
							<partials-logo class="fill-primary w-[80px] h-10 md:h-8"></partials-logo>
						</nuxt-link>



						<ui-navigation-menu class="hidden md:block  md:ml-6 lg:ml-10">
							<ui-navigation-menu-list class="flex gap-x-3">
								<ui-navigation-menu-item>
									<nuxt-link :to="{name: 'index'}"  v-slot="{ route }">
										<ui-navigation-menu-link class="!px-3 h-[25px] md:h-[32px] text-sm" :class="navigationMenuTriggerStyle()" :active="$route.name === route.name">
											Home
										</ui-navigation-menu-link>
									</nuxt-link>
								</ui-navigation-menu-item>
							</ui-navigation-menu-list>
						</ui-navigation-menu>



						<ui-navigation-menu class="hidden md:block">
							<ui-navigation-menu-list class="flex gap-x-3">
								<ui-navigation-menu-item>
									<nuxt-link :to="{name: 'explore'}"  v-slot="{ route }">
										<ui-navigation-menu-link class="!px-3 h-[25px] md:h-[32px] text-sm" :class="navigationMenuTriggerStyle()" :active="$route.name === route.name">
											Explore
										</ui-navigation-menu-link>
									</nuxt-link>
								</ui-navigation-menu-item>
							</ui-navigation-menu-list>
						</ui-navigation-menu>


						
						<ui-navigation-menu class="hidden md:block">
							<ui-navigation-menu-list class="flex gap-x-3">
								<ui-navigation-menu-item>
									<nuxt-link :to="{name: 'products'}"  v-slot="{ route }">
										<ui-navigation-menu-link class="!px-3 h-[25px] md:h-[32px] text-sm" :class="navigationMenuTriggerStyle()" :active="$route.name === route.name">
											Products
										</ui-navigation-menu-link>
									</nuxt-link>
								</ui-navigation-menu-item>


							</ui-navigation-menu-list>
						</ui-navigation-menu>
					</div>


					<div class="flex items-center justify-end gap-x-4">

						<ui-navigation-menu class="hidden md:block">
							<ui-navigation-menu-list class="flex gap-x-3">

								<ui-navigation-menu-item>
									<nuxt-link :to="{name: 'tracker'}"  v-slot="{ route }">
										<ui-navigation-menu-link class="!px-3 h-[25px] md:h-[32px] text-sm" :class="navigationMenuTriggerStyle()" :active="$route.name === route.name">
											Track Order
										</ui-navigation-menu-link>
									</nuxt-link>
								</ui-navigation-menu-item>
							</ui-navigation-menu-list>
						</ui-navigation-menu>

						<search-trigger class="hidden md:flex w-full" v-if="!$route?.name?.startsWith('search')"></search-trigger>

						<nuxt-link :to="{name : 'tracker'}" class="flex my-auto items-start md:hidden">
							<span class="icon-track  text-2xl" :class="$route?.name === 'tracker' ? 'text-primary' : ''"></span>
						</nuxt-link>


						<nuxt-link :to="{name : 'cart'}" class="flex my-auto items-start">
							<span class="icon-tote  text-2xl" :class="$route?.name === 'cart' ? 'text-primary' : ''"></span>
							<span class="bg-primary py-[1px] text-xs rounded-lg -mb-2 -ml-2 uk-animation-scale-up uk-animation-fast" :key="`${$route?.fullPath}-${cartQuantity}`"  :class="cartQuantity > 9 ? 'px-1' : 'px-2'" v-if="cartQuantity">
								<small class="text-primary-foreground">{{cartQuantity > 9 ? '9+' : cartQuantity}}</small>
							</span>
						</nuxt-link>


						<auth-modal v-if="!authenticated"></auth-modal>

						<user-drop class="hidden md:flex" v-else></user-drop>

						<partials-themer></partials-themer>
					</div>
				</nav>
			</div>
		</section>	
	</header>
</template>
<script setup lang="ts">
import { navigationMenuTriggerStyle} from '@/components/ui/navigation-menu'
const {authenticated} = storeToRefs(useAuthStore());
const {cartQuantity} = storeToRefs(useCartStore())
</script>
