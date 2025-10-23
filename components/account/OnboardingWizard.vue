<template>
	<div>
		<ui-card class="shadow-none md:shadow border-0 md:border" v-if="stage === 'SPORT'">
			<ui-card-header class="p-0 md:p-6">
				<ui-card-title class="font-medium text-xl md:text-2xl text-center md:text-left">Select your favorite sports</ui-card-title>
				<ui-card-description class="text-sm text-center md:text-left">Get started by telling us what sports you like</ui-card-description>
			</ui-card-header>
			<ui-card-content class="p-0 !pt-2 md:pt-0 md:p-6">
				<div class="grid gap-y-1">
					<template v-for="sport in $sports" :key="sport?.uuid">
						<div class="p-2 cursor-pointer hover:!bg-muted/70 rounded flex items-center gap-3" :class="interests?.includes(sport?.uuid) ? 'bg-gray-100/[5%]' : ''" @click="syncInterests(sport?.uuid)">
							<ui-avatar class="p-[2px] w-[30px] h-[30px]">
								<ui-avatar-image :src="`/sports/${sport.slug.split('-').join('')}.svg`"></ui-avatar-image>
								<ui-avatar-fallback class="uppercase">{{sport?.name?.substring(0,2)}}</ui-avatar-fallback>
							</ui-avatar>
							<div class="expand line-clamp-1">
								{{sport?.name}}
							</div>
							<span class="text-xl" :class="interests?.includes(sport?.uuid) ? 'icon-star-filled text-primary' : 'icon-star-outline'"></span>
						</div>
					</template>
				</div>


				<ui-separator decorative class="mt-2"></ui-separator>

				<ui-card-footer class="px-0 pt-2 justify-center">
					<ui-button  @click.prevent="stage = 'PREFERENCE'" :disabled="interests?.length < 1">
						Proceed
					</ui-button>
				</ui-card-footer>
			</ui-card-content>
		</ui-card>



		<ui-card class="shadow-none md:shadow border-0 md:border" v-else-if="stage === 'PREFERENCE'">
			<ui-card-header class="p-0 md:p-6">
				<ui-card-title class="font-medium text-xl md:text-2xl text-center md:text-left">What's on your sports radar?</ui-card-title>
				<ui-card-description class="text-sm text-center md:text-left">Tell us what gets your attention</ui-card-description>
			</ui-card-header>
			<ui-card-content class="p-0 !pt-2 md:pt-0 md:p-6">
				<div class="grid gap-y-1">
					<template v-for="(segment, index) in $segments" :key="segment?.value">
						<div class="p-2 cursor-pointer hover:!bg-muted/70 rounded flex items-center gap-3 uk-animation-slide-top-small" :class="[preference === segment?.value ? 'bg-gray-100/[5%]' : '']" @click="preference = segment?.value" :style="`animation-delay: ${index*50}ms`">
							<div class="expand line-clamp-1">
								{{segment?.text}}
							</div>
							<span class="text-2xl" :class="preference === segment?.value ? 'icon-check-box text-primary' : 'icon-checkbox'"></span>
						</div>
					</template>
				</div>


				<ui-separator decorative class="mt-4 md:mt-6"></ui-separator>

				<ui-card-footer class="px-0 pt-4 md:pt-6 justify-center gap-x-4">
					
					<ui-button variant="secondary"  @click.prevent="stage = 'SPORT'">
						Back
					</ui-button>

					<ui-button @click.prevent="stage = 'TEAMS'" :disabled="!preference">
						Continue
					</ui-button>
				</ui-card-footer>
			</ui-card-content>
		</ui-card>




		<ui-card class="shadow-none md:shadow border-0 md:border" v-else-if="stage === 'TEAMS'">
			<ui-card-header class="p-0 md:p-6">
				<ui-card-title class="font-medium text-xl md:text-2xl text-center md:text-left">Follow your favorite teams</ui-card-title>
				<ui-card-description class="text-sm text-center md:text-left">Follow your favorite sports teams for personalized offers</ui-card-description>
			</ui-card-header>
			<ui-card-content class="p-0 !pt-2 md:pt-0 md:p-6">
				
				<team-selector v-model:entries="teams" :preloadSport="$sports?.find(it => it?.uuid === interests?.[0])"></team-selector>
				

				<ui-separator decorative class="mt-4 md:mt-6"></ui-separator>

				<ui-card-footer class="px-0 pt-4 md:pt-6 justify-center gap-x-4">
					
					<ui-button variant="secondary"  @click.prevent="stage = 'PREFERENCE'">
						Back
					</ui-button>

					<ui-button  @click.prevent="stage = 'PRI_RELEASES'">
						{{teams?.length < 1 ? 'Skip' : 'Continue'}}
					</ui-button>
				</ui-card-footer>
			</ui-card-content>
		</ui-card>



		<ui-card class="shadow-none md:shadow border-0 md:border" v-else-if="stage === 'PRI_RELEASES'">


			<div class="flex flex-col md:flex-row items-center gap-4 md:gap-0 md:pl-4">
				<icons-library class="text-6xl text-primary dark:text-foreground"></icons-library>
				<ui-card-header class="p-0 md:p-6 expand">
					<ui-card-title class="font-medium text-xl md:text-2xl text-center md:text-left">Would you like to receive updates about new merchandise releases on {{$appName}}?</ui-card-title>
					<ui-card-description class="text-sm text-center md:text-left hidden">Tell us your preferences when it comes to announcing new releases</ui-card-description>
				</ui-card-header>
			</div>
			<ui-card-content class="p-0 !pt-2 md:pt-0 md:p-6">
				<div class="grid gap-y-2">
					<div class="px-2 py-2 flex items-center  rounded-md bg-muted/30 cursor-pointer" @click="privacy.notify_new_merch_releases = 'all'">
						<div class="expand text-sm line-clamp-2">
							Yes
						</div>
						<ui-checkbox :checked="privacy?.notify_new_merch_releases === 'all'" class="rounded-full w-6 h-6"></ui-checkbox>
					</div>

					<div class="px-2 py-2 flex items-center  rounded-md bg-muted/30 cursor-pointer" @click="privacy.notify_new_merch_releases = 'followed-partners'">
						<div class="expand text-sm line-clamp-2">
							Yes but only for teams I follow
						</div>
						<ui-checkbox :checked="privacy?.notify_new_merch_releases === 'followed-partners'" class="rounded-full w-6 h-6"></ui-checkbox>
					</div>

					<div class="px-2 py-2 flex items-center  rounded-md bg-muted/30 cursor-pointer" @click="privacy.notify_new_merch_releases = 'none'">
						<div class="expand text-sm line-clamp-2">
							No. I don't want to be bothered
						</div>
						<ui-checkbox :checked="privacy?.notify_new_merch_releases === 'none'" class="rounded-full w-6 h-6"></ui-checkbox>
					</div>
				</div>


				<ui-separator decorative class="mt-4 md:mt-6"></ui-separator>

				<ui-card-footer class="px-0 pt-4 md:pt-6 justify-center gap-x-4">

					<ui-button variant="secondary"  @click.prevent="stage = 'TEAMS'">
						Back
					</ui-button>

					<ui-button  @click.prevent="stage = 'PRI_DATA_SHARING'" :disabled="!privacy?.notify_new_merch_releases">
						Next
					</ui-button>
				</ui-card-footer>
			</ui-card-content>
		</ui-card>



		<ui-card class="shadow-none md:shadow border-0 md:border" v-else-if="stage === 'PRI_DATA_SHARING'">

			<div class="flex flex-col md:flex-row items-center gap-4 md:gap-0 md:pl-4">
				<icons-user-heart class="text-6xl text-primary dark:text-foreground"></icons-user-heart>
				<ui-card-header class="p-0 md:p-6 expand">
					<ui-card-title class="font-medium text-xl md:text-2xl text-center md:text-left">
						Would you like to share your data with partners you patronize on {{$appName}}
					</ui-card-title>
					<ui-card-description class="text-sm text-center md:text-left hidden">Tell us your preferences when it comes to announcing new releases</ui-card-description>
				</ui-card-header>
			</div>
			<ui-card-content class="p-0 !pt-2 md:pt-0 md:p-6">
				<div class="grid gap-y-2">
					<div class="px-2 py-2 flex items-center  rounded-md bg-muted/30 cursor-pointer" @click="privacy.share_data_with_partners = 'all'">
						<div class="expand text-sm line-clamp-2">
							Yes
						</div>
						<ui-checkbox :checked="privacy?.share_data_with_partners === 'all'" class="rounded-full w-6 h-6"></ui-checkbox>
					</div>

					<div class="px-2 py-2 flex items-center  rounded-md bg-muted/30 cursor-pointer" @click="privacy.share_data_with_partners = 'followed-partners'">
						<div class="expand text-sm line-clamp-2">
							Yes but only for teams I follow
						</div>
						<ui-checkbox :checked="privacy?.share_data_with_partners === 'followed-partners'" class="rounded-full w-6 h-6"></ui-checkbox>
					</div>

					<div class="px-2 py-2 flex items-center  rounded-md bg-muted/30 cursor-pointer" @click="privacy.share_data_with_partners = 'per-purchase'">
						<div class="expand text-sm line-clamp-2">
							Let me decide on every purchase
						</div>
						<ui-checkbox :checked="privacy?.share_data_with_partners === 'per-purchase'" class="rounded-full w-6 h-6"></ui-checkbox>
					</div>

					<div class="px-2 py-2 flex items-center  rounded-md bg-muted/30 cursor-pointer" @click="privacy.share_data_with_partners = 'none'">
						<div class="expand text-sm line-clamp-2">
							No. Do not share my data
						</div>
						<ui-checkbox :checked="privacy?.share_data_with_partners === 'none'" class="rounded-full w-6 h-6"></ui-checkbox>
					</div>
				</div>



				<ui-separator decorative class="mt-4 md:mt-6"></ui-separator>

				<ui-card-footer class="px-0 pt-4 md:pt-6 justify-center gap-x-4">

					<ui-button variant="secondary"  @click.prevent="stage = 'PRI_RELEASES'">
						Back
					</ui-button>

					<ui-button  @click.prevent="stage = 'PRI_PROMOS'" :disabled="!privacy?.share_data_with_partners">
						Next
					</ui-button>
				</ui-card-footer>
			</ui-card-content>
		</ui-card>



		<ui-card class="shadow-none md:shadow border-0 md:border" v-else-if="stage === 'PRI_PROMOS'">

			<div class="flex flex-col md:flex-row items-center gap-4 md:gap-0 md:pl-4">
				<icons-sale class="text-6xl text-primary dark:text-foreground"></icons-sale>
				<ui-card-header class="p-0 md:p-6 expand">
					<ui-card-title class="font-medium text-xl md:text-2xl text-center md:text-left">Would you like to notified about promos and personalized offers on {{$appName}}</ui-card-title>
					<ui-card-description class="text-sm text-center md:text-left hidden">Tell us your preferences when it comes to announcing new releases</ui-card-description>
				</ui-card-header>
			</div>
			<ui-card-content class="p-0 !pt-2 md:pt-0 md:p-6">
				
				<div class="grid gap-y-2">
					<div class="px-2 py-2 flex items-center  rounded-md bg-muted/30 cursor-pointer" @click="privacy.notify_on_promos_and_offers = 'all'">
						<div class="expand text-sm line-clamp-2">
							Yes
						</div>
						<ui-checkbox :checked="privacy?.notify_on_promos_and_offers === 'all'" class="rounded-full w-6 h-6"></ui-checkbox>
					</div>

					<div class="px-2 py-2 flex items-center  rounded-md bg-muted/30 cursor-pointer" @click="privacy.notify_on_promos_and_offers = 'followed-partners'">
						<div class="expand text-sm line-clamp-2">
							Yes but only for teams I follow
						</div>
						<ui-checkbox :checked="privacy?.notify_on_promos_and_offers === 'followed-partners'" class="rounded-full w-6 h-6"></ui-checkbox>
					</div>

					<div class="px-2 py-2 flex items-center  rounded-md bg-muted/30 cursor-pointer" @click="privacy.notify_on_promos_and_offers = 'none'">
						<div class="expand text-sm line-clamp-2">
							No. I don't want to be bothered
						</div>
						<ui-checkbox :checked="privacy?.notify_on_promos_and_offers === 'none'" class="rounded-full w-6 h-6"></ui-checkbox>
					</div>
				</div>


				<ui-separator decorative class="mt-4 md:mt-6"></ui-separator>

				<ui-card-footer class="px-0 pt-4 md:pt-6 justify-center gap-x-4">

					<ui-button variant="secondary"  @click.prevent="stage = 'PRI_DATA_SHARING'">
						Back
					</ui-button>

					<ui-button  @click.prevent="stage = 'PRI_UPDATES'" :disabled="!privacy?.notify_on_promos_and_offers">
						Next
					</ui-button>
				</ui-card-footer>
			</ui-card-content>
		</ui-card>



		<ui-card class="shadow-none md:shadow border-0 md:border" v-if="stage === 'PRI_UPDATES'">
			<div class="flex flex-col md:flex-row items-center gap-4 md:gap-0 md:pl-4">
				<icons-notify class="text-6xl text-primary dark:text-foreground"></icons-notify>
				<ui-card-header class="p-0 md:p-6 expand">
					<ui-card-title class="font-medium text-xl md:text-2xl text-center md:text-left">Would you like to receive updates about the platform & essenstial news?</ui-card-title>
					<ui-card-description class="text-sm text-center md:text-left hidden">Tell us your preferences when it comes to announcing new releases</ui-card-description>
				</ui-card-header>
			</div>
			<ui-card-content class="p-0 !pt-2 md:pt-0 md:p-6">
				
				<div class="grid gap-y-2">
					<div class="px-2 py-2 flex items-center  rounded-md bg-muted/30 cursor-pointer" @click="privacy.notify_platform_updates = true">
						<div class="expand text-sm line-clamp-2">
							Yes
						</div>
						<ui-checkbox :checked="privacy?.notify_platform_updates" class="rounded-full w-6 h-6"></ui-checkbox>
					</div>

					<div class="px-2 py-2 flex items-center  rounded-md bg-muted/30 cursor-pointer" @click="privacy.notify_platform_updates = false">
						<div class="expand text-sm line-clamp-2">
							No. I don't want to be bothered
						</div>
						<ui-checkbox :checked="!privacy?.notify_platform_updates" class="rounded-full w-6 h-6"></ui-checkbox>
					</div>
				</div>


				<ui-separator decorative class="mt-4 md:mt-6"></ui-separator>

				<ui-card-footer class="px-0 pt-4 md:pt-6 justify-center gap-x-4">

					<ui-button variant="secondary"  @click.prevent="stage = 'PRI_PROMOS'">
						Back
					</ui-button>

					<ui-button @click.prevent="savePreferences()">
						Save & Complete Onboarding
					</ui-button>
				</ui-card-footer>
			</ui-card-content>
		</ui-card>

		<ui-card class="shadow-none md:shadow border-0 md:border" v-if="stage === 'COMPLETED'">
			<div class="flex flex-col items-center gap-4 md:gap-0 pt-4">
				<icons-confetti class="text-6xl text-primary dark:text-foreground"></icons-confetti>
				<ui-card-header class="p-0 md:p-6 expand">
					<ui-card-title class="font-medium text-xl md:text-2xl text-center">Setup completed</ui-card-title>
					<ui-card-description class="text-sm text-center">Congratulations! You have completed your {{$appName}} accound setup</ui-card-description>
				</ui-card-header>
			</div>
			<ui-card-content class="p-0 !pt-2 md:pt-0 md:p-6">
				<partials-todo></partials-todo>
			</ui-card-content>
		</ui-card>


		<ui-dialog v-model:open="loading">
			<ui-dialog-content class="p-0 flex flex-col gap-y-0 max-w-[85dvw] md:w-[400px] rounded-md"  @interactOutside.prevent="" @escapeKeyDown.prevent="">
				<div class="hidden">
					<ui-dialog-header class="p-4 w-full">
						<ui-dialog-title class="text-center">Loading Dialog</ui-dialog-title>
						<ui-dialog-description class="text-center">Dialog displayed while onboarding process is being persisted</ui-dialog-description>
					</ui-dialog-header>
				</div>
				<div class="flex flex-col px-4 py-10 gap-y-4 items-center">
					<span class="icon-loading animate-spin text-3xl"></span>
					<span class="text-center text-foreground/80">Seving your preferences</span>
				</div>
			</ui-dialog-content>
		</ui-dialog>



	</div>	
