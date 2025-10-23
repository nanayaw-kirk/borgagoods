<template>
	<ui-avatar class="w-full bg-transparent h-full rounded-[inherit]">
		<ui-avatar-image :src="image"></ui-avatar-image>
		<ui-avatar-fallback>
			{{user?.name?.substring(0,1)}}
		</ui-avatar-fallback>
	</ui-avatar>
</template>
<script setup lang="ts">

const { user 	} = storeToRefs(useAuthStore())

const image = computed(() => {
	if (user?.value?.gender === 'male') return "/avatars/male.svg";
	if (user?.value?.gender === 'female') return "/avatars/female.svg";
	return "/avatars/default.svg"
})

</script>
