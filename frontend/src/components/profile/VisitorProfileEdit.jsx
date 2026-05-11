import React, { useState } from 'react';
import axios from 'axios';
import IdentityCard from './edit/IdentityCard';
import InterestsCard from './edit/InterestsCard';
import AvatarUploadCard from './edit/AvatarUploadCard';
import MembershipDetailsCard from './edit/MembershipDetailsCard';
import SecurityCard from './edit/SecurityCard';

function VisitorProfileEdit({ user, onSave, onCancel }) {
    const [name, setName] = useState(user?.name ?? "Julian Vane");
    const [email, setEmail] = useState(user?.email ?? "j.vane@athenaeum.org");
    const [bio, setBio] = useState(user?.bio ?? "Senior Fellow at the Royal Society of Historical Inquiry. Curator of the 18th-century cartography collection. Dedicated to the preservation of rare manuscripts and the quiet pursuit of forgotten knowledge within the hallowed halls of The Athenaeum.");
    const [interests, setInterests] = useState(user?.interests?.length ? user.interests : ["Cartography", "Manuscripts", "Numismatics"]);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    
    const handleRemoveInterest = (tag) => {
        setInterests(prev => prev.filter(i => i !== tag));
    };
    
    const handleAddInterest = () => {
        const newInterest = prompt("Add a new interest:");
        if (newInterest && !interests.includes(newInterest)) {
            setInterests(prev => [...prev, newInterest]);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        setError(null);
        try {
            const token = localStorage.getItem('vibehub_token');
            const nameParts = name.trim().split(' ');
            const nom = nameParts[0] || '';
            const prenom = nameParts.slice(1).join(' ') || '';

            await axios.put('http://localhost:5000/api/auth/profile', 
                { nom, prenom }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // update localStorage
            const storedUser = JSON.parse(localStorage.getItem('vibehub_user') || '{}');
            const updatedUser = { ...storedUser, nom, prenom };
            localStorage.setItem('vibehub_user', JSON.stringify(updatedUser));

            // update local state
            onSave({ name, email, bio, interests });
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de la sauvegarde');
        } finally {
            setIsSaving(false);
        }
    };

    const avatar = user?.avatarUrl ?? "https://lh3.googleusercontent.com/aida-public/AB6AXuDYV2LKd_sq_cj9XqVyuvFBHyq-8OXbweWkhqVjpDwRm0PkH9_s3haM0Q6gsU03IO9ZZ07gGTSVSuEfY0p8uQ3pYB2gAC_FUjTE3ODYJBZpfpKmcVHUV8oXozdOoWZepeNbpkX7wjzXfFiFVT7RcyetFxUsDgpZVauScAvbif3YWALXBCDAQZ3OEX6yEabpPXGeg_nGPkN8OxKHJAss27I4HDlEE-3jhEY0PwxBfwcWGGD7PS9M-vgyR1Wwf7yKGpjBshTHguD_4og";
    const tier = user?.tier ?? "Premier Fellow";
    const joined = user?.joinedAt ?? "September 2018";
    const renewal = user?.renewalDate ?? "Oct 12, 2024";

    return (
        <div className="max-w-[1280px] mx-auto pb-16 pt-8">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <p className="text-[12px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Member Settings</p>
                    <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-slate-900">Edit Profile</h1>
                    {error && (
                        <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}
                </div>
                <div className="flex gap-4">
                    <button onClick={onCancel} className="px-6 py-2 border border-slate-300 text-slate-900 font-semibold rounded-lg hover:bg-slate-50 transition-all">
                        Cancel
                    </button>
                    <button onClick={handleSave} disabled={isSaving} className="px-8 py-2 bg-primary text-slate-900 font-bold rounded-lg hover:opacity-90 transition-all shadow-sm disabled:opacity-70 flex items-center gap-2">
                        {isSaving && <span className="material-symbols-outlined animate-spin text-[18px]">autorenew</span>}
                        Save Changes
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <IdentityCard name={name} setName={setName} email={email} setEmail={setEmail} bio={bio} setBio={setBio} />
                    <InterestsCard interests={interests} onRemove={handleRemoveInterest} onAdd={handleAddInterest} />
                </div>
                
                {/* Right Column */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <AvatarUploadCard avatar={avatar} name={name} />
                    <MembershipDetailsCard tier={tier} joined={joined} renewal={renewal} />
                </div>
                
                {/* Full Width */}
                <div className="lg:col-span-12">
                    <SecurityCard />
                </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row justify-end gap-6 items-center">
                <span className="text-slate-400 text-xs italic">All changes will be logged to the registry.</span>
                <div className="flex gap-4">
                    <button onClick={onCancel} className="px-6 py-2 text-slate-500 hover:text-slate-900 font-semibold transition-colors">Discard changes</button>
                    <button onClick={handleSave} disabled={isSaving} className="px-10 py-3 bg-slate-900 text-white font-semibold rounded-lg shadow-xl hover:bg-slate-800 transition-all flex items-center gap-2 disabled:opacity-70">
                        {isSaving ? (
                            <span className="material-symbols-outlined animate-spin text-sm">autorenew</span>
                        ) : (
                            <span className="material-symbols-outlined text-sm">save</span>
                        )}
                        Commit Profile Updates
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VisitorProfileEdit;
