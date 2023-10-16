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
const getAddedFoodBase = () => {
  const addedFoodInLocalStorage =
    window.localStorage.getItem('addedFood')
  if (addedFoodInLocalStorage) {
    return JSON.parse(addedFoodInLocalStorage)
  } else return []
}
export const useFoodStore = defineStore('foodStore', {
  state: () => ({
    foods: [],
    eatenFoods: getEatenFoodBase(),
    addedFoods: getAddedFoodBase(),
  }),
  getters: {
    sortedByDataEatenFoods: state =>
      state.eatenFoods.sort((a, b) => (a.date > b.date ? 1 : -1)),
  },
  actions: {
    async getFood() {
      const url = 'http://localhost:3001' //Обращение к собственному серверу
      const res = await fetch(url)
      const data = await res.json()
      this.foods = await data.concat(this.$state.addedFoods)
    },
    updateEatenBase() {
      window.localStorage.setItem(
        'eatenFood',
        JSON.stringify(this.$state.eatenFoods)
      )
    },
    updateAddedFoodBase() {
      window.localStorage.setItem(
        'addedFood',
        JSON.stringify(this.$state.addedFoods)
      )
      this.getFood()
    },
  },
})
