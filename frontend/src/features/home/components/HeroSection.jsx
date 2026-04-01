import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="container-custom section-padding">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/20 px-3 py-1">
            <span className="material-symbols-outlined text-sm">
              auto_awesome
            </span>
            <span className="text-xs font-bold uppercase tracking-wider">
              Join the University Pulse
            </span>
          </div>

          <h1 className="font-heading text-5xl leading-[1.1] text-slate-900 md:text-7xl">
            Connect, Create, &amp; Compete at VibeHub
          </h1>

          <p className="max-w-lg text-lg leading-relaxed text-slate-600">
            The ultimate university hub for Sports, Culture, and
            Entrepreneurship. Join a community that vibes with your passions and
            fuels your ambition.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              to="/events"
              className="flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-slate-900 transition-all hover:shadow-lg"
            >
              Explore Events
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>

            <Link
              to="/register"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-base font-bold transition-all hover:bg-slate-50"
            >
              Join Club
              <span className="material-symbols-outlined">group_add</span>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div
            className="aspect-[4/5] overflow-hidden rounded-2xl bg-primary/10 shadow-2xl"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuASyQpEr7qZGiz-2-ZsHJJZ2DIRY5kmBt9bNWi7WO5OZLQYn1TQL8kTuy8Kcbd1bFAPARinXSqINQOcS7qAm5H4zmwXpPlMGAVmiBetBGNJNSOgggwuLt2-hJDn9WbIhm3nGgwx85rMTsmg2WAsE7aLehOxtcck_odF39SZ8W0HrB75mzz_XHWChiAfUYVyDhRr1MpC-an7chvMBDsEUIxtvGeIEcLGQaqPY4hLe5Sm8jtjvP2xh3nH65qdaYKoVOUw90Ac44ysgZEr')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-primary/20 bg-white p-6 shadow-xl md:block">
            <div className="flex flex-col">
              <span className="text-4xl font-black text-primary">2024</span>
              <span className="text-xs font-bold uppercase tracking-widest opacity-60">
                Membership Open
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;