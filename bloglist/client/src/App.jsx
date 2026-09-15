import { useEffect } from 'react'
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import BlogView from './components/BlogView'
import ErrorBoundary from './components/ErrorBoundary'
import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'
import Notification from './components/Notification'
import User from './components/User'
import Users from './components/Users'
import blogStore from './stores/blogStore'
import userStore from './stores/userStore'
import usersStore from './stores/usersStore'

const App = () => {
  const user = userStore((state) => state.user)
  const userLogout = userStore((state) => state.logout)
  const initializeUser = userStore((state) => state.initializeUser)
  const loadBlogs = blogStore((state) => state.loadBlogs)
  const loadUsers = usersStore((state) => state.loadUsers)
  const navigate = useNavigate()

  useEffect(() => {
    initializeUser()
    loadBlogs()
    loadUsers()
  }, [initializeUser, loadBlogs, loadUsers])

  const handleLogout = () => {
    userLogout()
    navigate('/')
  }

  return (
    <main>
      <nav>
        <Link to="/">blogs</Link>
        {user && <Link to="/create">new blog</Link>}
        <Link to="/users">users</Link>
        {user === null ? (
          <Link to="/login">login</Link>
        ) : (
          <span className="nav-user">
            {user.name} logged in{' '}
            <button type="button" onClick={handleLogout}>
              logout
            </button>
          </span>
        )}
      </nav>

      <h1>Blog list</h1>
      <Notification />

      <ErrorBoundary>
        <Routes>
          <Route path="/blogs/:id" element={<BlogView />} />
          <Route
            path="/create"
            element={
              // Si no hi ha sessio, tornem a la llista (no a /login): aixi el logout
              // desde qualsevol ruta sempre acaba a la llista i no competeix amb aquesta guarda.
              user ? <BlogForm /> : <Navigate replace to="/" />
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<BlogList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </main>
  )
}

export default App
