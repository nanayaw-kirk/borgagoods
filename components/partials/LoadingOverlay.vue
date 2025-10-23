<template>
	<div class="top-0 left-0 absolute w-full h-full z-30 rounded-md bg-background/50 center shadow-2xl">
		<div class="p-4 bg-background border rounded-md flex flex-col items-center gap-y-4">
			<div class="w-[40px] h-[40px] center bg-background rounded-md">
				<span class="icon-spinner text-4xl animate-spin"></span>
			</div>
			<slot name="message"></slot>
		</div>
	</div>
</template>

