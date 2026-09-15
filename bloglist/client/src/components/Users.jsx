import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import usersStore from '../stores/usersStore'

const Users = () => {
  const users = usersStore((state) => state.users)
  const loadUsers = usersStore((state) => state.loadUsers)

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  return (
    <div>
      <h2>Users</h2>
      <table className="users">
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
