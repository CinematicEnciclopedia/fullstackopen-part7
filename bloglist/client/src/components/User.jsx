import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import usersStore from '../stores/usersStore'

const User = () => {
  const id = useParams().id
  const users = usersStore((state) => state.users)
  const loadUsers = usersStore((state) => state.loadUsers)

  useEffect(() => {
    if (users.length === 0) loadUsers()
  }, [users.length, loadUsers])

  if (users.length === 0) return null

  const user = users.find((u) => u.id === id)
  if (!user) return <div>user not found</div>

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul className="user-blogs">
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
