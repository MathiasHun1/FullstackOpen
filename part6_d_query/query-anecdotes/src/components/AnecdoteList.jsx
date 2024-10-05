import { useMutation } from "@tanstack/react-query"
import { voteAnecdote } from "../requests"
import { useContext } from "react"
import NotificationContext from "../contexts"
import { useQueryClient } from "@tanstack/react-query"


const AnecdoteList = ({ anecdotes }) => {
  const {dispachNotification} = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes']
      })
    }
  })

  const handleVote = (anecdote) => {
    mutation.mutate(anecdote)
    dispachNotification({type: 'vote', payload: anecdote.content})

    setTimeout(() => {
      dispachNotification('remove')
    },  3000)
  }

  return (
    <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
                </div>
            </div>
        )}
    </div>
  )
}

export default AnecdoteList