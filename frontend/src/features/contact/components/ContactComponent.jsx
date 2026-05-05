import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdAlternateEmail, MdLocationOn, MdArrowForward } from 'react-icons/md'
import { FaXTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import api from '../../../services/api'

function ContactComponent() {
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
      setSuccess('Message envoyé avec succès! Nous vous répondrons bientôt.')
      setForm({ nom: '', email: '', message: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'envoi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 -z-10" />
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-slate-900 mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Have a question or just want to vibe? Reach out and our team will get back to you shortly.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="max-w-7xl mx-auto px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-slate-100">
            <h2 className="text-3xl font-bold tracking-tight mb-8 text-slate-900">
              Send us a message
            </h2>

            {success && (
              <div className="mb-6 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}
            {error && (
              <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                    Full Name
                  </label>
                  <input
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-100 border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-slate-400 text-slate-900"
                    placeholder="Alex Rivera"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                    Email Address
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-100 border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-slate-400 text-slate-900"
                    placeholder="alex@vibe.com"
                    type="email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-100 border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-slate-400 text-slate-900"
                  placeholder="How can we help you?"
                  rows="5"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-10 py-4 bg-primary text-background-dark rounded-full font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300"
              >
                {loading ? 'Envoi...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            <div className="group bg-slate-50 p-8 rounded-xl flex items-center gap-6 hover:bg-slate-100 transition-colors duration-300">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
                <MdAlternateEmail size={30} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Email Support</p>
                <p className="text-lg font-semibold text-slate-900">support@vibehubclub.ma</p>
              </div>
            </div>

            <div className="group bg-slate-50 p-8 rounded-xl flex items-center gap-6 hover:bg-slate-100 transition-colors duration-300">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-slate-500 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <MdLocationOn size={30} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">HQ Location</p>
                <p className="text-lg font-semibold text-slate-900">CMC OFPPT, Casablanca, Morocco</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <a className="bg-sky-50 hover:bg-sky-100 p-8 rounded-xl flex flex-col items-center justify-center gap-3 transition-colors group" href="#">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sky-500 shadow-sm">
                  <FaXTwitter size={22} />
                </div>
                <span className="font-bold text-sm text-slate-700">Twitter / X</span>
              </a>
              <a className="bg-pink-50 hover:bg-pink-100 p-8 rounded-xl flex flex-col items-center justify-center gap-3 transition-colors group" href="#">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-pink-500 shadow-sm">
                  <FaInstagram size={22} />
                </div>
                <span className="font-bold text-sm text-slate-700">Instagram</span>
              </a>
              <a className="col-span-2 bg-white border border-slate-100 p-6 rounded-xl flex items-center justify-between group hover:border-primary/30 transition-all" href="#">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <FaLinkedinIn size={20} />
                  </div>
                  <span className="font-bold text-slate-800">Connect on LinkedIn</span>
                </div>
                <MdArrowForward size={22} className="text-slate-300 group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-8 mb-24">
        <div className="relative bg-background-dark rounded-3xl p-12 md:p-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent opacity-50" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6">
              Ready to find your vibe?
            </h2>
            <p className="text-lg text-white/70 max-w-xl mb-10">
              Join the largest student community on campus and start building your legacy today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="px-10 py-4 bg-white text-background-dark rounded-full font-bold hover:scale-105 transition-transform duration-300">
                Join the Club
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ContactComponent