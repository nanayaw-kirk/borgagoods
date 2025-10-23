<template>
	<div>

		<div class="grid gap-4">
			<div ref="previewSlider" uk-slider @itemshow.stop="currentSlide = $uikit.slider(previewSlider).index; fullScreenSliderIndex = $uikit.slider(previewSlider).index;">
				<div class="uk-slider-items flex gap-x-2 md:gap-x-4 px-4 w-full">
					<div class="w-full p-0 cursor-zoom-in" v-for="(media, mIndex) in product?.media" :key="mIndex" @click.prevent="open = true; fullScreenSliderIndex = $uikit.slider(previewSlider).index;">
						<product-media class="w-full aspect-square md:rounded-md" :media="media?.web"></product-media>
					</div>
				</div>
			</div>


			<div class="-mt-1 px-2 md:px-0" ref="previewSliderThumbnails" uk-slider v-show="product?.media?.length > 1">
				<div class="uk-slider-items flex gap-x-2 w-full">
					<div class="w-[50px] p-0 cursor-pointer p-1" v-for="(media, mIndex) in product?.media" :key="`thumb-${mIndex}`">
						<product-media class="w-full aspect-square rounded-md" :class="mIndex === currentSlide ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'ring-2 ring-muted ring-offset-2 ring-offset-background'" :media="media?.web" @click="$uikit.slider(previewSlider).show(mIndex)"></product-media>
					</div>
				</div>
			</div>

		</div>

		<ui-sheet v-model:open="open"  v-if="smAndDown">
			<div class="w-full relative">
				<ui-sheet-content side="bottom" class="rounded-t-xl border p-0 gap-0">
					<ui-sheet-header class="gap-y-0 p-3 border-b">
						<slot name="icon"></slot>
						<ui-sheet-title class="font-medium mb-0 line-clamp-1 text-sm">{{product?.name}}</ui-sheet-title>
						<ui-sheet-description class="!mt-1 text-xs text-foreground/70 line-clamp-1">Product Images</ui-sheet-description>
					</ui-sheet-header>

					<div class="w-full">
						<div ref="fullScreenSlider" :uk-slider="`index : ${fullScreenSliderIndex}`" @itemshow.stop="fullScreenSliderIndex = $uikit.slider(fullScreenSlider).index;">
							<div class="uk-slider-items flex gap-x-2 md:gap-x-4 px-4 w-full">
								<div class="w-full p-0" v-for="(media, fsIndex) in product?.media" :key="`fs-${fsIndex}`" @click.prevent="open = true">
									<product-media class="w-full h-fit" :media="media?.web"></product-media>
								</div>
							</div>
						</div>

					</div>


					<ui-sheet-footer class="p-2" v-show="product?.media?.length > 1">
						<div class="w-full" ref="fullScreenSliderThumbNails" uk-slider>
							<div class="uk-slider-items flex gap-x-2 justify-center">
								<div class="w-[50px] p-0 cursor-pointer p-1" v-for="(media, fsThumbIndex) in product?.media" :key="`fs-thumb-${fsThumbIndex}`">
									<product-media class="w-full aspect-square rounded-md" :class="fsThumbIndex === fullScreenSliderIndex ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'ring-2 ring-muted ring-offset-2 ring-offset-background'" :media="media?.web" @click.prevent="$uikit.slider(fullScreenSlider).show(fsThumbIndex)"></product-media>
								</div>
							</div>
						</div>
					</ui-sheet-footer>

				</ui-sheet-content>
			</div>
		</ui-sheet>

		<ui-dialog v-model:open="open" v-else>
			<div class="w-full relative">
				<ui-dialog-content class="rounded-xl border-0 dark:border p-0 gap-0 md:min-w-[600px]"  :hideClose="true">

					<div class="flex items-start gap-x-2 p-2 border-b shadow-md">
						<partner-crest :url="product?.partner?.logo_url" class="w-5 h-6 md:w-8 md:h-8 rounded"></partner-crest>
						<ui-dialog-header class="gap-y-0 expand flex flex-col items-start">
							<ui-dialog-title class="font-medium mb-0 line-clamp-1 text-sm">{{product?.name}}</ui-dialog-title>
							<ui-dialog-description class="!mt-1 text-xs text-foreground/70 line-clamp-1">Product Images</ui-dialog-description>
						</ui-dialog-header>



						<ui-dialog-close class="-mt-4 -mr-3">
							<ui-button size="icon" class="h-7 w-7">
								<span class="icon-close"></span>
							</ui-button>
						</ui-dialog-close>
					</div> 

					<div class="w-full">
						<div ref="fullScreenSlider" :uk-slider="`index : ${fullScreenSliderIndex}`" @itemshow.stop="fullScreenSliderIndex = $uikit.slider(fullScreenSlider).index;">
							<div class="uk-slider-items flex gap-x-2 md:gap-x-4 px-4 w-full">
								<div class="w-full p-0" v-for="(media, fsIndex) in product?.media" :key="`fs-${fsIndex}`" @click.prevent="open = true">
									<product-media class="w-full h-fit" :media="media?.web"></product-media>
								</div>
							</div>
						</div>

					</div>

					<ui-dialog-footer class="p-2" v-show="product?.media?.length > 1">
						<div class="w-full" ref="fullScreenSliderThumbNails" uk-slider>
							<div class="uk-slider-items flex gap-x-2 justify-center">
								<div class="w-[50px] p-0 cursor-pointer p-1" v-for="(media, fsThumbIndex) in product?.media" :key="`fs-thumb-${fsThumbIndex}`">
									<product-media class="w-full aspect-square rounded-md" :class="fsThumbIndex === fullScreenSliderIndex ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'ring-2 ring-muted ring-offset-2 ring-offset-background'" :media="media?.web" @click.prevent="$uikit.slider(fullScreenSlider).show(fsThumbIndex)"></product-media>
								</div>
							</div>
						</div>
					</ui-dialog-footer>

				</ui-dialog-content>
			</div>
		</ui-dialog>
	</div>	
</template>
<script setup lang="ts">

const open = ref(false)
const {smAndDown} = useScreenSize()

const previewSlider = ref(null)
const previewSliderThumbnails = ref(null)
const fullScreenSlider = ref(null)
const fullScreenSliderThumbNails = ref(null)

const currentSlide = ref(0)
const fullScreenSliderIndex = ref(0)

const product = inject("product")
</script>
