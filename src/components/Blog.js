
import { useState } from "react"

const Blog = ({ blog }) => {
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
        <button>like</button>
        </>}
      </div>
      <div>
        {detail && blog.author}
      </div>
    </div>
  )
}

export default Blog