# Vercel Deployment Guide

This SEO Analysis Tool is configured for deployment on Vercel. Follow these steps to deploy:

## Prerequisites

- A Vercel account
- A GitHub repository with this code
- Optional: A Supabase project for database functionality

## Deployment Steps

### 1. Connect Repository to Vercel

1. Go to [Vercel](https://vercel.com/dashboard)
2. Click "New Project"
3. Import this GitHub repository
4. Vercel will automatically detect the Next.js configuration

### 2. Configure Build Settings

The project includes the following configuration files for Vercel:

- `vercel.json` - Main Vercel configuration
- `project.json` - Project-specific settings
- Updated `next.config.ts` - Next.js configuration optimized for monorepo

**Key Configuration:**
- **Framework**: Next.js
- **Build Command**: `pnpm turbo build --filter=seo-tool-web`
- **Root Directory**: `apps/web`
- **Output Directory**: `apps/web/.next`

### 3. Environment Variables

Set up the following environment variables in your Vercel dashboard:

#### Required Variables:
```
NEXT_PUBLIC_API_BASE_URL=https://your-app-name.vercel.app/api
```

#### Optional Database Variables (for Supabase):
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

#### Optional Analytics:
```
ENABLE_ANALYTICS=true
ENABLE_PERFORMANCE_MONITORING=true
```

### 4. Deploy

Once configured, Vercel will automatically deploy your application. The build process will:

1. Install dependencies using `pnpm`
2. Build all packages in the monorepo
3. Generate optimized Next.js build
4. Deploy to Vercel's global CDN

## Features

The deployed application includes:

- ✅ **Website Analysis**: Analyze any URL for SEO metrics
- ✅ **Performance Monitoring**: Core Web Vitals and performance scores
- ✅ **Keyword Research**: Built-in keyword analysis tools
- ✅ **Backlink Analysis**: Backlink profile analysis (demo mode)
- ✅ **Technical SEO Audit**: Comprehensive technical checks
- ✅ **Mobile-Responsive Design**: Works on all devices

## Monorepo Structure

```
SEO/
├── apps/
│   └── web/                 # Main Next.js application
├── packages/
│   ├── database/           # Supabase database utilities
│   ├── seo-utils/          # SEO analysis utilities
│   └── ui/                 # Shared UI components
├── vercel.json             # Vercel configuration
└── project.json            # Vercel project settings
```

## Demo Mode

The application includes mock data fallbacks, so it will work immediately after deployment even without database setup. Real SEO analysis will be performed when possible, with fallback to demo data for external API failures.

## Post-Deployment

After successful deployment:

1. Test the application functionality
2. Configure custom domain (optional)
3. Set up database (Supabase) for persistent storage
4. Configure analytics and monitoring
5. Set up external API integrations as needed

## Troubleshooting

If you encounter deployment issues:

1. Check build logs in Vercel dashboard
2. Ensure all environment variables are set
3. Verify monorepo configuration in `vercel.json`
4. Check Next.js configuration in `next.config.ts`

For support, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)