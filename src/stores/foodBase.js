import { defineStore } from 'pinia'

export const eatenFoodTemplate = {
  type: '', //breakfast/lunch/dinner/fastfood
  date: '', //15.09.2023
  food: {}, //алыча
  mass: 150, //150 gramm
}

const getEatenFoodBase = () => {
  const eatenFoodInLocalStorage =
    window.localStorage.getItem('eatenFood')
  if (eatenFoodInLocalStorage) {
    return JSON.parse(eatenFoodInLocalStorage)
  } else return []
}

export const useFoodStore = defineStore('foodStore', {
  state: () => ({
    foods: [],
    eatenFoods: getEatenFoodBase(),
  }),
  getters: {},
  actions: {
    async getFood() {
      const url = 'http://localhost:3001' //Обращение к собственному серверу
      const res = await fetch(url)
      const data = await res.json()
      this.foods = data
    },
    updateEatenBase() {
      window.localStorage.setItem(
        'eatenFood',
        JSON.stringify(this.$state.eatenFoods)
      )
    },
  },
})
