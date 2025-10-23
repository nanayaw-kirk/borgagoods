<template>
	<div>
		<div class="w-full grid gap-2 md:gap-4">
			<div class="flex flex-col gap-y-1" :key="i">
				<div class="flex gap-x-1">
					<span class="text-xs" v-for="i in 5" :key="i" :class="i <= parseInt(entry?.rating) ? 'icon-star-filled text-amber-500' : 'icon-star-outline'"></span>

					</div>

					<div class="flex items-center gap-2">
						<div class="expand">
							<span class="line-clamp-1 text-sm font-medium">
								{{entry?.user?.name}}
							</span>
						</div>
						<div class="w-fit">
							<span class="text-xs line-clamp-1 text-foreground/70">
								{{$formatDate(entry?.created_at, 'DD/MM/YYYY')}}
							</span>
						</div>
					</div>

					<div v-if="entry?.comment">
						<p class="text-sm text-foreground/70">
							{{entry?.comment}}
						</p>
					</div>
				</div>
			</div>

			<!-- {{entry}} -->
		</div>
	</template>
	<script setup lang="ts">
	const props = defineProps({
		entry : {
			type : Object,
			required : true
		}
	})
	</script>
