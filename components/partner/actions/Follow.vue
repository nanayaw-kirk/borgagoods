<template>
	<div>
		<auth-modal v-if="!authenticated" :intention="'login'">
			<template #action-button>
				<ui-button size="sm" class="h-6">
					<span>
						Follow
					</span>
				</ui-button>
			</template>
		</auth-modal>
		
		<div v-else @click="following ? showPrompt = true : toggleFollow() ">
			<slot name="trigger">
				<ui-button size="sm" class="h-6">
					<span>
						{{following ? 'Unfollow' : 'Follow' }}
					</span>
				</ui-button>
			</slot>
		</div>



		<ui-dialog v-model:open="showPrompt">
			<div class="w-full relative">
				<ui-dialog-content class="rounded-xl p-0 gap-0 !bg-[inherit] border max-w-[300px]" hideClose>

					<ui-dialog-header class="gap-y-0 p-3 hidden">
						<slot name="icon"></slot>
						<ui-dialog-title class="font-medium mb-0 text-center">Success Notice</ui-dialog-title>
						<ui-dialog-description class="!mt-1 text-center text-foreground/70 md:px-4 line-clamp-2 md:line-clamp-1">Show notice for sucess</ui-dialog-description>
					</ui-dialog-header>

					<div class="flex flex-col items-center p-8">
						<partner-crest :url="partner?.logo_url" class="size-12 md:size-14 mb-4"></partner-crest>

						<h3 class="text-center  md:text-xl font-medium">Unfollow {{partner?.name}}?</h3>
						<p class="text-center text-sm text-foreground/70 mb-4">
							You’ll stop receiving updates on merch drops, exclusive offers, and other perks.
						</p>

						<ui-button class="mx-auto w-full mb-2" variant="ghost" @click="toggleFollow()">
							Unfollow
						</ui-button>

						<ui-dialog-close class="w-full">
							<ui-button class="mx-auto w-full" variant="outline">
								Cancel
							</ui-button>
						</ui-dialog-close>
					</div>

				</ui-dialog-content>
			</div>
		</ui-dialog>


	</div>
</template>
<script setup lang="ts">

const {authenticated} = storeToRefs(useAuthStore())
const notify = useToaster()

const emit = defineEmits(['done'])

const partner = inject('partner')

const following = ref(partner?.value?.has_followed)
const showPrompt = ref(false)
const login = ref(false)

async function toggleFollow() {
	const { data, error } = await useCrud()?.post(`/partners/${partner?.value?.slug}/follows`)

	if (data?.value) {
		following.value = !following.value
		showPrompt.value = false
		login.value = false

		emit('done')
	}


	if (error?.value) {
		notify({title : 'Something went wrong', description: `${error?.value?.data?.message as string}`})
	}
}

provide('redirectPath', useRoute()?.fullPath)

</script>
