import { useState } from 'react'

const LoginForm = ({
  login,
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()

    await login(username, password)

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input id='username' type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}></input>
        </div>

        <div>
          password
          <input id='password' type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}></input>
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm