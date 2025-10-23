<template>
	<div>
		<ui-alert-dialog v-model:open="open">

			<ui-dropdown-menu>
				<ui-dropdown-menu-trigger as-child>
					<div>
						<ui-button variant="ghost" class="!w-20 gap-x-1 items-center px-2 bg-muted hover:bg-muted" size="sm">
							
							<span class="icon-user-filled text-base text-primary"></span>
							<span class="truncate text-xs">
								Hi {{user?.name}}
							</span>
						</ui-button>
					</div>
				</ui-dropdown-menu-trigger>
				<ui-dropdown-menu-content class="w-[200px] bg-background text-foreground">
					<ui-dropdown-menu-group>

						<nuxt-link :to="{name: 'me'}">
							<ui-dropdown-menu-item class="gap-x-2 items-center cursor-pointer">
								<span class="icon-user text-base"></span>
								<span class="text-xs">My Profile</span>
							</ui-dropdown-menu-item>
						</nuxt-link>
						
						<nuxt-link :to="{name: 'me-orders'}">
							<ui-dropdown-menu-item class="gap-x-2 items-center cursor-pointer">
								<span class="icon-orders text-base"></span>
								<span class="text-xs">Order History</span>
							</ui-dropdown-menu-item>
						</nuxt-link>
						<nuxt-link :to="{name: 'me-following'}">
							<ui-dropdown-menu-item class="gap-x-2 items-center cursor-pointer">
								<span class="icon-team-outline text-base"></span>
								<span class="text-xs">My Teams</span>
							</ui-dropdown-menu-item>
						</nuxt-link>

						<nuxt-link :to="{name: 'me-addresses'}">
							<ui-dropdown-menu-item class="gap-x-2 items-center cursor-pointer">
								<span class="icon-location-pin text-base"></span>
								<span class="text-xs">My Addresses</span>
							</ui-dropdown-menu-item>
						</nuxt-link>


						<nuxt-link :to="{name: 'me-settings'}">
							<ui-dropdown-menu-item class="gap-x-2 items-center cursor-pointer">
								<span class="icon-setting text-base"></span>
								<span class="text-xs">Settings</span>
							</ui-dropdown-menu-item>
						</nuxt-link>

						<ui-alert-dialog-trigger as-child>
							<ui-dropdown-menu-item class="gap-x-2 items-center cursor-pointer">
								<span class="icon-logout text-base"></span>
								<span>Logout</span>
							</ui-dropdown-menu-item>
						</ui-alert-dialog-trigger>
					</ui-dropdown-menu-group>

				</ui-dropdown-menu-content>
			</ui-dropdown-menu>

			<ui-alert-dialog-content class="max-w-[95dvw] md:max-w-[400px] rounded-xl">
				<icons-power class="text-6xl mx-auto"></icons-power>
				<ui-alert-dialog-header>
					<ui-alert-dialog-title class="text-center">
						Are you sure you want to log out?
					</ui-alert-dialog-title>
					<ui-alert-dialog-description class="text-center">
						You will need to log back in to access your order history, enjoy personalized shopping, and manage your team affiliations on {{$appName}}. 
					</ui-alert-dialog-description>
				</ui-alert-dialog-header>

				<ui-alert-dialog-footer class="!justify-center">
					<ui-alert-dialog-cancel>
						Cancel
					</ui-alert-dialog-cancel>
					<ui-alert-dialog-action @click.prevent="logout">
						Logout
					</ui-alert-dialog-action>
				</ui-alert-dialog-footer>
			</ui-alert-dialog-content>
		</ui-alert-dialog>





	</div>
</template>
<script setup lang="ts">
const open = ref(false)

const {logout} = useAuthStore()
const {user} = storeToRefs(useAuthStore())

</script>
