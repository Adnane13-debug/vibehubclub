import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from '../../../services/api'
import GoogleAuthButton from '../../../components/shared/GoogleAuthButton'
import { OrDivider } from '../../../components/shared/GoogleAuthButton'

function ApplyPage() {
  const { t } = useTranslation();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [googlePrefilled, setGooglePrefilled] = useState(false);
  const [notRegistered, setNotRegistered] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('google') === '1') {
      setNom(params.get('nom') || '')
      setPrenom(params.get('prenom') || '')
      setEmail(params.get('email') || '')
      setGooglePrefilled(true)
      setNotRegistered(params.get('notRegistered') === '1')
      window.history.replaceState({}, '', '/apply')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/api/public/apply", {
        nom,
        prenom,
        email,
        message: message || undefined,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || t("apply.errorDefault", "Something went wrong."));
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ──
  if (success) {
    return (
      <div className="flex min-h-[calc(100vh-4.5rem)] w-full">
        <div className="flex flex-1 items-center justify-center bg-background-light px-6 py-12">
          <div className="w-full max-w-md text-center">
            {/* Success icon */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 ring-1 ring-green-100">
              <span className="material-symbols-outlined text-[40px] text-green-500">
                check_circle
              </span>
            </div>

            <h1 className="mb-2 font-heading text-3xl font-bold text-slate-900">
              {t("apply.successTitle")}
            </h1>
            <p className="mb-8 text-sm leading-relaxed text-slate-500">
              {t("apply.successBody")}
            </p>

            <Link
              to="/login"
              className="btn-secondary inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              {t("apply.signIn")}
            </Link>
          </div>
        </div>

        {/* ── Right brand panel ── */}
        <div className="hidden lg:flex lg:w-[42%] flex-col items-center justify-center gap-8 bg-primary px-14 py-16">
          <img
            src="/logo vibe hub.svg"
            alt="VibeHub Logo"
            className="h-20 w-auto drop-shadow-[0_0_24px_rgba(255,255,255,0.4)]"
          />
          <div className="text-center">
            <h2 className="font-heading text-4xl font-black text-slate-900 leading-tight">
              {t("apply.brandTitle")}
            </h2>
            <p className="mt-3 text-sm font-medium text-slate-800/70 max-w-xs">
              {t("apply.brandSubtitle")}
            </p>
          </div>
          <div className="flex gap-6 text-center">
            {[
              ["500+", t("login.members")],
              ["40+", t("login.eventsYr")],
              ["3", t("login.domains")],
            ].map(([num, label]) => (
              <div key={label} className="flex flex-col">
                <span className="text-2xl font-black text-slate-900">{num}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-800/60">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Form state ──
  return (
    <div className="flex min-h-[calc(100vh-4.5rem)] w-full">
      {/* ── Left form panel ── */}
      <div className="flex flex-1 items-center justify-center bg-background-light px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile-only logo */}
          <div className="mb-8 flex justify-center lg:hidden">
            <img src="/logo vibe hub.svg" alt="VibeHub" className="h-12 w-auto" />
          </div>

          <h1 className="mb-1 font-heading text-3xl font-bold text-slate-900">
            {t("apply.title")}
          </h1>
          <p className="mb-8 text-sm text-slate-500">
            {t("apply.subtitle")}
          </p>

          {error && (
            <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {notRegistered && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <span className="material-symbols-outlined text-[18px]">info</span>
              Aucun compte associé à cet email. Complétez votre demande d&apos;adhésion ci-dessous.
            </div>
          )}

          {googlePrefilled && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              Informations récupérées depuis Google — vérifiez et soumettez.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Nom / Prénom row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {t("apply.nom")}
                </label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Rivera"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {t("apply.prenom")}
                </label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Alex"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                {t("apply.email")}
              </label>
              <input
                type="email"
                required
                maxLength={255}
                readOnly={googlePrefilled}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${googlePrefilled ? 'bg-slate-50 cursor-not-allowed' : 'bg-white'}`}
                placeholder="alex@example.com"
              />
            </div>

            {/* Motivation message */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                {t("apply.message")}
              </label>
              <textarea
                rows={4}
                maxLength={1000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder={t("apply.messagePlaceholder")}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary mt-2 w-full justify-center py-3 text-sm font-bold disabled:opacity-60"
            >
              {loading ? t("apply.submitting") : t("apply.submit")}
            </button>
          </form>

          <OrDivider />
          <GoogleAuthButton mode="apply" label="Postuler avec Google" />

          <p className="mt-6 text-center text-sm text-slate-500">
            {t("apply.alreadyMember")}{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              {t("apply.signIn")}
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right brand panel ── */}
      <div className="hidden lg:flex lg:w-[42%] flex-col items-center justify-center gap-8 bg-primary px-14 py-16">
        <img
          src="/logo vibe hub.svg"
          alt="VibeHub Logo"
          className="h-20 w-auto drop-shadow-[0_0_24px_rgba(255,255,255,0.4)]"
        />
        <div className="text-center">
          <h2 className="font-heading text-4xl font-black text-slate-900 leading-tight">
            {t("apply.brandTitle")}
          </h2>
          <p className="mt-3 text-sm font-medium text-slate-800/70 max-w-xs">
            {t("apply.brandSubtitle")}
          </p>
        </div>
        <div className="flex gap-6 text-center">
          {[
            ["500+", t("login.members")],
            ["40+", t("login.eventsYr")],
            ["3", t("login.domains")],
          ].map(([num, label]) => (
            <div key={label} className="flex flex-col">
              <span className="text-2xl font-black text-slate-900">{num}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-800/60">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ApplyPage;
