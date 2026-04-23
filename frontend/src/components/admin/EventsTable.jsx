/**
 * Editable events table with inline editing, category badges, and status dots.
 */
function EventsTable({
  events,
  editingId,
  draft,
  setDraft,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}) {
  return (
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
                      <option>Sports</option>
                      <option>Culture</option>
                      <option>Entrepreneurship</option>
                    </select>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="btn-primary px-3 py-1 text-xs"
                        onClick={onSaveEdit}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn-secondary px-3 py-1 text-xs"
                        onClick={onCancelEdit}
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
                  onClick={() => onStartEdit(ev)}
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button
                  type="button"
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-red-600"
                  aria-label="Delete"
                  onClick={() => onDelete(ev.id)}
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventsTable;
