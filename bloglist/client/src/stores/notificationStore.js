import { create } from 'zustand'

const notificationStore = create((set) => {
  let timer = null

  const showNotification = (message, type = 'success') => {
    if (timer) window.clearTimeout(timer)
    set({ notification: { message, type } })
    timer = window.setTimeout(() => {
      set({ notification: null })
      timer = null
    }, 5000)
  }

  return {
    notification: null,
    showNotification,
  }
})

export default notificationStore
