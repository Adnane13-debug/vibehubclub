import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../services/api'

const PREMIUM_OVERRIDES = [
  {
    titre: "Builders & Founders Night",
    description: "A curated evening for creators, designers and ambitious minds."
  },
  {
    titre: "Inside Modern UI Systems",
    description: "Deep dive into the architecture of modern digital interfaces."
  },
  {
    titre: "Escape to Ourika",
    description: "Disconnect to reconnect. An exclusive retreat for the community."
  }
]

const UNSPLASH_IMAGES = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2070&auto=format&fit=crop'
]

function EventCard({ event, featured = false, index }) {
  const formattedDate = new Date(event.date_debut).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
  
  const imgSrc = event.image || UNSPLASH_IMAGES[index % UNSPLASH_IMAGES.length]

  return (
    <Link
      to={`/events/${event.id}`}
      className={`group flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-200 hover:shadow-sm ${
        featured ? 'md:col-span-2 md:row-span-2 h-full' : 'h-full'
      }`}
    >
      <div className={`relative overflow-hidden w-full ${featured ? 'flex-1 min-h-[16rem]' : 'h-40 md:h-48 flex-shrink-0'}`}>
        <img
          src={imgSrc}
          alt={event.titre}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </div>

      <div className={`border-t border-slate-100 px-5 flex flex-col flex-shrink-0 bg-white ${featured ? 'py-5' : 'py-4 flex-1 justify-center'}`}>
        <div className={`flex items-center gap-2 mb-2 ${featured ? 'md:mb-3' : ''}`}>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-primary-custom">
            {formattedDate}
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="text-[10px] font-medium tracking-wider uppercase text-slate-500 truncate">
            {event.categorie}
          </span>
          {event.lieu && (
            <>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
                <span className="material-symbols-outlined text-[13px] opacity-70">location_on</span>
                {event.lieu}
              </span>
            </>
          )}
        </div>

        <h3 className={`font-semibold tracking-tight text-slate-900 leading-snug mb-1.5 group-hover:text-[#f59f0a] transition-colors duration-200 line-clamp-2 ${featured ? 'font-display text-xl md:text-2xl' : 'text-[15px]'}`}>
          {event.titre}
        </h3>

        <p className={`text-slate-400 leading-relaxed line-clamp-2 ${featured ? 'text-[15px]' : 'text-[13px]'}`}>
          {event.description}
        </p>
      </div>
    </Link>
  )
}

function EventsPreviewSection() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    api
      .get('/api/public/events')
      .then((res) => {
        const curatedEvents = res.data.slice(0, 3).map((event, index) => ({
          ...event,
          titre: PREMIUM_OVERRIDES[index]?.titre || event.titre,
          description:
            PREMIUM_OVERRIDES[index]?.description ||
            event.description ||
            'Join us for an unforgettable experience.',
        }))
        setEvents(curatedEvents)
      })
      .catch((err) => console.log(err))
  }, [])

  if (events.length === 0) return null

  const [featured, ...others] = events

  return (
    <section className="container-custom section-padding">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 mb-10 md:flex-row md:items-end">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Curated experiences
          </h2>
          <p className="mt-2 text-[15px] text-slate-500 leading-relaxed max-w-md">
            Handpicked events to inspire, connect, and elevate our community.
          </p>
        </div>
        <Link
          to="/events"
          className="group inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-100 px-5 py-2.5 text-[13px] font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 whitespace-nowrap"
        >
          View calendar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
        {featured && (
          <EventCard
            event={featured}
            featured
            index={0}
          />
        )}
        {others.map((event, i) => (
          <EventCard
            key={event.id}
            event={event}
            index={i + 1}
          />
        ))}
      </div>
    </section>
  )
}

export default EventsPreviewSection