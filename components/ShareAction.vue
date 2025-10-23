<template>
	<div>
		<div class="cursor-pointer w-full" @click="shareResource">
			<slot name="trigger">

				<ui-button class="w-full hidden md:flex items-center gap-x-2" variant="outline">
					<span class="icon-share"></span>
					<span>
						Share
					</span>
				</ui-button>

				<ui-button class="md:hidden" size="icon" variant="outline">
					<span class="icon-share text-xl"></span>
				</ui-button>
			</slot>
		</div>
	</div>
</template>


<script lang="ts" setup>

const notify = useToaster()

const props = defineProps({
	data : {
		type : Object,
		required : true
	}
})

const emit = defineEmits(['shared'])

async function shareResource() {

	if (!navigator.canShare(props?.data)) {
		notify({title: 'Operation failed', description : 'Failed to share resource'})
		return;
	}

	if (navigator.share) {
		let shareData = {
			url: props.data.url,
			title: props.data.title,
			text : props.data.text ? props.data.text : props.data.title
		};

		try {
			let shared = await navigator.share(shareData);
			emit('shared')
		} catch (error) {
			notify({title: 'Operation failed', description : 'Failed to share resource'})
		}

	} 

	else {
		notify({title: 'Operation failed', description : 'Your browser does not support sharing'})
	}
}
</script>