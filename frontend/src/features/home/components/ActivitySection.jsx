import { useTranslation } from 'react-i18next'
import GlowCard from '../../../components/common/GlowCard'

function ActivitySection() {
  const { t } = useTranslation()
  const activities = t("activity.items", { returnObjects: true }) || []
  const validActivities = Array.isArray(activities) ? activities : []

  return (
    <section className="focus">
      <div className="focus__top">
        <span className="focus__eyebrow">{t("activity.eyebrow")}</span>

        <h2 className="focus__title">
          {t("activity.title1")}
          <br />
          {t("activity.title2")}
        </h2>

        <p className="focus__subtitle">
          {t("activity.subtitle")}
        </p>
      </div>

      <div className="focus__grid">
        {validActivities.map((item, i) => (
          <GlowCard
            key={item.title}
            className={`focus-card ${i === 0 ? "focus-card--featured" : ""}`}
            glowColor={i === 0 ? 'rgba(245,159,10,0.25)' : 'rgba(245,159,10,0.18)'}
          >
            <span className="focus-card__number">{item.num}</span>

            <div className="focus-card__content">
              <span className="focus-card__tag">{item.tag}</span>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>

              <a href="/">
                {t("activity.discoverSpace")}
                <span>↗</span>
              </a>
            </div>
          </GlowCard>
        ))}
      </div>
    </section>
  )
}

export default ActivitySection