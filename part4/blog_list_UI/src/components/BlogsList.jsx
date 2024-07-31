import { useEffect } from "react"
import Blog from "./Blog"

const BlogsList = ({ blogs, deleteBlog, handleLike }) => {
  
  let sortedBlogs = [... blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div >
      {sortedBlogs.map(blog => {
        return <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} handleLike={handleLike}/>
      }
        )}
    </div>
  )
}

export default BlogsList