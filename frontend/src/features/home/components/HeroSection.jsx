import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-80 max-w-3xl rounded-full bg-gradient-to-b from-primary/25 via-primary/0 to-transparent blur-3xl" />
      <div className="container-custom section-padding relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div className="section-eyebrow">
            <span className="material-symbols-outlined text-sm">
              auto_awesome
            </span>
            <span className="text-xs font-bold uppercase tracking-wider">
              Join the University Pulse
            </span>
          </div>

          <h1 className="font-heading text-5xl leading-[1.05] text-slate-900 md:text-6xl lg:text-7xl">
            Connect, create &amp; compete at VibeHub
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
            The ultimate university hub for Sports, Culture, and
            Entrepreneurship. Join a community that vibes with your passions and
            fuels your ambition.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              to="/events"
              className="btn-primary px-8 py-3 text-sm md:text-base"
            >
              Explore Events
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>

            <Link
              to="/register"
              className="btn-secondary px-8 py-3 text-sm md:text-base"
            >
              Join Club
              <span className="material-symbols-outlined">group_add</span>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div
            className="card-soft aspect-[4/5] overflow-hidden rounded-3xl bg-primary/10"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuASyQpEr7qZGiz-2-ZsHJJZ2DIRY5kmBt9bNWi7WO5OZLQYn1TQL8kTuy8Kcbd1bFAPARinXSqINQOcS7qAm5H4zmwXpPlMGAVmiBetBGNJNSOgggwuLt2-hJDn9WbIhm3nGgwx85rMTsmg2WAsE7aLehOxtcck_odF39SZ8W0HrB75mzz_XHWChiAfUYVyDhRr1MpC-an7chvMBDsEUIxtvGeIEcLGQaqPY4hLe5Sm8jtjvP2xh3nH65qdaYKoVOUw90Ac44ysgZEr')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-primary/30 bg-white/95 p-5 shadow-xl shadow-slate-900/20 backdrop-blur-sm md:block">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Now accepting
              </span>
              <span className="text-3xl font-black text-primary md:text-4xl">
                2024 Members
              </span>
              <span className="text-xs font-medium text-slate-600">
                Limited spots for multi-domain leaders.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;