import React, { useState } from 'react';
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

  const [joinRequests, setJoinRequests] = useState([
    { id: 'req1', name: 'Sarah Jenkins', email: 's.jenkins@example.com', date: '2 hours ago', message: 'I am a local historian interested in your archives.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAseRUwLXfqJBmQA3yYlNVM6wM05OQj08P9pSymYDXXEHhPK8a9TjEH4v-0r1wLUHY3UgMS0OvnfemPViJgNw5J00IMe6gxFmvuzspi86d6v3XMh5tbjdUGRpurnEteCKdYE-jWQgLGxuvMTSLXtrWHzM6fcS5j5IcxCHeRAbcfiPlFBHCP0u--yupWhrzpWb8WrGr14ttHoSrHQwk9WQvFL8zriX8YbU9hTKXbJZCEecr8nQOcAaFkfYtbkl68ur_bL2F9ycU5GgE' },
    { id: 'req2', name: 'David Cho', email: 'd.cho@example.com', date: '1 day ago', message: 'Would love to network with other entrepreneurs.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6iv7qux9O7LgpKQpz9LuzsdZ0mbi461U5nCmghMxD2WQ41o4yBzWxyY7CH1M21sQBPyN2SWhwtxyN8BxNyojaQofXxUwPhR64swI0E-6XrI1h-ibzm3Th5mFxVqAMnRDtVk1Ef40hqKd24gLleywQDdnKveg_aDCJmNmANpueiRr-GcefF4DuAVGCaGH1eVvYLyy5L2yxggcQOnuWMrbqNnHgdA2pBv9aq5fYMvHRtqn1VrCU5pPfT9ty5SmrenGeX50TLFE0pKI' }
  ]);

  const [activities, setActivities] = useState([
    { id: 'a1', user: 'Alex Rivera', action: 'updated profile picture', time: '10 min ago', type: 'update' },
    { id: 'a2', user: 'Elena Kostic', action: 'changed role to Admin', time: '2 hours ago', type: 'update' },
    { id: 'a3', user: 'Marcus Thorne', action: 'joined the club', time: '1 day ago', type: 'join' },
  ]);

  const handleAcceptRequest = (req) => {
    onAcceptRequest({
      id: `m${Date.now()}`,
      name: req.name,
      role: 'Member',
      tier: 'Standard',
      tierClass: 'bg-slate-100 text-slate-600',
      avatar: req.avatar,
      email: req.email,
      status: 'Active'
    });
    setJoinRequests(prev => prev.filter(r => r.id !== req.id));
    setActivities(prev => [{ id: `act${Date.now()}`, user: req.name, action: 'was accepted as Member', time: 'Just now', type: 'join' }, ...prev]);
  };

  const handleRejectRequest = (id) => {
    setJoinRequests(prev => prev.filter(r => r.id !== id));
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
