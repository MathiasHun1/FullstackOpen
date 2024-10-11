import _ from 'lodash'
import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogsList from './components/BlogsList'
import BlogForm from './components/BlogForm'
import Message from './components/Message'
import 'react-material-symbols/rounded'
import { useDispatch } from 'react-redux'
import { createMessage, resetMessage } from './app/messageSlice'
import { initializeBlogs } from './app/blogSlice'

const App = () => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  const dispatch = useDispatch()

  const blogRef = useRef()

  useEffect(() => {
    const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
    setUser(loggedInUser)
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      setUserName('')
      setPassword('')
    } catch (exception) {
      dispatch(createMessage('Wrong credentials'))
      setTimeout(() => {
        dispatch(resetMessage())
      }, 3000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  } 

  // const createBlog = async (newBlog) => {

  //   try {
  //     blogService.setToken(user)
  //     const blogToAdd = await blogService.add(newBlog)
  //     blogToAdd.user = { ...user }

  //     setBlogs(blogs.concat(blogToAdd))
  //     blogRef.current.toggleVisibility()
  //     dispatch(initializeBlogs())

  //   } catch(exception) {
  //     console.log(exception);
  //     dispatch(createMessage('Something went wrong'))
  //     setTimeout(() => {
  //       dispatch(resetMessage())
  //     }, 3000)
  //   }
  // } 

  const deleteBlog = async (id) => {
    if(window.confirm('Are you sure?')) {
      try {
        blogService.setToken(user)
        await blogService.deleteBlog(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
      } catch (error) {
        dispatch(createMessage('You are not authorized to delete this blog'))
        setTimeout(() => {
          dispatch(resetMessage())
        }, 3000)
      }
    }
    }

  const addLike = async (blogId) => {
    try {
      const response = await blogService.updateLike(blogId)

      const updatedBlogs = blogs.map(blog => {
        if (blog.id === response.id) {
          blog.likes++
        }
        return blog
      })

      setBlogs(updatedBlogs)

    } catch (error) {
      console.log(error)
      dispatch(createMessage('You cant update this blog'))
      setTimeout(() => {
        dispatch(resetMessage())
      }, 3000)
    }
  }

  return (
    <div className='px-6 '>
      <Message />
      <h2 className='text-3xl mb-4 font-medium'>Blogs</h2>
      
      {user === null && 
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUserName={setUserName}
            setPassword={setPassword}  
          />
      }


      {user !== null && (
        <>
          <div className="mb-6 flex gap-2 items-center">
            <h2 className="inline">{user.username} logged in</h2>
            <button className="min-h-0 h-8 px-6 btn inline" onClick={handleLogout}>log out</button>
          </div>
          <Togglable buttonLabel='Add new blog' ref={blogRef}>
            <BlogForm  
              // setBlogs={setBlogs}
              // createBlog={createBlog}
              user={user}
            />
          </Togglable>

          <BlogsList 
            deleteBlog={deleteBlog}
            addLike={addLike}
          />
        </>
      )}
    </div>
  )
}

export default App