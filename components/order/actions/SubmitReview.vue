<template>
	<div>
		
		<div class="p-3">
			<div class="flex flex-col items-center p-6 md:px-10">
				<icons-chat class="text-6xl md:text-7xl text-primary mb-4"></icons-chat>
				<h4 class="text-xl md:text-2xl font-medium mb-2 text-center">Review Your Experience</h4>
				<p class="text-sm md:text-base text-center text-foreground/70">
					To help us continue to improve customer satisfaction on {{$appName}}, kindly review your experience with this order.
				</p>
			</div>	
			<div class="grid gap-4 p-2 md:p-4">
				<div class="flex flex-col items-center">
					<span class="text-xs text-foreground/70 text-center">Choose a star rating.</span>
					<div class="flex items-center gap-x-2 justify-center">
						<span class="text-4xl cursor-pointer" v-for="i in 5" :key="i" @click="review.rating = i" :class="review.rating >= i ? 'text-primary icon-star-filled' : 'text-foreground/70 icon-star-outline'">
						</span>
					</div>

				</div>

				<div class="w-full flex flex-col gap-y-2">
					<ui-textarea class="h-[130px] resize-none text-pretty" placeholder="Leave a comment" v-model="review.comment"></ui-textarea>

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


		</div>

		<div class="flex items-center gap-3 p-3 border-t">
			<ui-button variant="ghost" class="md:h-12" @click.prevent="$emit('cancel')" :disabled="loading">
				Cancel
			</ui-button>

			<ui-button  class="expand md:h-12" @click.prevent="submit" :disabled="!valid?.success || loading">
				Submit Review
			</ui-button>
		</div>




		
	</div>	
</template>
<script setup lang="ts">
import {z} from "zod"
import {useStorage} from "@vueuse/core"

const emit = defineEmits(['cancel', 'reviewed'])
const notify = useToaster()

const props = defineProps({
	order : {
		type : Object,
		required : true
	}
})

const loading = useStorage('BRGA_GO_LOADER', false)


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

	const {data, error}  = await useCrud().post(`/orders/${props?.order?.uuid}/reviews`, review?.value)

	if (error?.value) {
		notify({ title: 'Failed to submit review', description: `${error?.value?.data?.message as string}`})
	}

	if (data?.value) {
		emit('reviewed')
	}


	loading.value  = false
}

</script>
