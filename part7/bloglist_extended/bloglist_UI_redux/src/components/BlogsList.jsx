import { useEffect } from "react"
import Blog from "./Blog"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs, deleteBlog } from "../app/blogSlice"

const BlogsList = ({ addLike }) => {
  const blogs = useSelector(state => state.blogs)
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  let sortedBlogs = [... blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div >
      {sortedBlogs.map(blog => {
        return <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} addLike={addLike}/>
      }
        )}
    </div>
  )
}

export default BlogsList