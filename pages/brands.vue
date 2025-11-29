    <template>
      <div>
        <Title>Brands | {{$appName}}</Title>
        <Meta name="description" :content="`Find official brands on ${$appName}`" />
        <Meta name="keywords" :content="$keywords"></Meta>
        <Meta name="robots" content="index, follow"></Meta>



        <div class="container p-2 md:px-0 md:pt-4">
          <div class="w-full grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">

            <template  v-for="brand in brands"  :key="brand?.slug">
              <div>
                <nuxt-link class="flex flex-col gap-y-1 w-fit" :to="{name : 'products', query :{ brand : brand?.slug}}">
                  <div class="aspect-square flex flex-col rounded-md cursor-pointer">
                    <ui-avatar class="w-full h-full aspect-square rounded-md bg-transparent relative">
                      <ui-avatar-image :src="brand?.product_display_image?.web ?? 'https://s3.wasabisys.com/borga-goods-staging/28/conversions/8500c7aa-898e-4573-96ce-71943667f43e-web.jpg'" class="w-full h-full object-cover object-center rounded-md bg-transparent" alt="brand Image"> </ui-avatar-image>

                    </ui-avatar>
                  </div>
                </nuxt-link>
              </div>
            </template>
            

          </div>

        </div>
      </div>  
    </template>
    <script setup lang="ts">
    const {brands : list} = storeToRefs(brandsStore())
    const brands = computed(()=> list?.value?.filter(i => i?.product_display_image?.web))
    </script>

