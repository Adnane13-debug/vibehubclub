import React from 'react';

function InterestsCard({ interests, onRemove, onAdd }) {
  return (
    <div className="card-soft p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
        <div className="mb-6">
            <p className="text-[12px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Curated Interests</p>
            <h3 className="font-heading text-2xl font-bold text-slate-900">Scholarly Focus</h3>
        </div>
        <div className="flex flex-wrap gap-2">
            {interests.map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-50 border border-slate-200 text-slate-700 rounded-full text-xs font-semibold flex items-center gap-2">
                    {tag} 
                    <button type="button" onClick={() => onRemove(tag)} className="material-symbols-outlined text-[14px] hover:text-red-500">close</button>
                </span>
            ))}
            <button
                type="button"
                onClick={onAdd}
                className="px-3 py-1 border border-dashed border-slate-400 text-slate-500 hover:border-primary hover:text-primary rounded-full text-xs font-semibold transition-colors">
                + Add Interest
            </button>
        </div>
    </div>
  );
}

export default InterestsCard;
