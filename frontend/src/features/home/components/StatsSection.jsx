function StatsSection() {
  const stats = [
    { value: "500+", label: "Active Members" },
    { value: "25+", label: "Annual Events" },
    { value: "15+", label: "Skill Workshops" },
    { value: "2k+", label: "Participants" },
  ];

  return (
    <section className="bg-slate-900 py-12 text-white">
      <div className="container-custom grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
            <span className="text-4xl font-black text-primary">{stat.value}</span>
            <p className="text-sm font-medium uppercase tracking-widest text-slate-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsSection;