import { useTranslation } from "react-i18next";
import { useState } from 'react'
import { Link } from 'react-router-dom'
import GlowCard from '../../../components/shared/GlowCard'
import api from '../../../services/api'

function ContactComponent() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ nom: '', email: '', message: '' })
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await api.post('/api/public/contact', form)
      setSuccess('Message sent! We\`ll get back to you soon.')
      setForm({ nom: '', email: '', message: '' })
    } catch (err) {
      setError(err.response?.data?.message || t("contact.errorMessage"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 pb-8 pt-16 md:px-8">
        {/* Ambient glow */}
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-primary/80">
            <span aria-hidden className="inline-block h-px w-5 rounded-full bg-primary/50" />
            {t("contact.eyebrow")}
          </span>
          <h1 className="mb-4 max-w-xl text-4xl font-black leading-[1.1] tracking-tight text-slate-900 md:text-5xl">
            {t("contact.title1")}
            <br />
            <span className="text-primary">{t("contact.title2")}</span>
          </h1>
          <p className="max-w-md text-base leading-relaxed text-slate-500">
            {t("contact.subtitle")}
          </p>
        </div>
      </section>

      {/* ── MAIN GRID ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 pb-12 md:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-100 bg-white p-7 md:p-10">
              <h2 className="mb-1 text-xl font-bold tracking-tight text-slate-900">
                {t("contact.formTitle")}
              </h2>
              <p className="mb-7 text-sm text-slate-500">
                {t("contact.formSubtitle")}
              </p>

              {success && (
                <div className="mb-5 flex items-start gap-3 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                  <span className="material-symbols-outlined mt-0.5 shrink-0 text-[1rem]">check_circle</span>
                  {success}
                </div>
              )}
              {error && (
                <div className="mb-5 flex items-start gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  <span className="material-symbols-outlined mt-0.5 shrink-0 text-[1rem]">error</span>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                      {t("contact.fullName")}
                    </label>
                    <input
                      name="nom"
                      value={form.nom}
                      onChange={handleChange}
                      required
                      type="text"
                      placeholder={t("contact.fullNamePlaceholder")}
                      className="w-full rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/25 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                      {t("contact.emailAddress")}
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      type="email"
                      placeholder={t("contact.emailPlaceholder")}
                      className="w-full rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/25 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder={t("contact.messagePlaceholder")}
                    className="w-full rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/25 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-background-dark shadow-sm transition-all duration-200 hover:-translate-y-px hover:shadow-md active:scale-[0.98] disabled:opacity-60"
                >
                  {loading ? t("contact.sending") : t("contact.sendMessage")}
                  {!loading && (
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Info sidebar */}
          <div className="flex flex-col gap-4 lg:col-span-5">

            {/* Email */}
            <div className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 transition-all duration-200 hover:-translate-y-px hover:border-slate-200 hover:shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <span className="material-symbols-outlined text-[1.1rem] text-primary">alternate_email</span>
              </div>
              <div>
                <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">{t("contact.emailSupportLabel")}</p>
                <p className="text-sm font-semibold text-slate-900">{t("contact.emailSupportValue")}</p>
              </div>
            </div>

            {/* Location */}
            <div className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 transition-all duration-200 hover:-translate-y-px hover:border-slate-200 hover:shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                <span className="material-symbols-outlined text-[1.1rem] text-slate-500">location_on</span>
              </div>
              <div>
                <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">{t("contact.locationLabel")}</p>
                <p className="text-sm font-semibold text-slate-900">{t("contact.locationValue")}</p>
              </div>
            </div>

            {/* Social links */}
            <GlowCard className="rounded-2xl border border-slate-100 bg-white p-5">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-slate-400">{t("contact.followUs")}</p>
              <div className="flex flex-col gap-2">

                <a
                  href="#"
                  className="group flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-slate-900 group-hover:text-white">
                      {/* X / Twitter icon via SVG */}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.726-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">Twitter / X</span>
                  </div>
                  <span className="material-symbols-outlined text-[15px] text-slate-300 transition-colors group-hover:text-slate-500">arrow_forward</span>
                </a>

                <a
                  href="#"
                  className="group flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-gradient-to-br group-hover:from-pink-500 group-hover:to-orange-400 group-hover:text-white">
                      {/* Instagram icon */}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">Instagram</span>
                  </div>
                  <span className="material-symbols-outlined text-[15px] text-slate-300 transition-colors group-hover:text-slate-500">arrow_forward</span>
                </a>

                <a
                  href="#"
                  className="group flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      {/* LinkedIn icon */}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">LinkedIn</span>
                  </div>
                  <span className="material-symbols-outlined text-[15px] text-slate-300 transition-colors group-hover:text-slate-500">arrow_forward</span>
                </a>

              </div>
            </GlowCard>

          </div>
        </div>
      </section>

      {/* ── CTA SECTION ───────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 pb-12 md:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/8 via-primary/5 to-transparent p-[1px]">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/80 via-primary/[0.04] to-white/60 px-10 py-10 md:px-20 md:py-14">
            {/* Glows */}
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-primary/8 blur-2xl" />

            <div className="relative z-10 text-center">
              <span className="mb-5 inline-block rounded-full border border-primary/20 bg-primary/8 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary/80">
                {t("contact.studentsFirst")}
              </span>
              <h2 className="mb-4 text-3xl font-black leading-tight tracking-tight md:text-[2.6rem]">
                {t("contact.ctaTitle")}
              </h2>
              <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-slate-500">
                {t("contact.ctaSubtitle")}
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  to="/apply"
                  className="rounded-xl bg-primary px-9 py-3.5 text-sm font-bold text-background-dark shadow-sm transition-all duration-200 hover:-translate-y-px hover:shadow-md active:scale-[0.98]"
                >
                  Get started free
                </Link>
                <Link
                  to="/contact"
                  className="rounded-xl px-9 py-3.5 text-sm font-semibold text-slate-500 transition-colors duration-200 hover:text-primary"
                >
                  {t("contact.ctaTalkToUs")}
                </Link>
              </div>
              <p className="mt-5 text-xs text-slate-400">{t("contact.ctaFootnote")}</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}

export default ContactComponent