</template>
<script setup lang="ts">
import {z} from "zod"
const stage = ref("SPORT")

const interests = ref([])
const teams = ref([])
const preference = ref("")
const notify = useToaster()

const loading = ref(false)

const {post, patch} = useCrud()





const privacy = ref({
	share_data_with_partners : 'all',
	notify_new_merch_releases : 'all',
	notify_on_promos_and_offers : 'all',
	notify_platform_updates : true,
})


function syncInterests(interest){
	if (interests?.value?.includes(interest)) {
		interests.value = interests?.value?.filter(opt => opt !== interest)
		return
	}

	interests.value.push(interest)
}


async function savePreferences(){
	loading.value = true
	const a = await patch(`/account/preferences`, {target : preference?.value})
	const b = await patch(`/account/privacy`, privacy?.value)
	const c = await post(`/account/followed-partners`, {partners : teams?.value})
	const d = await post(`/account/followed-disciplines`, {disciplines : interests?.value})

	await Promise.all([a,b,c,d])
	.then(res => {
		notify({title : 'Preferences Saved', description : 'Your settings and preferences have been saved'})
		stage.value = 'COMPLETED'
	})
	.catch(err => {
		notify({title : 'Failed to save preferences', description : 'Please try again'})
	})
	.finally(()=>{
		loading.value = false
	})
}

</script>
