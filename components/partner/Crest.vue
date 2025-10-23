<template>
	<div>
		<img :src="crest" alt="Partner Crest" class="aspect-square object-contain">
	</div>
</template>
<script setup lang="ts">


const props = defineProps({ url : { required : true }})
const crest = computed(() => props?.url ? props?.url : '/illustrations/crest.svg')

</script>
