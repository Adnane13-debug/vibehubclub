import { useTranslation } from "react-i18next";
function AboutHeroSection() {
  const { t } = useTranslation();
  return (
    <section className="relative flex h-[60vh] items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(29,26,21,0.6), rgba(29,26,21,0.9)), url('/club_vertical_new.png')",
        }}
        aria-hidden
      />
      <div className="relative z-10 max-w-4xl px-4 text-center">
        <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-primary">
          {t("aboutHero.badge")}
        </span>
        <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-6xl">
          {t("aboutHero.title")}
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-200 md:text-xl">
          {t("aboutHero.subtitle")}
        </p>
      </div>
    </section>
  );
}

export default AboutHeroSection;
