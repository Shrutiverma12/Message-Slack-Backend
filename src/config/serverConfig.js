import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;

export const NODE_ENV = process.env.NODE_ENV || 'development';

export const DEV_DB_URL = process.env.DEV_DB_URL;

export const PROD_DB_URL = process.env.PROD_DB_URL;

export const JWT_SECRET = process.env.JWT_SECRET;

export const JWT_EXPIRE = process.env.JWT_EXPIRE || '1d';

export const MAIL_ID = process.env.MAIL_ID;

export const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';

export const REDIS_PORT = process.env.REDIS_PORT || 6379;

export const APP_LINK = process.env.APP_LINK || 'http://localhost:3000';

export const ENABLE_EMAIL_VERIFICATION =
  process.env.ENABLE_EMAIL_VERIFICATION || false;

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;

export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;

export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export const CURRENCY = process.env.CURRENCY || 'INR';

export const RECEIPT_SECRET = process.env.RECEIPT_SECRET || 'receipt_1103';
