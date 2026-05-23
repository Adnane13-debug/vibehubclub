import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import {
  appendSheet,
  downloadWorkbook,
  jsonToSheet,
  newWorkbook,
} from '../../utils/excelExport';
import MembersStats from './members/MembersStats';
import JoinRequests from './members/JoinRequests';
import MembersFilterBar from './members/MembersFilterBar';
import MembersList from './members/MembersList';
import MemberActivity from './members/MemberActivity';
import AdminFooter from './AdminFooter';

function MembersTab({ members, onUpdateRole, onUpdateStatus, onRemoveMember, onAcceptRequest }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Real membership requests from API
  const [joinRequests, setJoinRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [toast, setToast] = useState(null); // { type: 'success'|'error', name, tempPassword, message }

  const showToast = (data) => {
    setToast(data);
    setTimeout(() => setToast(null), 7000);
  };

  const [activities, setActivities] = useState([
    { id: 'a1', user: 'Alex Rivera', action: 'updated profile picture', time: '10 min ago', type: 'update' },
    { id: 'a2', user: 'Elena Kostic', action: 'changed role to Admin', time: '2 hours ago', type: 'update' },
    { id: 'a3', user: 'Marcus Thorne', action: 'joined the club', time: '1 day ago', type: 'join' },
  ]);

  // Fetch pending membership requests on mount
  const fetchRequests = async () => {
    try {
      setLoadingRequests(true);
      const res = await api.get('/api/admin/membership-requests?statut=en_attente');
      const mapped = res.data.map(r => ({
        id: r.id,
        name: `${r.prenom} ${r.nom}`,
        email: r.email,
        date: new Date(r.created_at).toLocaleDateString(),
        message: r.message || '',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(r.prenom + '+' + r.nom)}&background=f59e0b&color=1e293b&bold=true`
      }));
      setJoinRequests(mapped);
    } catch (err) {
      console.error('Failed to fetch membership requests', err);
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAcceptRequest = async (req) => {
    try {
      const res = await api.patch(`/api/admin/membership-requests/${req.id}/accept`);
      const tempPassword = res.data.tempPassword;

      // Show toast with temp password
      showToast({ type: 'success', name: req.name, tempPassword });

      // Add to member list via parent callback
      onAcceptRequest({
        id: `m${Date.now()}`,
        name: req.name,
        role: 'Visitor',
        tier: 'Standard',
        tierClass: 'bg-slate-100 text-slate-600',
        avatar: req.avatar,
        email: req.email,
        status: 'Active'
      });

      setActivities(prev => [{ id: `act${Date.now()}`, user: req.name, action: 'was accepted as Visitor', time: 'Just now', type: 'join' }, ...prev]);

      // Refetch the list
      fetchRequests();
    } catch (err) {
      console.error('Failed to accept request', err);
      showToast({ type: 'error', message: err.response?.data?.message || 'Failed to accept request' });
    }
  };

  const handleRejectRequest = async (id) => {
    try {
      await api.patch(`/api/admin/membership-requests/${id}/reject`);
      setActivities(prev => {
        const req = joinRequests.find(r => r.id === id);
        return [{ id: `act${Date.now()}`, user: req?.name || 'Unknown', action: 'application was rejected', time: 'Just now', type: 'remove' }, ...prev];
      });
      // Refetch the list
      fetchRequests();
    } catch (err) {
      console.error('Failed to reject request', err);
      showToast({ type: 'error', message: err.response?.data?.message || 'Failed to reject request' });
    }
  };

  const handleRemoveMember = (id) => {
    const member = members.find(m => m.id === id);
    if (member) {
      setActivities(prev => [{ id: `act${Date.now()}`, user: member.name, action: 'was removed from the club', time: 'Just now', type: 'remove' }, ...prev]);
      onRemoveMember(id);
    }
  };

  const handleUpdateStatus = (id, newStatus) => {
    const member = members.find(m => m.id === id);
    if (member) {
      setActivities(prev => [{ id: `act${Date.now()}`, user: member.name, action: `was ${newStatus === 'Suspended' ? 'suspended' : 'reactivated'}`, time: 'Just now', type: newStatus === 'Suspended' ? 'suspend' : 'update' }, ...prev]);
      onUpdateStatus(id, newStatus);
    }
  };

  const handleUpdateRole = (id, newRole) => {
    const member = members.find(m => m.id === id);
    if (member && member.role !== newRole) {
      setActivities(prev => [{ id: `act${Date.now()}`, user: member.name, action: `role changed to ${newRole}`, time: 'Just now', type: 'update' }, ...prev]);
      onUpdateRole(id, newRole);
    }
  };

  // Filter members
  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "All" || m.role === filterRole;
    const currentStatus = m.status || 'Active';
    const matchesStatus = filterStatus === "All" || currentStatus === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalMembers = members.length;
  const visitorsCount = members.filter(m => m.role === 'Visitor').length;

  const handleExportMembers = () => {
    api
      .get('/api/admin/export/members')
      .then((res) => {
        const members = Array.isArray(res.data) ? res.data : [];
        if (members.length === 0) {
          alert('No members to export.');
          return;
        }

        const rows = members.map((m) => ({
          ID: m.id,
          'First Name': m.prenom,
          'Last Name': m.nom,
          Email: m.email,
          Role: m.role,
          Status: m.statut,
          'Joined At': m.created_at ?? '',
        }));

        const ws = jsonToSheet(rows);
        const wb = newWorkbook();
        appendSheet(wb, ws, 'Members');
        const date = new Date().toISOString().slice(0, 10);
        downloadWorkbook(wb, `vibehub-members-${date}.xlsx`);
      })
      .catch((err) => {
        alert('Export failed: ' + (err.response?.data?.message || err.message));
      });
  };

  return (
    <div className="space-y-8">

      {/* ── Toast Notification ── */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[9999] w-80 rounded-2xl border bg-white shadow-2xl overflow-hidden transition-all duration-300`}
          style={{ borderColor: toast.type === 'success' ? '#d1fae5' : '#fecaca' }}>

          {/* Colored top bar */}
          <div className={`h-1 w-full ${toast.type === 'success' ? 'bg-emerald-400' : 'bg-red-400'}`} />

          <div className="p-4">
            <div className="flex items-start gap-3">

              {/* Icon */}
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${toast.type === 'success' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                <span className={`material-symbols-outlined text-[16px] ${toast.type === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
                  {toast.type === 'success' ? 'check_circle' : 'error'}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {toast.type === 'success' ? (
                  <>
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-0.5">Member Accepted</p>
                    <p className="text-sm font-semibold text-slate-900">{toast.name}</p>
                    <p className="mt-1 text-[11px] text-slate-400">Credentials have been sent to their email.</p>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-bold uppercase tracking-widest text-red-500 mb-0.5">Action Failed</p>
                    <p className="text-sm text-slate-600">{toast.message}</p>
                  </>
                )}
              </div>

              {/* Close */}
              <button
                onClick={() => setToast(null)}
                className="shrink-0 flex h-6 w-6 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">close</span>
              </button>
            </div>
          </div>

          {/* Auto-dismiss progress bar */}
          <div className={`h-0.5 ${toast.type === 'success' ? 'bg-emerald-300' : 'bg-red-300'}`}
            style={{ animation: 'shrink 7s linear forwards' }}/>
        </div>
      )}

      <style>{`
        @keyframes shrink { from { width: 100% } to { width: 0% } }
      `}</style>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-black text-slate-900">Member Management</h1>
          <p className="mt-1 text-sm text-slate-600">Review requests, update roles, and monitor community activity.</p>
        </div>
        <button
          type="button"
          onClick={handleExportMembers}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">download</span>
          Export to Excel
        </button>
      </div>

      <MembersStats total={totalMembers} visitors={visitorsCount} pending={joinRequests.length} />

      <JoinRequests requests={joinRequests} onAccept={handleAcceptRequest} onReject={handleRejectRequest} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <MembersFilterBar 
            searchTerm={searchTerm} setSearchTerm={setSearchTerm}
            filterRole={filterRole} setFilterRole={setFilterRole}
            filterStatus={filterStatus} setFilterStatus={setFilterStatus}
          />
          <MembersList 
            members={filteredMembers} 
            onUpdateRole={handleUpdateRole} 
            onUpdateStatus={handleUpdateStatus} 
            onRemove={handleRemoveMember} 
          />
        </div>
        <div>
          <MemberActivity activities={activities} />
        </div>
      </div>

      <AdminFooter />
    </div>
  );
}

export default MembersTab;
