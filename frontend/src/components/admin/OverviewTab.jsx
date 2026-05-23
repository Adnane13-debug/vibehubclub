import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import StatCard from "../shared/StatCard";
import EventsTable from "./EventsTable";
import AnnouncementBlock from "./AnnouncementBlock";
import ActivityAside from "./ActivityAside";
import MembersCompactList from "./MembersCompactList";
import AdminFooter from "./AdminFooter";

const OVERVIEW_EVENT_LIMIT = 5;

const tableLinkClass =
  "text-sm font-semibold text-primary underline-offset-2 transition-colors hover:text-amber-600 hover:underline";

/**
 * Overview tab – stats grid, events preview (5 rows), announcement form, sidebar.
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
  onToggleStatus,
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
  const { t } = useTranslation();

  const upcomingEvents = useMemo(
    () => events.filter((ev) => ev.raw?.statut !== "archive"),
    [events]
  );

  const previewEvents = useMemo(
    () => upcomingEvents.slice(0, OVERVIEW_EVENT_LIMIT),
    [upcomingEvents]
  );

  return (
    <div className="space-y-8">
      <section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <section className="space-y-6 lg:col-span-2">
          <div className="card-soft rounded-xl border border-slate-200/80 p-6 shadow-md md:p-8">
            <div className="mb-6">
              <h2 className="font-heading text-xl font-extrabold tracking-tight">
                {t("adminOverview.upcoming")}
              </h2>
            </div>

            {previewEvents.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-500">
                {t("adminOverview.empty")}
              </p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <EventsTable
                    events={previewEvents}
                    editingId={editingId}
                    draft={draft}
                    setDraft={setDraft}
                    onStartEdit={onStartEdit}
                    onSaveEdit={onSaveEdit}
                    onCancelEdit={onCancelEdit}
                    onDelete={onDeleteEvent}
                    onToggleStatus={onToggleStatus}
                  />
                </div>

                <p className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={onViewAllEvents}
                    className={tableLinkClass}
                  >
                    {t("adminOverview.showAllEvents")}
                  </button>
                </p>
              </>
            )}
          </div>

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
