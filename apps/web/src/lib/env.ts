/**
 * Environment validation and startup guards
 * This file runs at application startup to ensure all required environment variables are present
 */

import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().default('GSC Intelligence'),
  NEXT_PUBLIC_ENV: z.enum(['dev', 'staging', 'prod']).default('dev'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  CRON_SECRET: z.string().min(32),
});

export function validateEnvironment() {
  try {
    const env = envSchema.parse(process.env);
    console.log('✅ Environment validation passed');
    return env;
  } catch (error) {
    console.error('❌ Environment validation failed:', error);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    throw error;
  }
}

// Validate on import in non-test environments
if (process.env.NODE_ENV !== 'test') {
  validateEnvironment();
}