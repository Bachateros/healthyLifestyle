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
        food: {
          name: 'Круассан с Джемом',
          calories: '399 кКал',
          proteins: '5,7 г',
          fats: '17 г',
          carbs: '56,6 г',
        }, //алыча
        mass: 150, //150 gramm
      },
      {
        type: 'req', //breakfast/lunch/dinner/fastfood
        date: '25.09.2023', //15.09.2023
        food: {
          name: 'Ячневая Анна',
          calories: '63 кКал',
          proteins: '2,4 г',
          fats: '1,7 г',
          carbs: '9,5 г',
        }, //алыча
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
