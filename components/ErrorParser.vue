<template>

	<div>
		{{error}}
	</div>

</template>
<script setup lang="ts">
defineProps({
	error : {
		type : Object,
		required : true
	}
})
</script>
