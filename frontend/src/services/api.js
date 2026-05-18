import axios from 'axios'

// base URL of your backend (use Vite env or fallback to localhost)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
})

// automatically add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vibehub_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// handle 401 globally: clear token and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('vibehub_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api