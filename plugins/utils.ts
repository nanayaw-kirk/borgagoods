export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.provide('CURRENCY', (value, options = { locale : 'en-GH', currency : 'GHS'}) => {
		return new Intl.NumberFormat(options.locale, {
			style : 'currency',
			currency : options.currency
		}).format(value)
	})

	nuxtApp.provide('formatNum', (value, options = { locale : 'en-GH'}) => {
		return new Intl.NumberFormat(options.locale, {
			maximumSignificantDigits: 5
		}).format(Number(value ? value : 0).toFixed(2))
	})

	nuxtApp.provide('percentize', (value) => {
		return `${(Number(value ? value : 0) / 100) * 100}%`
	})

	nuxtApp.provide('segments',  [{value : 'men', text : 'Men Sports'}, {value : 'women', text : 'Women Sports'}, {value : 'unisex', text : "Both Men & Women Sports"}])

	nuxtApp.provide('keywords', 'Jerseys, Hats, Team Jersey, Original Jersey, Local Team Jerseys, Official Team Store, Official Store, Beanies, Water Bottles, African Team Jerseys')

	nuxtApp.provide('clean', (string) => string.split('-').join(' ').split('_').join(' ').split('-').join(' '))
	nuxtApp.provide('setupForm', (form, model) => Object.assign(form , ...Object.keys(form).map(k => k in model && { [k]: model[k] })))
})