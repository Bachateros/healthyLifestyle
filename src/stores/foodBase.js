import { defineStore } from 'pinia'
// import foodApi from '@/api/food'

export const useFoodStore = defineStore('foodStore', {
  state: () => ({
    foods: [],
  }),
  getters: {},
  actions: {
    async getFood() {
      const url = 'http://localhost:3001'
      const res = await fetch(url)
      const data = await res.json()
      console.log('data', data)

      this.foods = data
      console.log(data)

      // fetch('http://localhost:3000/foods')
      //   .then(res => res.json())
      //   .then(data => (this.foodData = data))
      //   .catch(err => console.log('err', err))
    },
  },
})
