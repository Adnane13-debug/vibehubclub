import { useTranslation } from "react-i18next";
function AboutDomainsSection() {
  const { t } = useTranslation();
  
  const DOMAINS = [
    {
      title: t("aboutDomains.sports.title"),
      tag: t("aboutDomains.sports.tag"),
      icon: "sports_basketball",
      description: t("aboutDomains.sports.description"),
      backgroundImage:
        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBEWbJoQpMxb8R1v2BAkUzi6y6W7SW3fjwd62fKyGqV3Pqbbo8VHccR-RvGAMThIdO1dBwTVF3D3G3p4jCVNK0wylvXSSUD44uDRBBazgkzUI0zlEXQfrWZEzkbqRfpLgLt7SZ7dXod7eKc8m7B15ANXBcpODwsSZssYSwBRWsjKurxS2VQ3k1jbYoxE4TYU4q1krDXjPlnR6AqZIxeVH_GAxD0hPM0uwaO8jcVaCW_JJWmQd-ig0leuKzTyU7JZO4q3AgCuYgVPKKe')",
      // taller card — anchors the grid
      heightClass: "h-[26rem] md:h-[28rem]",
    },
    {
      title: t("aboutDomains.culture.title"),
      tag: t("aboutDomains.culture.tag"),
      icon: "theater_comedy",
      description: t("aboutDomains.culture.description"),
      backgroundImage:
        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuASRmQ0GbrZ5a5cNY-_Qm3Q3F2m2nOBkZRpKXGbRnbxRUFc_pvGiV8gYNUup_7Yk9DjzLOkmVZaW3vPeqJhoSZe3lgmPUXSheTclMaCph4GK4bFsMP7gHTXEVd7FIhI1xY5roxJmgEplLSN4-xb4BlBLhff7aJaPBGcwlb1myVuWEYddKpZuzqkcOD8WkANQQr20N7GqSpGpwbsp9eYryyond13DPIRErzfHvqi7zK6qCBZzbZmmgPuhkKxIFJdUBnFZZmYdAmAWV2P')",
      // shorter — adds rhythm
      heightClass: "h-[22rem] md:h-[24rem]",
    },
    {
      title: t("aboutDomains.entrepreneurship.title"),
      tag: t("aboutDomains.entrepreneurship.tag"),
      icon: "lightbulb",
      description: t("aboutDomains.entrepreneurship.description"),
      backgroundImage:
        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAw68JeaUA5BCPKPy4-9enTOvG4IYUJEq_6cdrf0PJKLPrLVIsF6_hv2QtLXqr1TUQNEUA2M524NO6QjQP_0XxEzaWdBrg5Rg58eag8niG1YgUArYN8tXjcSEjgyjtHiJmc7AP1R4neIUSvwUaaI9BCKmR0KXzOhmJHgc4ZDB1r2ngjPPTvLIwKmMq5iVdwrlTqq7D2tq0I-zNYA7EQKdGkiB1brHkcIP1Qi9uIFe5X4coesQBx26webxVNiXCI_KTHWrfrjp045-aQ')",
      // same as first — creates symmetry on the ends
      heightClass: "h-[26rem] md:h-[28rem]",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">

      {/* Section header — left-aligned for less SaaS feel */}
      <div className="mb-14 max-w-xl">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary/70">
          {t("aboutDomains.eyebrow")}
        </span>
        <h2 className="mb-3 text-3xl font-bold leading-snug tracking-tight">
          {t("aboutDomains.title")}
        </h2>
        <p className="text-base leading-relaxed text-slate-500 dark:text-slate-400">
          {t("aboutDomains.subtitle")}
        </p>
      </div>

      {/* Card grid — slight bottom-alignment rhythm */}
      <div className="grid items-end gap-5 md:grid-cols-3">
        {DOMAINS.map((domain) => (
          <div
            key={domain.title}
            className={`group relative ${domain.heightClass} cursor-default overflow-hidden rounded-2xl`}
          >
            {/* Background image — subtle parallax-feel on hover */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.04]"
              style={{ backgroundImage: domain.backgroundImage }}
              aria-hidden
            />

            {/* Refined overlay: warm bottom-to-top fade, not pure black */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
            />
            {/* Warm color tint — very subtle */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-60"
            />

            {/* Content — slides up on hover */}
            <div className="absolute inset-x-0 bottom-0 p-7 transition-transform duration-500 ease-out group-hover:-translate-y-1">

              {/* Tag chip */}
              <span className="mb-3 inline-block rounded-full bg-white/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/70 backdrop-blur-[2px]">
                {domain.tag}
              </span>

              {/* Title row with icon */}
              <div className="mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[1.2rem] text-primary">
                  {domain.icon}
                </span>
                <h3 className="text-xl font-bold text-white">{domain.title}</h3>
              </div>

              {/* Description — fades in on hover */}
              <p className="max-w-xs text-sm leading-relaxed text-white/75 opacity-0 transition-opacity duration-300 delay-75 group-hover:opacity-100">
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