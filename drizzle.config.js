import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './config/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_T7AghxNU8QHy@ep-quiet-sunset-ad0kmiu8-pooler.c-2.us-east-1.aws.neon.tech/ai-room-redesign?sslmode=require&channel_binding=require',
  },
});
