import React from 'react';

function MembersList({ members, onUpdateRole, onUpdateStatus, onRemove }) {
  return (
    <div className="card-soft overflow-hidden rounded-xl border border-slate-200 shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold border-b border-slate-100 tracking-wider">
            <tr>
              <th className="px-6 py-4">Member</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.map(m => (
              <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100" />
                    <div>
                      <p className="font-bold text-slate-900">{m.name}</p>
                      <p className="text-xs text-slate-500">{m.email || 'user@example.com'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <select 
                    className="border border-slate-200 rounded bg-white text-sm font-semibold text-slate-700 focus:border-primary focus:ring-1 focus:ring-primary py-1 px-2 cursor-pointer"
                    value={m.role}
                    onChange={(e) => onUpdateRole(m.id, e.target.value)}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Member">Member</option>
                    <option value="Visitor">Visitor</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-black tracking-widest ${
                    m.status === 'Suspended' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {m.status || 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onUpdateStatus(m.id, m.status === 'Suspended' ? 'Active' : 'Suspended')}
                      className={`p-1.5 rounded hover:bg-slate-200 transition-colors ${m.status === 'Suspended' ? 'text-emerald-600' : 'text-amber-600'}`}
                      title={m.status === 'Suspended' ? "Restore Access" : "Suspend User"}
                    >
                      <span className="material-symbols-outlined text-[20px]">{m.status === 'Suspended' ? 'how_to_reg' : 'block'}</span>
                    </button>
                    <button 
                      onClick={() => onRemove(m.id)}
                      className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                      title="Remove Member"
                    >
                      <span className="material-symbols-outlined text-[20px]">person_remove</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                  <span className="material-symbols-outlined text-4xl mb-2 text-slate-300">search_off</span>
                  <p>No members found matching your criteria.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MembersList;
