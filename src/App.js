import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // Initial render retrieve all blogs from DB
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // Retrieve user from browser storage if a user was logged in in the first place
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  // Handle login functionality when login button is pressed
  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      // Save user temporarily to browser local storage
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      // If logged in, set user to be the logged in user
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }
  }

  // Generate login form (username and password fields)
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type='text' value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
      </div>

      <div>
        password
        <input type='password' value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button type='submit'>login</button>
    </form>
  )

  // Generate all the blogs
  const generateBlogs = () => (
    <div>
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )



  return (
    <div>
      {!user && <h2>log in to application</h2>}
      {user && <h2>blogs</h2>}
      {/* {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )} */}

      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        {generateBlogs()}
        </div>
        }
    </div>
  )
}

export default App