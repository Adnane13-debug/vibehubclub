import { useState, useEffect } from "react";
import axios from "axios";

/**
 * UpgradeCTA - Call to action card for visitors to join the club.
 */
function UpgradeCTA() {
  const [status, setStatus] = useState("idle"); // idle, loading, sent

  useEffect(() => {
    const isSent = localStorage.getItem("vibehub_demande_sent");
    if (isSent === "true") {
      setStatus("sent");
    }
  }, []);

  const handleRequestMember = async () => {
    setStatus("loading");
    try {
      const token = localStorage.getItem("vibehub_token");
      await axios.post("http://localhost:5000/api/auth/request-member", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStatus("sent");
      localStorage.setItem("vibehub_demande_sent", "true");
    } catch (err) {
      console.error("Failed to send request", err);
      setStatus("idle");
    }
  };

  return (
    <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-slate-900 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all hover:shadow-[0_16px_40px_rgb(0,0,0,0.2)]">
      {/* Subtle Background Glow */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-[80px] transition-all duration-700 group-hover:bg-primary/30" />
      
      <div className="relative z-10">
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-inset ring-white/20 backdrop-blur-md">
          <span className="material-symbols-outlined text-[14px] text-primary">workspace_premium</span>
          Membership
        </div>
        <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Unlock Full Access
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Join the exclusive community of creators. Get access to private channels, premium assets, and members-only events.
        </p>
      </div>
      
      <div className="relative z-10 mt-8">
        {status === "sent" ? (
          <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/20 backdrop-blur-md">
            <span className="material-symbols-outlined text-[18px]">schedule</span>
            En attente de validation...
          </div>
        ) : (
          <button
            onClick={handleRequestMember}
            disabled={status === "loading"}
            className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-bold text-slate-900 shadow-lg shadow-primary/25 ring-1 ring-inset ring-primary/50 transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 disabled:translate-y-0 disabled:opacity-70"
          >
            {status === "loading" ? (
              <span className="material-symbols-outlined animate-spin text-[18px]">autorenew</span>
            ) : (
              <>
                Demander l'accès
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default UpgradeCTA;
