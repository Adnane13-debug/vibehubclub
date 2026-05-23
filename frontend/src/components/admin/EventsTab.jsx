import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { read, utils } from "xlsx";
import api from "../../services/api";
import {
  appendSheet,
  downloadWorkbook,
  jsonToSheet,
  mapSheetRowToEvent,
  newWorkbook,
} from "../../utils/excelExport";
import EventsTable from "./EventsTable";
import AnnouncementBlock from "./AnnouncementBlock";
import AdminFooter from "./AdminFooter";

const INITIAL_EVENT_ROWS = 5;

const tableLinkClass =
  "text-sm font-semibold text-primary underline-offset-2 transition-colors hover:text-amber-600 hover:underline";

/**
 * Events tab – full events table with CRUD, export/import, and announcement block.
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
  onToggleStatus,
  onImportDone,
  showToast,
  annSubject,
  setAnnSubject,
  annBody,
  setAnnBody,
  onPost,
  announcements,
}) {
  const { t } = useTranslation();
  const importInputRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  const { mainEvents, otherEvents } = useMemo(() => {
    const main = [];
    const other = [];
    for (const ev of events) {
      if (ev.raw?.statut === "archive") other.push(ev);
      else main.push(ev);
    }
    return { mainEvents: main, otherEvents: other };
  }, [events]);

  const fullEvents = useMemo(
    () => [...mainEvents, ...otherEvents],
    [mainEvents, otherEvents]
  );

  const collapsedEvents = useMemo(
    () => mainEvents.slice(0, INITIAL_EVENT_ROWS),
    [mainEvents]
  );

  const tableEvents = expanded ? fullEvents : collapsedEvents;
  const canExpand = fullEvents.length > collapsedEvents.length;
  const scrollableTable = expanded && fullEvents.length > INITIAL_EVENT_ROWS;

  useEffect(() => {
    if (!canExpand) setExpanded(false);
  }, [canExpand]);

  const handleExportEvents = () => {
    const STATUS_LABEL = {
      publie: "Published",
      brouillon: "Draft",
      archive: "Archive",
      en_attente: "En attente",
    };

    api
      .get("/api/admin/export/events")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        if (data.length === 0) {
          alert("No events to export.");
          return;
        }

        const rows = data.map((e) => ({
          ID: e.id,
          Name: e.titre,
          Category: e.categorie,
          Location: e.lieu,
          "Start Date": e.date_debut
            ? new Date(e.date_debut).toLocaleDateString("fr-FR")
            : "",
          "End Date": e.date_debut
            ? new Date(e.date_debut).toLocaleDateString("fr-FR")
            : "",
          Status: STATUS_LABEL[e.statut] || e.statut,
          Description: e.description,
          "Created At": e.created_at
            ? new Date(e.created_at).toLocaleDateString("fr-FR")
            : "",
        }));

        const ws = jsonToSheet(rows);
        ws["!cols"] = [
          { wch: 6 },
          { wch: 30 },
          { wch: 16 },
          { wch: 24 },
          { wch: 14 },
          { wch: 14 },
          { wch: 14 },
          { wch: 40 },
          { wch: 14 },
        ];

        const wb = newWorkbook();
        appendSheet(wb, ws, "Events");
        const date = new Date().toISOString().slice(0, 10);
        downloadWorkbook(wb, `vibehub-events-${date}.xlsx`);
      })
      .catch((err) => {
        alert("Export failed: " + (err.response?.data?.message || err.message));
      });
  };

  const handleImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const wb = read(evt.target.result, { type: "array", cellDates: true });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const raw = utils.sheet_to_json(ws, { defval: "" });

        const eventsToImport = raw
          .map(mapSheetRowToEvent)
          .filter((row) => row.titre && row.date_debut);

        if (eventsToImport.length === 0) {
          alert(
            "No valid events found. Required columns: Name (or Title) and Start Date (YYYY-MM-DD or DD/MM/YYYY)."
          );
          return;
        }

        api
          .post("/api/admin/import/events", { events: eventsToImport })
          .then((res) => {
            const { inserted = 0, skipped = 0, message, skippedTitles = [] } =
              res.data;

            if (showToast) {
              if (skipped > 0 && inserted === 0) {
                const names = skippedTitles.slice(0, 2).join(", ");
                const suffix = skippedTitles.length > 2 ? "…" : "";
                showToast(
                  `Event already exists${names ? `: ${names}${suffix}` : ""}`,
                  "warning"
                );
              } else if (skipped > 0 && inserted > 0) {
                showToast(message, "warning");
              } else {
                showToast(message, "success");
              }
            } else {
              alert(message);
            }

            if (inserted > 0) setExpanded(true);
            if (onImportDone) onImportDone();
          })
          .catch((err) => {
            const msg = err.response?.data?.message || err.message;
            if (showToast) showToast("Import failed: " + msg, "error");
            else alert("Import failed: " + msg);
          });
      } catch (err) {
        alert("Import failed: " + (err.message || "Could not read Excel file"));
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-black text-slate-900">
            {t("adminEvents.title")}
          </h1>
          <p className="mt-1 text-sm text-slate-600">{t("adminEvents.subtitle")}</p>
        </div>
        <button type="button" onClick={onAddEvent} className="btn-primary gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          {t("adminEvents.newEvent")}
        </button>
      </div>

      <div className="card-soft rounded-xl border border-slate-200/80 p-6 shadow-md md:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-heading text-xl font-extrabold tracking-tight">
            {t("adminEvents.upcoming")}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportEvents}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              {t("adminEvents.exportExcel")}
            </button>

            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50">
              <span className="material-symbols-outlined text-[16px]">upload</span>
              {t("adminEvents.importExcel")}
              <input
                ref={importInputRef}
                type="file"
                accept=".xlsx,.xls"
                className="hidden"
                onChange={handleImportFile}
              />
            </label>
          </div>
        </div>

        {fullEvents.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">
            {t("adminEvents.empty")}
          </p>
        ) : (
          <>
            <div
              className={
                scrollableTable
                  ? "max-h-[min(72vh,42rem)] overflow-x-auto overflow-y-auto scroll-smooth rounded-lg border border-slate-100/90"
                  : "overflow-x-auto"
              }
            >
              <EventsTable
                events={tableEvents}
                stickyHeader={scrollableTable}
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

            {canExpand && (
              <p className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className={tableLinkClass}
                  aria-expanded={expanded}
                >
                  {expanded ? t("adminEvents.showLess") : t("adminEvents.showMore")}
                </button>
              </p>
            )}
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

      <AdminFooter />
    </div>
  );
}

export default EventsTab;
