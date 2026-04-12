import { Link } from "react-router-dom";

const UPCOMING = [
  {
    id: "1",
    title: "Neon Nights Curated",
    day: "14",
    month: "Oct",
    badge: "Confirmed",
    badgeStyle: "text-primary",
    desc: "Join our monthly deep-dive into digital art trends and immersive projection mapping.",
    time: "19:00 - 22:00",
    place: "Studio 5, Downtown",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-inXCbeObZoKnSCRa0wUx9HgpIq0D1rFbY52j8OVIYqREw9JyIWDV7JVg3uvaniT8noIZj5nzt11sCwtozSNRN9sY6cTUkeZ0cpIYHEbAJbtvNSBiW09CWXiTqt3Cmu0kO9RsQj2aEXzizQ8gm8HKYnqnH7BMimhFhJ__mJ9B5bZfgLqWgtC-Bprh8euopAnvUfmT9YjqI4AwH5sSHmxX12j6HZbW3ogQHVD6GFrs_0ruQEYJoX7tFs1OE5Yo8x-siIL71yH_w1k",
  },
  {
    id: "2",
    title: "Rooftop Mindmeld",
    day: "22",
    month: "Oct",
    badge: "Waitlist",
    badgeStyle: "text-sky-700",
    desc: "Collaborative brainstorming sessions overlooking the city skyline. Bring your boldest ideas.",
    time: "18:30 - 21:00",
    place: "Sky Garden",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAx81jiaSuHERhr_U6aGW2O834ZCC7KeOyljfKA9UQ_X-C0vcOqomO4DiC7rl9LaEiPSet6h6ZSPnywarD1jkiWwj0eK7LeqYXG0JJPc3m5ERpf2_wS5FAEItz5iR8zJG-4zvonyYatSI3g5YEKjTU5_qiKVOXzL_dbYMO-yMz2BnRlrGi9FsNbV9H3alQGZ_eJCUW-4KYofl4mO_MIScGQYA0IbUtE3vLj98fBdu7uL3lUYVjE5yod_uLqjnxOLxiHhzRwFSlRMLI",
  },
];

const PAST = [
  {
    id: "p1",
    title: "Creative Brunch Mix",
    meta: "September 28, 2024 • Attended",
    thumb:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCv5OCig23fusElW5choU8Ul30jQM63o2WbblScvOjOXpT0z2gSonPZD1W-N8l9zwfjVAilebaSz-0_QBny5Qqi4toCsgROjwSgo4RgcnzwmVRcjOxBfLafopUJgiQXiGpURgxAJ4LEiUoThywb31uLz45haupLfGnaZcsf-7ZSOEJnfZ7wum509fomwHDH_j5q6rJRqyegQFiHcYxaNMhzx0q-iQ7lFhaESkx_LcHHhBuwLy50Ga_B2PeTCfe8nqJ9JG788dqLro8",
  },
  {
    id: "p2",
    title: "Synthesis Workshop",
    meta: "September 15, 2024 • Attended",
    thumb:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA9ZplDrezClcp_xsOOp2u9zOPva6Yqyavg1k4HBdQDj8ll48X02tzyD8AgubBt71E5EJV-P9AIpxsMN1IGeZqYaUEdqyNj2bPlNpCrAiowvyNZWWAnyuy6iiSRLdid7p-Qxs5DDk0Q6WVwdzvSowi0DiJ3TKbLNkWAVczECxnfF1JpFHUz9h8gGrwXWLbBuxH1iSJdq-oDPJZJkO4D9oSLE3oe0ljTtkS_jhiQoGfLApP8Rgb1-5G7jQyNaZXfuf095jy7EA-7llQ",
  },
];

/**
 * Member UI adapted from `ui ux/ui/member.html`.
 */
