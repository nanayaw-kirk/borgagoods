<template>
	<div>
		<partials-loading-overlay v-if="loading"></partials-loading-overlay>

		<div class="grid gap-3">
			<div class="grid gap-y-2 p-3 border rounded-md">

				<div class="flex items-center gap-x-2">
					<icons-tuning class="text-2xl md:text-4xl"></icons-tuning>
					<h3 class="text-sm md:text-lg expand font-medium">Configure your sports preferences</h3>
				</div>

				<div class="grid gap-y-2">
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
			</div>
			


			<div class="grid gap-y-2 p-2 border rounded-md">
				<div class="flex items-center gap-x-2">
					<icons-gender class="text-2xl md:text-4xl"></icons-gender>
					<h3 class="text-sm md:text-lg expand font-medium">What's on your radar?</h3>
				</div>


				<div class="grid gap-y-1">
					<template v-for="(segment, index) in $segments" :key="segment?.value">
						<div class="p-2 cursor-pointer hover:!bg-muted/70 rounded flex items-center gap-3 uk-animation-slide-top-small" :class="[target === segment?.value ? 'bg-gray-100/[5%]' : '']" @click="target = segment?.value" :style="`animation-delay: ${index*50}ms`">
							<div class="expand line-clamp-1">
								{{segment?.text}}
							</div>
							<ui-switch :checked="target === segment?.value" readonly></ui-switch>
						</div>
					</template>
				</div>
			</div>


			<div class="grid gap-y-2 p-3 border rounded-md">
				<ui-button class="w-full h-14" :disabled="loading" @click.prevent="save">
					Save Interests
				</ui-button>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts" async>
const {list , fetchData} = await useDataLoader(`/account/followed-disciplines`)

const {user} = storeToRefs(useAuthStore())
const {fetchUser} = useAuthStore()
const notify = useToaster()
const loading = ref(false)

const interests = ref()
const target = ref(user?.value?.preferences?.target) 

const savedInterests = computed(() =>  list?.value?.map(item => item?.uuid))




function syncInterests(interest){
	if (interests?.value?.includes(interest)) {
		interests.value = interests?.value?.filter(opt => opt !== interest)
		return
	}

	interests.value.push(interest)
}

async function save(){
	loading.value = true
	const a = await useCrud()?.patch(`/account/preferences`, {target : target?.value})
	const b = await useCrud()?.post(`/account/followed-disciplines`, {disciplines : interests?.value})

	await Promise.all([a,b])
	.then(res => {
		notify({title : 'Preferences Saved', description : 'Your settings and preferences have been saved'})
		fetchUser()
	})
	.catch(err => {
		notify({title : 'Failed to save preferences', description : 'Please try again'})
	})
	.finally(()=>{
		loading.value = false
	})
}


watch(savedInterests, ()=> interests.value = savedInterests?.value)

</script>
