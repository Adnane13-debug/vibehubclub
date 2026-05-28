import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

/**
 * Handles ?token= in the URL after Google OAuth login redirect
 * (backend sends users to /admin, /profile, or /visitor with token).
 */
export function GoogleOAuthCallback({ children }) {
  const { loginWithToken } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [processing, setProcessing] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return Boolean(params.get('token'))
  })

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token = params.get('token')
    if (!token) return

    setProcessing(true)
    window.history.replaceState({}, '', location.pathname)

    loginWithToken(token)
      .then((user) => {
        if (user.role === 'admin') navigate('/admin', { replace: true })
        else if (user.role === 'membre') navigate('/profile', { replace: true })
        else navigate('/visitor', { replace: true })
      })
      .catch(() => navigate('/login', { replace: true }))
      .finally(() => setProcessing(false))
  }, [location.search, location.pathname, loginWithToken, navigate])

  if (processing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-light">
        <p className="text-sm text-slate-500">Connexion en cours…</p>
      </div>
    )
  }

  return children
}
