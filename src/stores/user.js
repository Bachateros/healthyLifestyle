import { defineStore } from 'pinia'

export const defaultUserData = {
  name: '',
  sex: '',
  age: 18,
  height: 0,
  weight: 0,
  activity: null,
}
const getUserData = () => {
  const userInLocalStorage = window.localStorage.getItem('user')
  if (userInLocalStorage) {
    return JSON.parse(userInLocalStorage)
  }
  return defaultUserData
}

export const useUserInformation = defineStore('user', {
  state: () => ({
    userData: getUserData(),
  }),
  actions: {
    updateUserData(newUser) {
      window.localStorage.setItem('user', JSON.stringify(newUser))
      this.userData = getUserData()
    },
    deleteUserData() {
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('eatenFood')
      this.userData = getUserData()
    },
  },
  getters: {
    isUser(state) {
      return !!state.userData.name
    },
  },
})
