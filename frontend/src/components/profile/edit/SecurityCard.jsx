import React from 'react';

function SecurityCard() {
  return (
    <div className="card-soft p-8 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
            <p className="text-[12px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Security & Access</p>
            <h3 className="font-heading text-2xl font-bold text-slate-900">Member Credentials</h3>
            <p className="text-base text-slate-500 mt-1">Last changed 4 months ago. Two-factor authentication is active.</p>
        </div>
        <button type="button" className="px-6 py-2 border border-slate-300 text-slate-900 font-semibold rounded hover:bg-slate-50 transition-colors">
            Change Password
        </button>
    </div>
  );
}

export default SecurityCard;
