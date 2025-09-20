# SEO Analysis Tool

A comprehensive, open-source SEO analysis tool built with Next.js and modern web technologies.

## 🚀 Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/narvab-tech/SEO&project-name=seo-analysis-tool&repository-name=SEO-Analysis-Tool)

**One-click deployment** - Deploy to Vercel in under 3 minutes!

## Features

- **Website Analysis**: Comprehensive SEO auditing including title tags, meta descriptions, headings, and more
- **Performance Monitoring**: Load time analysis and Core Web Vitals assessment
- **Keyword Analysis**: Content optimization and keyword density analysis  
- **Technical SEO**: Image alt text validation, link analysis, and HTML structure review
- **Recommendations**: Actionable insights to improve SEO performance
- **Open Source**: Built entirely with open-source technologies and tools

## Technology Stack

All technologies used are open-source and up-to-date:

- **Frontend**: Next.js 15.5.3 with React 19.1.0
- **Backend**: Next.js API routes
- **Database**: PostgreSQL (via Supabase)
- **UI Framework**: Tailwind CSS v4
- **Icons**: Lucide React
- **SEO Analysis**: Cheerio for HTML parsing
- **Performance**: Custom performance analysis
- **Package Manager**: pnpm (latest)
- **Build System**: Turbo v2.5.6 (monorepo)
- **Deployment**: Optimized for Vercel

## Project Structure

This is a monorepo containing:

- `apps/web` - Main SEO analysis dashboard
- `packages/ui` - Shared UI components
- `packages/seo-utils` - SEO analysis utilities
- `packages/database` - Database utilities and schemas
- `supabase` - Database configuration and migrations

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Start development server**:
   ```bash
   pnpm dev
   ```

3. **Build for production**:
   ```bash
   pnpm build
   ```

## Usage

1. Enter a website URL in the analysis dashboard
2. Click "Analyze" to run SEO and performance analysis
3. Review the results including:
   - SEO score and recommendations
   - Performance metrics
   - Technical SEO issues
   - Optimization suggestions

## SEO Features

- **Title Tag Analysis**: Length validation and optimization suggestions
- **Meta Description Review**: Character count and content quality assessment
- **Heading Structure**: H1-H6 tag analysis and hierarchy validation
- **Image Optimization**: Alt text validation and image SEO best practices
- **Link Analysis**: Internal vs external link ratios
- **Performance Metrics**: Load time, FCP, LCP, and CLS measurements
- **Content Analysis**: Keyword density and content optimization
- **Technical SEO**: HTML validation and structure analysis

## Development

### Scripts Available:
- **Development**: `pnpm dev` - Start development server
- **Build**: `pnpm build` - Build for production  
- **Type Check**: `pnpm typecheck` - Run TypeScript checks
- **Linting**: `pnpm lint --continue` - Run linting (continues on errors)
- **Formatting**: `pnpm format` - Format code with Prettier
- **Deploy Check**: `pnpm deploy:check` - Run pre-deployment checks

### Recent Updates (Deployment Ready):
- ✅ Updated to latest Turbo v2.5.6 for faster builds
- ✅ Updated to latest dependency versions
- ✅ Optimized Vercel configuration for production
- ✅ Added performance optimizations to Next.js config
- ✅ Fixed Turborepo configuration for v2.x compatibility
- ✅ Added deployment check script
- ✅ All builds and type checks passing

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.