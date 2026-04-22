import AdminFooter from "./AdminFooter";

const DEFAULT_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAseRUwLXfqJBmQA3yYlNVM6wM05OQj08P9pSymYDXXEHhPK8a9TjEH4v-0r1wLUHY3UgMS0OvnfemPViJgNw5J00IMe6gxFmvuzspi86d6v3XMh5tbjdUGRpurnEteCKdYE-jWQgLGxuvMTSLXtrWHzM6fcS5j5IcxCHeRAbcfiPlFBHCP0u--yupWhrzpWb8WrGr14ttHoSrHQwk9WQvFL8zriX8YbU9hTKXbJZCEecr8nQOcAaFkfYtbkl68ur_bL2F9ycU5GgE";

/**
 * Members tab – add member form + full directory list.
 */
function MembersTab({
  members,
  memberName,
  setMemberName,
  memberRole,
  setMemberRole,
  onAddMember,
  onRemoveMember,
}) {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-black text-slate-900">Members</h1>
          <p className="mt-1 text-sm text-slate-600">
            Search, add, and remove members (local demo).
          </p>
        </div>
        <span className="rounded-full bg-primary/15 px-4 py-1.5 text-xs font-bold text-slate-900">
          {members.length} listed
        </span>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        {/* Add member form */}
        <form
          onSubmit={onAddMember}
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

        {/* Directory */}
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
                    onClick={() => onRemoveMember(m.id)}
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

      <AdminFooter />
    </div>
  );
}

export default MembersTab;
