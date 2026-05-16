import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react'
import api from '../../../services/api'

function StatsSection() {
  const { t } = useTranslation();
  const [stats, setStats] = useState([
    { value: '...', label: 'Active Members' },
    { value: '...', label: 'Annual Events' },
    { value: '15+', label: 'Skill Workshops' },
    { value: '2k+', label: 'Participants' },
  ])

  useEffect(() => {
    api.get('/api/admin/dashboard/stats')
      .then(res => {
        const { totalMembers, totalEvents } = res.data
        setStats([
          { value: `${totalMembers}+`, label: 'Active Members' },
          { value: `${totalEvents}+`, label: 'Annual Events' },
          { value: '15+', label: 'Skill Workshops' },
          { value: '2k+', label: 'Participants' },
        ])
      })
      .catch(() => {
        setStats([
          { value: '500+', label: 'Active Members' },
          { value: '25+', label: 'Annual Events' },
          { value: '15+', label: 'Skill Workshops' },
          { value: '2k+', label: 'Participants' },
        ])
      })
  }, [])

  return (
    <section className="bg-slate-900 py-12 text-white">
      <div className="container-custom grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
        {stats.map((stat, index) => {
          const translatedStats = t("stats.items", { returnObjects: true }) || [];
          const translatedLabel = translatedStats[index]?.label || stat.label;
          return (
          <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
            <span className="text-4xl font-black text-primary">{stat.value}</span>
            <p className="text-sm font-medium uppercase tracking-widest text-slate-400">
              {translatedLabel}
            </p>
          </div>
        )})}
      </div>
    </section>
  )
}

export default StatsSection