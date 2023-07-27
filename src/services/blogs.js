import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

// Retrieve all blogs
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// Create a new blog
const create = async newBlog => {
  // Sets token to the authorization header
  const config = {
    headers: { Authorization: token}
  }

  // Header is given to axios as 3rd parameter of post method
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

// Updating a blog
const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, update }