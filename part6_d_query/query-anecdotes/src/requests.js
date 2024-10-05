import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = () => axios.get(baseUrl).then(res => res.data)

const createAnecdote = (content) => axios.post(baseUrl, {content, votes: 0}).then(res => res.data) 

const voteAnecdote = (anecdote) => {
    const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
    }
    return axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote)
        .then(res => res.data)
}

export { getAll, createAnecdote, voteAnecdote }