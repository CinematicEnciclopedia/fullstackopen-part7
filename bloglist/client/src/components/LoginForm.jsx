import { useNavigate } from 'react-router-dom'
import useField from '../hooks/useField'
import userStore from '../stores/userStore'

const LoginForm = () => {
  const login = userStore((state) => state.login)
  const navigate = useNavigate()
  const username = useField('text', 'username')
  const password = useField('password', 'password')

  const { reset: resetUsername, ...usernameInput } = username
  const { reset: resetPassword, ...passwordInput } = password

  const handleSubmit = async (event) => {
    event.preventDefault()
    const success = await login({
      username: usernameInput.value,
      password: passwordInput.value,
    })
    if (success) {
      resetUsername()
      resetPassword()
    }
    navigate('/')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <label>
          username
          <input {...usernameInput} autoComplete="username" />
        </label>
        <label>
          password
          <input {...passwordInput} autoComplete="current-password" />
        </label>
        <button type="submit" className="primary">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
