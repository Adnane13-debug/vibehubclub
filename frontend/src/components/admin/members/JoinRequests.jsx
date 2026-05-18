import React from 'react';

function JoinRequests({ requests, onAccept, onReject }) {
  if (requests.length === 0) return null;

  return (
    <div className="card-soft rounded-xl border border-slate-200 shadow-md mb-8">
      <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <h3 className="font-heading font-bold text-slate-900">Join Requests</h3>
        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full">{requests.length} Pending</span>
      </div>
      <ul className="divide-y divide-slate-100">
        {requests.map(req => (
          <li key={req.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <div>
                <p className="font-bold">{req.nom} {req.prenom}</p>
                <p>{req.email} • Applied {new Date(req.created_at).toLocaleDateString()}</p>
                <p className="text-sm text-slate-600 mt-1 italic">"{req.message}"</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => onReject(req.id)} className="px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">Reject</button>
              <button onClick={() => onAccept(req)} className="px-4 py-2 text-sm font-bold text-slate-900 bg-primary rounded-lg shadow-sm hover:opacity-90 transition-opacity">Accept</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JoinRequests;
