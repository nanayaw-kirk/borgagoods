<template>
	<div>
		<partials-loading-overlay v-if="loading"></partials-loading-overlay>

		<div class="grid gap-3">
			


			<div class="grid gap-y-2 p-2 border rounded-md">
				<div class="flex items-center gap-x-2">
					<icons-share-circle class="text-5xl md:text-4xl"></icons-share-circle>
					<h3 class="text-sm md:text-lg expand font-medium">Would you like to share your data with partners you patronize?</h3>
				</div>

				<div class="grid gap-y-2">
					<div class="flex items-center cursor-pointer gap-x-2" @click="form.share_data_with_partners = 'all'">
						<div class="expand text-xs md:text-sm text-foreground/70 line-clamp-1">
							Yes to all partners.
						</div>
						<ui-checkbox :checked="form?.share_data_with_partners === 'all'" class="rounded-full size-5 md:size-6"></ui-checkbox>
					</div>

					<div class="flex items-center cursor-pointer gap-x-2" @click="form.share_data_with_partners = 'followed-partners'">
						<div class="expand text-xs md:text-sm text-foreground/70 line-clamp-1">
							Yes to my favorite teams & partners only.
						</div>
						<ui-checkbox :checked="form?.share_data_with_partners === 'followed-partners'" class="rounded-full size-5 md:size-6"></ui-checkbox>
					</div>

					<div class="flex items-center cursor-pointer gap-x-2" @click="form.share_data_with_partners = 'per-purchase'">
						<div class="expand text-xs md:text-sm text-foreground/70 line-clamp-1">
							I'll decide when checking out.
						</div>
						<ui-checkbox :checked="form?.share_data_with_partners === 'per-purchase'" class="rounded-full size-5 md:size-6"></ui-checkbox>
					</div>

					<div class="flex items-center cursor-pointer gap-x-2" @click="form.share_data_with_partners = 'none'">
						<div class="expand text-xs md:text-sm text-foreground/70 line-clamp-1">
							No. I don't want to share my data with partners.
						</div>
						<ui-checkbox :checked="form?.share_data_with_partners === 'none'" class="rounded-full size-5 md:size-6"></ui-checkbox>
					</div>
				</div>
			</div>



			<div class="grid gap-y-2 p-3 border rounded-md">

				<div class="flex items-center gap-x-2">
					<icons-bolt class="text-5xl md:text-4xl"></icons-bolt>
					<h3 class="text-sm md:text-lg expand font-medium">Would you like to receive updates about new merchandise releases?</h3>
				</div>

				<div class="grid gap-y-2">
					<div class="flex items-center cursor-pointer gap-x-2" @click="form.notify_new_merch_releases = 'all'">
						<div class="expand text-xs md:text-sm text-foreground/70 line-clamp-1">
							Notify me all the time.
						</div>
						<ui-switch :checked="form?.notify_new_merch_releases === 'all'" readonly></ui-switch>
					</div>

					<div class="flex items-center cursor-pointer gap-x-2" @click="form.notify_new_merch_releases = 'followed-partners'">
						<div class="expand text-xs md:text-sm text-foreground/70 line-clamp-1">
							Notify me only when my favorite teams & partners drop.
						</div>
						<ui-switch :checked="form?.notify_new_merch_releases === 'followed-partners'" readonly></ui-switch>
					</div>

					<div class="flex items-center cursor-pointer gap-x-2" @click="form.notify_new_merch_releases = 'none'">
						<div class="expand text-xs md:text-sm text-foreground/70 line-clamp-1">
							Do not notify me at all.
						</div>
						<ui-switch :checked="form?.notify_new_merch_releases === 'none'" readonly></ui-switch>
					</div>
				</div>
			</div>

			<div class="grid gap-y-2 p-3 border rounded-md">
				<div class="flex items-center gap-x-2">
					<icons-sale-out class="text-5xl md:text-4xl"></icons-sale-out>
					<h3 class="text-sm md:text-lg expand font-medium">Would you like to be notified about promos and personalized offers?</h3>
				</div>

				<div class="grid gap-y-2">
					<div class="flex items-center cursor-pointer gap-x-2" @click="form.notify_on_promos_and_offers = 'all'">
						<div class="expand text-xs md:text-sm text-foreground/70 line-clamp-1">
							Yes, keep me in the loop.
						</div>
						<ui-switch :checked="form?.notify_on_promos_and_offers === 'all'" readonly></ui-switch>
					</div>

					<div class="flex items-center cursor-pointer gap-x-2" @click="form.notify_on_promos_and_offers = 'followed-partners'">
						<div class="expand text-xs md:text-sm text-foreground/70 line-clamp-1">
							Yes but for my favorite teams & partners only.
						</div>
						<ui-switch :checked="form?.notify_on_promos_and_offers === 'followed-partners'" readonly></ui-switch>
					</div>

					<div class="flex items-center cursor-pointer gap-x-2" @click="form.notify_on_promos_and_offers = 'none'">
						<div class="expand text-xs md:text-sm text-foreground/70 line-clamp-1">
							No, do not notify me of promos & personalized offers
						</div>
						<ui-switch :checked="form?.notify_on_promos_and_offers === 'none'" readonly></ui-switch>
					</div>
				</div>
			</div>

			<div class="grid gap-y-2 p-3 border rounded-md">
				<div class="flex items-center gap-x-2">
					<icons-bell-out class="text-5xl md:text-4xl"></icons-bell-out>
					<h3 class="text-sm md:text-lg expand font-medium">Would you like receive platform news and updates?</h3>
				</div>

				<div class="grid gap-y-2">
					<div class="flex items-center cursor-pointer gap-x-2" @click="form.notify_platform_updates = true">
						<div class="expand text-xs md:text-sm text-foreground/70 line-clamp-1">
							Yes, keep me in the loop.
						</div>
						<ui-switch :checked="form?.notify_platform_updates === true" readonly></ui-switch>
					</div>

					<div class="flex items-center cursor-pointer gap-x-2" @click="form.notify_platform_updates = false">
						<div class="expand text-xs md:text-sm text-foreground/70 line-clamp-1">
							No, I'm not interested.
						</div>
						<ui-switch :checked="form?.notify_platform_updates === false" readonly></ui-switch>
					</div>
				</div>
			</div>

			<div class="grid gap-y-2 p-3 border rounded-md">
				<ui-button class="w-full h-14" :disabled="loading" @click.prevent="save">
					Save Privacy Settings
				</ui-button>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">

const {user} = storeToRefs(useAuthStore())
const {fetchUser} = useAuthStore()
const notify = useToaster()
const loading = ref(false)

const form = ref({
	...user?.value?.privacy
})


async function save(){
	loading.value = true
	const { data , error } = await useCrud().patch(`/account/privacy`, form?.value)
	if (data?.value) {
		notify({ title : 'Nicely done!', description : `${data?.value?.message as string}`})
		fetchUser()
	}

	if (error?.value) {
		notify({ title : 'Failed to add address', description : `Something went wrong. ${error?.value?.data?.message}`})
	}

	loading.value = false
}

</script>
