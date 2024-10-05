import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import { useQuery } from '@tanstack/react-query'
import { getAll } from './requests'
import { notificationReducer } from './reducers'
import { useReducer } from 'react'
import NotificationContext from './contexts'

const App = () => {
  const [ notification, dispachNotification] = useReducer(notificationReducer, '')

  const query = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
    retry: 1
  })


  if (query.isLoading) {
    return <div>Loading...</div>
  }

  if (query.isError) {
    return <div>Service not available due to problems in server</div>
  }
  const anecdotes = query.data

  return (
    <NotificationContext.Provider value={{notification, dispachNotification}}>
      <div>
        <h3>Anecdote app</h3>
        <Notification />
        <AnecdoteForm />
        <AnecdoteList anecdotes={anecdotes}/>
      </div>
    </NotificationContext.Provider>
  )
}

export default App
