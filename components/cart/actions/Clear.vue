<template>
	<div>
		
		<div @click="cartQuantity ? open = true : ''">
			<slot>
				<ui-button size="sm" variant="link" class="uppercase text-foreground/70 hover:text-foreground/70" :disabled="cartQuantity < 1">
					Clear Cart
				</ui-button>
			</slot>
		</div>

		<ui-sheet v-model:open="open"  v-if="smAndDown">
			<div class="w-full relative">
				<ui-sheet-content side="bottom" class="rounded-t-xl border p-0 gap-0 border-none" :hideClose="true">
					<div class="flex items-start gap-x-2 p-2 border-b shadow-md hidden">
						<ui-sheet-header class="gap-y-0 expand flex flex-col items-center">
							<ui-sheet-title class="font-medium mb-0 line-clamp-1 !text-center w-full">Empty your Cart</ui-sheet-title>
							<ui-sheet-description class="!-mt-1 text-xs text-foreground/70 line-clamp-1 !text-center w-full">You have {{cartQuantity}} {{cartQuantity === 1 ? 'item' : 'items'}} in your cart</ui-sheet-description>
						</ui-sheet-header>

						<ui-sheet-close class="my-auto">
							<ui-button size="icon" class="size-7" variant="link">
								<span class="icon-close"></span>
							</ui-button>
						</ui-sheet-close>
					</div> 

					<div class="p-8 flex flex-col items-center">

						<icons-cart-clear class="text-6xl text-foreground/70 mb-4"></icons-cart-clear>

						<h3 class="text-center">
							Are you sure you want to clear your cart?
						</h3>

						<span class="text-center text-foreground/70">
							This will reset all your progress.
						</span>
					</div>

					<ui-sheet-footer class="px-4 pb-4 !justify-center flex-row gap-4">
						<ui-sheet-close class="w-fit">
							<ui-button>
								Cancel
							</ui-button>
						</ui-sheet-close>
						<ui-button  variant="ghost" @click.prevent="resetCart(); open = false">
							Yes. Empty my cart
						</ui-button>
					</ui-sheet-footer>

				</ui-sheet-content>
			</div>
		</ui-sheet>

		<ui-dialog v-model:open="open" v-else>
			<div class="w-full relative">
				<ui-dialog-content class="rounded-t-xl border  p-0 gap-0 max-w-[400px] min-w-[400px]"  :hideClose="true">

					<div class="flex items-center gap-x-2 p-2 border-b shadow-md w-full relative hidden">
						<ui-dialog-header class="gap-y-0 expand flex flex-col items-start">
							<ui-dialog-title class="font-medium mb-0 line-clamp-1 !text-center w-full">Empty your Cart</ui-dialog-title>
							<ui-dialog-description class="!mt-1 text-xs text-foreground/70 line-clamp-1 !text-center w-full">You have {{cartQuantity}} {{cartQuantity === 1 ? 'item' : 'items'}} in your cart</ui-dialog-description>
						</ui-dialog-header>
					</div> 

					<div class="p-8 flex flex-col items-center">

						<icons-cart-clear class="text-6xl text-foreground/70 mb-4"></icons-cart-clear>

						<h3 class="text-center">
							Are you sure you want to clear your cart?
						</h3>

						<span class="text-center text-foreground/70">
							This will reset all your progress.
						</span>
					</div>

					<ui-dialog-footer class="px-4 pb-8 !justify-center flex-row gap-4">
						<ui-dialog-close class="w-fit">
							<ui-button>
								Cancel
							</ui-button>
						</ui-dialog-close>
						<ui-button  variant="ghost" @click.prevent="resetCart(); open = false">
							Yes. Empty my cart
						</ui-button>
					</ui-dialog-footer>
				</ui-dialog-content>
			</div>
		</ui-dialog>
	</div>
</template>
<script setup lang="ts">
const {smAndDown} = useScreenSize()
const {cartQuantity} = storeToRefs(useCartStore())
const {resetCart} = useCartStore()
const open = ref(false)
</script>