function MemberDashboard({ user }) {
  const first = user?.name ?? "Member";
  const mbti = user?.mbti ?? "INTJ";
  const mbtiBlurb =
    user?.mbtiBlurb ??
    "The Architect: Imaginative and strategic thinkers with a plan for everything.";
  const attended = user?.eventsAttended ?? 12;
  const tests = user?.testsTaken ?? 4;
  const xp = user?.xpCurrent ?? 240;
  const xpGoal = user?.xpGoal ?? 500;
  const tier = user?.tier ?? "Silver Tier";
  const pct = Math.min(100, Math.round((xp / xpGoal) * 100));
  const avatar =
    user?.avatarUrl ??
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCnXEFypmfE2zm7XkpmzJuD-Im1sxaSlArAVc69QQ1FEguvOi0Oin6CQThtEqJxxdQE0-eLyYaw26faFpjXFEPfa7MTqTR-2am03zzlZ57SHQ64agFGp7SMN-oIUlNDZ6n4FhHhZpFS0-H8PB6qZMa818KqwvFS6EDbC-WDxWjQe19UI0zOnRPukCnFwUiDUHHi0BQxx1iYwNBgMi_j6gYFTx4RP1j6MkMa3bPOCM-3S6fSIGrtwsld9OXIm13fobnJChus0LcAt6o";

  return (
    <div className="pb-16 pt-4">
      <header className="mb-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="mb-2 font-heading text-4xl font-extrabold tracking-tight text-slate-900">
              Welcome back, {first}
            </h1>
            <p className="max-w-md text-slate-600">
              Your creative energy is at its peak this week. Check your upcoming
              curator meets.
            </p>
          </div>
          <div className="card-soft w-full rounded-xl p-6 shadow-md md:w-80">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-heading text-sm font-bold uppercase tracking-wider text-primary">
                {tier}
              </span>
              <span className="text-xs font-medium text-slate-500">
                {xp} / {xpGoal} XP to Gold
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-amber-600"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="flex flex-col gap-6 md:col-span-3">
          <div className="card-soft flex flex-col items-center justify-center rounded-xl p-8 text-center shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-800">
              <span className="material-symbols-outlined">event_available</span>
            </div>
            <span className="font-heading text-3xl font-bold">{attended}</span>
            <span className="text-sm font-medium text-slate-600">
              Events Attended
            </span>
          </div>
          <div className="card-soft flex flex-col items-center justify-center rounded-xl p-8 text-center shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
              <span className="material-symbols-outlined">quiz</span>
            </div>
            <span className="font-heading text-3xl font-bold">
              {String(tests).padStart(2, "0")}
            </span>
            <span className="text-sm font-medium text-slate-600">
              Tests Taken
            </span>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary-hover p-8 text-slate-900 shadow-lg">
            <div className="relative z-10">
              <h3 className="mb-1 font-heading text-lg font-bold opacity-90">
                Last Result
              </h3>
              <div className="mb-4 font-heading text-5xl font-extrabold tracking-tighter">
                {mbti}
              </div>
              <p className="mb-6 text-xs leading-relaxed opacity-90">
                {mbtiBlurb}
              </p>
              <Link
                to="/events"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-900/20 bg-white/20 py-3 text-sm font-bold backdrop-blur-sm transition-colors hover:bg-white/30"
              >
                Retake Test
                <span className="material-symbols-outlined text-sm">refresh</span>
              </Link>
            </div>
            <div className="pointer-events-none absolute -bottom-4 -right-4 rotate-12 opacity-10 transition-transform group-hover:scale-110">
              <span className="material-symbols-outlined text-9xl">psychology</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:col-span-9">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-2xl font-bold text-slate-900">
                Upcoming Events
              </h2>
              <Link
                to="/events"
                className="flex items-center gap-1 text-sm font-bold text-primary transition-all hover:gap-2"
              >
                View Calendar
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {UPCOMING.map((ev) => (
                <article
                  key={ev.id}
                  className="group card-soft flex flex-col overflow-hidden rounded-xl shadow-md"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={ev.image}
                    />
                    <div className="absolute left-4 top-4">
                      <span
                        className={`rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur ${ev.badgeStyle}`}
                      >
                        {ev.badge}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="font-heading text-xl font-bold transition-colors group-hover:text-primary">
                        {ev.title}
                      </h3>
                      <div className="text-right">
                        <span className="block text-lg font-bold leading-tight text-primary">
                          {ev.day}
                        </span>
                        <span className="block text-xs font-bold uppercase text-slate-500">
                          {ev.month}
                        </span>
                      </div>
                    </div>
                    <p className="mb-4 line-clamp-2 text-sm text-slate-600">
                      {ev.desc}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">
                          schedule
                        </span>
                        {ev.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">
                          location_on
                        </span>
                        {ev.place}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-6 font-heading text-2xl font-bold text-slate-900">
              Recent Experiences
            </h2>
            <div className="card-soft overflow-hidden rounded-xl shadow-md">
              <div className="divide-y divide-slate-100">
                {PAST.map((p) => (
                  <div
                    key={p.id}
                    className="flex cursor-pointer items-center gap-6 p-6 transition-colors hover:bg-slate-50"
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                      <img
                        alt=""
                        className="h-full w-full object-cover"
                        src={p.thumb}
                      />
                    </div>
                    <div className="min-w-0 grow">
                      <h4 className="font-bold text-slate-900">{p.title}</h4>
                      <p className="text-xs text-slate-500">{p.meta}</p>
                    </div>
                    <div className="hidden shrink-0 sm:block">
                      <img
                        alt=""
                        className="h-8 w-8 rounded-full border-2 border-white object-cover ring-2 ring-slate-100"
                        src={avatar}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;
