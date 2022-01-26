import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const getId = () => (100000 * Math.random()).toFixed(0)

  const asObject = (anecdote) => {
    return {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }

  const object = asObject(content)

  const response = await axios.post(baseUrl, object)

  return response.data
}

const update = async (updatedObject) => {
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
  return response.data
}

export default { getAll, createNew, update }