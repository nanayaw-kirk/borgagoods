<template>
	<div @click="isDark = !isDark" class="cursor-pointer rounded-xl">
		<client-only>
			<slot name="switcher">
				<div class="size-7 md:size-9 center rounded-[inherit]">
					<span :class="isDark ? 'icon-light' : 'icon-dark'" class="text-xl md:text-2xl text-foreground/50"></span>
				</div>
			</slot>
		</client-only>
	</div>
</template>
<script setup>
const {isDark} = useTheme()
useHead({
	script: [{
		children: `if (localStorage.theme === "dark" || (!('theme' in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
			document.documentElement.setAttribute("data-theme", "dark")
		} else {
			document.documentElement.removeAttribute("data-theme")
	}`}]
})
</script>
