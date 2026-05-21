import axios from 'axios'

// base URL from Vite env — must be set in .env (VITE_API_URL=http://localhost:5000)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// automatically add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vibehub_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// handle 401 globally: clear session and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('vibehub_token')
      localStorage.removeItem('vibehub_user')
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api