import { useTranslation } from "react-i18next";
const defaultTeam = [
  {
    name: "Sarah Chen",
    role: "President & Founder",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBcaTRwtWKKfJ4vAd7Lz2qe5uMTqGzgUuB8dzACiNx-iH7trspTRqLFP8e9GjtMLubEvH6imYbY2BsGan8kfMI8tKDl-v-ANLpQJIGA_FQ9xX1Stgt6W18c6mHFLsFZ3XfZ6uzJLVoOJSzmr0po95i3knuGgqWlt5RyXPKIYQPtsz7VvNJywzyZMW_2iI7v_Iv5r_XFffEtiyR9jM2c_iJi4A-iXGqgxsPXxZSqXLlmUlKPgyZX8ZobBF0SfRZ7hC_4KswZBTaDeaEn",
  },
  {
    name: "Marcus Johnson",
    role: "Head of Entrepreneurship",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5-OSyw9e0FHcdWJgrlB9ASCNEgT1AUdR_qv5ttU5IXgYf9D20BShz8UhmTSa4QMaUonoVT-7zadN-AnZ27S8MLBaYDvbOC40saRIft8I1T2yggOot_rxEB5-M5za6jl46S08vqsv9HM_LvRuVRQlCde82-ilxjeUKPd498qVdJ7OuJ1uOruSkbpwPSUqGPUykuO2yIsfOeViPwllackcx-z9yb5tQZ73SXs9XpBP8LJn15igpaDSLAj0aaJ5QzFZEhR68GoB8fGCR",
  },
  {   
    name: "Elena Rodriguez",
    role: "Culture Director",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBZzinmvPzhif7tp42xjGq1aVgdhLCkz149gqpOOOLYH31qFLZGfJ7rEI3dnwgSiCOvDd9xJN0REpFZ5gD1hA8w2MPBnQwioeg6n3Q1h8ogCTuPQtOpi_k5_JpzY_ruLOtLxBZ0d6OttQtrJWM9nAby6AKWbGnsoP1Gnj6KnDH69IAiQpu7ByMG510DdCEFFCnEepilYVMpOMFwxfUYt2inyWtK5Hq_t3Uf_NJU4Xsa0hb5sasWf26BwVRKqSDvv8gsYLqv6Rd8qEO1",
  },
  {
    name: "David Park",
    role: "Sports Coordinator",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDE7i3vxc1qMQK1R3HdNH7ouZ2SkEaxZeV35h2L8_FCLQ_u9Ll1m4AxawFvI_9NeSkJa_Om894NtR76bxXRru0WmdL4BKdYS9Io0k0rvJIlshNwYhmR_d-lo4WkH6TJl4vIJvjuH7M6zB5xr7ESEg1mDR6wmbOf-DF1CG5Wi4gM3pd2UCIVYv3BO4DHkLzbHXoOk_P-y15n8XQi9ilDYemY8_RopXlJvDUetasfzDFPs4CdOSgI_gziv0b-MskUN9qyrxdCv66fxijl",
  },
];

function AboutTeamSection() {
  const { t } = useTranslation();
  return (
    <section className="border-t border-primary/10 bg-background-light px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div className="max-w-xl">
            <h2 className="mb-4 text-3xl font-bold">{t("aboutTeam.title")}</h2>
            <p className="text-slate-600">
              {t("aboutTeam.subtitle")}
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 font-bold text-primary hover:underline"
          >
            {t("aboutTeam.viewAll")}{" "}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
  {(() => {
    const team =
      t("aboutTeam.members", { returnObjects: true }) || defaultTeam;

    const validTeam =
      Array.isArray(team) && team[0]?.name
        ? team.map((member, i) => ({
            ...member,
            image: defaultTeam[i]?.image,
          }))
        : defaultTeam;

    return validTeam.map((member) => (
      <div key={member.name} className="group">
        <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-2xl bg-primary/20">
          <img
            alt={member.name}
            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
            src={member.image}
          />

          <div className="absolute bottom-4 right-4 flex translate-y-12 flex-col gap-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              className="rounded-full bg-white p-2 text-background-dark shadow-lg transition-colors hover:bg-primary"
            >
              <span className="material-symbols-outlined text-sm">
                link
              </span>
            </button>
          </div>
        </div>

        <h4 className="text-lg font-bold">{member.name}</h4>
        <p className="text-sm font-medium text-primary">{member.role}</p>
      </div>
    ));
  })()}
</div>
      </div>
    </section>
  );
}

export default AboutTeamSection;
