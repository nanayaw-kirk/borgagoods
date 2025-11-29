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

							<div class="px-4 sm:px-0">
								<h3 class="font-light text-2xl md:text-4xl line-clamp-1">
									{{category?.name}}
								</h3>
							</div>


							<div class="w-full px-4 md:px-0">
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

const  {list : category , loading, fetchData : refresh} = useDataLoader(`/categories/${useRoute()?.params?.category}`)

</script>
