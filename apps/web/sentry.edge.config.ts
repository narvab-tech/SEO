// This file configures the initialization of Sentry for edge runtime.
// The config you add here will be used whenever one of the edge runtime APIs
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: process.env.NEXT_PUBLIC_ENV || 'development',
    // Performance Monitoring
    tracesSampleRate: process.env.NEXT_PUBLIC_ENV === 'prod' ? 0.1 : 1.0,
    // Session Replay is not supported in edge runtime
    
    // Additional SDK configuration goes here
    debug: process.env.NEXT_PUBLIC_ENV === 'dev',
  });
}