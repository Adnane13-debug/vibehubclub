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
    <div className="min-h-[calc(100vh-4.5rem)] bg-gradient-to-b from-white to-slate-50/50 pb-16 pt-6 sm:pt-10">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <VisitorHeader 
          avatar={avatar} 
          displayName={displayName} 
          bio={bio} 
          onEdit={() => setIsEditing(true)}
        />

        {/* 
          Main Grid 
          - Compact top row: Profile Info + CTA
          - Bottom row: Empty state / Activities
        */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-5 h-full">
            <CuratorProfileCard 
              email={email} 
              joined={joined} 
              interests={interests} 
            />
          </div>

          <div className="md:col-span-7 h-full">
            <UpgradeCTA />
          </div>

          <div className="md:col-span-12">
            <EmptyActivities />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitorProfile;
