import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import IdentityCard from './edit/IdentityCard';
import InterestsCard from './edit/InterestsCard';
import AvatarUploadCard from './edit/AvatarUploadCard';
import MembershipDetailsCard from './edit/MembershipDetailsCard';
import SecurityCard from './edit/SecurityCard';

function VisitorProfileEdit({ user, onSave, onCancel }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [interests, setInterests] = useState([])
    const [avatar, setAvatar] = useState('')
    const [joined, setJoined] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState(null)

    const tier = 'Membre'
    const renewal = 'N/A'

    // Load real user data from API
    useEffect(() => {
        api.get('/api/member/profile')
            .then(res => {
                const u = res.data
                setName(`${u.prenom || ''} ${u.nom || ''}`.trim())
                setEmail(u.email || '')
                setBio(u.bio || '')
                setInterests(u.interests || [])
                setAvatar(u.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent((u.prenom || '') + '+' + (u.nom || ''))}&background=1e293b&color=f59f0a&bold=true&size=200`)
                setJoined(u.created_at
                    ? new Date(u.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                    : 'N/A'
                )
            })
            .catch(() => {
                // fallback to user from props
                if (user) {
                    setName(`${user.prenom || ''} ${user.nom || ''}`.trim())
                    setEmail(user.email || '')
                }
            })
    }, [])

    const handleRemoveInterest = (tag) => {
        setInterests(prev => prev.filter(i => i !== tag))
    }

    const handleAddInterest = () => {
        const newInterest = prompt("Add a new interest:")
        if (newInterest && !interests.includes(newInterest)) {
            setInterests(prev => [...prev, newInterest])
        }
    }

    const handleSave = async () => {
        setIsSaving(true)
        setError(null)
        try {
            const nameParts = name.trim().split(' ')
            const prenom = nameParts[0] || ''
            const nom = nameParts.slice(1).join(' ') || ''

            await api.put('/api/member/profile', { nom, prenom })

            // update localStorage
            const storedUser = JSON.parse(localStorage.getItem('vibehub_user') || '{}')
            const updatedUser = { ...storedUser, nom, prenom }
            localStorage.setItem('vibehub_user', JSON.stringify(updatedUser))

            onSave({ name, email, bio, interests })
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de la sauvegarde')
        } finally {
            setIsSaving(false)
        }
    }

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
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <IdentityCard name={name} setName={setName} email={email} setEmail={setEmail} bio={bio} setBio={setBio} />
                    <InterestsCard interests={interests} onRemove={handleRemoveInterest} onAdd={handleAddInterest} />
                </div>
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <AvatarUploadCard avatar={avatar} name={name} />
                    <MembershipDetailsCard tier={tier} joined={joined} renewal={renewal} />
                </div>
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
    )
}

export default VisitorProfileEdit