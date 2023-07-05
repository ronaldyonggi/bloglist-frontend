import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Determines whether the error message is an error
  const [isError, setIsError] = useState(false)

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
      // Don't forget to set token as well
      blogService.setToken(user.token)
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

      // If logged, set token
      blogService.setToken(user.token)
      // If logged in, set user to be the logged in user
      setUser(user)

      setUsername('')
      setPassword('')
    } catch (exception) {
      setIsError(true)
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // Handle logout functionality when logout button is pressed
  const handleLogout = () => {
    // Remove the user from the local storage
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
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

  // Handle adding new blog (create button is pressed)
  const handleCreateNewBlog = async event => {
    event.preventDefault()
    const blogToBeAdded = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      let addBlogResponse = await blogService.create(blogToBeAdded)
      setBlogs(blogs.concat(addBlogResponse))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setIsError(false)
      setErrorMessage(`a new blog ${blogToBeAdded.title} by ${blogToBeAdded.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setIsError(true)
      setErrorMessage(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  // Generate create new blog form 
  const newBlogForm = () => (
    <form onSubmit={handleCreateNewBlog}>
      <div>
        title:
        <input type='text' value={newTitle} name="title" onChange={({ target }) => setNewTitle(target.value)}/>
      </div>
      <div>
        author:
        <input type='text' value={newAuthor} name="author" onChange={({ target }) => setNewAuthor(target.value)}/>
      </div>
      <div>
        url:
        <input type='text' value={newUrl} name="url" onChange={({ target }) => setNewUrl(target.value)}/>
      </div>
      <button type='submit'>create</button>
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

      {/* If it's an error message, uses error css class, otherwise use message css class */}
      <Error message={errorMessage} divClass={isError ? 'error' : 'message'}/>
      
      {/* {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )} */}

      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in
        <button onClick={handleLogout}>logout</button>
        </p>
        <h2>create new</h2>
        {newBlogForm()}
        {generateBlogs()}
        </div>
        }
    </div>
  )
}

export default App