import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/router'
import { loadFonts } from '@/plugins/webfontloader'

loadFonts()
const pinia = createPinia()
createApp(App).use(vuetify).use(router).use(pinia).mount('#app')
