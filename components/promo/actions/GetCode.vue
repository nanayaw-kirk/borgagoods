<template>
	<div>
		<ui-button size="sm" class="h-6" @click="open = true">
			Get Code
		</ui-button>



		<partials-dialog v-model:open="open" :ctaTitle="`${promo?.name}`" :ctaDesc="`Get Promo Code`" v-model:md_size="size" hideHeading>
			<template #content>
				<div class="p-8 flex flex-col items-center border rounded-xl">
					<icons-sale class="text-6xl text-foreground/70 mb-4"></icons-sale>
					<h2 class="font-bold text-2xl text-center">{{promo?.name}}</h2>
					<p class="text-foreground/70 text-center text-xs md:text-sm">
						{{promo?.description ? promo?.description : `Get ${$percentize(promo?.discount)} off on pieces in this promotion`}}
					</p>

					<div class="my-4">
						<!-- <div class="border border-dashed border-2 py-1 px-4 rounded-lg bg-muted/50">
							<span class="font-medium">
								{{promo?.promo_code}}
							</span>
						</div> -->

						<input class="text-center border border-2 border-dashed py-1 px-4 outline-none appearance-none rounded-lg selection:bg-transparent selection:text-current bg-transparent" :value="promo?.promo_code" readonly ref="codeNode">
					</div>

					<div>
						<ui-button class="gap-x-2" @click.prevent="copyCode()">
							<span class="text-xs">
								Copy Code
							</span>

							<span class="icon-copy"></span>
						</ui-button>
					</div>
				</div>
			</template>
		</partials-dialog>

	</div>	
</template>
<script setup lang="ts">

const promo = inject('promo')
const notify = useToaster()
const open = ref(false)
const size = 'x-small'
const codeNode = ref(null)


function copyCode(){
	codeNode?.value?.focus()
	codeNode?.value?.select()
	let message = document.execCommand("copy")
	notify({title : 'Promo Code Copied', description : "Promo code copied to your clipboard"})
}
</script>
