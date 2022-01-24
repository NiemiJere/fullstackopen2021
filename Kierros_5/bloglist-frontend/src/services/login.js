import axios from 'axios'
const baseUrl = '/api/login'

/* eslint-disable import/no-anonymous-default-export */

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }