<template>
	<div>
		<div class="w-full flex gap-4">
			<div class="w-2/3 md:w-1/3 flex items-center gap-2">

				<icons-map-pin-out class="md:hidden text-3xl text-foreground/70"></icons-map-pin-out>
				<div class="expand flex flex-col">
					<span class="text-sm md:text-base font-medium leading-tight">
						{{entry?.location?.name}} 
					</span>
					<span class="text-xs text-foreground/70 md:hidden leading-tight">
						{{entry?.landmark}}
					</span>
					<span class="text-xs text-foreground/70 hidden md:block">
						Delivery to this address starts at {{$CURRENCY(entry?.location?.base_delivery_charge?.price)}}
					</span>
				</div>

				<ui-tooltip-provider v-if="entry?.is_default">
					<ui-tooltip>
						<ui-tooltip-trigger as-child>
							<icons-check-circle class="text-emerald-500 md:text-2xl"></icons-check-circle>
						</ui-tooltip-trigger>
						<ui-tooltip-content>
							<p>
								This is your default address
							</p>
						</ui-tooltip-content>
					</ui-tooltip>
				</ui-tooltip-provider>
			</div>

			<div class="expand grid md:grid-cols-4 gap-4 items-center">
				<div class="hidden md:flex items-center gap-x-4 items-start">
					<div>
						<country-flag :country="entry?.country?.alpha_2_code" size="normal"></country-flag>
					</div>
					<div class="flex items-center gap-x-2">
						<span class="text-2xl text-foreground/70" :class="`icon-${entry?.type}`"></span>
						<div class="expand capitalize line-clamp-1 text-sm">
							{{entry?.type}}
						</div>
					</div>
				</div>
				
				<div class="hidden md:flex items-center gap-x-2 items-start">
					<icons-map-pin-out class="text-2xl text-foreground/70"></icons-map-pin-out>
					<div class="expand line-clamp-1 text-sm">
						{{entry?.landmark}}
					</div>
				</div>

				<div class="hidden md:flex items-center gap-x-2 items-start">
					<span class="icon-phone-plus text-2xl text-foreground/70"></span>
					<div class="expand line-clamp-1 text-sm">
						{{entry?.phone}}
					</div>
				</div>
				
				<div class="flex items-center gap-x-2 justify-end pr-4">

					<div class="md:hidden">
						<country-flag  :country="entry?.country?.alpha_2_code" size="small"></country-flag>
					</div>

					<div>
						<ui-dropdown-menu>
							<ui-dropdown-menu-trigger as-child>
								<ui-button size="icon" variant="outline" class="h-7 w-7">
									<span class="icon-dots-horizontal"></span>
								</ui-button>
							</ui-dropdown-menu-trigger>

							<ui-dropdown-menu-content>
								<ui-dropdown-menu-group>
									<ui-dropdown-menu-item  @click="openDialog = true; intent = 'primary'; modalSize = 'x-small'" v-if="!entry?.is_default">
										<div class="flex items-center gap-x-2 group cursor-pointer">
											<ui-button size="icon" variant="ghost" class="h-8 w-8 group-hover:bg-background">
												<span class="icon-check"></span>
											</ui-button>
											<div class="expand flex flex-col">
												<span class="font-medium">Make default</span>
												<span class="text-xs text-foreground/70">Set as your default checkout address</span>
											</div>
										</div>
									</ui-dropdown-menu-item>

									<ui-dropdown-menu-item  @click="openDialog = true; intent = 'delete'; modalSize = 'x-small'">
										<div class="flex items-center gap-x-2 group cursor-pointer">
											<ui-button size="icon" variant="ghost" class="h-8 w-8 group-hover:bg-background">
												<span class="icon-delete"></span>
											</ui-button>
											<div class="expand flex flex-col">
												<span class="font-medium">Delete Address</span>
												<span class="text-xs text-foreground/70">Remove address from your account</span>
											</div>
										</div>
									</ui-dropdown-menu-item>
								</ui-dropdown-menu-group>
							</ui-dropdown-menu-content>
						</ui-dropdown-menu>
					</div>
				</div>
			</div>
		</div>

		<partials-dialog :persist="true" :ctaTitle="headings?.title" :ctaDesc="headings?.description" v-model:md_size="modalSize" v-model:open="openDialog" :key="`dialog-${openDialog}`">
			<template #content>
				<delivery-forms-set-default @done="openDialog = false; $emit('done')" v-if="intent === 'primary'"></delivery-forms-set-default>
				<delivery-forms-delete @done="openDialog = false; $emit('done')" v-else-if="intent === 'delete'"></delivery-forms-delete>
			</template>

			<template #loader v-if="loading">
				<partials-loading-overlay></partials-loading-overlay>
			</template>
		</partials-dialog>

	</div>
</template>
<script setup lang="ts">
import {useStorage} from "@vueuse/core"
const loading = useStorage('BRGA_GO_LOADER', false)
const {smAndDown} = useScreenSize()
const {modalSize} = useModalResize()
const props = defineProps({
	entry : {
		type : Object,
		required : true
	}
})


const intent = ref(null)
const openDialog = ref(false)


const headings = computed(() => {
	if (intent.value === 'delete') return {title : "Remove Location", description : `Delete ${props?.entry?.location?.name}`};
	if (intent.value === 'primary') return {title : "Default delivery location", description : `Set ${props?.entry?.location?.name} as your default location`};
	return {title : "Options", description : `General options`}
})



provide("entry", props.entry)


</script>
