<template>
	<div>

		<Head>
			<Title>Profile | {{$appName}}</Title>
		</Head>


		<div class="grid w-full">

			<div class="container flex flex-col items-center">
				<div class="max-w-[600px] p-4 flex items-start mx-auto">
					<div class="expand flex flex-col items-center">
						<div class="size-12 md:size-14 mb-2">
							<user-avatar></user-avatar>
						</div>

						<div class="flex flex-col items-center w-full">


							<div class="flex items-center gap-x-1">
								<span class="font-medium line-clamp-1 text-xl md:text-2xl line-clamp-1">
									{{user?.name}}
								</span>

								<ui-tooltip-provider>
									<ui-tooltip>
										<ui-tooltip-trigger as-child>
											<div>
												<span class="icon-verified text-primary" v-if="user?.email_verified"></span>
												<span class="icon-alert text-primary" v-else></span>
											</div>
										</ui-tooltip-trigger>
										<ui-tooltip-content :class="user?.email_verified ? 'bg-border text-foreground' : ''">
											<span>
												{{user?.email_verified ? 'Verified Account' : 'Your account is not verified'}}
											</span>
										</ui-tooltip-content>
									</ui-tooltip>
								</ui-tooltip-provider>
								
							</div>
							<span class="text-xs text-foreground/70" v-if="!user?.fsl_profile_id">
								Your FanID is <span class="font-medium">{{ user?.fsl_profile_id}}</span>

								<ui-button variant="link" class="ml-1 px-0 gap-x-1">
									<span class="text-xs">Learn More </span> 
									<span class="icon-question-circle"></span>
								</ui-button>
							</span>

							<span class="text-xs text-foreground/70" v-if="user?.fsl_profile_id">
								Your account has no associated fanID

								<ui-button variant="link" class="ml-1 px-0 gap-x-1">
									<span class="text-xs">Learn More </span> 
									<span class="icon-question-circle"></span>
								</ui-button>
							</span>
						</div>

						<!-- <div class="flex items-center gap-x-2">
							<nuxt-link :to="{name : 'me'}">
								<ui-button class="size-7 md:size-9 bg-muted hover:bg-muted"  size="icon" variant="ghost">
									<span class="icon-user"></span>
								</ui-button>
							</nuxt-link>
							<nuxt-link :to="{name : 'me-settings'}">
								<ui-button class="size-7 md:size-9 bg-muted hover:bg-muted"  size="icon" variant="ghost">
									<span class="icon-settings"></span>
								</ui-button>
							</nuxt-link>
						</div> -->
					</div>
				</div>

				<ui-separator decorative class="max-w-[800px] mx-auto"></ui-separator>


				<div class="max-w-[600px] px-4 py-2 flex items-start mx-auto">
					<div class="w-full">
						<ui-navigation-menu uk-slider="finite:true" class="z-[4]">
							<ui-navigation-menu-list class="flex uk-slider-items gap-x-2 max-w-full md:max-w-full">

								<ui-navigation-menu-item>
									<nuxt-link :to="{name: 'me'}"  v-slot="{ route }">
										<ui-navigation-menu-link class="!px-2 h-[25px] md:h-[32px] text-xs md:text-sm hover:text-primary" :class="[navigationMenuTriggerStyle(), $route.name === route.name ? 'text-primary' : '' ]" :active="$route.name === route.name">
											Profile
										</ui-navigation-menu-link>
									</nuxt-link>
								</ui-navigation-menu-item>

								<ui-navigation-menu-item>
									<nuxt-link :to="{name: 'me-orders'}"  v-slot="{ route }">
										<ui-navigation-menu-link class="!px-2 h-[25px] md:h-[32px] text-xs md:text-sm hover:text-primary" :class="[navigationMenuTriggerStyle(), $route.name === route.name ? 'text-primary' : '' ]" :active="$route.name === route.name">
											Orders
										</ui-navigation-menu-link>
									</nuxt-link>
								</ui-navigation-menu-item>


								<ui-navigation-menu-item>
									<nuxt-link :to="{name: 'me-following'}"  v-slot="{ route }">
										<ui-navigation-menu-link class="!px-2 h-[25px] md:h-[32px] text-xs md:text-sm hover:text-primary" :class="[navigationMenuTriggerStyle(), $route.name === route.name ? 'text-primary' : '' ]" :active="$route.name === route.name">
											Following
										</ui-navigation-menu-link>
									</nuxt-link>
								</ui-navigation-menu-item>

								<ui-navigation-menu-item>
									<nuxt-link :to="{name: 'me-addresses'}"  v-slot="{ route }">
										<ui-navigation-menu-link class="!px-2 h-[25px] md:h-[32px] text-xs md:text-sm hover:text-primary" :class="[navigationMenuTriggerStyle(), $route.name === route.name ? 'text-primary' : '' ]" :active="$route.name === route.name">
											Addresses
										</ui-navigation-menu-link>
									</nuxt-link>
								</ui-navigation-menu-item>

								<ui-navigation-menu-item>
									<nuxt-link :to="{name: 'me-settings'}"  v-slot="{ route }">
										<ui-navigation-menu-link class="!px-2 h-[25px] md:h-[32px] text-xs md:text-sm hover:text-primary" :class="[navigationMenuTriggerStyle(), $route.name === route.name ? 'text-primary' : '' ]" :active="$route.name === route.name">
											Settings
										</ui-navigation-menu-link>
									</nuxt-link>
								</ui-navigation-menu-item>



							</ui-navigation-menu-list>
						</ui-navigation-menu>
					</div>
				</div>

				<ui-separator decorative class="max-w-[800px] mx-auto"></ui-separator>
			</div>

			<div class="mx-auto md:max-w-[800px] w-full">
				<div class="w-full">
					<nuxt-page/>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { navigationMenuTriggerStyle} from '@/components/ui/navigation-menu'
const {user} = storeToRefs(useAuthStore())
definePageMeta({
	middleware : ['auth']
})


provide('user', user)

</script>
