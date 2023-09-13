import { createRouter, createWebHashHistory } from 'vue-router'
import globalFeed from '@/views/GlobalFeed.vue'
const routes = [
  {
    path: '/',
    name: 'globalFeed',
    component: globalFeed,
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
