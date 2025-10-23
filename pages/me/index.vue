<template>
	<div class="pt-2 px-2 md:px-0">
		<div class="container">
			<div class="grid md:grid-cols-2 gap-2 md:gap-4">
				

				<account-manage-bio></account-manage-bio>

				<account-manage-security></account-manage-security>


				


				<nuxt-link :to="{name: 'me-addresses'}" class="border rounded-md grid md:hover:shadow">
					<div class="flex items-start gap-4 md:gap-6 p-4">
						<div class="expand flex flex-col">
							<h2 class="md:text-xl font-medium">Addresses</h2>
							<p class="text-foreground/70 text-xs md:text-sm">Save and manage your delivery addresses for faster checkouts on {{$appName}}.</p>
						</div>

						<div class="size-16 md:size-20 center">
							<icons-map-pin-out class="text-5xl md:text-6xl text-primary"></icons-map-pin-out>
						</div>
					</div>
				</nuxt-link>


				<nuxt-link :to="{name: 'me-settings'}" class="border rounded-md grid md:hover:shadow">
					<div class="flex items-start gap-4 md:gap-6 p-4">
						<div class="expand flex flex-col">
							<h2 class="md:text-xl font-medium">Privacy & Preferences</h2>
							<p class="text-foreground/70 text-xs md:text-sm">
								Configure your settings and manage how {{$appName}} interacts with your data.
							</p>
						</div>

						<div class="size-16 md:size-20 center">
							<icons-masks class="text-5xl md:text-6xl text-primary"></icons-masks>
						</div>
					</div>
				</nuxt-link>

				<div class="md:col-span-2 border rounded-md grid md:hover:shadow">
					<div class="flex items-start gap-4 md:gap-6 p-4">
						<div class="expand flex flex-col">
							<h2 class="md:text-xl font-medium">Looking for something else?</h2>
							<p class="text-foreground/70 text-xs md:text-sm">Lorem ipsum dolor sit amet.</p>

							<div class="grid divide-y mt-2">
								<div class="px-2 py-2">What is a VSL FanID?</div>
								<div class="px-2 py-2 pb-0">What is a VSL FanID?</div>
							</div>
						</div>

						<div class="size-16 md:size-20 center">
							<icons-zoom-search class="text-5xl md:text-6xl text-primary"></icons-zoom-search>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
const {user} = storeToRefs(useAuthStore())

</script>
