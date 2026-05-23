import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "../../auth/AuthContext";
import api from "../../services/api";

import AdminSidebar from "./AdminSidebar";
import OverviewTab from "./OverviewTab";
import AnalyticsTab from "./AnalyticsTab";
import MembersTab from "./MembersTab";
import EventsTab from "./EventsTab";
import CreateEventModal from "./CreateEventModal";
import AdminProfileSettings from "./AdminProfileSettings";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function categoryClass(category) {
  if (category === "sport") return "bg-emerald-100 text-emerald-800";
  if (category === "culture") return "bg-rose-100 text-rose-800";
  return "bg-amber-100 text-amber-900";
}

function formatEvent(e) {
  const statusMap = {
    publie:     { status: "Published",  statusTone: "emerald" },
    brouillon:  { status: "Draft",      statusTone: "primary" },
    archive:    { status: "Archive",    statusTone: "slate"   },
    en_attente: { status: "En attente", statusTone: "sky"     },
  };
  const s = statusMap[e.statut] || statusMap.brouillon;
  return {
    id: e.id,
    dateLabel: new Date(e.date_debut)
      .toLocaleDateString("fr-FR", { day: "numeric", month: "short" })
      .toUpperCase(),
    title: e.titre,
    subtitle: `${e.lieu}`,
    category: e.categorie,
    categoryClass: categoryClass(e.categorie),
    status: s.status,
    statusTone: s.statusTone,
    raw: e,
  };
}

function formatMember(m) {
  return {
    id: m.id,
    name: `${m.prenom} ${m.nom}`,
    role: m.role,
    tier: m.statut === "actif" ? "Active" : "Inactive",
    tierClass:
      m.statut === "actif"
        ? "bg-emerald-100 text-emerald-800"
        : "bg-red-100 text-red-800",
    avatar:
      m.photo ||
      `https://ui-avatars.com/api/?name=${m.prenom}+${m.nom}&background=F59E0B&color=1E293B&bold=true`,
    statut: m.statut,
  };
}

// ─── Toast component (top-center, slide-down) ────────────────────────────────

function Toast({ message, type, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  }, [onDismiss]);

  const styles = {
    success: { bar: "bg-emerald-500", bg: "bg-white border-emerald-200", icon: "check_circle", iconColor: "text-emerald-500", text: "text-slate-800" },
    error:   { bar: "bg-red-500",     bg: "bg-white border-red-200",     icon: "error",        iconColor: "text-red-500",     text: "text-slate-800" },
    info:    { bar: "bg-sky-500",     bg: "bg-white border-sky-200",     icon: "info",         iconColor: "text-sky-500",    text: "text-slate-800" },
    warning: { bar: "bg-amber-400",   bg: "bg-white border-amber-200",   icon: "warning",      iconColor: "text-amber-500",  text: "text-slate-800" },
  };
  const s = styles[type] || styles.info;

  return (
    <div
      className={`relative flex items-center gap-3 rounded-2xl border px-5 py-3.5 shadow-xl backdrop-blur-sm min-w-[280px] max-w-[420px] ${s.bg}`}
      style={{ animation: "slideDown .4s cubic-bezier(.16,1,.3,1)" }}
    >
      {/* coloured left bar */}
      <span className={`absolute left-0 top-3 bottom-3 w-1 rounded-full ${s.bar}`} />
      <span className={`material-symbols-outlined text-[22px] ml-2 ${s.iconColor}`}>
        {s.icon}
      </span>
      <span className={`text-sm font-semibold flex-1 ${s.text}`}>{message}</span>
      <button
        onClick={onDismiss}
        className="ml-1 opacity-40 hover:opacity-80 transition-opacity"
      >
        <span className="material-symbols-outlined text-[18px] text-slate-500">close</span>
      </button>
    </div>
  );
}

// ─── Confirm dialog ───────────────────────────────────────────────────────────

