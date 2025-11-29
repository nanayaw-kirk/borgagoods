<template>
	<div>

		<div class="hidden md:grid md:grid-cols-3 gap-4">
			
			<template  v-for="cat in data" :key="cat?.text">
				<nuxt-link :to="cat?.path" class="rounded-2xl md:rounded-[50px] flex flex-col dark:bg-muted bg-border/30">
					<div class="p-8 md:px-12 flex flex-col">
						<h2 class="text-2xl md:text-4xl">{{cat?.text}}</h2>
						<p class="text-lg">
							{{cat?.foreword}}
						</p>

						<span class="font-medium text-lg mt-2 underline line-clamp-1">
							{{cat?.cta}}
						</span>
					</div>

					<div class="w-full -mt-12 md:-mt-8 aspect-[3/2] overflow-hidden">
						<img class="w-full h-full object-cover object-right object-top" :src="cat?.image" alt="">
					</div>
				</nuxt-link>
			</template>
		</div>


		<div class="md:hidden block w-full relative group w-full contain-slider" uk-slider="finite:true">
			<div class="w-full flex gap-2 uk-slider-items">
				<template  v-for="cat in data" :key="cat?.text">
					<nuxt-link :to="cat?.path" class="w-4/5 rounded-2xl md:rounded-[50px] flex flex-col dark:bg-muted bg-border/30">
						<div class="p-4 flex flex-col">
							<h2 class="text-xl md:text-4xl font-thin">{{cat?.text}}</h2>
							<p class="text-sm text-foreground/80">
								{{cat?.foreword}}
							</p>

							<span class="font-medium underline line-clamp-1">
								{{cat?.cta}}
							</span>
						</div>

						<div class="w-full -mt-12 md:-mt-8 aspect-[3/2] overflow-hidden">
							<img class="w-full h-full object-cover object-right object-top" :src="cat?.image" alt="">
						</div>
					</nuxt-link>
				</template>
			</div>

			<a class="hidden group-hover:md:inline-flex absolute top-[33%] left-2 size-10 center rounded-full shadow-2xl bg-white" href="#"  uk-slider-item="previous">
				<span class="icon-left text-2xl text-black"></span>
			</a>
			<a class="hidden group-hover:md:inline-flex absolute top-[33%] right-2 size-10 center rounded-full shadow-2xl bg-white" href="#" uk-slider-item="next">
				<span class="icon-right text-2xl text-black"></span>
			</a>
		</div>

	</div>	
</template>
<script setup lang="ts">

const data = ref([
	

	{
		text : 'Phones & Tablets',
		foreword: 'Screens that move with you.',
		cta : 'Shop Now',
		path : '/products?category=phones-tablets',
		image : '/static/phones_tabs.png'
	},

	{
		text : 'Computing',
		foreword: 'Work, create, compute.',
		cta : 'Shop Now',
		path : '/products?category=computing',
		image : '/static/computing.png'
	},

	{
		text : 'Appliances',
		foreword: 'Modern living, simplified.',
		cta : 'Shop Now',
		path : '/products?category=appliances',
		image : '/static/appliance.png'
	},

])

</script>
