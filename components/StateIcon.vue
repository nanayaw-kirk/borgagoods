<template>
	<div>
		<icons-pending class="text-[inherit]" v-if="state === 'pending'"></icons-pending>
		<icons-confirmed class="text-[inherit]" v-else-if="state === 'confirmed'"></icons-confirmed>
		<icons-processing class="text-[inherit]" v-else-if="state === 'processing'"></icons-processing>
		<icons-trolley class="text-[inherit]" v-else-if="state === 'scheduled-for-delivery'"></icons-trolley>
		<icons-bike class="text-[inherit]" v-else-if="state === 'out-for-delivery'"></icons-bike>
		<icons-box class="text-[inherit]" v-else-if="state === 'delivered'"></icons-box>
		<icons-flag class="text-[inherit]" v-else-if="state === 'return-request-submitted'"></icons-flag>
		<icons-processing class="text-[inherit]" v-else-if="state === 'return-request-processing'"></icons-processing>
		<icons-double-check class="text-[inherit]" v-else-if="state === 'return-request-approved'"></icons-double-check>
		<icons-cancel class="text-[inherit]" v-else-if="state === 'return-request-rejected'"></icons-cancel>
		<icons-partial-return class="text-[inherit]" v-else-if="state === 'partially-returned'"></icons-partial-return>
		<icons-return class="text-[inherit]" v-else-if="state === 'returned'"></icons-return>
		<icons-cancel class="text-[inherit]" v-else-if="state === 'cancelled'"></icons-cancel>
		<icons-confetti class="text-[inherit]" v-else-if="state === 'completed'"></icons-confetti>
		<icons-cart class="text-[inherit]" v-else></icons-cart>
	</div>
</template>
<script setup lang="ts">
const props = defineProps({
	state : {
		type : String,
		required: true,
		default : 'pending'
	}
})
</script>
