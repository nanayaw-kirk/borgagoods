<template>
	<div>
		<auth-modal v-if="!authenticated" :intention="'login'">
			<template #action-button>
				<ui-button class="w-full hidden md:flex items-center gap-x-2" variant="outline">
					<span class="text-2xl" :class="liked ? 'icon-heart-filled text-primary' : 'icon-heart'"></span>
					<span>
						Like
					</span>
				</ui-button>

				<ui-button class="md:hidden bg-transparent" size="icon" variant="outline">
					<span class="text-2xl" :class="liked ? 'icon-heart-filled text-primary' : 'icon-heart'"></span>
				</ui-button>
			</template>
		</auth-modal>
		
		<div v-else @click="toggle()">
			<slot name="trigger">
				<ui-button class="w-full hidden md:flex items-center gap-x-2" variant="outline">
					<span class="text-2xl" :class="liked ? 'icon-heart-filled text-primary' : 'icon-heart'"></span>
					<span>
						Like
					</span>
				</ui-button>

				<ui-button class="md:hidden bg-transparent" size="icon" variant="outline">
					<span class="text-2xl" :class="liked ? 'icon-heart-filled text-primary' : 'icon-heart'"></span>
				</ui-button>
			</slot>
		</div>
	</div>
</template>
<script setup lang="ts">

const {authenticated} = storeToRefs(useAuthStore())
const notify = useToaster()

const emit = defineEmits(['done'])

const product = inject('product')

const liked = ref(product?.value?.has_liked)
const showPrompt = ref(false)
const login = ref(false)

async function toggle() {
	const { data, error } = await useCrud()?.post(`/products/${product?.value?.slug}/likes`)

	if (data?.value) {
		liked.value = !liked.value
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
