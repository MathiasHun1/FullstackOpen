import { useState } from "react"
import Blog from "./Blog"
import blogService from '../services/blogs'

function BlogsPage({ blogs, setBlogs, username, setUser }) {
  const [title, setTitle] = useState('')
  const [author, setAuhor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  } 

  const handleCreateBlog = async (e) => {
    e.preventDefault()

    try {
      const user = JSON.parse(localStorage.getItem('loggedInUser'))
      blogService.setToken(user)

      await blogService.add({ title, author, url })
      setBlogs(blogs.concat({title, author, url}))
      setTitle('')
      setAuhor('')
      setUrl('')
      
      setSuccessMessage(`Blog added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)

    } catch(exception) {
      setErrorMessage('Something went wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  return (
    <div>
      <h2 className='text-3xl'>Blogs</h2>

      <div className="my-6 flex gap-2 items-center">
        <h2 className="inline">{username} logged in</h2>
        <button className="min-h-0 h-8 px-6 btn inline" onClick={handleLogout}>log out</button>
      </div>

      <form onSubmit={handleCreateBlog}>
        <div>
          title:
          <input 
            className='border-2 bg-sky-100' 
            type="text" 
            value={title}
            name="title"
            onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input 
            className='border-2 bg-sky-100' 
            type="text" 
            value={author}
            name="author"
            onChange={({target}) => setAuhor(target.value)}
          />
        </div>
        <div>
          url:
          <input 
            className='border-2 bg-sky-100' 
            type="text" 
            value={url}
            name="url"
            onChange={({target}) => setUrl(target.value)}
          />
        </div>
        <button type="submit" className="min-h-0 h-8 px-6 btn">create</button>

        {errorMessage && (
          <p className="p-4 text-red-800 bg-red-200 rounded-md">{errorMessage}</p>
        )}

        {successMessage && (
          <p className="p-4 text-green-800 bg-lime-200 rounded-md">{successMessage}</p>
        )}
      </form>

      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogsPage