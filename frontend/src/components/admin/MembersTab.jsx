import React, { useState, useEffect } from 'react';
import api from '../../services/api';
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

      // Show temp password to admin
      alert(`✅ Request accepted!\n\nTemporary password for ${req.name}:\n${tempPassword}\n\nPlease share this with the user so they can log in.`);

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
      alert('Failed to accept request: ' + (err.response?.data?.message || 'Server error'));
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
      alert('Failed to reject request: ' + (err.response?.data?.message || 'Server error'));
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-black text-slate-900">Member Management</h1>
        <p className="mt-1 text-sm text-slate-600">Review requests, update roles, and monitor community activity.</p>
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
