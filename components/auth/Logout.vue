<template>
	<div>
		<ui-alert-dialog>
			<ui-alert-dialog-trigger as-child>
				<div>
					<slot name="triggerNode">
						<ui-button>
							Logout
						</ui-button>
					</slot>
				</div>
			</ui-alert-dialog-trigger>

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
const {logout} = useAuthStore()
</script>
