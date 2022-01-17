import axios from 'axios'
const baseUrl = "/api/persons"

const getAll = () => {
    return axios.get(baseUrl)
}

const create = personObject => {
    return axios.post(baseUrl, personObject)
}

const del = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, updatedObject) => {
    return axios.put(`${baseUrl}/${id}`, updatedObject)
}

export default { getAll, create, del, update }