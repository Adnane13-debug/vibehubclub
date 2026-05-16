import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../../../services/api'
import { useAuth } from '../../../auth/AuthContext'

function EventDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [joining, setJoining] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })
  const [isJoined, setIsJoined] = useState(false)

  useEffect(() => {
    api.get(`/api/public/events/${id}`)
      .then(res => {
        setEvent(res.data)
        setLoading(false)
        if (isAuthenticated) {
          api.get('/api/member/events')
            .then(r => setIsJoined(r.data.some(e => e.id === parseInt(id))))
            .catch(() => {})
        }
      })
      .catch(() => setLoading(false))
  }, [id, isAuthenticated])

  const handleJoin = async () => {
    if (!isAuthenticated) { navigate('/login'); return }
    setJoining(true)
    try {
      await api.post(`/api/member/events/${id}/join`)
      setMessage({ text: "You're in! See you at the event.", type: 'success' })
      setIsJoined(true)
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Something went wrong. Try again.', type: 'error' })
    } finally { setJoining(false) }
  }

  const handleCancel = async () => {
    setJoining(true)
    try {
      await api.delete(`/api/member/events/${id}/cancel`)
      setMessage({ text: 'Participation cancelled.', type: 'info' })
      setIsJoined(false)
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Something went wrong.', type: 'error' })
    } finally { setJoining(false) }
  }

  if (loading) return (
    <div className="flex flex-1 items-center justify-center py-40">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent opacity-60" />
        <span className="text-xs text-slate-400">Loading event…</span>
      </div>
    </div>
  )

  if (!event) return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-40">
      <span className="material-symbols-outlined text-4xl text-slate-300">event_busy</span>
      <p className="text-sm text-slate-400">This event doesn't exist or has been removed.</p>
      <Link to="/events" className="text-sm font-semibold text-primary hover:underline">Browse all events</Link>
    </div>
  )

  const formattedDate = new Date(event.date_debut).toLocaleDateString('fr-FR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="flex flex-1 flex-col bg-[#F8F7F3]">

      {/* ── HERO ─────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ height: 'clamp(280px, 46vw, 520px)' }}>

        {/* Image or branded light fallback */}
        {event.image ? (
          <>
            <img
              src={event.image}
              alt={event.titre}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Dark overlays — only when a real photo is present */}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent" />
          </>
        ) : (
          /* No image: warm branded gradient stays light — no dark overlays */
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-white to-slate-100 dark:from-primary/10 dark:via-slate-800 dark:to-slate-900" />
        )}

        {/* Back link — adapts color to context */}
        <div className="absolute left-5 top-5 md:left-10 md:top-8">
          <Link
            to="/events"
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm transition-colors
              ${event.image
                ? 'bg-white/15 text-white hover:bg-white/25'
                : 'bg-slate-900/8 text-slate-600 hover:bg-slate-900/12 dark:bg-white/10 dark:text-slate-300'
              }`}
          >
            <span className="material-symbols-outlined text-[0.9rem]">arrow_back</span>
            Events
          </Link>
        </div>

        {/* Hero content — anchored to bottom-left */}
        <div className="absolute inset-x-0 bottom-0 px-5 pb-8 md:px-10 md:pb-10">
          <span className={`mb-3 inline-block rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest
            ${event.image ? 'bg-primary text-white' : 'bg-primary text-white'}`}>
            {event.categorie}
          </span>
          <h1 className={`font-heading max-w-2xl text-2xl font-bold leading-tight tracking-tight md:text-[2.25rem]
            ${event.image ? 'text-white drop-shadow-sm' : 'text-slate-900 dark:text-white'}`}>
            {event.titre}
          </h1>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-[860px] px-5 py-10 md:px-8 md:py-14">

        {/* Meta strip */}
        <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <span className="material-symbols-outlined text-[1rem] text-primary">calendar_today</span>
            </div>
            <div>
              <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">Date</p>
              <p className="text-sm font-semibold capitalize text-slate-900">{formattedDate}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <span className="material-symbols-outlined text-[1rem] text-primary">location_on</span>
            </div>
            <div>
              <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">Location</p>
              <p className="text-sm font-semibold text-slate-900">{event.lieu}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <span className="material-symbols-outlined text-[1rem] text-primary">
                {isJoined ? 'check_circle' : 'group'}
              </span>
            </div>
            <div>
              <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">Your status</p>
              <p className="text-sm font-semibold text-slate-900">
                {isJoined ? "You're going ✓" : isAuthenticated ? 'Not registered yet' : 'Sign in to join'}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-10 h-px bg-slate-200/70" />

        {/* Description */}
        <div className="mb-12">
          <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            About this event
          </h2>
          <p className="max-w-[65ch] text-[0.95rem] leading-[1.9] text-slate-500">
            {event.description}
          </p>
        </div>

        {/* ── CTA BLOCK ─────────────────────────────────── */}
        <div className="rounded-2xl border border-primary/10 bg-primary/[0.04] p-6 md:p-8">

          {/* Feedback message */}
          {message.text && (
            <div className={`mb-5 flex items-start gap-3 rounded-xl px-4 py-3 text-sm
              ${message.type === 'success' ? 'bg-green-50 text-green-700' : ''}
              ${message.type === 'error'   ? 'bg-red-50 text-red-600' : ''}
              ${message.type === 'info'    ? 'bg-[#F8F7F3] text-slate-500' : ''}
            `}>
              <span className="material-symbols-outlined mt-0.5 shrink-0 text-[1rem]">
                {message.type === 'success' ? 'check_circle' : message.type === 'error' ? 'error' : 'info'}
              </span>
              {message.text}
            </div>
          )}

          {isJoined ? (
            <>
              <div className="mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[1.1rem] text-primary">check_circle</span>
                <p className="text-base font-bold text-slate-900">You're registered</p>
              </div>
              <p className="mb-5 text-sm text-slate-500">
                We'll see you there. Keep an eye on your notifications for updates.
              </p>
              <button
                onClick={handleCancel}
                disabled={joining}
                className="text-sm font-semibold text-slate-400 transition-colors hover:text-red-500 disabled:opacity-50"
              >
                {joining ? 'Cancelling…' : 'Cancel my participation'}
              </button>
            </>
          ) : (
            <>
              <p className="mb-1 text-base font-bold text-slate-900">
                {isAuthenticated ? 'Ready to join?' : 'Want to be there?'}
              </p>
              <p className="mb-5 text-sm text-slate-500">
                {isAuthenticated
                  ? 'Secure your spot — it only takes a second.'
                  : 'Sign in to register and stay updated on this event.'}
              </p>
              <button
                onClick={handleJoin}
                disabled={joining}
                className="rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-slate-900 shadow-[0_2px_18px_rgba(245,158,11,0.38)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_6px_28px_rgba(245,158,11,0.48)] active:scale-[0.98] disabled:opacity-60"
              >
                {joining
                  ? 'Registering…'
                  : isAuthenticated
                  ? 'Join this event'
                  : 'Sign in to participate'}
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  )
}

export default EventDetailsPage