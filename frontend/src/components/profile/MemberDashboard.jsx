import { Link } from "react-router-dom";
import MemberHeader from "./MemberHeader";
import MemberStatsPanel from "./MemberStatsPanel";
import UpcomingEventCard from "./UpcomingEventCard";
import PastExperienceList from "./PastExperienceList";

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
 * MemberDashboard - Refactored orchestrator component.
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
      <MemberHeader 
        first={first} 
        tier={tier} 
        xp={xp} 
        xpGoal={xpGoal} 
        pct={pct} 
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <MemberStatsPanel 
          attended={attended} 
          tests={tests} 
          mbti={mbti} 
          mbtiBlurb={mbtiBlurb} 
        />

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
                <UpcomingEventCard key={ev.id} event={ev} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-6 font-heading text-2xl font-bold text-slate-900">
              Recent Experiences
            </h2>
            <PastExperienceList pastEvents={PAST} avatar={avatar} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;
