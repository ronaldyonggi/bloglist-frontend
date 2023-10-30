import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Error from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const blogFormRef = useRef(null)
  const loginFormRef = useRef(null)

  // Determines whether the error message is an error
  const [isError, setIsError] = useState(false)

  // Initial render retrieve all blogs from DB
  useEffect(() => {
    blogService.getAll()
      .then(blogs =>
        blogs.sort((a, b) => a.likes - b.likes).reverse()
      )
      .then(blogs => setBlogs(blogs))
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
  // username and password is provided from LoginForm component
  const handleLogin = async (username, password) => {
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

      // setUsername('')
      // setPassword('')
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
  // const loginForm = () => (
  //   <form onSubmit={handleLogin}>
  //     <div>
  //       username
  //       <input type='text' value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
  //     </div>

  //     <div>
  //       password
  //       <input type='password' value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
  //     </div>
  //     <button type='submit'>login</button>
  //   </form>
  // )

  // Handle adding new blog (create button is pressed)
  const handleCreateNewBlog = async blogObject => {
    blogFormRef.current.toggleVisibility()

    try {
      let addBlogResponse = await blogService.create(blogObject)
      setBlogs(blogs.concat(addBlogResponse))
      // setNewTitle('')
      // setNewAuthor('')
      // setNewUrl('')
      setIsError(false)
      setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
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

  // Handle pressing like button
  const handleLikeIncrease = async blogObject => {
    // Create the updated blog object from the old blog
    const updatedBlog = {
      ...blogObject,
      // Update the likes
      likes : blogObject.likes + 1,
      // The user needs to be the user id, not the whole user object.
      // See Full Stack Open page for example
      user: blogObject.user.id
    }
    try {
      const responseBlog = await blogService.update(blogObject.id, updatedBlog)
      // Update blogs state. Make sure the blog that is supposed to be updated IS
      // UPDATED WITH responseBlog, NOT updatedBlog!!
      // setBlogs(blogs.map(blog => blog.id === blogObject.id ? responseBlog : blog))
      setBlogs(blogs
        .map(blog => blog.id === blogObject.id ? responseBlog : blog)
        .sort((a, b) => a.likes - b.likes)
        .reverse()
      )
    } catch(exception) {
      setIsError(true)
      setErrorMessage(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // Handle deleting a blog
  const handleDelete = async blogObject => {
    try {
      if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
        await blogService.deleteBlog(blogObject.id)
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
      }
    } catch(exception) {
      setIsError(true)
      setErrorMessage(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }


  // Generate all the blogs
  const generateBlogs = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLikeIncrease} user={user} handleDelete={handleDelete} />
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

      {!user &&
        <Togglable buttonLabel="log in" ref={loginFormRef}>
          <LoginForm login={handleLogin}></LoginForm>
        </Togglable>
      }

      {user && <div>
        <p>{user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <h2>Create New Blog</h2>
          <BlogForm createBlog={handleCreateNewBlog} />
        </Togglable>
        {generateBlogs()}
      </div>
      }
    </div>
  )
}

export default App