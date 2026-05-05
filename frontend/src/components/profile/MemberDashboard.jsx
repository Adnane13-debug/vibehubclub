import { useState, useEffect } from 'react'
import api from '../../services/api'

function MemberDashboard() {
  const [dashboard, setDashboard] = useState(null)
  const [events, setEvents] = useState([])
  const [notifications, setNotifications] = useState([])
  const [mbti, setMbti] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editNom, setEditNom] = useState('')
  const [editPrenom, setEditPrenom] = useState('')
  const [editPhoto, setEditPhoto] = useState('')
  const [mbtiResult, setMbtiResult] = useState('')

  useEffect(() => {
    // fetch all data at once
    Promise.all([
      api.get('/api/member/dashboard'),
      api.get('/api/member/events'),
      api.get('/api/member/notifications'),
      api.get('/api/member/mbti/results')
    ])
      .then(([dashRes, eventsRes, notifRes, mbtiRes]) => {
        setDashboard(dashRes.data)
        setEvents(eventsRes.data)
        setNotifications(notifRes.data)
        setMbti(mbtiRes.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  const markRead = async (id) => {
    try {
      await api.patch(`/api/member/notifications/${id}/read`)
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, lu: 1 } : n))
    } catch (err) {
      console.log(err)
    }
  }
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

      {/* Profile Edit */}
      {isEditingProfile ? (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Modifier le profil</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nom"
              value={editNom}
              onChange={(e) => setEditNom(e.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3"
            />
            <input
              type="text"
              placeholder="Prénom"
              value={editPrenom}
              onChange={(e) => setEditPrenom(e.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3"
            />
            <input
              type="text"
              placeholder="Photo URL"
              value={editPhoto}
              onChange={(e) => setEditPhoto(e.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3"
            />
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  try {
                    await api.put('/api/member/profile', { nom: editNom, prenom: editPrenom, photo: editPhoto })
                    setDashboard(prev => ({ ...prev, user: { ...prev.user, nom: editNom, prenom: editPrenom, photo: editPhoto } }))
                    setIsEditingProfile(false)
                  } catch (err) {
                    console.log(err)
                  }
                }}
                className="btn-primary"
              >
                Sauvegarder
              </button>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="btn-secondary"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Mon Profil</h2>
              <p className="text-slate-600">{dashboard.user.nom} {dashboard.user.prenom}</p>
              <p className="text-slate-500">{dashboard.user.email}</p>
            </div>
            <button
              onClick={() => {
                setEditNom(dashboard.user.nom)
                setEditPrenom(dashboard.user.prenom)
                setEditPhoto(dashboard.user.photo || '')
                setIsEditingProfile(true)
              }}
              className="btn-primary"
            >
              Modifier
            </button>
          </div>
        </div>
      )}

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
        <div className="rounded-xl border bg-white p-4 shadow-sm text-center">
          <p className="text-3xl font-bold text-primary">{mbti?.type || 'N/A'}</p>
          <p className="text-sm text-slate-500">Type MBTI</p>
          <button
            onClick={() => window.open('https://bit.ly/CMC-Personality-Test', '_blank')}
            className="mt-2 btn-primary text-xs"
          >
            Passer le test MBTI
          </button>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Votre type (e.g. INTJ)"
              value={mbtiResult}
              onChange={(e) => setMbtiResult(e.target.value)}
              className="rounded-xl border border-slate-200 px-2 py-1 text-xs w-full"
            />
            <button
              onClick={async () => {
                try {
                  await api.post('/api/member/mbti/results', { type: mbtiResult })
                  const res = await api.get('/api/member/mbti/results')
                  setMbti(res.data)
                  setMbtiResult('')
                } catch (err) {
                  console.log(err)
                }
              }}
              className="mt-1 btn-primary text-xs w-full"
            >
              Sauvegarder
            </button>
          </div>
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
              {notif.lu === 0 && (
                <button
                  onClick={() => markRead(notif.id)}
                  className="mt-2 text-xs text-primary hover:underline"
                >
                  Marquer comme lu
                </button>
              )}
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default MemberDashboard