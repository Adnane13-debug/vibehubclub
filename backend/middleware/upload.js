import multer from 'multer'
import cloudinaryStorage from 'multer-storage-cloudinary'
import cloudinary from '../config/cloudinary.js'

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'vibehub-events',
  allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  transformation: [{ width: 1200, height: 600, crop: 'fill' }],
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
})

export default upload
