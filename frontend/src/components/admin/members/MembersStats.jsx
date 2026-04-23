import React from 'react';

function MembersStats({ total, visitors, pending }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="card-soft p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Total Members</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{total}</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-2xl">group</span>
        </div>
      </div>
      <div className="card-soft p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Active Visitors</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{visitors}</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
          <span className="material-symbols-outlined text-2xl">visibility</span>
        </div>
      </div>
      <div className="card-soft p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Pending Requests</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{pending}</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
          <span className="material-symbols-outlined text-2xl">person_add</span>
        </div>
      </div>
    </div>
  );
}

export default MembersStats;
