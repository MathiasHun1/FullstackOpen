import { useSelector, useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => {
    return state.notification
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    notification && (
      <div style={style}>
        {notification}
      </div>
    )
  )
}

export default Notification