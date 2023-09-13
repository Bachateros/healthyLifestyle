import { defineStore } from 'pinia'

export const useFoodStore = defineStore('foodStore', {
  state: () => ({
    foods: [
      {
        title: 'TEST',
      },
    ],
  }),
  getters: {},
  actions: {},
})
