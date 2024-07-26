
function LoginPage({ handleLogin, username, password, setUserName, setPassword, errorMessage }) {
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
        <button className='btn' type='submit'>login</button>
        {errorMessage && (
          <p className="p-4 text-red-800 bg-red-200 rounded-md">{errorMessage}</p>
        )}
      </form>
  )
}

export default LoginPage