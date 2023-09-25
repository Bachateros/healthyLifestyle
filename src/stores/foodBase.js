import { defineStore } from 'pinia'

export const eatenFoodTemplate = {
  type: '', //breakfast/lunch/dinner/fastfood
  date: '', //15.09.2023
  food: {}, //алыча
  mass: 150, //150 gramm
}

export const useFoodStore = defineStore('foodStore', {
  state: () => ({
    foods: [],
    eatenFoods: [
      {
        type: 'qwe', //breakfast/lunch/dinner/fastfood
        date: '15.09.2023', //15.09.2023
        food: {}, //алыча
        mass: 150, //150 gramm
      },
      {
        type: 'req', //breakfast/lunch/dinner/fastfood
        date: '25.09.2023', //15.09.2023
        food: {}, //алыча
        mass: 150, //150 gramm
      },
    ],
  }),
  getters: {},
  actions: {
    async getFood() {
      const url = 'http://localhost:3001' //Обращение к собственному серверу
      const res = await fetch(url)
      const data = await res.json()
      this.foods = data
    },
  },
})
