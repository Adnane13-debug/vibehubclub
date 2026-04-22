import EventsTable from "./EventsTable";
import AnnouncementBlock from "./AnnouncementBlock";
import AdminFooter from "./AdminFooter";

/**
 * Events tab – full events table with CRUD + announcement block.
 */
function EventsTab({
  events,
  editingId,
  draft,
  setDraft,
  onAddEvent,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDeleteEvent,
  annSubject,
  setAnnSubject,
  annBody,
  setAnnBody,
  onPost,
  announcements,
}) {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-black text-slate-900">Events</h1>
          <p className="mt-1 text-sm text-slate-600">
            Create, edit, and remove upcoming events.
          </p>
        </div>
        <button type="button" onClick={onAddEvent} className="btn-primary gap-2">
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
        <EventsTable
          events={events}
          editingId={editingId}
          draft={draft}
          setDraft={setDraft}
          onStartEdit={onStartEdit}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
          onDelete={onDeleteEvent}
        />
      </div>

      <AnnouncementBlock
        annSubject={annSubject}
        setAnnSubject={setAnnSubject}
        annBody={annBody}
        setAnnBody={setAnnBody}
        onPost={onPost}
        announcements={announcements}
      />

      <AdminFooter />
    </div>
  );
}

export default EventsTab;
