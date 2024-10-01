import { useDispatch, useSelector } from "react-redux"
import { voteFor } from "../reducers/anecdoteReducer"
import { vote as voteAnecdote } from "../reducers/anecdoteReducer"
import { createNotification, removeNotification } from "../reducers/notificationReducer"
import { setNotification } from "../reducers/notificationReducer"
import store from '../store'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    const { anecdote, filter } = state

    if (!filter) {
      return ([...anecdote]).sort((a, b) => b.votes - a.votes)
    }
    return ([...anecdote]).filter(a => a.content.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => b.votes - a.votes)
  })

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    const votedAnecdote = store.getState().anecdote.find(a => a.id === id)
    dispatch(setNotification(`you voted '${votedAnecdote.content}'`, 3000))
  }

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList