import { defineStore } from 'pinia'

export const defaultUserData = {
  name: '',
  sex: '',
  age: 18,
  height: 0,
  weight: 0,
}
const getUserData = () => {
  const userInLocalStorage = window.localStorage.getItem('user')
  if (userInLocalStorage) {
    return JSON.parse(userInLocalStorage).userData
  } else return defaultUserData
}

export const useUserInformation = defineStore('user', {
  state: () => ({
    userData: getUserData(),
    isUser: false,
  }),
  actions: {
    updateUserData(newUser) {
      window.localStorage.setItem('user', JSON.stringify(newUser))
      this.isUser = true
    },
    deleteUserData() {
      window.localStorage.removeItem('user')
      this.userData = getUserData()
      this.isUser = false
    },
  },
})
