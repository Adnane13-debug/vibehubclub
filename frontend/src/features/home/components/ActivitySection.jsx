const activities = [
  {
    num: "01",
    title: "Sports & Fitness",
    tag: "Movement",
    desc: "Competitive leagues, recovery culture, discipline, and a strong team mindset.",
  },
  {
    num: "02",
    title: "Arts & Culture",
    tag: "Expression",
    desc: "Music, visual arts, theater, and creative collaborations across communities.",
  },
  {
    num: "03",
    title: "Entrepreneurship",
    tag: "Innovation",
    desc: "Building startups, leading projects, and connecting ambitious founders.",
  },
]

function ActivitySection() {
  return (
    <section className="focus">
      <div className="focus__top">
        <span className="focus__eyebrow">Explore communities</span>

        <h2 className="focus__title">
          Spaces built around
          <br />
          passion & ambition
        </h2>

        <p className="focus__subtitle">
          Find the environment that matches your energy, creativity,
          and long-term goals.
        </p>
      </div>

      <div className="focus__grid">
        {activities.map((item, i) => (
          <article
            key={item.title}
            className={`focus-card ${i === 0 ? "focus-card--featured" : ""}`}
          >
            <span className="focus-card__number">{item.num}</span>

            <div className="focus-card__content">
              <span className="focus-card__tag">{item.tag}</span>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>

              <a href="/">
                Discover space
                <span>↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ActivitySection