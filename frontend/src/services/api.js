import axios from 'axios'

// base URL of your backend
const api = axios.create({
  baseURL: 'http://localhost:5000'
})

// automatically add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vibehub_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api