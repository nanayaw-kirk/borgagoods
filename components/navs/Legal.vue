<template>
	<div>
		<aside class="grid gap-y-6">
			<div>
				<partials-logo class="fill-foreground w-[80px] md:w-[100px] h-10 md:h-8"></partials-logo>
			</div>

			<nav >
				<ul class="grid gap-y-2 list-none">
					<li>
						<nuxt-link class="text-foreground/70" :to="{name: 'terms'}" v-slot="{ route }">
							<span class="text-foreground/70" :class="$route.name === route.name ? 'font-medium' : 'underline'">
								Terms of Service

							</span>
						</nuxt-link>
					</li>
					<li>
						<nuxt-link class="text-foreground/70" :to="{name: 'privacy'}" v-slot="{ route }">
							<span class="text-foreground/70" :class="$route.name === route.name ? 'font-medium' : 'underline'">Privacy Policy</span>
						</nuxt-link>
					</li>
					<li>
						<nuxt-link class="text-foreground/70" :to="{name: 'delivery-policy'}" v-slot="{ route }">
							<span class="text-foreground/70" :class="$route.name === route.name ? 'font-medium' : 'underline'">Delivery Policy</span>
						</nuxt-link>
					</li>
					<li>
						<nuxt-link class="text-foreground/70" :to="{name: 'cancellation-and-returns-policy'}" v-slot="{ route }">
							<span class="text-foreground/70" :class="$route.name === route.name ? 'font-medium' : 'underline'">Cancellations & Refunds Policy</span>
						</nuxt-link>
					</li>

				</ul>
			</nav>
		</aside>
	</div>	
</template>
<script setup lang="ts">

</script>
