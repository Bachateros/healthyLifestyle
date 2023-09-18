import { defineStore } from 'pinia'
// import foodApi from '@/api/food'

export const useFoodStore = defineStore('foodStore', {
  state: () => ({
    foods: {},
  }),
  getters: {},
  actions: {
    async getFood() {
      const url = 'http://localhost:3001/'
      const res = await fetch(url, {
        mode: 'no-cors',
        method: 'GET',
      })
      const data = await res
      console.log('data', data)
    },
  },
})
