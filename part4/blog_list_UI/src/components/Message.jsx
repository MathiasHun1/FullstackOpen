import React from 'react'

const Message = ({ errorMessage, successMessage }) => {
  return (
    <div>
      {errorMessage && (
        <p className="p-4 text-red-800 bg-red-200 rounded-md">{errorMessage}</p>
      )}

      {successMessage && (
        <p className="p-4 text-green-800 bg-lime-200 rounded-md">{successMessage}</p>
      )}
    </div>
  )
}

export default Message