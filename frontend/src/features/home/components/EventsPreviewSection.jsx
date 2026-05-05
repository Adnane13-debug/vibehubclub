import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../services/api'

function EventsPreviewSection() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    api.get('/api/public/events')
      .then(res => setEvents(res.data.slice(0, 3)))
      .catch(err => console.log(err))
  }, [])

  if (events.length === 0) return null

  return (
    <section className="container-custom section-padding">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <h2 className="section-title">Upcoming Events</h2>
          <p className="section-subtitle">
            Mark your calendars for the hottest dates on campus
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
            <div className="h-48 bg-slate-200">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: event.image ? `url('${event.image}')` : 'none',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: event.image ? 'transparent' : '#e2e8f0'
                }}
              />
            </div>

            <div className="p-6">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold text-primary-custom">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                {new Date(event.date_debut).toLocaleDateString('fr-FR', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              </div>

              <h4 className="mb-3 text-xl font-bold">{event.titre}</h4>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-tight">
                  {event.categorie}
                </span>
                <Link
                  to={`/events/${event.id}`}
                  className="text-sm font-bold text-primary"
                >
                  Voir détails
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default EventsPreviewSection