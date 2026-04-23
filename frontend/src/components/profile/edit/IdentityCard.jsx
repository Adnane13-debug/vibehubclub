import React from 'react';

function IdentityCard({ name, setName, email, setEmail, bio, setBio }) {
  return (
    <div className="card-soft p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
        <div className="mb-8">
            <p className="text-[12px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Personal Identity</p>
            <h3 className="font-heading text-2xl font-bold text-slate-900">Core Information</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
                <label className="text-[12px] font-semibold text-slate-500 uppercase">Full Name</label>
                <input 
                    className="border-none border-b border-slate-300 bg-transparent px-0 py-2 focus:ring-0 focus:border-primary font-heading text-xl text-slate-900 transition-colors" 
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)} 
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-[12px] font-semibold text-slate-500 uppercase">Email Address</label>
                <input 
                    className="border-none border-b border-slate-300 bg-transparent px-0 py-2 focus:ring-0 focus:border-primary text-lg text-slate-900 transition-colors" 
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                />
            </div>
        </div>
        <div className="mt-10 flex flex-col gap-2">
            <label className="text-[12px] font-semibold text-slate-500 uppercase">Professional Biography</label>
            <textarea
                className="border-none border-b border-slate-300 bg-transparent px-0 py-2 focus:ring-0 focus:border-primary text-lg text-slate-900 resize-none leading-relaxed transition-colors"
                rows="4"
                value={bio}
                onChange={e => setBio(e.target.value)}
            />
        </div>
    </div>
  );
}

export default IdentityCard;
