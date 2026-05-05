import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import { useAuth } from '../../../auth/AuthContext'

function EventDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [joining, setJoining] = useState(false)
  const [message, setMessage] = useState('')
  const [isJoined, setIsJoined] = useState(false)

  useEffect(() => {
    api.get(`/api/public/events/${id}`)
      .then(res => {
        setEvent(res.data)
        setLoading(false)
        // Check if user is joined
        if (isAuthenticated) {
          api.get('/api/member/events')
            .then(res => {
              setIsJoined(res.data.some(e => e.id === parseInt(id)))
            })
            .catch(err => console.log(err))
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }, [id, isAuthenticated])

  const handleJoin = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    setJoining(true)
    try {
      await api.post(`/api/member/events/${id}/join`)
      setMessage('✅ Vous êtes inscrit à cet événement!')
      setIsJoined(true)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur lors de l\'inscription')
    } finally {
      setJoining(false)
    }
  }

  const handleCancel = async () => {
    setJoining(true)
    try {
      await api.delete(`/api/member/events/${id}/cancel`)
      setMessage('✅ Participation annulée!')
      setIsJoined(false)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur lors de l\'annulation')
    } finally {
      setJoining(false)
    }
  }

  if (loading) return <div className="p-8 text-center">Chargement...</div>
  if (!event) return <div className="p-8 text-center">Événement introuvable.</div>

  return (
    <div className="flex flex-1 justify-center px-6 py-10 md:px-20">
      <div className="layout-content-container flex max-w-[900px] flex-1 flex-col gap-6">

        {/* Image */}
        {event.image && (
          <img
            src={event.image}
            alt={event.titre}
            className="w-full rounded-2xl object-cover"
            style={{ maxHeight: '400px' }}
          />
        )}

        {/* Category badge */}
        <span className="w-fit rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary capitalize">
          {event.categorie}
        </span>

        {/* Title */}
        <h1 className="font-heading text-4xl font-bold text-slate-900">
          {event.titre}
        </h1>

        {/* Info */}
        <div className="flex flex-wrap gap-6 text-sm text-slate-600">
          <span>📅 {new Date(event.date_debut).toLocaleDateString('fr-FR', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
          })}</span>
          <span>📍 {event.lieu}</span>
        </div>

        {/* Description */}
        <p className="text-slate-700 leading-relaxed">
          {event.description}
        </p>

        {/* Message */}
        {message && (
          <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        )}

        {/* Join/Cancel button */}
        {isJoined ? (
          <button
            onClick={handleCancel}
            disabled={joining}
            className="btn-primary w-fit"
          >
            {joining ? 'Annulation...' : 'Annuler participation'}
          </button>
        ) : (
          <button
            onClick={handleJoin}
            disabled={joining}
            className="btn-primary w-fit"
          >
            {joining ? 'Inscription...' : isAuthenticated ? 'Participer à cet événement' : 'Connectez-vous pour participer'}
          </button>
        )}

      </div>
    </div>
  )
}

export default EventDetailsPage