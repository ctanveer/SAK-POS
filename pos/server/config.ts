import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT ?? 3000,
  MONGO_URI: process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/bento-pos",
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? '*',
  SKELETON_URL: process.env.SKELETON_URL ?? "http://localhost:4000",
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS
}