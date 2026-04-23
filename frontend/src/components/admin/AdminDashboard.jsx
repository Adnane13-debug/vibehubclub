import { useMemo, useState } from "react";
import { useAuth } from "../../auth/AuthContext";

import AdminSidebar from "./AdminSidebar";
import OverviewTab from "./OverviewTab";
import AnalyticsTab from "./AnalyticsTab";
import MembersTab from "./MembersTab";
import EventsTab from "./EventsTab";
import CreateEventModal from "./CreateEventModal";
import VisitorProfileEdit from "../profile/VisitorProfileEdit";

// ─── seed data ───────────────────────────────────────────────────────────────

const initialEvents = [
  {
    id: "e1",
    dateLabel: "22 JUL",
    title: "Summer Rooftop Gala",
    subtitle: "18:00 • Sky Lounge",
    category: "Culture",
    categoryClass: "bg-rose-100 text-rose-800",
    status: "Confirmed",
    statusTone: "emerald",
  },
  {
    id: "e2",
    dateLabel: "15 AUG",
    title: "Tech Founders Mixer",
    subtitle: "10:00 • Innovation Hub",
    category: "Entrepreneurship",
    categoryClass: "bg-amber-100 text-amber-900",
    status: "Drafting",
    statusTone: "primary",
  },
  {
    id: "e3",
    dateLabel: "02 SEP",
    title: "Art & Vibes Workshop",
    subtitle: "14:00 • Creative Loft",
    category: "Culture",
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

// ─── helpers ─────────────────────────────────────────────────────────────────

function categoryClass(category) {
  if (category === "Sports") return "bg-emerald-100 text-emerald-800";
  if (category === "Culture") return "bg-rose-100 text-rose-800";
  return "bg-amber-100 text-amber-900";
}

// ─── orchestrator ─────────────────────────────────────────────────────────────

/**
 * AdminDashboard – thin orchestrator. All UI lives in tab/sidebar sub-components.
 */
function AdminDashboard() {
  const { logout, user } = useAuth();

  // Navigation
  const [activeTab, setActiveTab] = useState("overview");

  // Profile Edit state
  const [userData, setUserData] = useState(user || {});

  // Create Event Modal state
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);

  // Events state
  const [events, setEvents] = useState(initialEvents);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ title: "", subtitle: "", category: "Sports" });

  // Members state
  const [members, setMembers] = useState(initialMembers);
  const [memberName, setMemberName] = useState("");
  const [memberRole, setMemberRole] = useState("Member");

  // Announcements state
  const [announcements, setAnnouncements] = useState([]);
  const [annSubject, setAnnSubject] = useState("");
  const [annBody, setAnnBody] = useState("");

  // ── stats (reactive to events count) ──
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
    [events.length],
  );

  // ── event handlers ──
  const startEdit = (ev) => {
    setEditingId(ev.id);
    setDraft({ title: ev.title, subtitle: ev.subtitle, category: ev.category });
  };

  const saveEdit = () => {
    if (!editingId) return;
    setEvents((prev) =>
      prev.map((e) =>
        e.id === editingId
          ? { ...e, ...draft, categoryClass: categoryClass(draft.category) }
          : e,
      ),
    );
    setEditingId(null);
  };

  const handleOpenCreateEvent = () => setIsCreateEventOpen(true);
  const handleCloseCreateEvent = () => setIsCreateEventOpen(false);

  const handleSaveNewEvent = (newDraft) => {
    const id = `e${Date.now()}`;
    const dateLabel = newDraft.date 
      ? new Date(newDraft.date).toLocaleDateString("en-US", { day: "numeric", month: "short" }).toUpperCase()
      : "NEW";
    const newEv = {
      id,
      dateLabel,
      title: newDraft.title,
      subtitle: newDraft.subtitle,
      category: newDraft.category,
      categoryClass: categoryClass(newDraft.category),
      status: "Confirmed",
      statusTone: "emerald",
    };
    setEvents((prev) => [...prev, newEv]);
    setIsCreateEventOpen(false);
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const acceptMemberRequest = (newMemberObj) => {
    setMembers((prev) => [newMemberObj, ...prev]);
  };

  const removeMember = (id) =>
    setMembers((prev) => prev.filter((m) => m.id !== id));

  const updateMemberRole = (id, newRole) => {
    setMembers((prev) => prev.map((m) => m.id === id ? { ...m, role: newRole } : m));
  };

  const updateMemberStatus = (id, newStatus) => {
    setMembers((prev) => prev.map((m) => m.id === id ? { ...m, status: newStatus } : m));
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

  // ── shared announcement props ──
  const announcementProps = {
    annSubject,
    setAnnSubject,
    annBody,
    setAnnBody,
    onPost: postAnnouncement,
    announcements,
  };

  // ── shared events table props ──
  const eventsTableProps = {
    events,
    editingId,
    draft,
    setDraft,
    onStartEdit: startEdit,
    onSaveEdit: saveEdit,
    onCancelEdit: () => setEditingId(null),
    onDeleteEvent: deleteEvent,
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-background-light">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCreateEvent={() => { setActiveTab("events"); handleOpenCreateEvent(); }}
        onLogout={logout}
      />

      <main className="flex-1 pb-8 md:ml-64">
        <div className="mx-auto max-w-screen-2xl px-6 py-8 lg:px-8">
          {activeTab === "overview" && (
            <OverviewTab
              stats={stats}
              members={members}
              onManageAllMembers={() => setActiveTab("members")}
              onViewAllEvents={() => setActiveTab("events")}
              {...eventsTableProps}
              {...announcementProps}
            />
          )}
          {activeTab === "analytics" && <AnalyticsTab stats={stats} />}
          {activeTab === "members" && (
            <MembersTab
              members={members}
              onUpdateRole={updateMemberRole}
              onUpdateStatus={updateMemberStatus}
              onRemoveMember={removeMember}
              onAcceptRequest={acceptMemberRequest}
            />
          )}
          {activeTab === "events" && (
            <EventsTab
              onAddEvent={handleOpenCreateEvent}
              {...eventsTableProps}
              {...announcementProps}
            />
          )}
          {activeTab === "profile" && (
            <VisitorProfileEdit 
              user={userData} 
              onSave={(updatedData) => {
                setUserData(prev => ({ ...prev, ...updatedData }));
                setActiveTab("overview");
              }} 
              onCancel={() => setActiveTab("overview")} 
            />
          )}
        </div>
      </main>

      <CreateEventModal 
        isOpen={isCreateEventOpen} 
        onClose={handleCloseCreateEvent} 
        onSave={handleSaveNewEvent} 
      />
    </div>
  );
}

export default AdminDashboard;
