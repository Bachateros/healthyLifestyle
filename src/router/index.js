import { createRouter, createWebHashHistory } from 'vue-router'
import appMainPage from '@/views/MainPage.vue'
import appUserSettings from '@/views/UserSettings.vue'
import appStatistics from '@/views/Statistics.vue'
import appCatalog from '@/views/Catalog.vue'
const routes = [
  {
    path: '/',
    name: 'mainPage',
    component: appMainPage,
  },
  {
    path: '/user',
    name: 'userSettings',
    component: appUserSettings,
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: appStatistics,
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: appCatalog,
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
