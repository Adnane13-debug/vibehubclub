import { useRef } from "react";
import * as XLSX from "xlsx";
import api from "../../services/api";
import EventsTable from "./EventsTable";
import AnnouncementBlock from "./AnnouncementBlock";
import AdminFooter from "./AdminFooter";

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
  annSubject,
  setAnnSubject,
  annBody,
  setAnnBody,
  onPost,
  announcements,
}) {
  const importInputRef = useRef(null)

  const handleExportEvents = async () => {
    try {
      const res = await api.get('/api/admin/export/events')
      const rows = res.data.map(e => ({
        'ID':          e.id,
        'Title':       e.titre,
        'Category':    e.categorie,
        'Location':    e.lieu,
        'Start Date':  e.date_debut,
        'End Date':    e.date_fin,
        'Status':      e.statut,
        'Description': e.description,
        'Created At':  e.created_at,
      }))
      const ws = XLSX.utils.json_to_sheet(rows)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Events')
      const date = new Date().toISOString().slice(0, 10)
      XLSX.writeFile(wb, `vibehub-events-${date}.xlsx`)
    } catch (err) {
      alert('Export failed: ' + (err.response?.data?.message || err.message))
    }
  }

  const handleImportFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''

    const reader = new FileReader()
    reader.onload = async (evt) => {
      try {
        const wb = XLSX.read(evt.target.result, { type: 'array' })
        const ws = wb.Sheets[wb.SheetNames[0]]
        const raw = XLSX.utils.sheet_to_json(ws)

        const events = raw.map(r => ({
          titre:       r['Title']      || r['titre']      || r['Titre']      || '',
          categorie:   r['Category']   || r['categorie']  || 'culture',
          lieu:        r['Location']   || r['lieu']        || '',
          date_debut:  r['Start Date'] || r['date_debut'] || r['Date']       || '',
          date_fin:    r['End Date']   || r['date_fin']   || r['Start Date'] || r['date_debut'] || '',
          description: r['Description']|| r['description']|| '',
        }))

        const res = await api.post('/api/admin/import/events', { events })
        alert(res.data.message)
        if (onImportDone) onImportDone()
      } catch (err) {
        alert('Import failed: ' + (err.response?.data?.message || err.message))
      }
    }
    reader.readAsArrayBuffer(file)
  }

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
          <div className="flex items-center gap-2">
            {/* Export */}
            <button
              type="button"
              onClick={handleExportEvents}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              Export to Excel
            </button>

            {/* Import */}
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-[16px]">upload</span>
              Import Excel
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
        <EventsTable
          events={events}
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
