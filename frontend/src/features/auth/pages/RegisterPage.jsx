import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../../services/api'

function RegisterPage() {
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
    <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg">
      <h1 className="mb-2 font-heading text-3xl font-bold text-slate-900">
        Créer un compte
      </h1>
      <p className="mb-8 text-sm text-slate-600">
        Rejoignez le Vibe Hub Club
      </p>

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium text-slate-700">Nom</label>
            <input
              type="text"
              name="nom"
              required
              value={form.nom}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none"
              placeholder="Votre nom"
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium text-slate-700">Prénom</label>
            <input
              type="text"
              name="prenom"
              required
              value={form.prenom}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none"
              placeholder="Votre prénom"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none"
            placeholder="votre@email.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Mot de passe</label>
          <input
            type="password"
            name="mot_de_passe"
            required
            value={form.mot_de_passe}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center"
        >
          {loading ? 'Inscription...' : 'S\'inscrire'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Déjà membre ?{' '}
        <Link to="/login" className="font-semibold text-primary">
          Se connecter
        </Link>
      </p>
    </div>
  )
}

export default RegisterPage