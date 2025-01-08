import { v2 as cloudinary } from 'cloudinary'; // Import v2 for all Cloudinary methods

import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME
} from './serverConfig.js';

// Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

// Export the configured Cloudinary instance and uploader
export const cloudinaryConfig = cloudinary; // Contains methods like `url`
export const uploader = cloudinary.uploader; // Contains methods like `upload`
