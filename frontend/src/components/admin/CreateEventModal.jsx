import React, { useState } from 'react'
import api from '../../services/api'

function CreateEventModal({ isOpen, onClose, onSave }) {
  const [draft, setDraft] = useState({
    title: '',
    date: '',
    subtitle: '',
    category: 'Sports',
    description: '',
    image: ''
  })
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)

  if (!isOpen) return null

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Show local preview immediately
    setPreview(URL.createObjectURL(file))

    // Upload to Cloudinary via backend
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      const res = await api.post('/api/admin/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setDraft(prev => ({ ...prev, image: res.data.url }))
    } catch (err) {
      alert('Image upload failed. Please try again.')
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(draft)
    setDraft({ title: '', date: '', subtitle: '', category: 'Sports', description: '', image: '' })
    setPreview(null)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold text-slate-900">Create New Event</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Event Title</label>
            <input
              required
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
              value={draft.title}
              onChange={e => setDraft({ ...draft, title: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Event Date</label>
              <input
                required
                type="date"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                value={draft.date}
                onChange={e => setDraft({ ...draft, date: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Category</label>
              <select
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                value={draft.category}
                onChange={e => setDraft({ ...draft, category: e.target.value })}
              >
                <option>Sports</option>
                <option>Culture</option>
                <option>Entrepreneurship</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Subtitle / Time & Location</label>
            <input
              required
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="18:00 • Sky Lounge"
              value={draft.subtitle}
              onChange={e => setDraft({ ...draft, subtitle: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Description</label>
            <textarea
              rows={3}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
              value={draft.description}
              onChange={e => setDraft({ ...draft, description: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Image</label>

            {/* Preview */}
            {preview && (
              <div className="mb-2 rounded-lg overflow-hidden h-32 w-full">
                <img src={preview} alt="preview" className="w-full h-full object-cover" />
              </div>
            )}

            {/* Upload area */}
            <div className="flex w-full items-center justify-center">
              <label className={`flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors
                ${uploading ? 'border-primary bg-amber-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'}`}>
                <div className="flex flex-col items-center justify-center text-slate-500">
                  {uploading ? (
                    <>
                      <div className="mb-2 h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-primary" />
                      <p className="text-xs text-primary font-semibold">Uploading...</p>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined mb-1 text-2xl">cloud_upload</span>
                      <p className="text-xs">
                        <span className="font-semibold text-primary">
                          {preview ? 'Change image' : 'Click to upload'}
                        </span>
                        {' '}— PNG, JPG, GIF (max 5MB)
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={uploading}
                />
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-slate-900 shadow-sm hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateEventModal
