import React from 'react';
import { useVisitorData } from '../hooks/useVisitorData';
import VisitorProfile from '../../../components/profile/VisitorProfile';

function VisitorPage() {
  const { user, loading, error } = useVisitorData();

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4.5rem)] w-full items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-primary text-4xl">autorenew</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-lg pt-20 px-6">
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      </div>
    );
  }

  if (!user) return null;

  const mappedUser = {
    ...user,
    name: `${user.nom || ''} ${user.prenom || ''}`.trim(),
    email: user.email,
    avatarUrl: user.photo,
    joinedAt: user.created_at ? new Date(user.created_at).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : 'En attente',
    tier: 'Visiteur',
    renewalDate: "En attente d'approbation"
  };

  return <VisitorProfile user={mappedUser} />;
}

export default VisitorPage;
