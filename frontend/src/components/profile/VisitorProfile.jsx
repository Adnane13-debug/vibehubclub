import { Link } from "react-router-dom";

/**
 * Visitor UI adapted from `ui ux/ui/visitor.html` using project tokens (primary, card-soft, font-heading).
 */
function VisitorProfile({ user }) {
  const displayName = user?.name ?? "Guest";
  const email = user?.email ?? "—";
  const joined = user?.joinedAt ?? "—";
  const bio =
    user?.bio ??
    "Explore the club and upgrade when you are ready to unlock the full experience.";
  const interests = user?.interests ?? [];
  const avatar =
    user?.avatarUrl ??
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAhympUU7yJ0UXIaO_ZWPeAleXI5I85h-3Xz6xnWB8Zd3VyhUJDSEq4y-j6nvk2ycBufoBluGLqOrlrpENLOd5xt2vlc5TJ0w2NBHxtQobN5ERyJvt1vZqXlF2dvXZeMewaFhdzApQ5njfa2sxuJ3msuMBuwddeSuKW62GXUdJ-zafIjX7u5OnyEP4ojUkGXOAwfKgZYCWdcqZb-wVpOlk5Topjvy97ga5ndS_KOS3qbroXprePsk44VJA-4clzNqmo6V_Qn9fGXpw";

  return (
    <div className="pb-16 pt-8">
      <section className="relative mb-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-end">
          <div className="group relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-primary/40 to-amber-200/40 opacity-40 blur transition duration-500 group-hover:opacity-60" />
            <div className="relative h-40 w-40 overflow-hidden rounded-3xl border-4 border-white bg-slate-100 shadow-xl md:h-48 md:w-48">
              <img alt="" className="h-full w-full object-cover" src={avatar} />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <span className="mb-3 inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-800">
              Visitor Curator
            </span>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              {displayName}
            </h1>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-slate-600">
              {bio}
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="card-soft md:col-span-7 rounded-3xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-lg">
          <h3 className="mb-6 flex items-center gap-2 font-heading text-xl font-bold text-slate-900">
            <span className="material-symbols-outlined text-primary">fingerprint</span>
            Curator Profile
          </h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-primary">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
                  Email Address
                </p>
                <p className="font-medium text-slate-900">{email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-primary">
                <span className="material-symbols-outlined">calendar_today</span>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
                  Joined Date
                </p>
                <p className="font-medium text-slate-900">{joined}</p>
              </div>
            </div>
            {interests.length > 0 && (
              <div className="pt-2">
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-slate-500">
                  Interests
                </p>
                <div className="flex flex-wrap gap-2">
                  {interests.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/15 px-4 py-1.5 text-sm font-medium text-slate-900"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-primary to-primary-hover p-8 text-slate-900 shadow-[0_20px_40px_rgba(245,159,10,0.25)] md:col-span-5">
          <div>
            <h3 className="font-heading text-2xl font-extrabold leading-tight">
              Elevate your curator journey.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-900/80">
              Unlock exclusive digital assets, private curator channels, and
              early access to the VibeHub ecosystem.
            </p>
          </div>
          <Link
            to="/register"
            className="btn-primary mt-8 w-full justify-center rounded-full py-4 shadow-xl"
          >
            Join the Club
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>

        <div className="card-soft md:col-span-12 rounded-3xl border-2 border-dashed border-slate-200/80 p-12 text-center">
          <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-primary/40">
            <span className="material-symbols-outlined text-[40px]">
              auto_awesome
            </span>
          </div>
          <h3 className="font-heading text-2xl font-bold text-slate-900">
            No activities yet
          </h3>
          <p className="mb-8 text-slate-600">
            Your curations and club interactions will appear here once you start
            exploring the hub.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/events"
              className="rounded-full bg-slate-100 px-6 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200"
            >
              Explore Hub
            </Link>
            <Link
              to="/about"
              className="rounded-full bg-slate-100 px-6 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitorProfile;
