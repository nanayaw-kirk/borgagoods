<template>
	<div>
		<cart-actions-user-checkout v-if="authenticated"></cart-actions-user-checkout>
		<cart-actions-anonymous-checkout v-else></cart-actions-anonymous-checkout>
	</div>
</template>
<script setup lang="ts">
const {authenticated} = storeToRefs(useAuthStore())
provide('redirectPath', useRoute()?.name) 
</script>
