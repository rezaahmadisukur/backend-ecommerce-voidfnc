import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config'; // Ensure environment variables are loaded immediately
import { Pool } from 'pg';
import { bearer } from 'better-auth/plugins';

// 1. Setup the PG Pool manually
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
// 2. Setup the Adapter
const adapter = new PrismaPg(pool);
// 3. Initialize Prisma with the Adapter
const prisma = new PrismaClient({ adapter });
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  advanced: {
    disableCSRFCheck: true,
  },
  // Crucial for the "Invalid Origin" error we saw earlier
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:4000',
  plugins: [bearer()],
});
