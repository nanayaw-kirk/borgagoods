<template>
  <div>
    <partials-dialog v-model:open="showLoggedIn" ctaTitle="Logged In Modal" ctaDesc="Modal showing next steps for just logged in user" hideHeading persist v-model:md_size="size">
      <template #content>
       <div>
        <div class="w-full aspect-video bg-muted dark:bg-border rounded-t-md">
          <img src="/illustrations/welcome.svg" class="w-full h-full object-cover" alt="Welcome illustration">
        </div>
        <div class="flex flex-col gap-y-4 p-4 divide-y md:divide-y-0">
          <div class="flex flex-col">
            <span class="text-xl font-medium line-clamp-1 text-center">
              Welcome back {{user?.name}}
            </span>
            <span class="text-sm text-foreground/70 text-center mx-auto w-4/5 md:w-full">
              Ready to discover your next favorite merchandise piece?
            </span>
          </div>

          <div class="flex flex-col gap-y-1 divide-y md:divide-y-0">

            <nuxt-link :to="{name: 'cart'}" class="p-2 md:rounded-md flex gap-2 items-start group hover:bg-muted/70 dark:hover:bg-border/70" v-if="cartQuantity">
              <icons-cart class="text-4xl text-primary"></icons-cart>
              <span class="expand flex flex-col">
                <span class="font-medium text-sm md:text-base">Complete your Purchase.</span>
                <span class="text-xs text-foreground/70">
                  Attend to items in your shopping cart
                </span>
              </span>
              <span class="icon-right text-foreground/50 text-xl my-auto group-hover:visible md:invisible transition-all ease-in-out"></span>
            </nuxt-link>

            <nuxt-link :to="{name: 'products'}" class="p-2 md:rounded-md flex gap-2 items-start group hover:bg-muted/70 dark:hover:bg-border/70">
              <icons-tag class="text-4xl text-primary"></icons-tag>
              <span class="expand flex flex-col">
                <span class="font-medium text-sm md:text-base">Fresh Drops. New Vibes.</span>
                <span class="text-xs text-foreground/70">
                  Checkout the latest merch drops on {{$appName}}
                </span>
              </span>
              <span class="icon-right text-foreground/50 text-xl my-auto group-hover:visible md:invisible transition-all ease-in-out"></span>
            </nuxt-link>



            <nuxt-link :to="{name: 'explore'}" class="p-2 md:rounded-md flex gap-2 items-start group hover:bg-muted/70 dark:hover:bg-border/70">
              <icons-explore class="text-4xl text-primary"></icons-explore>
              <span class="expand flex flex-col">
                <span class="font-medium text-sm md:text-base">Explore {{$appName}}</span>
                <span class="text-xs text-foreground/70">
                  Discover variety across product offers.
                </span>
              </span>
              <span class="icon-right text-foreground/50 text-xl my-auto group-hover:visible md:invisible transition-all ease-in-out"></span>
            </nuxt-link>


          </div>
        </div>
      </div>
    </template>
  </partials-dialog>

  <partials-dialog v-model:open="showRegistered" ctaTitle="Registered In Modal" ctaDesc="Modal showing next steps for newly registered user" hideHeading persist v-model:md_size="size">
    <template #content>
     <div>
      <div class="w-full aspect-video bg-muted dark:bg-border rounded-t-md">
        <img src="/illustrations/welcome.svg" class="w-full h-full object-cover" alt="Welcome illustration">
      </div>
      <div class="flex flex-col gap-y-4 p-4 divide-y md:divide-y-0">
        <div class="flex flex-col">
          <span class="text-xl font-medium line-clamp-1 text-center">
            Welcome to {{$appName}} {{user?.name}}
          </span>
          <span class="text-sm text-foreground/70 text-center mx-auto w-4/5">
            Let's take a moment to set up your account for the ultimate fan experience.
          </span>
        </div>

        <div class="flex flex-col gap-y-1 divide-y md:divide-y-0">
          <nuxt-link :to="{name: 'onboarding'}" class="p-2 md:rounded-md flex gap-2 items-start group hover:bg-muted/70 dark:hover:bg-border/70">
            <icons-user-check class="text-4xl text-primary"></icons-user-check>
            <span class="expand flex flex-col">
              <span class="font-medium text-sm md:text-base">Complete your onboarding</span>
              <span class="text-xs text-foreground/70">
                Get setup for the ultimate fan experience. 
              </span>
            </span>

            <span class="icon-right text-foreground/50 text-xl my-auto group-hover:visible md:invisible transition-all ease-in-out"></span>
          </nuxt-link>



          <nuxt-link :to="{name: 'promos'}" class="p-2 md:rounded-md flex gap-2 items-start group hover:bg-muted/70 dark:hover:bg-border/70">
            <icons-fire class="text-4xl text-primary"></icons-fire>
            <span class="expand flex flex-col">
              <span class="font-medium text-sm md:text-base">See all the sweet deals!</span>
              <span class="text-xs text-foreground/70">
                Save on your first {{$appName}} purchase!
              </span>
            </span>
            <span class="icon-right text-foreground/50 text-xl my-auto group-hover:visible md:invisible transition-all ease-in-out"></span>
          </nuxt-link>


          <nuxt-link :to="{name: 'cart'}" class="p-2 md:rounded-md flex gap-2 items-start group hover:bg-muted/70 dark:hover:bg-border/70" v-if="cartQuantity">
            <icons-cart class="text-4xl text-primary"></icons-cart>
            <span class="expand flex flex-col">
              <span class="font-medium text-sm md:text-base">Complete your Purchase.</span>
              <span class="text-xs text-foreground/70">
                Attend to items in your shopping cart
              </span>
            </span>
            <span class="icon-right text-foreground/50 text-xl my-auto group-hover:visible md:invisible transition-all ease-in-out"></span>
          </nuxt-link>


        </div>
      </div>
    </div>
  </template>
