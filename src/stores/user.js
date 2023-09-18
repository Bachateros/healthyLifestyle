import { defineStore } from 'pinia'

export const useUserInfomation = defineStore('user', {
  state: () => ({
    name: '',
    sex: 'm',
    age: 18,
    height: 175,
    weight: 70,
  }),
  getters: {},
  actions: {},
})
