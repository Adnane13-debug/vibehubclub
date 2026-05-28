import { useState, useEffect } from 'react'
import api from '../../services/api'
import SecurityCard from './edit/SecurityCard'

// ─── Mini sub-components ────────────────────────────────────────────────────

function StatPill({ icon, label, value, accent }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl bg-white border border-slate-100 px-5 py-4 shadow-sm hover:shadow-md transition-shadow">
      <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${accent}`}>
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      </div>
      <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</p>
    </div>
  )
}

function MbtiCard({ type, onSave, value, onChange }) {
  const traits = type ? {
    INTJ:['Strategic','Independent','Decisive'],
    ENFP:['Creative','Enthusiastic','Social'],
    INFJ:['Insightful','Principled','Visionary'],
    ENTP:['Innovative','Debater','Quick-witted'],
    ISTP:['Analytical','Practical','Reserved'],
    ESFJ:['Caring','Social','Traditional'],
  }[type] || ['Curious','Driven','Unique'] : []

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-heading text-base font-bold text-slate-900">Personality</h3>
        <a href="https://www.16personalities.com/free-personality-test" target="_blank" rel="noreferrer"
          className="text-xs font-semibold text-amber-600 hover:underline flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">open_in_new</span>Take test
        </a>
      </div>
      {type ? (
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="font-heading text-4xl font-black tracking-tighter text-slate-900">{type}</span>
            <div className="flex flex-wrap gap-1">
              {traits.map(t => (
                <span key={t} className="rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">{t}</span>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500 mb-2 font-medium">Update result</p>
            <div className="flex gap-2">
              <input value={value} onChange={e => onChange(e.target.value.toUpperCase())} maxLength={4}
                placeholder="e.g. INTJ"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-mono font-bold tracking-widest focus:outline-none focus:border-amber-400"/>
              <button onClick={onSave} disabled={!value.trim()}
                className="shrink-0 rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-700 transition-colors disabled:opacity-40">Save</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <span className="material-symbols-outlined text-3xl text-slate-200 mb-2 block">psychology</span>
          <p className="text-sm text-slate-500 mb-3">Discover your personality type</p>
          <div className="flex gap-2">
            <input value={value} onChange={e => onChange(e.target.value.toUpperCase())} maxLength={4}
              placeholder="INTJ"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-mono font-bold tracking-widest focus:outline-none focus:border-amber-400"/>
            <button onClick={onSave} disabled={!value.trim()}
              className="shrink-0 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-white hover:bg-amber-600 transition-colors disabled:opacity-40">Save</button>
          </div>
        </div>
      )}
    </div>
  )
}

function EventCard({ event }) {
  const categoryColors = {
    sport: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    culture: 'bg-rose-50 text-rose-700 border-rose-200',
    entrepreneurship: 'bg-violet-50 text-violet-700 border-violet-200',
  }
  const cc = categoryColors[event.badge?.toLowerCase()] || 'bg-slate-100 text-slate-600 border-slate-200'
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
      <div className="relative h-44 overflow-hidden">
        <img src={event.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"/>
        <span className={`absolute left-3 top-3 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm bg-white/90 ${cc}`}>
          {event.badge}
        </span>
        <div className="absolute right-3 top-3 flex flex-col items-center rounded-xl bg-white/95 backdrop-blur px-2.5 py-1.5 text-center shadow-sm">
          <span className="text-lg font-black leading-none text-slate-900">{event.day}</span>
          <span className="text-[10px] font-bold uppercase text-slate-400">{event.month}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1.5 font-heading text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{event.title}</h3>
        <p className="mb-4 text-xs text-slate-500 line-clamp-2">{event.desc}</p>
        <div className="mt-auto flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span>{event.time}</span>
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span>{event.place}</span>
        </div>
      </div>
    </article>
  )
}

function NotifItem({ notif, onMarkRead }) {
  return (
    <div className={`flex gap-3 rounded-xl px-3 py-3 transition-colors cursor-default ${notif.lu === 0 ? 'bg-amber-50/60' : 'hover:bg-slate-50'}`}>
      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${notif.lu === 0 ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'}`}>
        <span className="material-symbols-outlined text-[16px]">{notif.lu === 0 ? 'notifications_active' : 'notifications'}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className={`text-sm leading-snug ${notif.lu === 0 ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>{notif.message}</p>
        <p className="mt-0.5 text-[10px] text-slate-400">{new Date(notif.created_at).toLocaleDateString('fr-FR',{day:'numeric',month:'short'})}</p>
      </div>
      {notif.lu === 0 && (
        <button onClick={() => onMarkRead(notif.id)} className="mt-0.5 shrink-0 text-[10px] font-semibold text-amber-600 hover:text-amber-700">✓</button>
      )}
    </div>
  )
}

// ─── Main component ─────────────────────────────────────────────────────────

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
    Promise.allSettled([
      api.get('/api/member/dashboard'),
      api.get('/api/member/events'),
      api.get('/api/member/notifications'),
      api.get('/api/member/mbti/results')
    ]).then(([dashRes, eventsRes, notifRes, mbtiRes]) => {
      if (dashRes.status === 'fulfilled') setDashboard(dashRes.value.data)
      if (eventsRes.status === 'fulfilled') setEvents(eventsRes.value.data)
      if (notifRes.status === 'fulfilled') setNotifications(notifRes.value.data)
      if (mbtiRes.status === 'fulfilled') setMbti(mbtiRes.value.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const markRead = async (id) => {
    try {
      await api.patch(`/api/member/notifications/${id}/read`)
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, lu: 1 } : n))
    } catch (err) { console.log(err) }
  }

  const handleSaveProfile = async () => {
    try {
      await api.put('/api/member/profile', { nom: editNom, prenom: editPrenom, photo: editPhoto })
      setDashboard(prev => ({ ...prev, user: { ...prev.user, nom: editNom, prenom: editPrenom, photo: editPhoto } }))
      setIsEditingProfile(false)
    } catch (err) { console.log(err) }
  }

  const handleSaveMbti = async () => {
    try {
      await api.post('/api/member/mbti/results', { type: mbtiResult })
      const res = await api.get('/api/member/mbti/results')
      setMbti(res.data)
      setMbtiResult('')
    } catch (err) { console.log(err) }
  }

  if (loading) return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-[3px] border-slate-200 border-t-amber-500"/>
        <p className="text-sm text-slate-400">Loading your space…</p>
      </div>
    </div>
  )

  if (!dashboard) return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center shadow-md">
        <span className="material-symbols-outlined text-4xl text-red-400 mb-3 block">cloud_off</span>
        <p className="font-bold text-slate-900">Failed to load</p>
        <p className="text-sm text-slate-500 mt-1">Could not reach the server.</p>
      </div>
    </div>
  )

  const firstName = dashboard.user.prenom || 'Member'
  const fullName = `${dashboard.user.prenom || ''} ${dashboard.user.nom || ''}`.trim()
  const userAvatar = dashboard.user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=1e293b&color=f59f0a&bold=true&size=200`
  const userEmail = dashboard.user.email || ''
  const joinedDate = dashboard.user.created_at
    ? new Date(dashboard.user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'N/A'
  const unreadCount = notifications.filter(n => n.lu === 0).length
  const xp = (dashboard.totalEvents || 0) * 10
  const xpGoal = 100
  const xpPct = Math.min(100, (xp / xpGoal) * 100)

  const upcomingEvents = events.map(e => {
    const d = new Date(e.date_debut)
    return {
      id: e.id,
      title: e.titre,
      desc: e.description || e.lieu || '',
      day: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      place: e.lieu || 'CMC OFPPT',
      badge: e.categorie || 'Event',
      image: e.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop'
    }
  })

  return (
    <div className="min-h-screen bg-[#f8f7f5]">
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp .4s ease both; }
        .fade-up-1 { animation-delay:.05s }
        .fade-up-2 { animation-delay:.1s }
        .fade-up-3 { animation-delay:.15s }
        .fade-up-4 { animation-delay:.2s }
      `}</style>

      <div className="mx-auto max-w-[1280px] px-6 pb-20 pt-10 lg:px-8">

        {/* ── Hero ── */}
        <div className="fade-up mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Member Space</p>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Welcome back,<br className="hidden md:block"/> {firstName} 👋
            </h1>
            <p className="mt-3 text-slate-500 max-w-md">
              {mbti?.type
                ? `As an ${mbti.type}, you thrive in structured creativity. You have ${events.length} event${events.length !== 1 ? 's' : ''} this cycle.`
                : `You have ${events.length} event${events.length !== 1 ? 's' : ''} this cycle. Take the MBTI test to unlock your profile.`}
            </p>
          </div>
          <div className="shrink-0 w-full lg:w-72 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600">XP Progress</span>
              <span className="text-xs font-semibold text-slate-500">{xp} / {xpGoal} XP</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-700" style={{ width: `${xpPct}%` }}/>
            </div>
            <p className="mt-2 text-xs text-slate-400">{dashboard.user.role || 'Member'} · Joined {joinedDate}</p>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="fade-up fade-up-1 mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatPill icon="event_available" label="Events Joined" value={dashboard.totalEvents || 0} accent="bg-emerald-100 text-emerald-600"/>
          <StatPill icon="calendar_month" label="Upcoming" value={upcomingEvents.length} accent="bg-sky-100 text-sky-600"/>
          <StatPill icon="notifications" label="Unread" value={unreadCount} accent="bg-amber-100 text-amber-600"/>
          <StatPill icon="psychology" label="MBTI Type" value={mbti?.type || '—'} accent="bg-violet-100 text-violet-600"/>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* ── LEFT (2 cols): Events + MBTI ── */}
          <div className="fade-up fade-up-2 flex flex-col gap-6 lg:col-span-2">

            {/* Events */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-heading text-xl font-bold text-slate-900">My Events</h2>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">{events.length} registered</span>
              </div>
              {events.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
                  <span className="material-symbols-outlined text-4xl text-slate-200 mb-3 block">event_busy</span>
                  <p className="font-semibold text-slate-900">No events yet</p>
                  <p className="mt-1 text-sm text-slate-400">Events you join will appear here</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {upcomingEvents.map(ev => <EventCard key={ev.id} event={ev}/>)}
                </div>
              )}
            </div>

            {/* MBTI */}
            <MbtiCard type={mbti?.type} value={mbtiResult} onChange={setMbtiResult} onSave={handleSaveMbti}/>
          </div>

          {/* ── RIGHT (1 col): Profile + Notifications ── */}
          <div className="fade-up fade-up-3 flex flex-col gap-5">

            {/* Profile card */}
            {isEditingProfile ? (
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <h3 className="mb-4 font-heading text-base font-bold text-slate-900">Edit Profile</h3>
                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-500 uppercase tracking-wide">Last Name</label>
                    <input value={editNom} onChange={e => setEditNom(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400 transition-colors"/>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-500 uppercase tracking-wide">First Name</label>
                    <input value={editPrenom} onChange={e => setEditPrenom(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400 transition-colors"/>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-500 uppercase tracking-wide">Photo URL</label>
                    <input value={editPhoto} onChange={e => setEditPhoto(e.target.value)} placeholder="https://…"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400 transition-colors"/>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button onClick={handleSaveProfile}
                    className="flex-1 rounded-xl bg-slate-900 py-2.5 text-sm font-bold text-white hover:bg-slate-700 transition-colors">Save</button>
                  <button onClick={() => setIsEditingProfile(false)}
                    className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-tr from-amber-400/30 to-amber-200/20 blur"/>
                    <img src={userAvatar} alt="" className="relative h-16 w-16 rounded-2xl object-cover border-2 border-white shadow"/>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-heading text-base font-bold text-slate-900 truncate">{fullName}</p>
                    <p className="text-xs text-slate-400 truncate">{userEmail}</p>
                    <span className="mt-1 inline-block rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                      {dashboard.user.role || 'Member'}
                    </span>
                  </div>
                  <button onClick={() => { setEditNom(dashboard.user.nom); setEditPrenom(dashboard.user.prenom); setEditPhoto(dashboard.user.photo||''); setIsEditingProfile(true) }}
                    className="shrink-0 flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-50 pt-4 text-center">
                  <div>
                    <p className="text-lg font-black text-slate-900">{xp}</p>
                    <p className="text-[10px] font-medium text-slate-400 uppercase">XP Points</p>
                  </div>
                  <div>
                    <p className="text-lg font-black text-slate-900">{dashboard.totalEvents || 0}</p>
                    <p className="text-[10px] font-medium text-slate-400 uppercase">Events</p>
                  </div>
                </div>
              </div>
            )}

            {/* Security — Change Password */}
            <SecurityCard />

            {/* Notifications */}
            <div className="fade-up fade-up-4 rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-50 px-5 py-4">
                <h3 className="font-heading text-sm font-bold text-slate-900">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">{unreadCount}</span>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto p-2">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center">
                    <span className="material-symbols-outlined text-2xl text-slate-200 mb-2 block">notifications_off</span>
                    <p className="text-xs text-slate-400">No notifications</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {notifications.slice(0, 6).map(n => <NotifItem key={n.id} notif={n} onMarkRead={markRead}/>)}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberDashboard