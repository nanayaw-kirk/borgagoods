<template>
	<div>
		<ui-sheet v-model:open="open"  v-if="smAndDown">
			<div class="w-full relative">
				<ui-sheet-content side="bottom" class="rounded-t-xl p-0 gap-0" :class=" bordered  ? 'border' : 'border-none'" :hideClose="loading || persist"  @interactOutside.prevent="loading || persist ? '' : open = false" @escapeKeyDown.prevent="loading || persist ? '' : open = false">
					<ui-sheet-header class="gap-y-0 p-3 border-b" v-if="!hideHeading">
						<slot name="icon"></slot>
						<ui-sheet-title class="font-medium mb-0 text-center">{{ctaTitle}}</ui-sheet-title>
						<ui-sheet-description class="!mt-1 text-center text-foreground/70 md:px-4 line-clamp-2 md:line-clamp-1">{{ctaDesc}}</ui-sheet-description>
					</ui-sheet-header>
					<slot name="loader">
						<partials-loading-overlay v-if="loading"></partials-loading-overlay>
					</slot>
					<slot name="content"></slot>

				</ui-sheet-content>
			</div>
		</ui-sheet>

		<ui-dialog v-model:open="open" v-else>
			<div class="w-full relative">
				<ui-dialog-content class="rounded-t-xl divide-y p-0 gap-0 !bg-[inherit]" :class="[activeModalSize, bordered  ? 'border' : 'border-none']"  @interactOutside.prevent="loading || persist ? '' : open = false" @escapeKeyDown.prevent="loading || persist ? '' : open = false" :hideClose="loading || persist">

					<ui-dialog-header class="gap-y-0 p-3" v-if="!hideHeading">
						<slot name="icon"></slot>
						<ui-dialog-title class="font-medium mb-0 text-center">{{ctaTitle}}</ui-dialog-title>
						<ui-dialog-description class="!mt-1 text-center text-foreground/70 md:px-4 line-clamp-2 md:line-clamp-1">{{ctaDesc}}</ui-dialog-description>
					</ui-dialog-header>

					<slot name="content"></slot>

					<slot name="loader">
						<partials-loading-overlay v-if="loading"></partials-loading-overlay>
					</slot>

				</ui-dialog-content>
			</div>
		</ui-dialog>
	</div>	
</template>
<script setup lang="ts">
import {useStorage} from "@vueuse/core"

const open = defineModel('open', {default : false})
const md_size = defineModel('md_size', {default : "x-small"})
const loading = useStorage('BRGA_GO_LOADER', false)

const {smAndDown} = useScreenSize()
const { activeModalSize , modalSize} = useModalResize()



const props = defineProps({
	ctaTitle : {
		type : String,
	},
	ctaDesc : {
		type : String
	},
	persist : {
		type : Boolean,
		default : false
	},
	hideHeading : {
		type : Boolean,
		default : false
	},

	bordered : {
		type : Boolean,
		default : true
	}
})

onBeforeMount(async () => {
	modalSize.value = md_size.value
	loading.value = false
	await nextTick()
	modalSize.value = md_size.value
})


watch(md_size, ()=> modalSize.value = md_size.value)


</script>
