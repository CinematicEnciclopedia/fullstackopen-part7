import { create } from 'zustand'
import userService from '../services/users'
import notificationStore from './notificationStore'

const usersStore = create((set) => ({
  users: [],

  loadUsers: async () => {
    try {
      const users = await userService.getAll()
      set({ users })
    } catch {
      notificationStore.getState().showNotification('Could not load users', 'error')
    }
  },
}))

export default usersStore
