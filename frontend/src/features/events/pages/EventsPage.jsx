import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react'
import api from '../../../services/api'
import EventsHeroSection from '../components/EventsHeroSection'
import EventsFilterSection from '../components/EventsFilterSection'
import EventCard from '../components/EventCard'
import EventsFeaturedSection from '../components/EventsFeaturedSection'

function EventsPage() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all')
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/public/events')
      .then(res => {
        setEvents(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  const filteredEvents = activeFilter === 'all'
    ? events
    : events.filter(e => e.categorie?.toLowerCase() === activeFilter)

  if (loading) return <div className="p-8 text-center">{t("eventsPage.loading")}</div>

  return (
    <div className="flex flex-1 justify-center px-6 py-10 md:px-20">
      <div className="layout-content-container flex max-w-[1200px] flex-1 flex-col">
        <EventsHeroSection />
        <EventsFilterSection
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.length === 0
            ? <p className="text-slate-500">{t("eventsPage.empty")}</p>
            : filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))
          }
        </div>
        <EventsFeaturedSection />
      </div>
    </div>
  )
}

export default EventsPage