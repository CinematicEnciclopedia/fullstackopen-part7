import { create } from 'zustand'
import blogService from '../services/blogs'
import notificationStore from './notificationStore'

const blogStore = create((set, get) => ({
  blogs: [],

  loadBlogs: async () => {
    try {
      const blogs = await blogService.getAll()
      set({ blogs })
    } catch {
      notificationStore.getState().showNotification('Could not load blogs', 'error')
    }
  },

  addBlog: async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject)
      set({ blogs: get().blogs.concat(createdBlog) })
      notificationStore
        .getState()
        .showNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      return createdBlog
    } catch (error) {
      const message = error.response?.data?.error ?? 'Could not create blog'
      notificationStore.getState().showNotification(message, 'error')
      throw error
    }
  },

  updateBlog: async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      set({ blogs: get().blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)) })
    } catch (error) {
      const message = error.response?.data?.error ?? 'Could not update blog'
      notificationStore.getState().showNotification(message, 'error')
    }
  },

  removeBlog: async (id) => {
    try {
      await blogService.remove(id)
      set({ blogs: get().blogs.filter((blog) => blog.id !== id) })
      notificationStore.getState().showNotification('Blog removed')
    } catch (error) {
      const message = error.response?.data?.error ?? 'Could not delete blog'
      notificationStore.getState().showNotification(message, 'error')
    }
  },

  addComment: async (id, comment) => {
    try {
      const updatedBlog = await blogService.createComment(id, comment)
      set({ blogs: get().blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)) })
      return updatedBlog
    } catch (error) {
      const message = error.response?.data?.error ?? 'Could not add comment'
      notificationStore.getState().showNotification(message, 'error')
    }
  },
}))

export default blogStore
