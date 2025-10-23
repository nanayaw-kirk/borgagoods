<template>
  <div>

    <Head>
      <Title>Your Shopping Cart | {{$appName}}</Title>
      <Meta name="description" :content="`Official Team Merchandise Store`" />
      <Meta name="keywords" :content="$keywords"></Meta>
      <Meta name="robots" content="index, follow"></Meta>
    </Head>
    <client-only>



      <div class="container w-full p-0  md:px-0 pb-16" v-if="cart && cart?.length > 0">
        <div class="grid md:grid-cols-3 lg:grid-cols-3 w-full relative gap-4 md:gap-10 items-start">
          <div class="md:pt-4 md:col-span-2">

            <div class="divide-y md:border md:rounded grid w-full">
              <div class="flex items-center gap-x-4 p-2">
                <div class="expand font-medium md:text-lg">
                  Your shopping cart
                </div>

                <cart-actions-clear></cart-actions-clear>
              </div>


              <div class="grid divide-y w-full">
                <template v-for="(entry, index) in cart" :key="index">
                  <div class=" uk-animation-slide-bottom-small w-full" :style="`animation-delay: ${index*80}ms`">

                    <cart-entry class="p-2 md:p-4" :entry="entry">
                      <template #remove>
                        <ui-button variant="link" size="sm" class="font-bold text-[12px] !p-0 hidden md:flex text-foreground/70 hover:text-primary" @click.prevent="removeFromCart(index)">Delete</ui-button>
                        <ui-button size="icon" variant="ghost" class="h-6 w-6 !p-0 md:hidden !bg-transparent" @click.prevent="removeFromCart(index)">
                          <span class="icon-delete"></span>
                        </ui-button>
                      </template>
                    </cart-entry>
                  </div>
                </template>
              </div>




            </div>

          </div>
          <div class="hidden md:block border rounded shadow">
           <cart-actions-checkout></cart-actions-checkout>
         </div>
       </div>


     </div>


     <template v-else>

      <div class="container pt-4">
        <div class=" max-w-lg mx-auto flex flex-col items-center">

          <icons-tote class="text-6xl mb-3 md:mb-6 dark:text-foreground/70 text-primary"></icons-tote>

          <h3 class="text-center font-medium text-xl md:text-2xl">
            Your cart is empty
          </h3>
          <span class="text-center text-foreground/70">
            Items added to your cart will show up hear
          </span>

          <div class="mt-6 w-full">
            <cart-empty-todos></cart-empty-todos>
          </div>
        </div>
      </div>
    </template>


    <div class="absolute bottom-0 w-full bg-background border-t z-30 md:hidden">
     <cart-actions-checkout  v-if="cartQuantity"></cart-actions-checkout>
     <navs-bottom v-else></navs-bottom>
   </div>
 </client-only>
</div>
</template>
<script setup lang="ts">
const {cart, cartQuantity, cartTotal } = storeToRefs(useCartStore())  
const {removeFromCart} = useCartStore()
</script>
