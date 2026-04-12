import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const initialEvents = [
  {
    id: "e1",
    dateLabel: "22 JUL",
    title: "Summer Rooftop Gala",
    subtitle: "18:00 • Sky Lounge",
    category: "Social",
    categoryClass: "bg-sky-100 text-sky-800",
    status: "Confirmed",
    statusTone: "emerald",
  },
  {
    id: "e2",
    dateLabel: "15 AUG",
    title: "Tech Founders Mixer",
    subtitle: "10:00 • Innovation Hub",
    category: "Networking",
    categoryClass: "bg-amber-100 text-amber-900",
    status: "Drafting",
    statusTone: "primary",
  },
  {
    id: "e3",
    dateLabel: "02 SEP",
    title: "Art & Vibes Workshop",
    subtitle: "14:00 • Creative Loft",
    category: "Workshop",
    categoryClass: "bg-rose-100 text-rose-800",
    status: "Confirmed",
    statusTone: "emerald",
  },
];

const initialMembers = [
  {
    id: "m1",
    name: "Alex Rivera",
    role: "Curator",
    tier: "Elite",
    tierClass: "bg-primary/15 text-primary",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAseRUwLXfqJBmQA3yYlNVM6wM05OQj08P9pSymYDXXEHhPK8a9TjEH4v-0r1wLUHY3UgMS0OvnfemPViJgNw5J00IMe6gxFmvuzspi86d6v3XMh5tbjdUGRpurnEteCKdYE-jWQgLGxuvMTSLXtrWHzM6fcS5j5IcxCHeRAbcfiPlFBHCP0u--yupWhrzpWb8WrGr14ttHoSrHQwk9WQvFL8zriX8YbU9hTKXbJZCEecr8nQOcAaFkfYtbkl68ur_bL2F9ycU5GgE",
  },
  {
    id: "m2",
    name: "Marcus Thorne",
    role: "Member",
    tier: "Standard",
    tierClass: "bg-slate-100 text-slate-600",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC6iv7qux9O7LgpKQpz9LuzsdZ0mbi461U5nCmghMxD2WQ41o4yBzWxyY7CH1M21sQBPyN2SWhwtxyN8BxNyojaQofXxUwPhR64swI0E-6XrI1h-ibzm3Th5mFxVqAMnRDtVk1Ef40hqKd24gLleywQDdnKveg_aDCJmNmANpueiRr-GcefF4DuAVGCaGH1eVvYLyy5L2yxggcQOnuWMrbqNnHgdA2pBv9aq5fYMvHRtqn1VrCU5pPfT9ty5SmrenGeX50TLFE0pKI",
  },
  {
    id: "m3",
    name: "Elena Kostic",
    role: "VIP Host",
    tier: "Premium",
    tierClass: "bg-sky-100 text-sky-900",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhzIAG0NLmcJ8z32GqVX4Gu1CehOjtm0boDRVso5PGhfE1pC8wGMzw5nYvnzbGd4J8WZAWxwmgTZvnRnFaPr0GfVsQqUQPz2r_apzSJ1nJqDm-gmAWaUPV3ThvHAnOc62LfX8VFloJwbDoUkaLvsGv_sO9Q-jptUB0ReoFeFAkB2-sT_oG_VFfiYKfGYPc74qjQrHVHKmTWhJTbb4k2IYnBpA1rx5NODFWWRpRgpERIegFAi2lB_l1gnPnpg-tgcci2r8Ceex-hGQ",
  },
];

const DEFAULT_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAseRUwLXfqJBmQA3yYlNVM6wM05OQj08P9pSymYDXXEHhPK8a9TjEH4v-0r1wLUHY3UgMS0OvnfemPViJgNw5J00IMe6gxFmvuzspi86d6v3XMh5tbjdUGRpurnEteCKdYE-jWQgLGxuvMTSLXtrWHzM6fcS5j5IcxCHeRAbcfiPlFBHCP0u--yupWhrzpWb8WrGr14ttHoSrHQwk9WQvFL8zriX8YbU9hTKXbJZCEecr8nQOcAaFkfYtbkl68ur_bL2F9ycU5GgE";

