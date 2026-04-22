import VisitorHeader from "./VisitorHeader";
import CuratorProfileCard from "./CuratorProfileCard";
import UpgradeCTA from "./UpgradeCTA";
import EmptyActivities from "./EmptyActivities";

/**
 * VisitorProfile - Refactored orchestrator component.
 */
function VisitorProfile({ user }) {
  const displayName = user?.name ?? "Guest";
  const email = user?.email ?? "—";
  const joined = user?.joinedAt ?? "—";
  const bio =
    user?.bio ??
    "Explore the club and upgrade when you are ready to unlock the full experience.";
  const interests = user?.interests ?? [];
  const avatar =
    user?.avatarUrl ??
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAhympUU7yJ0UXIaO_ZWPeAleXI5I85h-3Xz6xnWB8Zd3VyhUJDSEq4y-j6nvk2ycBufoBluGLqOrlrpENLOd5xt2vlc5TJ0w2NBHxtQobN5ERyJvt1vZqXlF2dvXZeMewaFhdzApQ5njfa2sxuJ3msuMBuwddeSuKW62GXUdJ-zafIjX7u5OnyEP4ojUkGXOAwfKgZYCWdcqZb-wVpOlk5Topjvy97ga5ndS_KOS3qbroXprePsk44VJA-4clzNqmo6V_Qn9fGXpw";

  return (
    <div className="pb-16 pt-8">
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
