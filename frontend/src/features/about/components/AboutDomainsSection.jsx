const DOMAINS = [
  {
    title: "Sports",
    icon: "sports_basketball",
    description:
      "Promoting health, teamwork, and competitive spirit through internal leagues and tournaments.",
    backgroundImage:
      "linear-gradient(to top, rgba(0,0,0,0.8), transparent), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBEWbJoQpMxb8R1v2BAkUzi6y6W7SW3fjwd62fKyGqV3Pqbbo8VHccR-RvGAMThIdO1dBwTVF3D3G3p4jCVNK0wylvXSSUD44uDRBBazgkzUI0zlEXQfrWZEzkbqRfpLgLt7SZ7dXod7eKc8m7B15ANXBcpODwsSZssYSwBRWsjKurxS2VQ3k1jbYoxE4TYU4q1krDXjPlnR6AqZIxeVH_GAxD0hPM0uwaO8jcVaCW_JJWmQd-ig0leuKzTyU7JZO4q3AgCuYgVPKKe')",
  },
  {
    title: "Culture",
    icon: "theater_comedy",
    description:
      "Celebrating diversity through arts, music festivals, and traditional heritage events.",
    backgroundImage:
      "linear-gradient(to top, rgba(0,0,0,0.8), transparent), url('https://lh3.googleusercontent.com/aida-public/AB6AXuASRmQ0GbrZ5a5cNY-_Qm3Q3F2m2nOBkZRpKXGbRnbxRUFc_pvGiV8gYNUup_7Yk9DjzLOkmVZaW3vPeqJhoSZe3lgmPUXSheTclMaCph4GK4bFsMP7gHTXEVd7FIhI1xY5roxJmgEplLSN4-xb4BlBLhff7aJaPBGcwlb1myVuWEYddKpZuzqkcOD8WkANQQr20N7GqSpGpwbsp9eYryyond13DPIRErzfHvqi7zK6qCBZzbZmmgPuhkKxIFJdUBnFZZmYdAmAWV2P')",
  },
  {
    title: "Entrepreneurship",
    icon: "lightbulb",
    description:
      "Fostering innovation with startup workshops, mentorship, and investment networking.",
    backgroundImage:
      "linear-gradient(to top, rgba(0,0,0,0.8), transparent), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAw68JeaUA5BCPKPy4-9enTOvG4IYUJEq_6cdrf0PJKLPrLVIsF6_hv2QtLXqr1TUQNEUA2M524NO6QjQP_0XxEzaWdBrg5Rg58eag8niG1YgUArYN8tXjcSEjgyjtHiJmc7AP1R4neIUSvwUaaI9BCKmR0KXzOhmJHgc4ZDB1r2ngjPPTvLIwKmMq5iVdwrlTqq7D2tq0I-zNYA7EQKdGkiB1brHkcIP1Qi9uIFe5X4coesQBx26webxVNiXCI_KTHWrfrjp045-aQ')",
  },
];

function AboutDomainsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold">Our Domains of Activity</h2>
        <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400">
          We focus our efforts on three core pillars that we believe are
          essential for a well-rounded student experience.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {DOMAINS.map((domain) => (
          <div
            key={domain.title}
            className="group relative h-96 cursor-default overflow-hidden rounded-2xl"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: domain.backgroundImage }}
              aria-hidden
            />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="material-symbols-outlined mb-2 text-primary">
                {domain.icon}
              </span>
              <h3 className="mb-2 text-2xl font-bold text-white">
                {domain.title}
              </h3>
              <p className="text-sm text-slate-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {domain.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AboutDomainsSection;
