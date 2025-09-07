-- Initial database setup for GSC Intelligence
-- Enable required extensions

-- Enable pgcrypto for UUID generation and encryption
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Enable pg_trgm for text search and similarity
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create schemas for organization
CREATE SCHEMA IF NOT EXISTS core;
CREATE SCHEMA IF NOT EXISTS admin;
CREATE SCHEMA IF NOT EXISTS billing;
CREATE SCHEMA IF NOT EXISTS ops;
CREATE SCHEMA IF NOT EXISTS integ;
CREATE SCHEMA IF NOT EXISTS ingest;
CREATE SCHEMA IF NOT EXISTS seo;
CREATE SCHEMA IF NOT EXISTS ml;
CREATE SCHEMA IF NOT EXISTS serp;

-- Set up RLS (Row Level Security) by default
ALTER DATABASE postgres SET row_security = on;

-- Create custom types
CREATE TYPE core.membership_role AS ENUM ('owner', 'editor', 'viewer');
CREATE TYPE billing.subscription_status AS ENUM ('trialing', 'active', 'past_due', 'canceled', 'unpaid');
CREATE TYPE ingest.job_status AS ENUM ('pending', 'running', 'completed', 'failed', 'canceled');

-- Comments for documentation
COMMENT ON SCHEMA core IS 'Core entities: tenants, workspaces, memberships';
COMMENT ON SCHEMA admin IS 'Super admin: settings, feature flags, pricing, themes';
COMMENT ON SCHEMA billing IS 'Billing: subscriptions, usage counters, webhooks';
COMMENT ON SCHEMA ops IS 'Operations: audit logs, monitoring';
COMMENT ON SCHEMA integ IS 'Integrations: OAuth connections, properties';
COMMENT ON SCHEMA ingest IS 'Data ingestion: jobs, GSC data';
COMMENT ON SCHEMA seo IS 'SEO data: normalized pages, queries, clusters';
COMMENT ON SCHEMA ml IS 'Machine learning: clusters, embeddings';
COMMENT ON SCHEMA serp IS 'SERP data: snapshots, items, volatility';