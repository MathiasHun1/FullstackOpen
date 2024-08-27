import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import anecdoteService from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { setAll } from './reducers/anecdoteReducer'
import store from './store'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const anecdotes = anecdoteService
      .getAll().then(r => {
        dispatch(setAll(r))
      })
  }, [])

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App