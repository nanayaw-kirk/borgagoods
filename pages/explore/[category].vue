<template>
	<div>

		<Head>
			<Title>{{category?.name ? category?.name : $clean($route?.params?.category)}} | {{$appName}}</Title>
		</Head>

		<error-parser v-if="failed && errData" class="container md:max-w-[600px]" @retry="fetchData()" :error="errData"></error-parser>

		<template v-else>
			<template  v-if="loading">
				<div class="flex flex-col gap-y-2 container p-4 md:p-8">
					<ui-skeleton class="w-full h-6"></ui-skeleton>
					<ui-skeleton class="w-1/2 h-4"></ui-skeleton>
				</div>
			</template>

			
			<template v-else>
				<section>

					<div class="container pt-4">
						<div class="w-full grid gap-3">

							<div class="w-full px-4 sm:px-0">
								<div class="flex  gap-4 md:gap-8 items-center">
								<!-- 	<div class="flex flex-col items-center w-1/4 md:w-[150px]">
										<div class="w-[90%] h-2 bg-border/50 dark:bg-muted/50 rounded-t-md"></div>
										<div class="w-[95%] h-2 bg-border/80 dark:bg-muted/70 rounded-t-md"></div>
										<div class="w-full h-[70px] md:h-[100px] bg-border rounded-md shadow-2xl">
											<ui-avatar class="w-full h-full bg-transparent rounded-[inherit]">
												<ui-avatar-image :src="category?.product_display_image?.web ? category?.product_display_image?.web : category?.art_work?.web ? category?.art_work?.web : '/illustrations/banner.svg'" class="object-top !object-cover"></ui-avatar-image>
											</ui-avatar>
										</div>
										
									</div> -->
									<div class="expand order-last md:order-none flex flex-col">

										

										<h3 class="font-bold text-2xl line-clamp-1">
											{{category?.name}}
										</h3>
										<p class="text-xs md:text-sm text-foreground/70 line-clamp-1 md:line-clamp-2">{{category?.description ? category?.description : `Explore ${category?.name} on ${$appName}`}}</p>


									</div>
								</div>
							</div>



							<div class="w-full px-4 md:px-0 pt-2">
								<category-product-loader :category="category"></category-product-loader>
							</div>
						</div>

					</div>
				</section>
			</template>
		</template>
	</div>
</template>
<script setup lang="ts">

const  {list : category , loading, fetchData : refresh} = useDataLoader(`/categories/${useRoute()?.params?.category}?include=art_work,product_display_image`)

</script>
