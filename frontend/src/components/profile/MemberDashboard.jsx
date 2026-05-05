import { useState, useEffect } from 'react'
import api from '../../services/api'

function MemberDashboard() {
  const [dashboard, setDashboard] = useState(null)
  const [events, setEvents] = useState([])
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // fetch all data at once
    Promise.all([
      api.get('/api/member/dashboard'),
      api.get('/api/member/events'),
      api.get('/api/member/notifications')
    ])
      .then(([dashRes, eventsRes, notifRes]) => {
        setDashboard(dashRes.data)
        setEvents(eventsRes.data)
        setNotifications(notifRes.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-8 text-center">Chargement...</div>
  if (!dashboard) return <div className="p-8 text-center">Erreur de chargement.</div>

  return (
    <div className="flex flex-col gap-6 p-6">

      {/* Welcome */}
      <div className="rounded-2xl bg-primary/10 p-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Bonjour, {dashboard.user.prenom} 👋
        </h1>
        <p className="text-slate-600">Bienvenue sur votre espace membre</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-4 shadow-sm text-center">
          <p className="text-3xl font-bold text-primary">{dashboard.totalEvents}</p>
          <p className="text-sm text-slate-500">Événements rejoints</p>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow-sm text-center">
          <p className="text-3xl font-bold text-primary">{dashboard.unreadNotifications}</p>
          <p className="text-sm text-slate-500">Notifications non lues</p>
        </div>
      </div>

      {/* My events */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-900">Mes événements</h2>
        {events.length === 0
          ? <p className="text-slate-500">Vous n'êtes inscrit à aucun événement.</p>
          : events.map(event => (
            <div key={event.id} className="mb-3 rounded-xl border bg-white p-4 shadow-sm">
              <p className="font-semibold text-slate-900">{event.titre}</p>
              <p className="text-sm text-slate-500">{event.lieu} — {new Date(event.date_debut).toLocaleDateString('fr-FR')}</p>
            </div>
          ))
        }
      </div>

      {/* Notifications */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-900">Notifications</h2>
        {notifications.length === 0
          ? <p className="text-slate-500">Aucune notification.</p>
          : notifications.map(notif => (
            <div key={notif.id} className={`mb-3 rounded-xl border p-4 shadow-sm ${notif.lu === 0 ? 'bg-primary/5 border-primary/20' : 'bg-white'}`}>
              <p className="text-sm text-slate-700">{notif.message}</p>
              <p className="text-xs text-slate-400 mt-1">{new Date(notif.created_at).toLocaleDateString('fr-FR')}</p>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default MemberDashboard