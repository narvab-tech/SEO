# GSC Intelligence

**Supabase + Vercel SaaS for marketers: GSC ingest, clustering, cannibalization, CTR gap, opportunities, briefs, link planner.**

## 🚀 Features

- **Google Search Console Integration**: Automated data ingestion with 16-month backfill
- **AI-Powered Clustering**: Topic clustering with embeddings and auto-labeling
- **Advanced Analytics**: CTR gap analysis, cannibalization detection, SERP volatility
- **Multi-tenant Architecture**: Workspace-scoped tenancy with role-based access control
- **Flexible Billing**: Razorpay + PayPal integration with trials and proration
- **Feature Gating**: Plan-based limits and feature access control

## 🏗️ Architecture

### Stack
- **Frontend**: Next.js 14 App Router, TypeScript, Tailwind CSS, shadcn/ui
- **API**: Next.js Route Handlers with Zod validation
- **Database**: Supabase Postgres with RLS, SQL migrations, pgcrypto, pg_trgm
- **Auth**: Supabase Auth + Google OAuth for GSC
- **Jobs**: Supabase Edge Functions + Upstash Redis
- **Observability**: Sentry + OpenTelemetry + Vercel Analytics

### Project Structure
```
├── apps/
│   └── web/                 # Next.js application
├── packages/
│   ├── config/              # Shared configuration and env validation
│   └── ui/                  # Shared UI components (future)
├── supabase/
│   ├── migrations/          # Database migrations
│   └── functions/           # Edge functions
└── .github/
    └── workflows/           # CI/CD pipelines
```

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or pnpm
- Supabase CLI (optional, for local development)

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SEO
   ```

2. **Install dependencies**
   ```bash
   cd apps/web
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your actual values
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Verify setup**
   - Visit http://localhost:3000
   - Check health endpoint: http://localhost:3000/api/health

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🔧 Configuration

### Environment Variables

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `CRON_SECRET` - Secret for scheduled tasks

Optional variables (see `.env.local.example` for full list):
- `NEXT_PUBLIC_SENTRY_DSN` - Sentry error tracking
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` - Razorpay payments
- `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET` - PayPal payments
- `GSC_GOOGLE_OAUTH_CLIENT_ID`, `GSC_GOOGLE_OAUTH_CLIENT_SECRET` - Google OAuth for GSC

## 📊 API Endpoints

### Health Check
```
GET /api/health
```
Returns application status with unique request ID and timestamp.

Example response:
```json
{
  "ok": true,
  "request_id": "3fb09c6d-77a1-46cc-98d6-1af32617ce76",
  "ts": "2025-09-07T16:21:57.091Z",
  "app": "GSC Intelligence",
  "version": "1.0.0",
  "environment": "dev"
}
```

## 🎯 Implementation Roadmap

### ✅ Step 1: Foundation (Completed)
- [x] Next.js 14 setup with TypeScript and Tailwind
- [x] Monorepo structure with workspaces
- [x] Environment validation with Zod
- [x] Health endpoint implementation
- [x] Basic CI/CD setup
- [x] Sentry + observability foundation

### 🚧 Next Steps
- [ ] **Step 2**: Supabase Auth, Tenancy, RBAC & RLS
- [ ] **Step 3**: Super Admin Control Plane
- [ ] **Step 4**: Billing Foundations (Razorpay + PayPal)
- [ ] **Step 5**: Plan Limits & Feature Gating
- [ ] **Step 6**: Customer Onboarding & Property Wizard
- [ ] **Step 7**: GSC OAuth & Ingest Pipeline
- [ ] **Step 8**: GA4, Bing, SERP Snapshots
- [ ] **Step 9**: Preprocessing & Normalization
- [ ] **Step 10**: Topic Clustering Engine

## 📝 License

See [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This is a private project. Please contact the maintainers for contribution guidelines.
