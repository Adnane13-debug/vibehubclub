import React from 'react';

function MembershipDetailsCard({ tier, joined, renewal }) {
  return (
    <div className="card-soft p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
        <p className="text-[12px] font-semibold text-slate-500 uppercase tracking-widest mb-6">Membership Status</p>
        <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-500 text-sm">Tier</span>
                <span className="font-semibold text-amber-700 italic">{tier}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-500 text-sm">Joined</span>
                <span className="font-semibold text-slate-900">{joined}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-500 text-sm">Renewal</span>
                <span className="font-semibold text-slate-900">{renewal}</span>
            </div>
        </div>
        <div className="mt-8 p-4 bg-amber-50 rounded border border-amber-200/50">
            <p className="text-xs text-amber-900 leading-relaxed italic">
                Your status as a {tier} provides unlimited access to the Restricted Archive and Private Reading Rooms.
            </p>
        </div>
    </div>
  );
}

export default MembershipDetailsCard;
