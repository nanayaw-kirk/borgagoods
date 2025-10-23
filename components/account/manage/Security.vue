<template>
	<div>
		<div class="border rounded-md grid divide-y md:hover:shadow group cursor-pointer" @click="open = true">
			<div class="p-4 flex items-start gap-4">
				<div class="expand flex flex-col">
					<h2 class="md:text-xl font-medium">Account Security</h2>
					<p class="text-foreground/70 text-xs md:text-sm">
						Update your password and manage security settings to keep your account safe.
					</p>
				</div>

				<div class="size-16 md:size-20 center">
					<icons-user-shield class="text-5xl md:text-6xl text-primary"></icons-user-shield>
				</div>
			</div>
			<div class="p-4 py-2 group-hover:bg-border text-sm hidden md:flex">Manage security</div>
		</div>


		<partials-dialog v-model:open="open" v-model:md_size="size" :ctaTitle="intent === 'deactivate' ? 'Account Deactivation' : 'Security'" :ctaDesc="`Manage your account security on ${$appName}`">
			<template #content>
				<div>
					<div class="grid divide-y" v-if="!intent">
						<div class="p-2 flex items-center cursor-pointer gap-x-2" @click="intent = 'password'">
							<icons-lock class="text-primary text-lg"></icons-lock>
							<div class="w-1/4 md:w-1/3">
								<span class="text-foreground/60 text-sm">Password</span>
							</div>
							<div class="expand">
								<span class="line-clamp-1 text-sm">* * * * * *</span>
							</div>
							<span class="icon-right"></span>
						</div>

						<div class="p-2 flex items-center cursor-pointer gap-x-2" @click="intent = 'deactivate'; size = 'x-small'">
							<icons-person class="text-primary text-lg"></icons-person>
							<div class="w-1/4 md:w-1/3">
								<span class="text-foreground/60 text-sm">Status</span>
							</div>
							<div class="expand">
								<span class="line-clamp-1 text-sm">Deactivate your account.</span>
							</div>
							<span class="icon-right"></span>
						</div>
					</div>


					<template v-else>
						<account-forms-change-password @cancel="intent = null; size = 'x-small'" @done="intent = null; open = false" v-if="intent === 'password'"></account-forms-change-password>
						<account-forms-deactivate @cancel="intent = null; size = 'x-small'" @done="intent = null; open = false" v-else-if="intent === 'deactivate'"></account-forms-deactivate>
						
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
const size = ref('x-small')
const intent = ref(null)


watch(open, () => {
	intent.value = null
	loading.value = false
	size.value = 'x-small'
})

</script>
