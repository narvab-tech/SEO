import { z } from 'zod';

/**
 * Environment configuration schema for GSC Intelligence
 * Based on the requirements from the product specification
 */
export const envSchema = z.object({
  // App Configuration
  NEXT_PUBLIC_APP_NAME: z.string().default('GSC Intelligence'),
  NEXT_PUBLIC_ENV: z.enum(['dev', 'staging', 'prod']).default('dev'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  
  // Supabase Configuration
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  
  // Observability
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
  
  // Redis for rate limiting and queues
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  
  // Payment Providers
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),
  PAYPAL_CLIENT_ID: z.string().optional(),
  PAYPAL_CLIENT_SECRET: z.string().optional(),
  PAYPAL_ENV: z.enum(['sandbox', 'live']).default('sandbox'),
  
  // Google OAuth for GSC
  GSC_GOOGLE_OAUTH_CLIENT_ID: z.string().optional(),
  GSC_GOOGLE_OAUTH_CLIENT_SECRET: z.string().optional(),
  GSC_REDIRECT_URL: z.string().url().optional(),
  
  // Email Service
  EMERALD_EMAIL_API_KEY: z.string().optional(),
  
  // ML/AI Services
  HUGGINGFACE_ENDPOINT_URL: z.string().url().optional(),
  HUGGINGFACE_API_TOKEN: z.string().optional(),
  
  // Security
  CRON_SECRET: z.string().min(32),
  
  // Feature Limits
  COPILOT_USAGE_BUDGET_STARTER: z.coerce.number().default(100),
  COPILOT_USAGE_BUDGET_PRO: z.coerce.number().default(1000),
  
  // Super Admin
  SUPERADMINS: z.string().optional(), // Comma-separated email list
});

export type Env = z.infer<typeof envSchema>;

/**
 * Validates and returns typed environment variables
 * Throws if validation fails
 */
export function validateEnv(): Env {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid environment variables:', error);
    throw new Error('Environment validation failed');
  }
}

/**
 * Runtime guard to ensure required environment variables are present
 * Call this at application startup
 */
export function guardRequiredEnv(): void {
  const requiredInProduction = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY', 
    'SUPABASE_SERVICE_ROLE_KEY',
    'CRON_SECRET'
  ];
  
  const env = process.env.NODE_ENV || 'development';
  
  if (env === 'production') {
    const missing = requiredInProduction.filter(key => !process.env[key]);
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables in production: ${missing.join(', ')}`);
    }
  }
  
  // Always validate the full schema
  validateEnv();
}

export default envSchema;