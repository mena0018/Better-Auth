import { env } from '@/lib/env';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '@/db/schemas/auth.db.schema';

const dbEnv = env.DATABASE_URL;

if (!dbEnv) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}

console.log(dbEnv);
const sql = neon(dbEnv);
export const db = drizzle(sql, { schema });
