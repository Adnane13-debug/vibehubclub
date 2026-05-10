import { useState } from "react";

/**
 * AdminProfileSettings – premium profile settings panel for the admin dashboard.
 * Replaces VisitorProfileEdit in the admin context only.
 * VisitorProfileEdit.jsx is NOT modified.
 */
function AdminProfileSettings({ user, onSave, onCancel }) {
  const [name, setName] = useState(user?.name ?? user?.prenom ?? "Admin");
  const [email, setEmail] = useState(user?.email ?? "admin@vibehub.com");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [role] = useState(user?.role ?? "Administrateur");
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [activeSection, setActiveSection] = useState("general");
  const [saved, setSaved] = useState(false);

  const avatar =
    user?.photo ||
    user?.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1e293b&color=f59f0a&bold=true&size=200`;

  const handleSave = () => {
    onSave({ name, email, bio });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sections = [
    { id: "general", label: "General", icon: "person" },
    { id: "security", label: "Security", icon: "lock" },
    { id: "preferences", label: "Preferences", icon: "tune" },
  ];

  return (
    <div className="mx-auto max-w-4xl pb-12">
      {/* ── Page header ── */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Admin Console</p>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900">Profile Settings</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-colors hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold shadow-sm transition-all ${
              saved
                ? "bg-emerald-500 text-white"
                : "bg-slate-900 text-white hover:bg-slate-700"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {saved ? "check_circle" : "save"}
            </span>
            {saved ? "Saved!" : "Save changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* ── Left: avatar + nav ── */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          {/* Avatar card */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
            <div className="relative mx-auto mb-4 h-24 w-24">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-amber-400/30 to-amber-100/20 blur" />
              <img
                src={avatar}
                alt=""
                className="relative h-24 w-24 rounded-2xl border-2 border-white object-cover shadow-md"
              />
              <button className="absolute -bottom-1.5 -right-1.5 flex h-8 w-8 items-center justify-center rounded-xl border-2 border-white bg-slate-900 text-white shadow-md hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined text-[14px]">photo_camera</span>
              </button>
            </div>
            <p className="font-heading text-sm font-bold text-slate-900">{name}</p>
            <span className="mt-1 inline-block rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-700">
              {role}
            </span>
          </div>

          {/* Section nav */}
          <nav className="rounded-2xl border border-slate-100 bg-white p-2 shadow-sm">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors ${
                  activeSection === s.id
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{s.icon}</span>
                {s.label}
              </button>
            ))}
          </nav>
        </div>

        {/* ── Right: settings panels ── */}
        <div className="lg:col-span-3">

          {/* General */}
          {activeSection === "general" && (
            <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
              <h2 className="mb-6 font-heading text-lg font-bold text-slate-900">General Information</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                      Display Name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                      Role
                    </label>
                    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                      <span className="material-symbols-outlined text-[16px] text-slate-400">shield</span>
                      <span className="text-sm font-semibold text-slate-600">{role}</span>
                      <span className="ml-auto rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-500">Read-only</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[16px] text-slate-400">mail</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Bio <span className="font-normal normal-case text-slate-400">(optional)</span>
                  </label>
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="A short description about yourself…"
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 placeholder:text-slate-300"
                  />
                  <p className="mt-1 text-right text-xs text-slate-400">{bio.length}/280</p>
                </div>
              </div>

              <div className="mt-8 flex justify-end border-t border-slate-50 pt-6">
                <button
                  onClick={handleSave}
                  className={`inline-flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-bold shadow-sm transition-all ${
                    saved ? "bg-emerald-500 text-white" : "bg-slate-900 text-white hover:bg-slate-700"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{saved ? "check_circle" : "save"}</span>
                  {saved ? "Saved!" : "Save changes"}
                </button>
              </div>
            </div>
          )}

          {/* Security */}
          {activeSection === "security" && (
            <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
              <h2 className="mb-2 font-heading text-lg font-bold text-slate-900">Security</h2>
              <p className="mb-6 text-sm text-slate-500">Manage your password and account access.</p>

              <div className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">Current Password</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[16px] text-slate-400">lock</span>
                    <input
                      type="password"
                      value={currentPwd}
                      onChange={(e) => setCurrentPwd(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">New Password</label>
                    <input
                      type="password"
                      value={newPwd}
                      onChange={(e) => setNewPwd(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPwd}
                      onChange={(e) => setConfirmPwd(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                    />
                  </div>
                </div>

                {/* Password strength indicator */}
                {newPwd && (
                  <div>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-slate-500">Password strength</span>
                      <span className={newPwd.length >= 12 ? "font-semibold text-emerald-600" : newPwd.length >= 8 ? "font-semibold text-amber-600" : "font-semibold text-red-500"}>
                        {newPwd.length >= 12 ? "Strong" : newPwd.length >= 8 ? "Medium" : "Weak"}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${
                          i === 0 && newPwd.length >= 1 ? "bg-red-400" :
                          i === 0 && newPwd.length >= 8 ? "bg-amber-400" : ""
                        } ${
                          i === 0 ? (newPwd.length >= 1 ? (newPwd.length >= 8 ? "bg-emerald-400" : "bg-amber-400") : "bg-slate-200") :
                          i === 1 ? (newPwd.length >= 8 ? (newPwd.length >= 12 ? "bg-emerald-400" : "bg-amber-400") : "bg-slate-200") :
                          newPwd.length >= 12 ? "bg-emerald-400" : "bg-slate-200"
                        }`} />
                      ))}
                    </div>
                  </div>
                )}

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <span className="material-symbols-outlined text-[14px] text-slate-400">info</span>
                    Password changes will be wired to the backend in the next release.
                  </p>
                </div>

                <div className="flex justify-end border-t border-slate-50 pt-4">
                  <button className="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white hover:bg-slate-700 transition-colors disabled:opacity-40"
                    disabled={!currentPwd || !newPwd || newPwd !== confirmPwd}>
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Preferences */}
          {activeSection === "preferences" && (
            <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
              <h2 className="mb-2 font-heading text-lg font-bold text-slate-900">Preferences</h2>
              <p className="mb-6 text-sm text-slate-500">Customize your dashboard experience.</p>

              <div className="space-y-4">
                {[
                  { label: "Email notifications for new members", desc: "Get notified when someone requests to join.", icon: "person_add", defaultOn: true },
                  { label: "Event RSVP alerts", desc: "Receive alerts when events reach attendance milestones.", icon: "event_available", defaultOn: true },
                  { label: "Weekly analytics digest", desc: "A weekly summary of platform metrics sent to your email.", icon: "bar_chart", defaultOn: false },
                  { label: "System maintenance alerts", desc: "Critical system notifications and downtime warnings.", icon: "warning", defaultOn: true },
                ].map((pref) => (
                  <PrefToggle key={pref.label} {...pref} />
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4">
                <p className="text-xs font-medium text-amber-700">
                  <span className="font-bold">Note:</span> Preference changes will be persisted to backend in a future update.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PrefToggle({ label, desc, icon, defaultOn }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4 transition-colors hover:bg-slate-50">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
          <span className="material-symbols-outlined text-[18px]">{icon}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{label}</p>
          <p className="text-xs text-slate-400">{desc}</p>
        </div>
      </div>
      <button
        onClick={() => setOn((v) => !v)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
          on ? "bg-slate-900" : "bg-slate-200"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ${
            on ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default AdminProfileSettings;
