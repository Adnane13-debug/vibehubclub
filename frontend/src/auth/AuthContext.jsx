import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('vibehub_user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  // Fetch fresh user data on mount if token exists
  useEffect(() => {
    const token = localStorage.getItem('vibehub_token')
    if (token) {
      api.get('/api/auth/me')
        .then(res => setUser(res.data))
        .catch(err => {
          console.log('Failed to fetch user:', err)
          localStorage.removeItem('vibehub_token')
          localStorage.removeItem('vibehub_user')
          setUser(null)
        })
    }
  }, [])

  // LOGIN — calls real API
  const login = useCallback(async (email, mot_de_passe) => {
    const res = await api.post('/api/auth/login', { email, mot_de_passe })
    const { token, user } = res.data

    // save token and user in localStorage
    localStorage.setItem('vibehub_token', token)
    localStorage.setItem('vibehub_user', JSON.stringify(user))

    setUser(user)
    return user
  }, [])

  // LOGOUT
  const logout = useCallback(async () => {
    try {
      await api.post('/api/auth/logout')
    } catch {}
    localStorage.removeItem('vibehub_token')
    localStorage.removeItem('vibehub_user')
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      role: user?.role ?? null,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user, login, logout]
  )

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}