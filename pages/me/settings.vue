<template>
	<div>
		<Head>
			<Title>Settings | {{$appName}}</Title>
		</Head>

		<div>

			<div class="grid divide-y">
				<div class="divide-y">
					<div class="flex gap-2 md:gap-4 items-center py-2 px-2 md:px-0 cursor-pointer" @click="currentTab = currentTab === 'interests' ? null : 'interests'">

						<div class="size-12 md:size-14 rounded-lg p-2 center transition-colors ease-linear" :class="currentTab === 'interests' ? 'bg-primary text-primary-foreground' : 'bg-muted text-primary'">
							<icons-heart-out class="text-3xl md:text-5xl"></icons-heart-out>
						</div>

						<div class="expand flex flex-col">
							<h4 class="md:text-xl font-medium leading-tight">Interests</h4>
							<span class="line-clamp-1 text-sm text-foreground/70 leading-tight">
								Manage your sports interests on {{$appName}}
							</span>
						</div>

						<span class="text-xl" :class="currentTab === 'interests' ? 'icon-up' : 'icon-down'"></span>
					</div>


					<div class="p-3 md:px-0" v-if="currentTab === 'interests'">
						<account-forms-manage-interests></account-forms-manage-interests>
					</div>
				</div>

				<div class="divide-y">
					<div class="flex gap-2 md:gap-4 items-center py-2 px-2 md:px-0 cursor-pointer" @click="currentTab = currentTab === 'notifs' ? null : 'notifs'">

						<div class="size-12 md:size-14 rounded-lg p-2 center transition-colors ease-linear" :class="currentTab === 'notifs' ? 'bg-primary text-primary-foreground' : 'bg-muted text-primary'">
							<icons-bell-out class="text-3xl md:text-5xl"></icons-bell-out>
						</div>

						<div class="expand flex flex-col">
							<h4 class="md:text-xl font-medium leading-tight">Notification Preferences</h4>
							<span class="line-clamp-1 text-sm text-foreground/70 leading-tight">
								Manage your sports interests on {{$appName}}
							</span>
						</div>

						<span class="text-xl" :class="currentTab === 'notifs' ? 'icon-up' : 'icon-down'"></span>
					</div>


					<div class="p-3 md:px-0" v-if="currentTab === 'notifs'">
						<account-forms-manage-notifications></account-forms-manage-notifications>
					</div>
				</div>
				
			</div>
		</div>

	</div>
</template>
<script setup lang="ts">
const {user} = storeToRefs(useAuthStore())


const currentTab = ref(null)
</script>
