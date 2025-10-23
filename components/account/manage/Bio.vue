<template>
	<div>
		<div class="border rounded-md grid divide-y md:hover:shadow group cursor-pointer" @click="open = true">
			<div class="p-4 flex items-start gap-4">
				<div class="expand flex flex-col">
					<h2 class="md:text-xl font-medium">Account Details</h2>
					<p class="text-foreground/70 text-xs md:text-sm">See & manage your personal and login details for your {{$appName}} account.</p>
				</div>

				<div class="size-16 md:size-20 center">
					<icons-user-id class="text-5xl md:text-6xl text-primary"></icons-user-id>
				</div>
			</div>
			<div class="p-4 py-2 group-hover:bg-border text-sm hidden md:flex">Manage your data</div>
		</div>


		<partials-dialog v-model:open="open" v-model:md_size="size" ctaTitle="Manage Personal Details" :ctaDesc="`Manage your personal details on ${$appName}`">
			<template #content>
				<div>
					<div class="grid divide-y" v-if="!intent">
						<div class="p-2 flex items-center cursor-pointer gap-x-2" @click="intent = 'name'">
							<icons-person class="text-primary text-lg"></icons-person>
							<div class="w-1/3">
								<span class="text-foreground/60 text-sm">Name</span>
							</div>
							<div class="expand">
								<span class="line-clamp-1 text-sm">{{user?.name}}</span>
							</div>
							<span class="icon-right"></span>
						</div>

						<div class="p-2 flex items-center cursor-pointer gap-x-2" @click="intent = 'gender'; size = 'x-small'">
							<icons-gender class="text-primary text-lg"></icons-gender>
							<div class="w-1/3">
								<span class="text-foreground/60 text-sm">Gender</span>
							</div>
							<div class="expand">
								<span class="line-clamp-1 text-sm capitalize">{{$clean(user?.gender ? user?.gender : 'Unknown')}}</span>
							</div>
							<span class="icon-right"></span>
						</div>

						<div class="p-2 flex items-center cursor-pointer gap-x-2" @click="intent = 'email'">
							<icons-mailbox class="text-primary text-lg"></icons-mailbox>
							<div class="w-1/3">
								<span class="text-foreground/60 text-sm">Email Address</span>
							</div>
							<div class="expand">
								<span class="line-clamp-1 text-sm">{{user?.email}}</span>
							</div>
							<span class="icon-right"></span>
						</div>
					</div>


					<template v-else>
						<account-forms-update-name @cancel="intent = null; size = 'small'" @done="intent = null; open = false" v-if="intent === 'name'"></account-forms-update-name>
						<account-forms-update-gender @cancel="intent = null; size = 'small'" @done="intent = null; open = false" v-else-if="intent === 'gender'"></account-forms-update-gender>
						<account-forms-update-email @cancel="intent = null; size = 'small'" @done="intent = null; open = false" v-else-if="intent === 'email'"></account-forms-update-email>
					</template>
				</div>
			</template>
		</partials-dialog>
	</div>	
</template>
<script setup lang="ts">

import {useStorage} from "@vueuse/core"
const loading = useStorage('BRGA_GO_LOADER', false)

const {user} = storeToRefs(useAuthStore())

const open = ref(false)
const size = ref('small')
const intent = ref(null)


watch(open, () => {
	intent.value = null
	loading.value = false
	size.value = 'small'
})

</script>
