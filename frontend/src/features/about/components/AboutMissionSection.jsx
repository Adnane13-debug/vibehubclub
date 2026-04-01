function AboutMissionSection() {
  return (
    <section className="bg-primary/5 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="rounded-2xl border border-primary/20 bg-background-light p-10 shadow-sm dark:bg-background-dark">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <span className="material-symbols-outlined text-background-dark">
                rocket_launch
              </span>
            </div>
            <h3 className="mb-4 text-xl font-bold">Our Mission</h3>
            <p className="text-slate-600 dark:text-slate-400">
              To cultivate a dynamic ecosystem where students explore their
              talents, build meaningful connections, and develop leadership
              skills.
            </p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-background-light p-10 shadow-sm dark:bg-background-dark">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <span className="material-symbols-outlined text-background-dark">
                visibility
              </span>
            </div>
            <h3 className="mb-4 text-xl font-bold">Our Vision</h3>
            <p className="text-slate-600 dark:text-slate-400">
              To be the leading student organization recognized for excellence
              in extracurricular development and community impact.
            </p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-background-light p-10 shadow-sm dark:bg-background-dark">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <span className="material-symbols-outlined text-background-dark">
                star
              </span>
            </div>
            <h3 className="mb-4 text-xl font-bold">Our Values</h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Diversity &amp; Inclusion
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Creative Excellence
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Resilience
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMissionSection;
