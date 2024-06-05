function Notification({ errorMessage, successMessage }) {
  if(errorMessage === null && successMessage === null) {
    return null
  }
  return (
    <>
      {errorMessage && 
      <p className="error-message">{errorMessage}</p>}
      {successMessage && 
      <p className="success-message">{successMessage}</p>}
    </>
  )
}

export default Notification