function ConfirmDialog({ open, title, message, confirmLabel = "Confirm", danger = true, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      style={{ animation: "fadeIn .2s ease" }}
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      {/* card */}
      <div
        className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl"
        style={{ animation: "scaleIn .25s cubic-bezier(.16,1,.3,1)" }}
      >
        {/* icon */}
        <div className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full ${
          danger ? "bg-red-100" : "bg-amber-100"
        }`}>
          <span className={`material-symbols-outlined text-3xl ${
            danger ? "text-red-500" : "text-amber-500"
          }`}>
            {danger ? "delete_forever" : "warning"}
          </span>
        </div>
        <h3 className="text-center font-heading text-lg font-extrabold text-slate-900">{title}</h3>
        <p className="mt-2 text-center text-sm text-slate-500 leading-relaxed">{message}</p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[.98] ${
              danger ? "bg-red-500 hover:bg-red-600" : "bg-amber-500 hover:bg-amber-600"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Loading skeleton ────────────────────────────────────────────────────────

function DashboardSkeleton() {
  const pulse = "animate-pulse rounded-xl bg-slate-200/60";
  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-background-light">
      {/* Sidebar skeleton */}
      <aside className="fixed bottom-0 left-0 top-[4.5rem] z-40 hidden w-64 flex-col gap-2 border-r border-slate-200 bg-slate-50 p-4 md:flex">
        <div className="mb-4 px-4 py-6">
          <div className={`${pulse} mb-2 h-5 w-32`} />
          <div className={`${pulse} h-3 w-24`} />
        </div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`${pulse} h-11 w-full`} />
          ))}
        </div>
        <div className={`${pulse} mt-auto h-12 w-full`} />
      </aside>

      {/* Main content skeleton */}
      <main className="flex-1 pb-8 md:ml-64">
        {/* Top bar skeleton */}
        <div className="sticky top-[4.5rem] z-30 border-b border-slate-200/60 bg-white/80 px-6 py-4 backdrop-blur-xl lg:px-8">
          <div className="mx-auto flex max-w-screen-2xl items-center justify-between">
            <div>
              <div className={`${pulse} mb-2 h-4 w-48`} />
              <div className={`${pulse} h-3 w-32`} />
            </div>
            <div className="flex items-center gap-3">
              <div className={`${pulse} h-10 w-10 rounded-full`} />
              <div className={`${pulse} h-10 w-10 rounded-full`} />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-screen-2xl px-6 py-8 lg:px-8">
          {/* Stats skeleton */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`${pulse} h-32 w-full`} />
            ))}
          </div>
          {/* Content skeleton */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div className={`${pulse} h-64 w-full`} />
              <div className={`${pulse} h-48 w-full`} />
            </div>
            <div className="space-y-6">
              <div className={`${pulse} h-40 w-full`} />
              <div className={`${pulse} h-40 w-full`} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Top header bar ──────────────────────────────────────────────────────────

const TAB_TITLES = {
  overview: { title: "Overview", subtitle: "Dashboard summary & quick actions" },
  analytics: { title: "Analytics", subtitle: "Engagement and growth metrics" },
  members: { title: "Members", subtitle: "Manage community & requests" },
  events: { title: "Events", subtitle: "Create and manage events" },
  profile: { title: "Profile", subtitle: "Your account settings" },
};

const FAKE_NOTIFICATIONS = [
  { id: "n1", icon: "person_add", iconBg: "bg-emerald-100 text-emerald-600", title: "New member joined", desc: "Sarah Jenkins just signed up and is awaiting approval.", time: "2 min ago", read: false },
  { id: "n2", icon: "event_available", iconBg: "bg-sky-100 text-sky-600", title: "Event RSVP milestone", desc: "\"Summer Rooftop Gala\" hit 50 confirmed attendees.", time: "18 min ago", read: false },
  { id: "n3", icon: "campaign", iconBg: "bg-amber-100 text-amber-700", title: "Announcement published", desc: "Your latest announcement was sent to 124 members.", time: "1 hour ago", read: false },
  { id: "n4", icon: "warning", iconBg: "bg-red-100 text-red-500", title: "System alert", desc: "Storage usage has reached 85% of the allocated quota.", time: "3 hours ago", read: true },
  { id: "n5", icon: "trending_up", iconBg: "bg-violet-100 text-violet-600", title: "Weekly report ready", desc: "Club analytics for this week are now available.", time: "5 hours ago", read: true },
  { id: "n6", icon: "group", iconBg: "bg-primary/15 text-primary", title: "Role change request", desc: "Marcus Thorne requested an upgrade to Curator role.", time: "1 day ago", read: true },
];

function AdminTopBar({ activeTab, user, unreadCount, onRefresh, refreshing }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [fakeNotifs, setFakeNotifs] = useState(FAKE_NOTIFICATIONS);
  const notifRef = useRef(null);

  const tabInfo = TAB_TITLES[activeTab] || TAB_TITLES.overview;
  const now = new Date();
  const greeting =
    now.getHours() < 12 ? "Good morning" : now.getHours() < 18 ? "Good afternoon" : "Good evening";

  const fakeUnread = fakeNotifs.filter((n) => !n.read).length;

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    }
    if (notifOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifOpen]);

  const markOneRead = (id) => {
    setFakeNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setFakeNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="sticky top-[4.5rem] z-30 border-b border-slate-200/60 bg-white/80 px-6 py-4 backdrop-blur-xl lg:px-8">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold tracking-tight text-slate-900">
            {tabInfo.title}
          </h1>
          <p className="text-sm text-slate-500">
            {greeting}, <span className="font-semibold text-slate-700">{user?.prenom || user?.name || "Admin"}</span> · {tabInfo.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Refresh button */}
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50"
            title="Refresh data"
          >
            <span
              className={`material-symbols-outlined text-[20px] ${refreshing ? "animate-spin" : ""}`}
            >
              refresh
            </span>
          </button>

          {/* Notifications bell + dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen((prev) => !prev)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                notifOpen
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
            {fakeUnread > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm pointer-events-none">
                {fakeUnread > 9 ? "9+" : fakeUnread}
              </span>
            )}

            {/* ── Notification dropdown ── */}
            {notifOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-[380px] overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl"
                style={{ animation: "slideUp .25s cubic-bezier(.16,1,.3,1)" }}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading text-sm font-bold text-slate-900">Notifications</h3>
                    {fakeUnread > 0 && (
                      <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                        {fakeUnread}
                      </span>
                    )}
                  </div>
                  {fakeUnread > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                {/* Notification list */}
                <div className="max-h-[400px] overflow-y-auto divide-y divide-slate-50">
                  {fakeNotifs.map((n) => (
                    <div
                      key={n.id}
                      className={`flex gap-3 px-5 py-4 transition-colors cursor-pointer hover:bg-slate-50 ${
                        !n.read ? "bg-primary/[0.03]" : ""
                      }`}
                      onClick={() => markOneRead(n.id)}
                    >
                      <div
                        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${n.iconBg}`}
                      >
                        <span className="material-symbols-outlined text-[18px]">{n.icon}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={`text-sm leading-snug ${
                              !n.read ? "font-semibold text-slate-900" : "font-medium text-slate-700"
                            }`}
                          >
                            {n.title}
                          </p>
                          {!n.read && (
                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-slate-500 line-clamp-2">{n.desc}</p>
                        <p className="mt-1 text-[10px] font-medium text-slate-400">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-slate-100 px-5 py-3 text-center">
                  <button className="text-xs font-semibold text-primary hover:underline">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User avatar */}
          <div className="ml-1 flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-1.5 transition-colors hover:bg-slate-100">
            <img
              src={
                user?.photo ||
                `https://ui-avatars.com/api/?name=${user?.prenom || "A"}+${user?.nom || "D"}&background=F59E0B&color=1E293B&bold=true&size=80`
              }
              alt=""
              className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm"
            />
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-slate-800 leading-tight">
                {user?.prenom || user?.name || "Admin"}
              </p>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                {user?.role || "Administrateur"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main orchestrator ───────────────────────────────────────────────────────

function AdminDashboard() {
  const { logout, user } = useAuth();

  // Navigation
  const [activeTab, setActiveTab] = useState("overview");

  // Profile Edit state
  const [userData, setUserData] = useState(user || {});

  // Create Event Modal
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);

  // Real data from API
  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalEvents: 0,
    totalParticipations: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Announcements
  const [announcements, setAnnouncements] = useState([]);
  const [annSubject, setAnnSubject] = useState("");
  const [annBody, setAnnBody] = useState("");

  // Notifications
  const [notifications, setNotifications] = useState([]);

  // Test results
  const [testResults, setTestResults] = useState([]);

  // Edit event state
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ title: "", subtitle: "", category: "sport" });

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Confirm dialog
  const [confirm, setConfirm] = useState({ open: false, title: "", message: "", confirmLabel: "Confirm", danger: true, onConfirm: null });

  const openConfirm = useCallback(({ title, message, confirmLabel = "Confirm", danger = true, onConfirm }) => {
    setConfirm({ open: true, title, message, confirmLabel, danger, onConfirm });
  }, []);

  const closeConfirm = useCallback(() => {
    setConfirm((prev) => ({ ...prev, open: false, onConfirm: null }));
  }, []);

  // ── Fetch all data ──
  const fetchData = useCallback(
    async (isRefresh = false) => {
      if (isRefresh) setRefreshing(true);
      try {
        const [statsRes, eventsRes, membersRes, annRes, notifRes, testRes] =
          await Promise.all([
            api.get("/api/admin/dashboard/stats"),
            api.get("/api/admin/events"),
            api.get("/api/admin/members"),
            api.get("/api/admin/announcements"),
            api.get("/api/admin/notifications"),
            api.get("/api/admin/tests/results"),
          ]);

        setStats(statsRes.data);
        setEvents(eventsRes.data.map(formatEvent));
        setMembers(membersRes.data.map(formatMember));
        setAnnouncements(
          annRes.data.map((a) => ({ id: a.id, subject: a.titre, body: a.contenu }))
        );
        setNotifications(notifRes.data);
        setTestResults(testRes.data);
        setError(null);

        if (isRefresh) showToast("Dashboard data refreshed");
      } catch (err) {
        console.error(err);
        setError("Unable to load dashboard data");
        if (isRefresh) showToast("Failed to refresh data", "error");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [showToast]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ── Stats cards (reactive) ──
  const statsCards = useMemo(
    () => [
      {
        label: "Total Members",
        value: String(stats.totalMembers),
        delta: "membres",
        icon: "group",
      },
      {
        label: "Total Events",
        value: String(stats.totalEvents),
        delta: "événements",
        icon: "calendar_month",
      },
      {
        label: "Participations",
        value: String(stats.totalParticipations),
        delta: "inscriptions",
        icon: "bolt",
      },
    ],
    [stats]
  );

  // ── Event handlers ──
  const startEdit = useCallback((ev) => {
    setEditingId(ev.id);
    setDraft({ title: ev.title, subtitle: ev.subtitle, category: ev.category });
  }, []);

  const saveEdit = useCallback(async () => {
    if (!editingId) return;
    try {
      const target = events.find((e) => e.id === editingId);
      await api.put(`/api/admin/events/${editingId}`, {
        titre: draft.title,
        lieu: draft.subtitle,
        categorie: draft.category,
        description: target?.raw?.description || "",
        date_debut: target?.raw?.date_debut || new Date(),
      });
      setEvents((prev) =>
        prev.map((e) =>
          e.id === editingId
            ? {
                ...e,
                title: draft.title,
                subtitle: draft.subtitle,
                category: draft.category,
                categoryClass: categoryClass(draft.category),
              }
            : e
        )
      );
      setEditingId(null);
      showToast("Event updated successfully");
    } catch (err) {
      console.error(err);
      showToast("Failed to update event", "error");
    }
  }, [editingId, draft, events, showToast]);

  const handleSaveNewEvent = useCallback(
    async (newDraft) => {
      try {
        const res = await api.post("/api/admin/events", {
          titre: newDraft.title,
          description: newDraft.description || newDraft.subtitle || "Description",
          date_debut: newDraft.date || new Date(),
          lieu: newDraft.lieu || newDraft.subtitle || "CMC OFPPT",
          categorie: newDraft.category?.toLowerCase() || "sport",
        });
        // Fetch the full event from the DB so `raw` is properly hydrated
        // (includes statut, id, created_at, etc.)
        const fullRes = await api.get(`/api/admin/events`);
        const createdRaw = fullRes.data.find((e) => e.id === res.data.id);
        if (createdRaw) {
          setEvents((prev) => [formatEvent(createdRaw), ...prev]);
        } else {
          // Fallback: construct a minimal formatted event
          setEvents((prev) => [
            {
              id: res.data.id,
              dateLabel: new Date(newDraft.date)
                .toLocaleDateString("fr-FR", { day: "numeric", month: "short" })
                .toUpperCase(),
              title: newDraft.title,
              subtitle: newDraft.lieu || newDraft.subtitle || "",
              category: newDraft.category?.toLowerCase() || "sport",
              categoryClass: categoryClass(newDraft.category?.toLowerCase() || "sport"),
              status: "En attente",
              statusTone: "sky",
              raw: {
                id: res.data.id,
                titre: newDraft.title,
                lieu: newDraft.lieu || newDraft.subtitle || "",
                categorie: newDraft.category?.toLowerCase() || "sport",
                date_debut: newDraft.date || new Date(),
                statut: "en_attente",
              },
            },
            ...prev,
          ]);
        }
        setIsCreateEventOpen(false);
        showToast("Event created successfully");
      } catch (err) {
        console.error(err);
        showToast("Failed to create event", "error");
      }
    },
    [showToast]
  );

  const deleteEvent = useCallback(
    (id) => {
      const ev = events.find((e) => e.id === id);
      openConfirm({
        title: "Delete Event",
        message: `Are you sure you want to permanently delete "${ev?.title || "this event"}"? This action cannot be undone.`,
        confirmLabel: "Delete Event",
        danger: true,
        onConfirm: async () => {
          closeConfirm();
          try {
            await api.delete(`/api/admin/events/${id}`);
            setEvents((prev) => prev.filter((e) => e.id !== id));
            if (editingId === id) setEditingId(null);
            showToast("Event deleted successfully");
          } catch (err) {
            console.error(err);
            showToast("Failed to delete event", "error");
          }
        },
      });
    },
    [events, editingId, openConfirm, closeConfirm, showToast]
  );

  const toggleEventStatus = useCallback(
    async (id, newStatus) => {
      // newStatus is the value selected in the dropdown: 'publie' | 'brouillon' | 'archive'
      const allowed = ['publie', 'brouillon', 'archive', 'en_attente'];
      if (!allowed.includes(newStatus)) return;
      const statusMap = {
        publie:     { status: "Published",  statusTone: "emerald" },
        brouillon:  { status: "Draft",      statusTone: "primary" },
        archive:    { status: "Archive",    statusTone: "slate"   },
        en_attente: { status: "En attente", statusTone: "sky"     },
      };
      const labelMap = {
        publie:     "published",
        brouillon:  "set to draft",
        archive:    "archived",
        en_attente: "set to En attente",
      };
      try {
        await api.patch(`/api/admin/events/${id}/status`, { statut: newStatus });
        setEvents((prev) =>
          prev.map((e) =>
            e.id === id
              ? {
                  ...e,
                  status: statusMap[newStatus].status,
                  statusTone: statusMap[newStatus].statusTone,
                  raw: { ...e.raw, statut: newStatus },
                }
              : e
          )
        );
        showToast(`Event ${labelMap[newStatus]}`);
      } catch (err) {
        console.error(err);
        showToast("Failed to update event status", "error");
      }
    },
    [showToast]
  );

  // ── Member handlers ──
  const updateMemberStatus = useCallback(
    (id, newStatus) => {
      const member = members.find((m) => m.id === id);
      const isSuspend = newStatus === "suspendu" || newStatus === "Suspended";
      if (isSuspend) {
        openConfirm({
          title: "Suspend Member",
          message: `Suspend "${member?.name || "this member"}"? They will lose access until reactivated.`,
          confirmLabel: "Suspend",
          danger: true,
          onConfirm: async () => {
            closeConfirm();
            try {
              await api.patch(`/api/admin/members/${id}/status`, { statut: newStatus });
              setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, statut: newStatus } : m)));
              showToast(`${member?.name || "Member"} suspended`);
            } catch (err) {
              console.error(err);
              showToast("Failed to update member status", "error");
            }
          },
        });
      } else {
        // Non-destructive — apply directly
        api.patch(`/api/admin/members/${id}/status`, { statut: newStatus })
          .then(() => {
            setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, statut: newStatus } : m)));
            showToast("Member status updated");
          })
          .catch((err) => {
            console.error(err);
            showToast("Failed to update member status", "error");
          });
      }
    },
    [members, openConfirm, closeConfirm, showToast]
  );

  const removeMember = useCallback(
    (id) => {
      const member = members.find((m) => m.id === id);
      openConfirm({
        title: "Remove Member",
        message: `Remove "${member?.name || "this member"}" from the club? This cannot be undone.`,
        confirmLabel: "Remove Member",
        danger: true,
        onConfirm: () => {
          closeConfirm();
          setMembers((prev) => prev.filter((m) => m.id !== id));
          showToast(`${member?.name || "Member"} removed`);
        },
      });
    },
    [members, openConfirm, closeConfirm, showToast]
  );

  const updateMemberRole = useCallback(
    (id, newRole) =>
      setMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, role: newRole } : m))
      ),
    []
  );

  const acceptMemberRequest = useCallback(
    (newMemberObj) => setMembers((prev) => [newMemberObj, ...prev]),
    []
  );

  const notifyInactiveMembers = useCallback(async () => {
    try {
      await api.post("/api/admin/notifications/inactive-members");
      showToast("Notifications sent to inactive members");
    } catch (err) {
      console.error(err);
      showToast("Failed to send notifications", "error");
    }
  }, [showToast]);

  // ── Announcement handlers ──
  const postAnnouncement = useCallback(
    async (e) => {
      e.preventDefault();
      if (!annSubject.trim() && !annBody.trim()) return;
      try {
        const res = await api.post("/api/admin/announcements", {
          titre: annSubject,
          contenu: annBody,
        });
        setAnnouncements((prev) => [
          { id: res.data.id, subject: annSubject, body: annBody },
          ...prev,
        ]);
        setAnnSubject("");
        setAnnBody("");
        showToast("Announcement posted");
      } catch (err) {
        console.error(err);
        showToast("Failed to post announcement", "error");
      }
    },
    [annSubject, annBody, showToast]
  );

  const editAnnouncement = useCallback(
    async (id, subject, body) => {
      try {
        await api.put(`/api/admin/announcements/${id}`, {
          titre: subject,
          contenu: body,
        });
        setAnnouncements((prev) =>
          prev.map((a) => (a.id === id ? { ...a, subject, body } : a))
        );
        showToast("Announcement updated");
      } catch (err) {
        console.error(err);
        showToast("Failed to update announcement", "error");
      }
    },
    [showToast]
  );

  const deleteAnnouncement = useCallback(
    async (id) => {
      try {
        await api.delete(`/api/admin/announcements/${id}`);
        setAnnouncements((prev) => prev.filter((a) => a.id !== id));
        showToast("Announcement deleted");
      } catch (err) {
        console.error(err);
        showToast("Failed to delete announcement", "error");
      }
    },
    [showToast]
  );

  // ── Shared props bundles ──
  const announcementProps = {
    annSubject,
    setAnnSubject,
    annBody,
    setAnnBody,
    onPost: postAnnouncement,
    announcements,
    onEdit: editAnnouncement,
    onDelete: deleteAnnouncement,
  };

  const eventsTableProps = {
    events,
    editingId,
    draft,
    setDraft,
    onStartEdit: startEdit,
    onSaveEdit: saveEdit,
    onCancelEdit: () => setEditingId(null),
    onDeleteEvent: deleteEvent,
    onToggleStatus: toggleEventStatus,
  };

  const unreadNotifications = notifications.filter((n) => !n.lu).length;

  // ── Loading state ──
  if (loading) return <DashboardSkeleton />;

  // ── Error state ──
  if (error && events.length === 0 && members.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-background-light">
        <div className="card-soft mx-auto max-w-md rounded-2xl p-12 text-center shadow-lg">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <span className="material-symbols-outlined text-3xl text-red-500">cloud_off</span>
          </div>
          <h2 className="font-heading text-xl font-bold text-slate-900">Connection Error</h2>
          <p className="mt-2 text-sm text-slate-500">{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              fetchData();
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-slate-900 shadow-sm transition-transform hover:scale-[1.02]"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-background-light">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCreateEvent={() => {
          setActiveTab("events");
          setIsCreateEventOpen(true);
        }}
        onLogout={logout}
      />

      <main className="flex-1 md:ml-64">
        {/* ── Top bar ── */}
        <AdminTopBar
          activeTab={activeTab}
          user={user}
          unreadCount={unreadNotifications}
          onRefresh={() => fetchData(true)}
          refreshing={refreshing}
        />

        {/* ── Tab content ── */}
        <div className="mx-auto max-w-screen-2xl px-6 py-8 lg:px-8">
          {activeTab === "overview" && (
            <OverviewTab
              stats={statsCards}
              members={members}
              onManageAllMembers={() => setActiveTab("members")}
              onViewAllEvents={() => setActiveTab("events")}
              {...eventsTableProps}
              {...announcementProps}
            />
          )}

          {activeTab === "analytics" && <AnalyticsTab stats={statsCards} />}

          {activeTab === "members" && (
            <>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div />
                <button
                  onClick={notifyInactiveMembers}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200"
                >
                  <span className="material-symbols-outlined text-[18px]">campaign</span>
                  Notify inactive members
                </button>
              </div>
              <MembersTab
                members={members}
                onUpdateRole={updateMemberRole}
                onUpdateStatus={updateMemberStatus}
                onRemoveMember={removeMember}
                onAcceptRequest={acceptMemberRequest}
              />
            </>
          )}

          {activeTab === "events" && (
            <EventsTab
              onAddEvent={() => setIsCreateEventOpen(true)}
              onImportDone={() => fetchData(true)}
              showToast={showToast}
              {...eventsTableProps}
              {...announcementProps}
            />
          )}

          {activeTab === "profile" && (
            <AdminProfileSettings
              user={userData}
              onSave={(updatedData) => {
                setUserData((prev) => ({ ...prev, ...updatedData }));
                setActiveTab("overview");
                showToast("Profile updated successfully");
              }}
              onCancel={() => setActiveTab("overview")}
            />
          )}
        </div>
      </main>

      {/* ── Modals ── */}
      <CreateEventModal
        isOpen={isCreateEventOpen}
        onClose={() => setIsCreateEventOpen(false)}
        onSave={handleSaveNewEvent}
      />

      {/* ── Top-center toast stack ── */}
      {toasts.length > 0 && (
        <div className="fixed top-[5.5rem] left-1/2 z-[9999] flex -translate-x-1/2 flex-col items-center gap-2 pointer-events-none">
          {toasts.map((t) => (
            <div key={t.id} className="pointer-events-auto">
              <Toast
                message={t.message}
                type={t.type}
                onDismiss={() => dismissToast(t.id)}
              />
            </div>
          ))}
        </div>
      )}

      {/* ── Confirm dialog ── */}
      <ConfirmDialog
        open={confirm.open}
        title={confirm.title}
        message={confirm.message}
        confirmLabel={confirm.confirmLabel}
        danger={confirm.danger}
        onConfirm={confirm.onConfirm}
        onCancel={closeConfirm}
      />

      {/* Animations */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px) scale(.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(.92); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default AdminDashboard;