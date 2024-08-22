import { forwardRef, useImperativeHandle } from "react"
import Button from "./Button"
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, setUserName, password, setPassword}) => {

  return (
      <form onSubmit={handleLogin}>

          <h2 className='text-2xl'>Log in to application</h2>

          <div>
            username
            <input
              className='border-2 bg-sky-100'
              type="text"
              value={username}
              onChange={({target}) => setUserName(target.value)}
            />
          </div>

          <div>
            password
            <input
              className='border-2 bg-sky-100'
              type="text"
              value={password}
              onChange={({target}) => setPassword(target.value)}
            />
          </div>

        <Button type='submit' text='Login'/>
        </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUserName: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default LoginForm