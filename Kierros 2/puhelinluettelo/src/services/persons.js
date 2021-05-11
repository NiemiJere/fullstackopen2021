import axios from 'axios'
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(baseUrl)
}

const create = personObject => {
    return axios.post(baseUrl, personObject)
}

const del = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}
export default { getAll, create, del }