</partials-dialog>


<partials-dialog v-model:open="passwordChanged" ctaTitle="Registered In Modal" ctaDesc="Modal showing next steps for newly registered user" hideHeading persist v-model:md_size="size">
  <template #content>
   <div>
    <div class="w-full aspect-[3/1] bg-muted dark:bg-border rounded-t-md center">
      <icons-lock class="text-7xl text-primary"></icons-lock>
    </div>
    <div class="flex flex-col gap-y-4 p-4 divide-y md:divide-y-0">
      <div class="flex flex-col">
        <span class="text-xl font-medium line-clamp-1 text-center">
          Your Password Changed
        </span>
        <span class="text-sm text-foreground/70 text-center">
         Your {{$appName}} password has been updated. For enhanced security, consider using a strong, unique password that is not shared across multiple services.
       </span>
     </div>

     <div class="flex flex-col gap-y-1 divide-y md:divide-y-0">
      <nuxt-link :to="{name: $route?.name}" class="p-2 md:rounded-md flex gap-2 items-start group hover:bg-muted/70 dark:hover:bg-border/70">
        <icons-compass class="text-4xl text-primary"></icons-compass>
        <span class="expand flex flex-col">
          <span class="font-medium text-sm md:text-base">Continue</span>
          <span class="text-xs text-foreground/70">
            Continue browsing {{$appName}}
          </span>
        </span>

        <span class="icon-right text-foreground/50 text-xl my-auto group-hover:visible md:invisible transition-all ease-in-out"></span>
      </nuxt-link>


      <nuxt-link :to="{name: 'products'}" class="p-2 md:rounded-md flex gap-2 items-start group hover:bg-muted/70 dark:hover:bg-border/70">
        <icons-tag class="text-4xl text-primary"></icons-tag>
        <span class="expand flex flex-col">
          <span class="font-medium text-sm md:text-base">Release Radar</span>
          <span class="text-xs text-foreground/70">
            Checkout the latest merch drops on {{$appName}}
          </span>
        </span>
        <span class="icon-right text-foreground/50 text-xl my-auto group-hover:visible md:invisible transition-all ease-in-out"></span>
      </nuxt-link>



      <nuxt-link :to="{name: 'cart'}" class="p-2 md:rounded-md flex gap-2 items-start group hover:bg-muted/70 dark:hover:bg-border/70" v-if="cartQuantity">
        <icons-cart class="text-4xl text-primary"></icons-cart>
        <span class="expand flex flex-col">
          <span class="font-medium text-sm md:text-base">Complete your Purchase.</span>
          <span class="text-xs text-foreground/70">
            Attend to items in your shopping cart
          </span>
        </span>
        <span class="icon-right text-foreground/50 text-xl my-auto group-hover:visible md:invisible transition-all ease-in-out"></span>
      </nuxt-link>


    </div>
  </div>
</div>
</template>
</partials-dialog>



</div>  
</template>
<script setup lang="ts">

const {user} = storeToRefs(useAuthStore())
const {cartQuantity} = storeToRefs(useCartStore())
const showLoggedIn = ref(Object.keys(useRoute()?.query).includes('logged_in'))
const showRegistered = ref(Object.keys(useRoute()?.query).includes('registered'))
const passwordChanged = ref(Object.keys(useRoute()?.query).includes('password_changed'))


const size = ref('x-small')

</script>
