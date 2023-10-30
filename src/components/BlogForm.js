import { useState } from 'react'

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
        <input type='text' value={newTitle} name="title" onChange={({ target }) => setNewTitle(target.value)} placeholder='title' data-cy="input-title"/>
      </div>
      <div>
        author:
        <input type='text' value={newAuthor} name="author" onChange={({ target }) => setNewAuthor(target.value)} placeholder='author' data-cy="input-author"/>
      </div>
      <div>
        url:
        <input type='text' value={newUrl} name="url" onChange={({ target }) => setNewUrl(target.value)} placeholder='url' data-cy="input-url"/>
      </div>
      <button type='submit' data-cy="button-create">create</button>
    </form>
  )
}

export default BlogForm