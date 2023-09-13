import { createRouter, createWebHashHistory } from 'vue-router'
import appMainPage from '@/views/MainPage.vue'
const routes = [
  {
    path: '/',
    name: 'mainPage',
    component: appMainPage,
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
