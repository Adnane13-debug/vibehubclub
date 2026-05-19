import React, { useState } from 'react'
import api from '../../../services/api'

function SecurityCard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
    setStep(1)
    setCode('')
    setNewPassword('')
    setConfirmPassword('')
    setError(null)
    setSuccess(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setStep(1)
    setCode('')
    setNewPassword('')
    setConfirmPassword('')
    setError(null)
    setSuccess(false)
  }

  const handleRequestCode = async () => {
    setLoading(true)
    setError(null)
    try {
      await api.post('/api/member/password/request-change')
      setStep(2)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send verification code')
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmChange = async () => {
    if (!code.trim()) return setError('Please enter the verification code')
    if (!newPassword) return setError('Please enter a new password')
    if (newPassword.length < 8) return setError('Password must be at least 8 characters')
    if (newPassword !== confirmPassword) return setError('Passwords do not match')

    setLoading(true)
    setError(null)
    try {
      await api.post('/api/member/password/confirm-change', {
        code: code.trim(),
        newPassword,
        confirmPassword
      })
      setSuccess(true)
      setTimeout(() => closeModal(), 2500)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* ── Security Card ── */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <span className="material-symbols-outlined text-[18px]">lock</span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Security</p>
              <p className="font-heading text-sm font-bold text-slate-900">Password & Access</p>
            </div>
          </div>
          <button
            type="button"
            onClick={openModal}
            className="shrink-0 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Change
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
          <span className="material-symbols-outlined text-[14px] text-emerald-500">shield</span>
          <p className="text-xs text-slate-500">Your password is protected</p>
        </div>
      </div>

      {/* ── Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-sm rounded-2xl border border-slate-100 bg-white shadow-2xl">

            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-slate-50 px-6 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100">
                  <span className="material-symbols-outlined text-[15px] text-amber-600">
                    {success ? 'check_circle' : step === 1 ? 'lock' : 'mark_email_read'}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-900">
                  {success ? 'All done!' : step === 1 ? 'Change Password' : 'Verify & Update'}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="p-6">

              {/* ── Success ── */}
              {success ? (
                <div className="py-4 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
                    <span className="material-symbols-outlined text-[28px] text-emerald-600">check_circle</span>
                  </div>
                  <p className="font-heading text-base font-bold text-slate-900">Password Updated</p>
                  <p className="mt-1 text-xs text-slate-400">Your account is now secured with your new password.</p>
                </div>

              ) : step === 1 ? (
                /* ── Step 1: Send code ── */
                <>
                  <p className="mb-5 text-sm text-slate-500 leading-relaxed">
                    We'll send a <span className="font-semibold text-slate-700">6-digit code</span> to your registered email to confirm your identity before making any changes.
                  </p>

                  {error && (
                    <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5">
                      <span className="material-symbols-outlined text-[15px] text-red-500 mt-0.5 shrink-0">error</span>
                      <p className="text-xs text-red-600">{error}</p>
                    </div>
                  )}

                  <button
                    onClick={handleRequestCode}
                    disabled={loading}
                    className="w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-700 disabled:opacity-50"
                  >
                    {loading
                      ? <span className="flex items-center justify-center gap-2"><span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white"/> Sending…</span>
                      : 'Send Verification Code'
                    }
                  </button>
                </>

              ) : (
                /* ── Step 2: Code + new password ── */
                <>
                  <div className="mb-5 flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-100 px-3 py-2.5">
                    <span className="material-symbols-outlined text-[15px] text-amber-600 shrink-0">mail</span>
                    <p className="text-xs text-amber-700 font-medium">Code sent — check your inbox</p>
                  </div>

                  <div className="space-y-3">
                    {/* Code input */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Verification Code
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={code}
                        onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
                        placeholder="• • • • • •"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-center font-mono text-xl font-black tracking-[0.5em] text-slate-900 placeholder-slate-200 transition-colors focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                      />
                    </div>

                    {/* New password */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="Minimum 8 characters"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                      />
                    </div>

                    {/* Confirm */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Repeat your new password"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="mt-3 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5">
                      <span className="material-symbols-outlined text-[15px] text-red-500 mt-0.5 shrink-0">error</span>
                      <p className="text-xs text-red-600">{error}</p>
                    </div>
                  )}

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => { setStep(1); setError(null) }}
                      className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handleConfirmChange}
                      disabled={loading}
                      className="flex-1 rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-700 transition-colors disabled:opacity-50"
                    >
                      {loading
                        ? <span className="flex items-center justify-center gap-1.5"><span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white"/> Updating…</span>
                        : 'Update Password'
                      }
                    </button>
                  </div>

                  <p className="mt-3 text-center text-[11px] text-slate-400">
                    Didn't receive the code?{' '}
                    <button
                      onClick={handleRequestCode}
                      disabled={loading}
                      className="font-semibold text-amber-600 hover:underline disabled:opacity-40"
                    >
                      Resend
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SecurityCard