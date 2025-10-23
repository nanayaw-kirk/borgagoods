<template>
	<div>
		<div @click.prevent="open = true; size = 'x-small'">
			<slot name="trigger">
				<ui-button class="w-full hidden md:flex items-center gap-x-2" variant="outline">
					<span class="icon-chat"></span>
					<span>
						Review
					</span>
				</ui-button>

				<ui-button class="md:hidden" size="icon" variant="outline">
					<span class="icon-chat text-xl"></span>
				</ui-button>
			</slot>
		</div>





		<partials-dialog v-model:open="open" :ctaTitle="`Review Product`" :ctaDesc="`Leave a review for ${product?.name} on ${$appName}`" v-model:md_size="size" hideHeading>
			<template #content :key="authenticated">
				<div>
					<div v-if="authenticated">
						<div class="w-full aspect-[1/0.8] md:aspect-[1/0.7] bg-muted rounded-t-xl">
							<img :src="product?.media?.[0]?.web" class="w-full h-full object-cover object-top rounded-t-xl" alt="">
						</div>
						<div class="grid gap-4 p-2 md:p-4">
							<div class="flex flex-col items-center">
								<span class="text-xs text-foreground/70 text-center">Choose a star rating for this product</span>
								<div class="flex items-center gap-x-2 justify-center">
									<span class="text-4xl cursor-pointer" v-for="i in 5" :key="i" @click="review.rating = i" :class="review.rating >= i ? 'text-primary icon-star-filled' : 'text-foreground/70 icon-star-outline'">
									</span>
								</div>

							</div>

							<div class="w-full flex flex-col gap-y-2">
								<ui-textarea class="h-[130px] resize-none text-pretty" placeholder="Write a comment" v-model="review.comment"></ui-textarea>

								<div class="flex items-center justify-between">
									<span class="text-xs text-foreground/70">
										Your comment should be between 5-255 characters
									</span>
									<span class="text-xs" :class="review?.comment?.length > 255 ? 'text-destructive' : 'text-foreground/70'">
										{{review?.comment?.length}} / 255
									</span>
								</div>
							</div>
						</div>

						<div class="p-2 flex gap-2 md:p-4 border-t">
							<ui-dialog-close>
								<ui-button variant="ghost" class="h-12">
									Cancel
								</ui-button>
							</ui-dialog-close>
							<ui-button class="expand h-12" :disabled="!valid?.success || loading" @click="submit">
								Submit Review
							</ui-button>
						</div>
					</div>
					<div class="p-8 flex flex-col items-center border rounded-md" v-else>
						<icons-chat class="text-8xl text-foreground/70 mb-4"></icons-chat>
						<h2 class="font-bold text-2xl text-center">Sign in to continue</h2>
						<p class="text-foreground/70 text-center">
							Sign in to your {{$appName}} account to leave a review for this product. 
						</p>

						<div class="mt-4">
							<auth-modal :intention="'login'">
								<template #action-button>
									<div class="flex justify-center gap-2">
										<ui-button>
											Log In
										</ui-button>
									</div>
								</template>
							</auth-modal>
						</div>
					</div>
				</div>
			</template>
		</partials-dialog>


		<ui-dialog v-model:open="showSuccess">
			<div class="w-full relative">
				<ui-dialog-content class="rounded-xl p-0 gap-0 !bg-[inherit] border max-w-[350px]" hideClose>

					<ui-dialog-header class="gap-y-0 p-3 hidden">
						<slot name="icon"></slot>
						<ui-dialog-title class="font-medium mb-0 text-center">Success Notice</ui-dialog-title>
						<ui-dialog-description class="!mt-1 text-center text-foreground/70 md:px-4 line-clamp-2 md:line-clamp-1">Show notice for sucess</ui-dialog-description>
					</ui-dialog-header>

					<div class="flex flex-col items-center p-8">
						<icons-confetti class="text-6xl md:text-8xl mb-1 text-primary"></icons-confetti>

						<h3 class="text-center text-xl font-medium">Thank you for your review!</h3>
						<p class="text-center text-foreground/70 mb-4">
							We appreciate your time and contribution in helping make {{$appName}} even better for everyone.
						</p>
						<ui-dialog-close>
							<ui-button class="mx-auto" variant="ghost" @click="$emit('done')">
								Close
							</ui-button>
						</ui-dialog-close>
					</div>

				</ui-dialog-content>
			</div>
		</ui-dialog>


	</div>
</template>
<script setup lang="ts">
import {z} from "zod"
const product = inject("product")
import {useStorage} from "@vueuse/core"
const loading = useStorage('BRGA_GO_LOADER', false)

const {authenticated} = storeToRefs(useAuthStore())
const notify = useToaster()
const emit = defineEmits(['done'])


const open = ref(false)
const showSuccess = ref(false)
const size = ref('x-small')

const schema = z.object({
	rating : z.number().min(1).max(5),
	comment : z.string().min(5).max(255)
})

const review = ref({
	rating : 0,
	comment : ''
})


const valid = computed(() => schema.safeParse(review?.value))


async function submit(){
	loading.value = true
	showSuccess.value = false

	const {data, error}  = await useCrud().post(`/products/${product?.value?.slug}/reviews`, review?.value)

	if (error?.value) {
		notify({ title: 'Failed to submit review', description: `${error?.value?.data?.message as string}`})
	}

	if (data?.value) {
		open.value = false
		showSuccess.value = true
	}


	loading.value  = false
}

provide('redirectPath', useRoute()?.fullPath)

watch(authenticated, ()=>{
	loading.value = false
})


</script>
