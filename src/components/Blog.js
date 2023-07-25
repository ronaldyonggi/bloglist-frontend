
import { useState } from "react"

const Blog = ({ blog, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const [detail, setDetail] = useState(false)

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
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
    </div>
  )
}

export default Blog