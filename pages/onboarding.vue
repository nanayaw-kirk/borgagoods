    <template>
      <div>

        <Head>
          <Title>Buy Licensed Jerseys, Hats, and Fan Gear | {{$appName}}</Title>
          <Meta name="description" :content="`Official Team Merchandise Store`" />
          <Meta name="keywords" :content="$keywords"></Meta>
          <Meta name="robots" content="index, follow"></Meta>
        </Head>


        <section>
          <div class="container pt-4 md:pt-8">
            <div class="max-w-[600px] mx-auto">
              <account-onboarding-wizard></account-onboarding-wizard>
            </div>
          </div>
        </section>
      </div>
    </template>
    <script setup lang="ts">
    definePageMeta({
      // layout : 'app',
      middleware : ['auth']
    })  
    </script>
