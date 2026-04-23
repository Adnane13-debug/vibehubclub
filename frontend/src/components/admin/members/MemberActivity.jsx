import React from 'react';

function MemberActivity({ activities }) {
  return (
    <div className="card-soft rounded-xl border border-slate-200 shadow-md sticky top-6">
      <div className="border-b border-slate-100 px-6 py-4">
        <h3 className="font-heading font-bold text-slate-900">Recent Activity</h3>
      </div>
      <ul className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
        {activities.map(act => (
          <li key={act.id} className="px-6 py-4 flex gap-4">
            <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${
              act.type === 'join' ? 'bg-emerald-500' : 
              act.type === 'suspend' ? 'bg-amber-500' : 
              act.type === 'remove' ? 'bg-red-500' : 'bg-primary'
            }`} />
            <div>
              <p className="text-sm text-slate-700 leading-snug">
                <span className="font-bold text-slate-900">{act.user}</span> {act.action}
              </p>
              <p className="text-xs font-semibold text-slate-400 mt-1">{act.time}</p>
            </div>
          </li>
        ))}
        {activities.length === 0 && (
          <li className="px-6 py-8 text-center text-sm text-slate-500">
            No recent activity.
          </li>
        )}
      </ul>
    </div>
  );
}

export default MemberActivity;
