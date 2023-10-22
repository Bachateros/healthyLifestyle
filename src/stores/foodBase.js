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
    withMultiplyCategories() {
      const arr = JSON.parse(
        JSON.stringify(this.sortedByDataEatenFoods)
      )
      arr.forEach((el, index) => {
        for (const key in el.food) {
          if (key != 'name') {
            arr[index].food[key] = +(
              (el.food[key] * el.mass) /
              100
            ).toFixed(2)
          }
        }
      })
      return arr
    },
  },
  actions: {
    async getFood() {
      const url = 'http://localhost:3001' //Обращение к собственному серверу
      const res = await fetch(url)
      const data = await res.json()
      return data
    },
    setFood() {
      this.foods = this.getFood().concat(this.$state.addedFoods)
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
      this.setFood()
    },
  },
})
