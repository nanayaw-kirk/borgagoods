<template>
	<client-only>
		<div class="h-full w-full rounded-[inherit] overflow-hidden">
			<div  v-if="!imageLoaded" class="h-full w-full !rounded-[inherit] bg-muted"></div>
			<img v-show="imageLoaded" :src="displayImage" alt="Product Image" class="w-full h-full object-cover object-top  dark:group-hover:shadow-xl !rounded-[inherit] group-hover:scale-105" @load="imageLoaded = true">
		</div>
	</client-only>
</template>
<script setup lang="ts">


const imageLoaded = ref(false)
const imageSrc = ref(null)

const props = defineProps({
	media : {
		type : String,
		required : true
	}
})

const displayImage = computed(() => props?.media ? props?.media : '/placeholder.svg' )

</script>
