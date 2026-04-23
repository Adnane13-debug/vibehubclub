import StatCard from "../shared/StatCard";
import EventsTable from "./EventsTable";
import AnnouncementBlock from "./AnnouncementBlock";
import ActivityAside from "./ActivityAside";
import MembersCompactList from "./MembersCompactList";
import AdminFooter from "./AdminFooter";

/**
 * Overview tab – stats grid, events table, announcement form, activity + members sidebar.
 */
function OverviewTab({
  stats,
  events,
  editingId,
  draft,
  setDraft,
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
  members,
  onManageAllMembers,
  onViewAllEvents,
}) {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <section className="space-y-6 lg:col-span-2">
          {/* Events table */}
          <div className="card-soft rounded-xl border border-slate-200/80 p-6 shadow-md md:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-heading text-xl font-extrabold tracking-tight">
                Upcoming Events
              </h2>
              <button
                type="button"
                className="text-sm font-semibold text-primary hover:underline"
                onClick={onViewAllEvents}
              >
                View all
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
          {/* Announcement */}
          <AnnouncementBlock
            annSubject={annSubject}
            setAnnSubject={setAnnSubject}
            annBody={annBody}
            setAnnBody={setAnnBody}
            onPost={onPost}
            announcements={announcements}
          />
        </section>

        <aside className="space-y-8">
          <ActivityAside />
          <MembersCompactList members={members} onManageAll={onManageAllMembers} />
        </aside>
      </div>

      <AdminFooter />
    </div>
  );
}

export default OverviewTab;
