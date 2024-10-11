import axios from 'axios'
const baseUrl = '/api/blogs'

let token

let config = () => ({
  headers: {
    'Authorization': `Bearer ${token}`
  }
})

const setToken = (user) => {
  token = user.token
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (credentials) => {
  const response = await axios.post(baseUrl, credentials, config())
  return response.data
}


const deleteBlog = async (id) => {
  const header = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  
  await axios.delete(`${baseUrl}/${id}`, config())
}

const updateLike = async (id) => {

  const response = await axios.put(`${baseUrl}/${id}/likes`)
  return response.data
}

export default { getAll, create, setToken, deleteBlog, updateLike }