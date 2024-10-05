import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useContext } from "react"
import NotificationContext from "../contexts"

const AnecdoteForm = () => {
  const { notification, dispachNotification } = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (data, content) => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})

      dispachNotification({type: 'add', payload: content})
      setTimeout(() => {
        dispachNotification({type: 'remove'})
      }, 3000)
    },
    onError: () => {
      dispachNotification({type: 'tooShort'})
      setTimeout(() => {
        dispachNotification({type: 'remove'})
      }, 3000)
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    mutation.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
