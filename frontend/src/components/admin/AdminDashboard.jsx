import { useMemo, useState, useEffect } from "react";
import { useAuth } from "../../auth/AuthContext";
import api from "../../services/api";

import AdminSidebar from "./AdminSidebar";
import OverviewTab from "./OverviewTab";
import AnalyticsTab from "./AnalyticsTab";
import MembersTab from "./MembersTab";
import EventsTab from "./EventsTab";
import CreateEventModal from "./CreateEventModal";
import VisitorProfileEdit from "../profile/VisitorProfileEdit";

function categoryClass(category) {
  if (category === "sport") return "bg-emerald-100 text-emerald-800";
  if (category === "culture") return "bg-rose-100 text-rose-800";
  return "bg-amber-100 text-amber-900";
}

function AdminDashboard() {
  const { logout, user } = useAuth();

  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState(user || {});
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);

  // Real data from API
  const [events, setEvents] = useState([])
  const [members, setMembers] = useState([])
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalEvents: 0,
    totalParticipations: 0
  })
  const [loading, setLoading] = useState(true)

  // Announcements
  const [announcements, setAnnouncements] = useState([])
  const [annSubject, setAnnSubject] = useState("")
  const [annBody, setAnnBody] = useState("")

  // Notifications
  const [notifications, setNotifications] = useState([])

  // Test results
  const [testResults, setTestResults] = useState([])

  // Edit event state
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState({ title: "", subtitle: "", category: "sport" })

  // Fetch all data on mount
  useEffect(() => {
    Promise.all([
      api.get('/api/admin/dashboard/stats'),
      api.get('/api/admin/events'),
      api.get('/api/admin/members'),
      api.get('/api/admin/announcements'),
      api.get('/api/admin/notifications'),
      api.get('/api/admin/tests/results'),
    ])
      .then(([statsRes, eventsRes, membersRes, annRes, notifRes, testRes]) => {
        setStats(statsRes.data)

        // format events to match what sub-components expect
        setEvents(eventsRes.data.map(e => ({
          id: e.id,
          dateLabel: new Date(e.date_debut).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }).toUpperCase(),
          title: e.titre,
          subtitle: `${e.lieu}`,
          category: e.categorie,
          categoryClass: categoryClass(e.categorie),
          status: e.statut === 'publie' ? 'Confirmed' : 'Draft',
          statusTone: e.statut === 'publie' ? 'emerald' : 'primary',
          raw: e
        })))

        // format members
        setMembers(membersRes.data.map(m => ({
          id: m.id,
          name: `${m.prenom} ${m.nom}`,
          role: m.role,
          tier: m.statut === 'actif' ? 'Active' : 'Inactive',
          tierClass: m.statut === 'actif' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800',
          avatar: m.photo || `https://ui-avatars.com/api/?name=${m.prenom}+${m.nom}&background=random`,
          statut: m.statut
        })))

        setAnnouncements(annRes.data.map(a => ({
          id: a.id,
          subject: a.titre,
          body: a.contenu
        })))

        setNotifications(notifRes.data)

        setTestResults(testRes.data)

        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  const statsCards = useMemo(() => [
    { label: "Total Members", value: String(stats.totalMembers), delta: "membres", icon: "group" },
    { label: "Total Events", value: String(stats.totalEvents), delta: "événements", icon: "calendar_month" },
    { label: "Participations", value: String(stats.totalParticipations), delta: "inscriptions", icon: "bolt" },
  ], [stats])

  // Event handlers
  const startEdit = (ev) => {
    setEditingId(ev.id)
    setDraft({ title: ev.title, subtitle: ev.subtitle, category: ev.category })
  }

  const saveEdit = async () => {
    if (!editingId) return
    try {
      await api.put(`/api/admin/events/${editingId}`, {
        titre: draft.title,
        lieu: draft.subtitle,
        categorie: draft.category,
        description: events.find(e => e.id === editingId)?.raw?.description || '',
        date_debut: events.find(e => e.id === editingId)?.raw?.date_debut || new Date()
      })
      setEvents(prev => prev.map(e =>
        e.id === editingId
          ? { ...e, title: draft.title, subtitle: draft.subtitle, category: draft.category, categoryClass: categoryClass(draft.category) }
          : e
      ))
      setEditingId(null)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSaveNewEvent = async (newDraft) => {
    try {
      const res = await api.post('/api/admin/events', {
        titre: newDraft.title,
        description: newDraft.subtitle || 'Description',
        date_debut: newDraft.date || new Date(),
        lieu: newDraft.subtitle || 'CMC OFPPT',
        categorie: newDraft.category?.toLowerCase() || 'sport'
      })
      const newEvent = {
        id: res.data.id,
        dateLabel: new Date(newDraft.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }).toUpperCase(),
        title: newDraft.title,
        subtitle: newDraft.subtitle,
        category: newDraft.category,
        categoryClass: categoryClass(newDraft.category),
        status: 'Draft',
        statusTone: 'primary',
        raw: { description: newDraft.subtitle, date_debut: newDraft.date }
      }
      setEvents(prev => [...prev, newEvent])
      setIsCreateEventOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteEvent = async (id) => {
    try {
      await api.delete(`/api/admin/events/${id}`)
      setEvents(prev => prev.filter(e => e.id !== id))
      if (editingId === id) setEditingId(null)
    } catch (err) {
      console.log(err)
    }
  }

  const toggleEventStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'publie' ? 'brouillon' : 'publie'
    try {
      await api.patch(`/api/admin/events/${id}/status`, { statut: newStatus })
      setEvents(prev => prev.map(e => e.id === id ? {
        ...e,
        status: newStatus === 'publie' ? 'Confirmed' : 'Draft',
        statusTone: newStatus === 'publie' ? 'emerald' : 'primary',
        raw: { ...e.raw, statut: newStatus }
      } : e))
    } catch (err) {
      console.log(err)
    }
  }

  const updateMemberStatus = async (id, newStatus) => {
    try {
      await api.patch(`/api/admin/members/${id}/status`, { statut: newStatus })
      setMembers(prev => prev.map(m => m.id === id ? { ...m, statut: newStatus } : m))
    } catch (err) {
      console.log(err)
    }
  }

  const removeMember = (id) => setMembers(prev => prev.filter(m => m.id !== id))
  const updateMemberRole = (id, newRole) => setMembers(prev => prev.map(m => m.id === id ? { ...m, role: newRole } : m))
  const acceptMemberRequest = (newMemberObj) => setMembers(prev => [newMemberObj, ...prev])

  const postAnnouncement = async (e) => {
    e.preventDefault()
    if (!annSubject.trim() && !annBody.trim()) return
    try {
      const res = await api.post('/api/admin/announcements', {
        titre: annSubject,
        contenu: annBody
      })
      setAnnouncements(prev => [
        { id: res.data.id, subject: annSubject, body: annBody },
        ...prev
      ])
      setAnnSubject('')
      setAnnBody('')
    } catch (err) {
      console.log(err)
    }
  }

  const editAnnouncement = async (id, subject, body) => {
    try {
      await api.put(`/api/admin/announcements/${id}`, {
        titre: subject,
        contenu: body
      })
      setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, subject, body } : a))
    } catch (err) {
      console.log(err)
    }
  }

  const deleteAnnouncement = async (id) => {
    try {
      await api.delete(`/api/admin/announcements/${id}`)
      setAnnouncements(prev => prev.filter(a => a.id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  const announcementProps = {
    annSubject, setAnnSubject,
    annBody, setAnnBody,
    onPost: postAnnouncement,
    announcements,
    onEdit: editAnnouncement,
    onDelete: deleteAnnouncement
  }

  const eventsTableProps = {
    events, editingId, draft, setDraft,
    onStartEdit: startEdit,
    onSaveEdit: saveEdit,
    onCancelEdit: () => setEditingId(null),
    onDeleteEvent: deleteEvent,
    onToggleStatus: toggleEventStatus
  }

  if (loading) return <div className="p-8 text-center">Chargement du dashboard...</div>

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-background-light">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCreateEvent={() => { setActiveTab("events"); setIsCreateEventOpen(true) }}
        onLogout={logout}
      />

      <main className="flex-1 pb-8 md:ml-64">
        <div className="mx-auto max-w-screen-2xl px-6 py-8 lg:px-8">
          {activeTab === "overview" && (
            <OverviewTab
              stats={statsCards}
              members={members}
              onManageAllMembers={() => setActiveTab("members")}
              onViewAllEvents={() => setActiveTab("events")}
              {...eventsTableProps}
              {...announcementProps}
            />
          )}
          {activeTab === "analytics" && <AnalyticsTab stats={statsCards} />}
          {activeTab === "members" && (
            <div className="mb-4">
              <button
                onClick={async () => {
                  try {
                    await api.post('/api/admin/notifications/inactive-members')
                    alert('Notifications sent to inactive members')
                  } catch (err) {
                    console.log(err)
                  }
                }}
                className="btn-primary"
              >
                Notifier membres inactifs
              </button>
            </div>
          )}
          {activeTab === "members" && (
            <MembersTab
              members={members}
              onUpdateRole={updateMemberRole}
              onUpdateStatus={updateMemberStatus}
              onRemoveMember={removeMember}
              onAcceptRequest={acceptMemberRequest}
            />
          )}
          {activeTab === "events" && (
            <EventsTab
              onAddEvent={() => setIsCreateEventOpen(true)}
              {...eventsTableProps}
              {...announcementProps}
            />
          )}
          {activeTab === "profile" && (
            <VisitorProfileEdit
              user={userData}
              onSave={(updatedData) => {
                setUserData(prev => ({ ...prev, ...updatedData }))
                setActiveTab("overview")
              }}
              onCancel={() => setActiveTab("overview")}
            />
          )}
        </div>
      </main>

      <CreateEventModal
        isOpen={isCreateEventOpen}
        onClose={() => setIsCreateEventOpen(false)}
        onSave={handleSaveNewEvent}
      />
    </div>
  )
}

export default AdminDashboard