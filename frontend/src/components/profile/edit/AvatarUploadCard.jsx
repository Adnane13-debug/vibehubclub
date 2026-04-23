import React from 'react';

function AvatarUploadCard({ avatar, name }) {
  return (
    <div className="card-soft p-8 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center">
        <p className="text-[12px] font-semibold text-slate-500 uppercase tracking-widest mb-6 self-start">Portrait</p>
        <div className="relative group cursor-pointer">
            <div className="w-40 h-40 rounded-full border-2 border-slate-100 overflow-hidden mb-4 relative">
                <img alt="Avatar"
                    className="w-full h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-500"
                    src={avatar} />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                    <span className="material-symbols-outlined text-3xl">photo_camera</span>
                    <span className="text-xs mt-1 font-semibold">Change</span>
                </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary p-2 rounded-full shadow-lg">
                <span className="material-symbols-outlined text-slate-900 text-sm">edit</span>
            </div>
        </div>
        <h4 className="font-heading text-xl font-semibold text-slate-900 mt-2">{name}</h4>
        <p className="text-[12px] font-semibold text-slate-500 mt-1">Recommended size: 800x800px</p>
        <button type="button" className="mt-6 text-primary font-semibold text-sm hover:underline">Remove Image</button>
    </div>
  );
}

export default AvatarUploadCard;
