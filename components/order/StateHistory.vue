<template>
	<div>
		<div class="grid">
			<template v-for="(state,index) in publicStates" :key="index">
				<div  v-if="state?.to !== 'pending'">
					<div class="flex gap-x-2 md:gap-x-4">
						
						<div class="flex flex-col items-center">
							<ui-badge :variant="state?.to" class="size-8 md:size-10 center rounded-full !bg-border/50 dark:!bg-border/70 !border-none">
								<state-icon :state="state?.to" class="text-xl md:text-2xl"></state-icon>
							</ui-badge>

							<div class="expand w-[1px] bg-border" v-if="index !== publicStates?.length - 1"></div>
						</div>


						<div class="expand flex flex-col pb-4">
							<span class="capitalize text-sm font-medium">
								{{$clean(!state?.from && state?.to ? state.to : (state.from && state.to) ? state?.to : state?.from )}}
							</span>

							<div class="flex flex-col">
								<span class="text-xs text-foreground/70">
									{{$formatDate(state?.created_at)}} &bull; {{$formatDate(state?.created_at, 'hh:mm A')}}
								</span>

							</div>

							<div class="flex flex-col gap-y-1 mt-1" v-if="state?.custom_properties?.reason">
								<div class="flex gap-1 items-start" v-if="state?.custom_properties?.reason">
									<span class="icon-message text-foreground/50 text-xs"></span>
									<span class="expand text-xs text-foreground/70">
										{{state?.custom_properties?.reason}}
									</span>
								</div>
							</div> 


						</div>
					</div>




				</div>

			</template>
		</div>
	</div>
</template>
<script setup lang="ts">
const props = defineProps({

	states : {
		type : Object,
		required: true
	}

})



const publicStates = computed(() => props.states?.filter(item => !['pending'].includes(item?.to)))

</script>
