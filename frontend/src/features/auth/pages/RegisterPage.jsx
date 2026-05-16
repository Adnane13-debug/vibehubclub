import { useTranslation } from "react-i18next";
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../../services/api'

function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nom: '', prenom: '', email: '', mot_de_passe: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await api.post('/api/auth/register', form)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'inscription')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4.5rem)] w-full">
      {/* ── Left brand panel ── */}
      <div className="hidden lg:flex lg:w-[42%] flex-col items-center justify-center gap-8 bg-primary px-14 py-16">
        <img
          src="/logo vibe hub.svg"
          alt="VibeHub Logo"
          className="h-20 w-auto drop-shadow-[0_0_24px_rgba(255,255,255,0.4)]"
        />
        <div className="text-center">
          <h2 className="font-heading text-4xl font-black text-slate-900 leading-tight">
            Join the Vibe.
          </h2>
          <p className="mt-3 text-sm font-medium text-slate-800/70 max-w-xs">
            Sports, Culture, Entrepreneurship — one community to explore them all.
          </p>
        </div>
        <div className="flex gap-6 text-center">
          {[['500+', t("register.members")], ['40+', t("register.eventsYr")], ['3', t("register.domains")]].map(([num, label]) => (
            <div key={label} className="flex flex-col">
              <span className="text-2xl font-black text-slate-900">{num}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-800/60">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex flex-1 items-center justify-center bg-background-light px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile-only logo */}
          <div className="mb-8 flex justify-center lg:hidden">
            <img src="/logo vibe hub.svg" alt="VibeHub" className="h-12 w-auto" />
          </div>

          <h1 className="mb-1 font-heading text-3xl font-bold text-slate-900">
            Créer un compte
          </h1>
          <p className="mb-8 text-sm text-slate-500">
            Rejoignez le VibeHub Club — c'est gratuit.
          </p>

          {error && (
            <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name row — proper 2-col grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  required
                  value={form.nom}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Dupont"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Prénom
                </label>
                <input
                  type="text"
                  name="prenom"
                  required
                  value={form.prenom}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Marie"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Mot de passe
              </label>
              <input
                type="password"
                name="mot_de_passe"
                required
                value={form.mot_de_passe}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary mt-2 w-full justify-center py-3 text-sm font-bold disabled:opacity-60"
            >
              {loading ? 'Inscription en cours…' : "S'inscrire gratuitement"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Déjà membre ?{' '}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage