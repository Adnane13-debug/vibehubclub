const activities = [
  {
    icon: "sports_basketball",
    title: "Sports & Fitness",
    desc: "From competitive leagues to casual weekend matches, we promote physical excellence and teamwork.",
  },
  {
    icon: "theater_comedy",
    title: "Arts & Culture",
    desc: "Celebrating diversity through music, dance, theater, and fine arts. Express your creative soul.",
  },
  {
    icon: "rocket_launch",
    title: "Entrepreneurship",
    desc: "Incubating ideas and fostering leadership. Build your startup with the support of a like-minded community.",
  },
];

function ActivitySection() {
  return (
    <section className="bg-orange-50 px-6 py-24 lg:px-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16 text-center">
          <h2 className="section-title">Our Focus Areas</h2>
          <p className="section-subtitle">
            Find your tribe and explore your interests
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {activities.map((item) => (
            <div key={item.title} className="card-soft group p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-3xl">
                  {item.icon}
                </span>
              </div>
              <h3 className="heading-font mb-4 text-2xl">{item.title}</h3>
              <p className="mb-6 leading-relaxed text-muted">{item.desc}</p>
              <button className="text-sm font-bold transition-colors hover:text-[var(--color-primary)]">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ActivitySection;