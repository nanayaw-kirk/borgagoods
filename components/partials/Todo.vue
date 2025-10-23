<template>
	<div>
		<div class="grid @container">
			<div class="flex gap-3 @md:gap-4">

				<div class="expand">
					{{todos}}
				</div>
			</div>
		</div>
	</div>	
</template>
<script setup lang="ts">


const todos = [
	{title : `Discover New Arrivals on ${useNuxtApp()?.$appName}`, text : `Check out the hottest new team merchandise on ${useNuxtApp()?.$appName}! Get exclusive gear from your favorite sports teams and support them in style.` ,  link : 'releases'},

	{title : `Discover New Arrivals on ${useNuxtApp()?.$appName}`, text : `Check out the hottest new team merchandise on ${useNuxtApp()?.$appName}! Get exclusive gear from your favorite sports teams and support them in style.` ,  link : 'promos'},

	{title : `Discover New Arrivals on ${useNuxtApp()?.$appName}`, text : `Check out the hottest new team merchandise on ${useNuxtApp()?.$appName}! Get exclusive gear from your favorite sports teams and support them in style.` ,  link : 'stores'},


	{title : `Discover New Arrivals on ${useNuxtApp()?.$appName}`, text : `Check out the hottest new team merchandise on ${useNuxtApp()?.$appName}! Get exclusive gear from your favorite sports teams and support them in style.` ,  link : 'recommended'},


]

</script>
