function AboutHeroSection() {
  return (
    <section className="relative flex h-[60vh] items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(29,26,21,0.6), rgba(29,26,21,0.9)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuD6aCAha_uadKs-Q0yowY7n7N2Mj7Ha_awieZY6NCveQ0ABFfdBqKupyYOrP9dN5fy1-JRxXfgbS2ThoAvYl9qYKmmAtGMcsx4E0ayJNLYDqq4kYFLs63OOXfdtNZpQ984ISI4pl4l6miPY9YNNMD-4_j-hTXMot8trwH4snzcYZ_vphSGhV1JqEv2S5CkFUdposIK39F80Oi9BO1_yFiMpc2cKZaSDOj8zrCoEGr_fA2gpFJxD7L2N9doRBJGEd-Pb7kvY0DKmSNDS')",
        }}
        aria-hidden
      />
      <div className="relative z-10 max-w-4xl px-4 text-center">
        <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-primary">
          Est. 2021
        </span>
        <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-6xl">
          Beyond the Lecture Hall
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-200 md:text-xl">
          VibeHub is more than a club; it&apos;s a launchpad for the next
          generation of athletes, artists, and innovators.
        </p>
      </div>
    </section>
  );
}

export default AboutHeroSection;
