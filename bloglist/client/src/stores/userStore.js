import { create } from 'zustand'
import blogService from '../services/blogs'
import loginService from '../services/login'
import persistentUser from '../services/persistentUser'
import notificationStore from './notificationStore'

const userStore = create((set) => ({
  user: null,

  initializeUser: () => {
    const loggedUser = persistentUser.getUser()
    if (loggedUser) {
      blogService.setToken(loggedUser.token)
      set({ user: loggedUser })
    }
  },

  login: async ({ username, password }) => {
    try {
      const loggedUser = await loginService.login({ username, password })
      persistentUser.saveUser(loggedUser)
      blogService.setToken(loggedUser.token)
      set({ user: loggedUser })
      return true
    } catch (error) {
      const message = error.response?.data?.error ?? 'Login failed'
      notificationStore.getState().showNotification(message, 'error')
      return false
    }
  },

  logout: () => {
    persistentUser.removeUser()
    blogService.setToken(null)
    set({ user: null })
  },
}))

export default userStore
