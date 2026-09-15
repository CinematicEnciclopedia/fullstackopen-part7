const STORAGE_KEY = 'loggedBlogappUser'

const getUser = () => {
  const storedUser = window.localStorage.getItem(STORAGE_KEY)
  return storedUser ? JSON.parse(storedUser) : null
}

const saveUser = (user) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

const removeUser = () => {
  window.localStorage.removeItem(STORAGE_KEY)
}

export default { getUser, saveUser, removeUser }
