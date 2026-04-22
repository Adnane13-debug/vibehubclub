const DEFAULT_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAseRUwLXfqJBmQA3yYlNVM6wM05OQj08P9pSymYDXXEHhPK8a9TjEH4v-0r1wLUHY3UgMS0OvnfemPViJgNw5J00IMe6gxFmvuzspi86d6v3XMh5tbjdUGRpurnEteCKdYE-jWQgLGxuvMTSLXtrWHzM6fcS5j5IcxCHeRAbcfiPlFBHCP0u--yupWhrzpWb8WrGr14ttHoSrHQwk9WQvFL8zriX8YbU9hTKXbJZCEecr8nQOcAaFkfYtbkl68ur_bL2F9ycU5GgE";

/**
 * Compact member list shown in the Overview sidebar.
 * Shows up to 4 members; clicking the footer button switches to the Members tab.
 */
function MembersCompactList({ members, onManageAll }) {
  return (
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
        onClick={onManageAll}
      >
        Manage all members
      </button>
    </div>
  );
}

export default MembersCompactList;
