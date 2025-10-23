<template>
  <div>
    <Head>
      <Title>Error | {{error?.statusMessage}} | {{$appName}}  </Title>
    </Head>
    <ui-scroll-area class="h-[100dvh]">
      <div class="w-full h-[100dvh] center">
        <div class="w-full md:w-[800px] p-4">
          <nuxt-layout name="blank">
            <div class="grid md:grid-cols-2 items-center gap-6">
              <div>
                <template v-if="error?.statusCode === 404">
                  <div class="flex flex-col items-center">
                    <h1 class="text-center md:text-left w-full text-6xl font-bold">404!</h1>
                    <p class="text-center md:text-left w-full my-2 text-foreground/70 text-sm md:text-xl">Sorry, the page you are looking for does not exist.</p>

                    <a href="/" class="md:mr-auto">
                      <ui-button>
                        Go Back Home
                      </ui-button>
                    </a>
                  </div>
                </template>
                <template v-else>

                  <div class="flex flex-col items-center">
                    <h1 class="text-center md:text-left w-full text-6xl font-bold">{{error?.statusCode}}!</h1>
                    <p class="text-center md:text-left w-full my-2 text-foreground/70 text-sm md:text-xl">
                      {{ error?.message }}
                    </p>

                    <a href="/" class="md:mr-auto">
                      <ui-button>
                        Go Back Home
                      </ui-button>
                    </a>
                  </div>
                  
                </template>
              </div>


              <div>
                <template v-if="error?.statusCode === 404">
                  <!-- <img src="/illustrations/404.gif" alt="" class="w-3/4 md:w-full mx-auto object-contain"> -->
                  <div>
                    {{error}}
                  </div>
                </template>

                <template v-else>
                  <!-- <img src="/illustrations/error.png" alt="" class="w-3/4 md:w-full mx-auto object-contain"> -->
                  <div>
                    {{error}}
                  </div>
                </template>
              </div>
            </div>
          </nuxt-layout>
        </div>
      </div>
    </ui-scroll-area>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout : 'legal'
})
const error = useError();
</script>
