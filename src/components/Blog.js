
import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, handleLike, user, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detail, setDetail] = useState(false)

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} | {blog.author}
      {detail && <button onClick={() => setDetail(!detail)}>hide</button>}
      {!detail && <button onClick={() => setDetail(!detail)}>view</button>}
      <div>
        {detail && blog.url}
      </div>
      <div>
        {detail && <>
        likes {blog.likes}
          <button onClick={() => handleLike(blog)}>like</button>
        </>}
      </div>
      <div>
        {detail && blog.user.name}
      </div>
      {user.id === blog.user.id &&
        <div>
          <button onClick={() => handleDelete(blog)}>remove</button>
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog