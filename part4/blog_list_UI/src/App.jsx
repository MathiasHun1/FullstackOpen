import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginPage from './components/LoginPage'
import BlogsPage from './components/BlogsPage'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      setUserName('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('log in failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  useEffect(() => {
    const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
    setUser(loggedInUser)
  }, [])

  useEffect(() => {
    const loadBlogs = async () => {
      const blogs = await blogService.getAll() 
      setBlogs(blogs)
    }
    loadBlogs()
  }, [])

  return (
    <div className='px-6 '>
      
      {user === null && 
        <LoginPage 
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUserName={setUserName}
          setPassword={setPassword}  
          errorMessage={errorMessage}
        />}

      {user !== null && (
        <BlogsPage 
          blogs={blogs}
          username={user.username}
          setUser={setUser}
          setBlogs={setBlogs}
          />
      )}
    </div>
  )
}

export default App