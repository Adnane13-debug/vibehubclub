import { useState } from "react";
import VisitorHeader from "./VisitorHeader";
import CuratorProfileCard from "./CuratorProfileCard";
import UpgradeCTA from "./UpgradeCTA";
import EmptyActivities from "./EmptyActivities";
import VisitorProfileEdit from "./VisitorProfileEdit";

/**
 * VisitorProfile - Refactored orchestrator component.
 */
function VisitorProfile({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  
  // local state for user data (to reflect changes without backend for now)
  const [userData, setUserData] = useState(user || {});

  const handleSave = (updatedData) => {
    setUserData(prev => ({ ...prev, ...updatedData }));
    setIsEditing(false);
  };

  const displayName = userData?.name ?? "Julian Vane";
  const email = userData?.email ?? "j.vane@athenaeum.org";
  const joined = userData?.joinedAt ?? "September 2018";
  const bio =
    userData?.bio ??
    "Senior Fellow at the Royal Society of Historical Inquiry. Curator of the 18th-century cartography collection.";
  const interests = userData?.interests ?? ["Cartography", "Manuscripts", "Numismatics"];
  const avatar =
    userData?.avatarUrl ??
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDYV2LKd_sq_cj9XqVyuvFBHyq-8OXbweWkhqVjpDwRm0PkH9_s3haM0Q6gsU03IO9ZZ07gGTSVSuEfY0p8uQ3pYB2gAC_FUjTE3ODYJBZpfpKmcVHUV8oXozdOoWZepeNbpkX7wjzXfFiFVT7RcyetFxUsDgpZVauScAvbif3YWALXBCDAQZ3OEX6yEabpPXGeg_nGPkN8OxKHJAss27I4HDlEE-3jhEY0PwxBfwcWGGD7PS9M-vgyR1Wwf7yKGpjBshTHguD_4og";

  if (isEditing) {
    return <VisitorProfileEdit user={userData} onSave={handleSave} onCancel={() => setIsEditing(false)} />;
  }

  return (
    <div className="pb-16 pt-8 max-w-[1280px] mx-auto">
      <div className="flex justify-end mb-4">
        <button 
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-lg font-semibold transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">edit</span>
          Edit Profile
        </button>
      </div>

      <VisitorHeader 
        avatar={avatar} 
        displayName={displayName} 
        bio={bio} 
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <CuratorProfileCard 
          email={email} 
          joined={joined} 
          interests={interests} 
        />

        <UpgradeCTA />

        <EmptyActivities />
      </div>
    </div>
  );
}

export default VisitorProfile;
