<template>
	<div>
		<ui-sheet v-model:open="open">
			<div class="w-full relative">
				<ui-sheet-content :side="smAndDown ? 'bottom' : 'right'" class="rounded-t-xl p-0 gap-0" :class=" bordered  ? 'border' : 'border-none'" :hideClose="loading || persist"  @interactOutside.prevent="loading || persist ? '' : open = false" @escapeKeyDown.prevent="loading || persist ? '' : open = false">
					<ui-sheet-header class="gap-y-0 p-3 border-b" v-if="!hideHeading">
						<slot name="icon"></slot>
						<ui-sheet-title class="font-medium mb-0 text-center">{{ctaTitle}}</ui-sheet-title>
						<ui-sheet-description class="!mt-1 text-center text-foreground/70 md:px-4 line-clamp-2 md:line-clamp-1">{{ctaDesc}}</ui-sheet-description>
					</ui-sheet-header>
					<partials-loading-overlay v-if="loading"></partials-loading-overlay>
					<slot name="content"></slot>

				</ui-sheet-content>
			</div>
		</ui-sheet>
	</div>	
</template>
<script setup lang="ts">
import {useStorage} from "@vueuse/core"

const open = defineModel('open', {default : false})
const md_size = defineModel('md_size', {default : "small"})
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
		default : false
	}
})

onBeforeMount(() => {
	modalSize.value = md_size.value
	loading.value = false
})

</script>
