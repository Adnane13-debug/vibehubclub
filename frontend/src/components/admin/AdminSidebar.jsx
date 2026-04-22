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

/**
 * Fixed left sidebar with navigation tabs, "Create Event" CTA, and logout.
 */
function AdminSidebar({ activeTab, setActiveTab, onCreateEvent, onLogout }) {
  return (
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
        onClick={onCreateEvent}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-hover py-3 text-sm font-semibold text-slate-900 shadow-lg transition-transform hover:scale-[1.02]"
      >
        <span className="material-symbols-outlined text-[20px]">add</span>
        Create Event
      </button>
      <div className="mt-auto border-t border-slate-200 pt-4">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-slate-500 transition-colors hover:bg-slate-200/50"
        >
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
