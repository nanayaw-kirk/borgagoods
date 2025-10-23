import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
export default defineNuxtPlugin((nuxtApp) => {
  const globalOptions = {
    mode: 'international',
    defaultCountry : 'GH',
    dropdownOptions : {
      showSearchBox : true,
    },
    // onlyCountries : ['GH'],
    validCharactersOnly : true

  };
  nuxtApp.vueApp.use(VueTelInput, globalOptions)
})
