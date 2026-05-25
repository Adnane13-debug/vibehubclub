import multer from 'multer'
import pkg from 'multer-storage-cloudinary'
const { CloudinaryStorage } = pkg
import cloudinary from '../config/cloudinary.js'

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:          'vibehub-events',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 1200, height: 600, crop: 'fill' }]
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
})

export default upload