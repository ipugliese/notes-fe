import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return axios
          .get(baseUrl)
          .then(response => response.data.concat(
              {
                id: 10000,
                content: 'This note is not saved to server',
                date: '2019-05-30T17:30:31.098Z',
                important: true,
              }
          ))
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token}
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  return axios
          .put(`${baseUrl}/${id}`, newObject)
          .then(response => response.data)
}

const notes = { 
  setToken,
  getAll, 
  create, 
  update
}

export default notes