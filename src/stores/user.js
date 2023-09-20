import { defineStore } from 'pinia'

const getUserData = () => {
  const userInLocalStorage = window.localStorage.getItem('user')
  if (userInLocalStorage) {
    return JSON.parse(userInLocalStorage).userData
  } else
    return {
      name: '',
      sex: '',
      age: 18,
      height: 175,
      weight: 70,
    }
}

export const useUserInformation = defineStore('user', {
  state: () => ({
    userData: getUserData(),
  }),
  getters: {},
  actions: {
    updateUserData(newUser) {
      window.localStorage.setItem('user', JSON.stringify(newUser))
    },
  },
})
