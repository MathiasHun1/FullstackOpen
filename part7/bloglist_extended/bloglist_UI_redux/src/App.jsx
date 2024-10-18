import _ from 'lodash'
import { useState, useEffect, useRef } from 'react'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogsList from './components/BlogsList'
import BlogForm from './components/BlogForm'
import Message from './components/Message'
import 'react-material-symbols/rounded'
import { useDispatch, useSelector } from 'react-redux'
import { createMessage, resetMessage } from './app/messageSlice'
import { setUser, clearUser } from './app/userSlice'

const App = () => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const currentUser = useSelector(state => state.user)

  const dispatch = useDispatch()

  const blogRef = useRef()

  useEffect(() => {
    const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
    if (loggedInUser) {
      dispatch(setUser(loggedInUser))
    }
  }, [dispatch])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      dispatch(setUser(user))
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
    dispatch(clearUser())
    window.localStorage.clear()
  } 

  return (
    <div >
      <Message />
      <h2 >Blogs</h2>
      
      {!currentUser && 
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUserName={setUserName}
            setPassword={setPassword}  
          />
      }

      {currentUser && (
        <>
          <div >
            <h2 >{currentUser.username} logged in</h2>
            <button onClick={handleLogout}>log out</button>
          </div>
          <Togglable buttonLabel='Add new blog' ref={blogRef}>
            <BlogForm  
              blogRef={blogRef}
              currentUser={currentUser}
            />
          </Togglable>

          <BlogsList currentUser={currentUser} />
        </>
      )}
    </div>
  )
}

export default App