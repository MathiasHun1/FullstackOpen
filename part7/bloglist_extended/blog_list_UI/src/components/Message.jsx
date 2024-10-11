import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const getStateMessage = (state) => state.message.value

const Message = () => {
  const errorMessage = useSelector(getStateMessage)
  return (
    <div>
      {errorMessage && (
        <p className="p-4 text-red-800 bg-red-200 rounded-md">{errorMessage}</p>
      )}

      {/* {successMessage && (
        <p className="p-4 text-green-800 bg-lime-200 rounded-md">{successMessage}</p>
      )} */}
    </div>
  )
}

export default Message