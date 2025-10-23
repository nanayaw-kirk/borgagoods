<template>
	<div>


		<div class="flex flex-col  gap-2">
			<div class="w-full ">
				<div ref="previewSlider" uk-slider @itemshow.stop="currentSlide = $uikit?.slider(previewSlider)?.index; fullScreenSliderIndex = $uikit?.slider(previewSlider)?.index;">
					<div class="uk-slider-items flex gap-x-2 md:gap-x-4 px-4 w-full">
						<div class="w-full p-0 cursor-zoom-in relative aspect-square" v-for="(media, mIndex) in product?.media" :key="mIndex" @click.prevent="open = true; fullScreenSliderIndex = $uikit.slider(previewSlider).index;">
							<product-media class="w-full rounded-md" :media="media?.web"></product-media>

							<div class="right-4 top-4 absolute">
								<div class="size-9 bg-background rounded-full center cursor-pointer">
									<span class="icon-expand text-xl"></span>
								</div>
							</div>
						</div>
					</div>



				</div>
			</div>

			<div class="px-2 md:px-0 order-last lg:order-none" ref="previewSliderThumbnails" uk-slider v-show="product?.media?.length > mdAndDown ? 1 : 0">
				<div class="uk-slider-items flex gap-2 items-center justify-center md:justify-items-end order-last lg:order-none px-3 md:px-0">
					<div class="w-12 md:w-20 aspect-square p-0 cursor-pointer p-1" v-for="(media, mIndex) in product?.media" :key="`thumb-${mIndex}`" @click.prevent="$uikit.slider(previewSlider).show(mIndex)">
						<product-media class="w-full aspect-square rounded-md" :class="mIndex === currentSlide ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'ring-2 ring-muted ring-offset-2 ring-offset-background'" :media="media?.web"></product-media>
					</div>
				</div>
			</div>
		</div> 


		<partials-dialog v-model:open="open" hideHeading v-model:md_size="size">
			
			<template #content>
				
				<div class="w-full">
					<div ref="fullScreenSlider" :uk-slider="`index : ${fullScreenSliderIndex}`" @itemshow.stop="fullScreenSliderIndex = $uikit?.slider(fullScreenSlider)?.index;" class="w-full relative">
						

						<div class="uk-slider-items flex w-full">
							<div class="w-full aspect-square p-0 rounded-t" v-for="(media, fsIndex) in product?.media" :key="`fs-${fsIndex}`" @click.prevent="open = true">
								<product-media class="w-full h-full rounded-t" :media="media?.web"></product-media>
							</div>
						</div>


						<a class="absolute left-0 top-[50%] size-16 bg-background text-foreground center rounded-r-full" href  uk-slider-item="previous">
							<span class="icon-left text-2xl"></span>
						</a>
						<a class="absolute right-0 top-[50%] size-16 bg-background text-foreground center rounded-l-full" href uk-slider-item="next">
							<span class="icon-right text-2xl"></span>
						</a>
					</div>

				</div>
			</template>
		</partials-dialog>

	</div>	
</template>
<script setup lang="ts">

const open = ref(false)
const size = ref('small')

const {smAndDown, mdAndDown} = useScreenSize()

const previewSlider = ref(null)
const previewSliderThumbnails = ref(null)
const fullScreenSlider = ref(null)
const fullScreenSliderThumbNails = ref(null)

const currentSlide = ref(0)
const fullScreenSliderIndex = ref(0)

const product = inject("product")
</script>