const SIDEBAR_TABS = [
  { id: "overview", label: "Overview", icon: "dashboard" },
  { id: "analytics", label: "Analytics", icon: "monitoring" },
  { id: "members", label: "Members", icon: "group" },
  { id: "events", label: "Events", icon: "calendar_today" },
];

function sidebarBtnClass(active) {
  return [
    "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors",
    active
      ? "bg-white font-medium text-primary shadow-sm"
      : "text-slate-500 hover:bg-slate-200/50",
  ].join(" ");
}

function AdminDashboard() {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [events, setEvents] = useState(initialEvents);
  const [members, setMembers] = useState(initialMembers);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({
    title: "",
    subtitle: "",
    category: "Social",
  });
  const [memberName, setMemberName] = useState("");
  const [memberRole, setMemberRole] = useState("Member");
  const [announcements, setAnnouncements] = useState([]);
  const [annSubject, setAnnSubject] = useState("");
  const [annBody, setAnnBody] = useState("");

  const stats = useMemo(
    () => [
      { label: "Total Members", value: "12,482", delta: "+12%", icon: "group" },
      { label: "Active Users", value: "8,921", delta: "+5.2%", icon: "bolt" },
      {
        label: "Monthly Events",
        value: String(24 + events.length - initialEvents.length),
        delta: "This Month",
        icon: "calendar_month",
      },
      { label: "Revenue", value: "$42.5k", delta: "+8%", icon: "monetization_on" },
    ],
    [events.length]
  );

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const startEdit = (ev) => {
    setEditingId(ev.id);
    setDraft({
      title: ev.title,
      subtitle: ev.subtitle,
      category: ev.category,
    });
  };

  const saveEdit = () => {
    if (!editingId) return;
    setEvents((prev) =>
      prev.map((e) =>
        e.id === editingId
          ? {
              ...e,
              title: draft.title,
              subtitle: draft.subtitle,
              category: draft.category,
              categoryClass:
                draft.category === "Social"
                  ? "bg-sky-100 text-sky-800"
                  : draft.category === "Networking"
                    ? "bg-amber-100 text-amber-900"
                    : "bg-rose-100 text-rose-800",
            }
          : e
      )
    );
    setEditingId(null);
  };

  const addEvent = () => {
    const id = `e${Date.now()}`;
    const newEv = {
      id,
      dateLabel: "NEW",
      title: "New Event",
      subtitle: "TBD • TBD",
      category: "Social",
      categoryClass: "bg-sky-100 text-sky-800",
      status: "Drafting",
      statusTone: "primary",
    };
    setEvents((prev) => [...prev, newEv]);
    startEdit(newEv);
  };

  const addMember = (e) => {
    e.preventDefault();
    if (!memberName.trim()) return;
    setMembers((prev) => [
      ...prev,
      {
        id: `m${Date.now()}`,
        name: memberName.trim(),
        role: memberRole,
        tier: "Standard",
        tierClass: "bg-slate-100 text-slate-600",
        avatar: user?.avatarUrl || DEFAULT_AVATAR,
      },
    ]);
    setMemberName("");
  };

  const removeMember = (id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const postAnnouncement = (e) => {
    e.preventDefault();
    if (!annSubject.trim() && !annBody.trim()) return;
    setAnnouncements((prev) => [
      { id: `a${Date.now()}`, subject: annSubject, body: annBody },
      ...prev,
    ]);
    setAnnSubject("");
    setAnnBody("");
  };

  const eventsTable = (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            <th className="pb-4 pr-4">Event Details</th>
            <th className="px-4 pb-4">Category</th>
            <th className="px-4 pb-4">Status</th>
            <th className="pb-4 pl-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {events.map((ev) => (
            <tr key={ev.id} className="group transition-colors hover:bg-slate-50">
              <td className="py-4 pr-4">
                {editingId === ev.id ? (
                  <div className="space-y-2">
                    <input
                      className="w-full rounded-lg border border-slate-200 px-2 py-1 text-sm"
                      value={draft.title}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, title: e.target.value }))
                      }
                    />
                    <input
                      className="w-full rounded-lg border border-slate-200 px-2 py-1 text-xs"
                      value={draft.subtitle}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, subtitle: e.target.value }))
                      }
                    />
                    <select
                      className="w-full rounded-lg border border-slate-200 px-2 py-1 text-xs"
                      value={draft.category}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, category: e.target.value }))
                      }
                    >
                      <option>Social</option>
                      <option>Networking</option>
                      <option>Workshop</option>
                    </select>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="btn-primary px-3 py-1 text-xs"
                        onClick={saveEdit}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn-secondary px-3 py-1 text-xs"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                      {ev.dateLabel}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{ev.title}</p>
                      <p className="text-xs text-slate-500">{ev.subtitle}</p>
                    </div>
                  </div>
                )}
              </td>
              <td className="px-4 py-4 align-top">
                <span
                  className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${ev.categoryClass}`}
                >
                  {ev.category}
                </span>
              </td>
              <td className="px-4 py-4 align-top">
                <div
                  className={`flex items-center gap-1.5 ${ev.statusTone === "emerald" ? "text-emerald-600" : "text-primary"}`}
                >
                  <div
                    className={`h-1.5 w-1.5 rounded-full ${ev.statusTone === "emerald" ? "bg-emerald-500" : "animate-pulse bg-primary"}`}
                  />
                  <span className="text-xs font-medium">{ev.status}</span>
                </div>
              </td>
              <td className="py-4 pl-4 text-right align-top opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-primary"
                  aria-label="Edit"
                  onClick={() => startEdit(ev)}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    edit
                  </span>
                </button>
                <button
                  type="button"
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-red-600"
                  aria-label="Delete"
                  onClick={() => deleteEvent(ev.id)}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    delete
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const statsSection = (
    <section>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="card-soft flex flex-col gap-4 rounded-xl border border-slate-200/80 p-6 shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <span className="material-symbols-outlined">{s.icon}</span>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                {s.delta}
                {s.delta.startsWith("+") && (
                  <span className="material-symbols-outlined text-xs">
                    trending_up
                  </span>
                )}
              </span>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-slate-500">{s.label}</p>
              <h3 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900">
                {s.value}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const announcementBlock = (
    <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-6 shadow-md md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-white p-2 text-primary shadow-sm">
          <span className="material-symbols-outlined">campaign</span>
        </div>
        <h2 className="font-heading text-xl font-extrabold tracking-tight">
          Post Announcement
        </h2>
      </div>
      <form className="space-y-4" onSubmit={postAnnouncement}>
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">
            Subject
          </label>
          <input
            className="w-full rounded-lg border-none bg-white p-3 text-sm ring-2 ring-transparent focus:ring-primary/30"
            placeholder="Important platform update..."
            value={annSubject}
            onChange={(e) => setAnnSubject(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">
            Message Content
          </label>
          <textarea
            className="w-full rounded-lg border-none bg-white p-3 text-sm ring-2 ring-transparent focus:ring-primary/30"
            placeholder="Type your message to all members..."
            rows={3}
            value={annBody}
            onChange={(e) => setAnnBody(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-4">
            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" className="rounded border-slate-200" />
              <span className="text-xs text-slate-500">Send Email</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" className="rounded border-slate-200" />
              <span className="text-xs text-slate-500">Push Notification</span>
            </label>
          </div>
          <button
            type="submit"
            className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-slate-900 transition-transform hover:scale-105"
          >
            Broadcast
          </button>
        </div>
      </form>
      {announcements.length > 0 && (
        <ul className="mt-6 space-y-2 border-t border-slate-200 pt-4 text-sm">
          {announcements.map((a) => (
            <li key={a.id} className="rounded-lg bg-white p-3 shadow-sm">
              <p className="font-semibold">{a.subject || "(no subject)"}</p>
              <p className="text-slate-600">{a.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const activityAside = (
    <div className="card-soft rounded-xl border border-slate-200/80 p-6 shadow-md">
      <h3 className="mb-6 font-heading text-sm font-extrabold tracking-tight">
        Recent Activity
      </h3>
      <div className="relative space-y-6 before:absolute before:bottom-2 before:left-[11px] before:top-2 before:w-px before:bg-slate-100">
        <div className="relative flex gap-4">
          <div className="z-10 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-white">
            <span className="material-symbols-outlined text-[12px] text-white">
              person_add
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold">New member joined</p>
            <p className="text-[11px] text-slate-400">Sarah Jenkins joined the club</p>
          </div>
        </div>
        <div className="relative flex gap-4">
          <div className="z-10 flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 ring-4 ring-white">
            <span className="material-symbols-outlined text-[12px] text-white">
              payments
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold">Payment received</p>
            <p className="text-[11px] text-slate-400">
              Annual subscription for Pro Plan
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const membersCompactList = (
    <div className="card-soft rounded-xl border border-slate-200/80 p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-heading text-sm font-extrabold">Active Members</h3>
        <span className="material-symbols-outlined text-[18px] text-slate-400">
          search
        </span>
      </div>
      <div className="space-y-4">
        {members.slice(0, 4).map((m) => (
          <div key={m.id} className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-3">
              <img
                alt=""
                className="h-9 w-9 shrink-0 rounded-full object-cover"
                src={m.avatar || DEFAULT_AVATAR}
              />
              <div className="min-w-0">
                <p className="truncate text-xs font-bold">{m.name}</p>
                <p className="text-[10px] text-slate-400">{m.role}</p>
              </div>
            </div>
            <span
              className={`shrink-0 rounded px-2 py-0.5 text-[9px] font-black uppercase ${m.tierClass}`}
            >
              {m.tier}
            </span>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-6 w-full rounded-lg py-2.5 text-[11px] font-bold text-slate-400 transition-all hover:bg-slate-50 hover:text-primary"
        onClick={() => setActiveTab("members")}
      >
        Manage all members
      </button>
    </div>
  );

  const adminFooter = (
    <footer className="mt-10 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo vibe hub.svg"
            alt=""
            className="h-8 w-auto opacity-90"
          />
          <div>
            <p className="text-sm font-semibold text-slate-900">VibeHub Club</p>
            <p className="text-xs text-slate-500">Admin console · © 2024</p>
          </div>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            to="/"
            className="text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors hover:text-primary"
          >
            Public site
          </Link>
          <Link
            to="/contact"
            className="text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors hover:text-primary"
          >
            Support
          </Link>
          <Link
            to="/events"
            className="text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors hover:text-primary"
          >
            Events
          </Link>
        </nav>
      </div>
    </footer>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-black text-slate-900">
          Analytics
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Engagement and growth snapshots (demo data).
        </p>
      </div>
      {statsSection}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card-soft rounded-xl border border-slate-200/80 p-6 shadow-md">
          <h3 className="mb-4 font-heading text-lg font-bold">Traffic</h3>
          <div className="flex h-40 items-end gap-2">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md bg-primary/80 transition-all hover:bg-primary"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500">Last 7 days · page views</p>
        </div>
        <div className="card-soft rounded-xl border border-slate-200/80 p-6 shadow-md">
          <h3 className="mb-4 font-heading text-lg font-bold">Conversion</h3>
          <div className="space-y-4">
            {[
              ["Visitor → signup", 72],
              ["Signup → member", 54],
              ["Member → event RSVP", 81],
            ].map(([label, pct]) => (
              <div key={label}>
                <div className="mb-1 flex justify-between text-xs font-medium text-slate-600">
                  <span>{label}</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {adminFooter}
    </div>
  );

  const renderMembers = () => (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-black text-slate-900">
            Members
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Search, add, and remove members (local demo).
          </p>
        </div>
        <span className="rounded-full bg-primary/15 px-4 py-1.5 text-xs font-bold text-slate-900">
          {members.length} listed
        </span>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <form
          onSubmit={addMember}
          className="card-soft h-fit space-y-3 rounded-xl border border-slate-200/80 p-6 shadow-md xl:col-span-1"
        >
          <h3 className="font-heading font-bold text-slate-900">Add member</h3>
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="Full name"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
          />
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="Role"
            value={memberRole}
            onChange={(e) => setMemberRole(e.target.value)}
          />
          <button type="submit" className="btn-primary w-full justify-center">
            Add member
          </button>
        </form>

        <div className="card-soft overflow-hidden rounded-xl border border-slate-200/80 shadow-md xl:col-span-2">
          <div className="border-b border-slate-100 px-6 py-4">
            <h3 className="font-heading font-bold text-slate-900">Directory</h3>
          </div>
          <ul className="divide-y divide-slate-100">
            {members.map((m) => (
              <li
                key={m.id}
                className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <img
                    alt=""
                    className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-slate-100"
                    src={m.avatar || DEFAULT_AVATAR}
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900">{m.name}</p>
                    <p className="text-sm text-slate-500">{m.role}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${m.tierClass}`}
                  >
                    {m.tier}
                  </span>
                  <button
                    type="button"
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove member"
                    onClick={() => removeMember(m.id)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      person_remove
                    </span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {adminFooter}
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-black text-slate-900">
            Events
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Create, edit, and remove upcoming events.
          </p>
        </div>
        <button
          type="button"
          onClick={addEvent}
          className="btn-primary gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          New event
        </button>
      </div>
      <div className="card-soft rounded-xl border border-slate-200/80 p-6 shadow-md md:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-heading text-xl font-extrabold tracking-tight">
            Upcoming Events
          </h2>
          <button
            type="button"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Export
          </button>
        </div>
        {eventsTable}
      </div>
      {announcementBlock}
      {adminFooter}
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-8">
      {statsSection}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <section className="space-y-6 lg:col-span-2">
          <div className="card-soft rounded-xl border border-slate-200/80 p-6 shadow-md md:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-heading text-xl font-extrabold tracking-tight">
                Upcoming Events
              </h2>
              <button
                type="button"
                className="text-sm font-semibold text-primary hover:underline"
                onClick={() => setActiveTab("events")}
              >
                View all
              </button>
            </div>
            {eventsTable}
          </div>
          {announcementBlock}
        </section>
        <aside className="space-y-8">
          {activityAside}
          {membersCompactList}
        </aside>
      </div>
      {adminFooter}
    </div>
  );

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-background-light">
      <aside className="fixed bottom-0 left-0 top-[4.5rem] z-40 hidden w-64 flex-col gap-2 overflow-y-auto border-r border-slate-200 bg-slate-50 p-4 md:flex">
        <div className="mb-4 px-4 py-6">
          <h2 className="text-lg font-black leading-tight text-slate-900">
            Admin Console
          </h2>
          <p className="text-xs font-medium text-slate-500">VibeHub Management</p>
        </div>
        <nav className="flex-1 space-y-1">
          {SIDEBAR_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={sidebarBtnClass(activeTab === tab.id)}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="material-symbols-outlined">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => {
            setActiveTab("events");
            addEvent();
          }}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-hover py-3 text-sm font-semibold text-slate-900 shadow-lg transition-transform hover:scale-[1.02]"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Create Event
        </button>
        <div className="mt-auto border-t border-slate-200 pt-4">
          <button
            type="button"
            onClick={() => logout()}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-slate-500 transition-colors hover:bg-slate-200/50"
          >
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 pb-8 md:ml-64">
        <div className="mx-auto max-w-screen-2xl px-6 py-8 lg:px-8">
          {activeTab === "overview" && renderOverview()}
          {activeTab === "analytics" && renderAnalytics()}
          {activeTab === "members" && renderMembers()}
          {activeTab === "events" && renderEvents()}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
