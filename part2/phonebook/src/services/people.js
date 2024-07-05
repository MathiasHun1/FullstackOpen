import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (personObj) => {
  const request = axios.post(baseUrl, personObj)
  return request.then(response => response.data)
}
const removePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return (
    request
      .then(response => response.data)
      .catch(error => console.log(error))
  )
}

export default { getAll, create, removePerson, update }