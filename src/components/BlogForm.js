import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const blogToBeAdded = {
    title: newTitle,
    author: newAuthor,
    url: newUrl
  }

  // Calls the handleCreateNewBlog function from App.js
  const addBlog = e => {
    e.preventDefault()
    createBlog(blogToBeAdded)

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
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
}

export default BlogForm