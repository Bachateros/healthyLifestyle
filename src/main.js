import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/router'
import './style.css'
import { loadFonts } from '@/plugins/webfontloader'
import VueApexCharts from 'vue3-apexcharts'

loadFonts()
const pinia = createPinia()
createApp(App)
  .use(vuetify)
  .use(router)
  .use(pinia)
  .use(VueApexCharts)
  .mount('#app')
