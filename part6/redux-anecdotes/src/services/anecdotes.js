import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const anecdote = {
    content,
    votes: 0
  }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const incrementVote = async (id, payload) => {
  const updatedVotes = payload.votes + 1
  const response = await axios.patch(`${baseUrl}/${id}`, { votes: updatedVotes })
  return response.data
}

export default { getAll, createNew, getById, incrementVote }