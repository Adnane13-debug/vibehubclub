/**
 * Announcement form + posted announcements list.
 */
function AnnouncementBlock({
  annSubject,
  setAnnSubject,
  annBody,
  setAnnBody,
  onPost,
  announcements,
}) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-6 shadow-md md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-white p-2 text-primary shadow-sm">
          <span className="material-symbols-outlined">campaign</span>
        </div>
        <h2 className="font-heading text-xl font-extrabold tracking-tight">
          Post Announcement
        </h2>
      </div>
      <form className="space-y-4" onSubmit={onPost}>
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
}

export default AnnouncementBlock;
