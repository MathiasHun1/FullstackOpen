import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const add = async (credentials) => {
  const header = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  await axios.post(baseUrl, credentials, header)
}

const setToken = (user) => {
  token = user.token
}
export default { getAll, add, setToken }