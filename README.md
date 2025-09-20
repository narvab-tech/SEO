# SEO Analysis Tool

A comprehensive, open-source SEO analysis tool built with Next.js and modern web technologies.

## Features

- **Website Analysis**: Comprehensive SEO auditing including title tags, meta descriptions, headings, and more
- **Performance Monitoring**: Load time analysis and Core Web Vitals assessment
- **Keyword Analysis**: Content optimization and keyword density analysis  
- **Technical SEO**: Image alt text validation, link analysis, and HTML structure review
- **Recommendations**: Actionable insights to improve SEO performance
- **Open Source**: Built entirely with open-source technologies and tools

## Technology Stack

All technologies used are open-source:

- **Frontend**: Next.js 15 with React 19
- **Backend**: Next.js API routes
- **Database**: PostgreSQL (via Supabase)
- **UI Framework**: Tailwind CSS
- **Icons**: Lucide React
- **SEO Analysis**: Cheerio for HTML parsing
- **Performance**: Custom performance analysis
- **Package Manager**: pnpm
- **Build System**: Turbo (monorepo)

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

- **Linting**: `pnpm lint`
- **Type Checking**: `pnpm typecheck`  
- **Code Formatting**: `pnpm format`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnarvab-tech%2FSEO)

The application is fully configured for Vercel deployment with:
- Pre-configured build settings
- Demo mode functionality (works without external APIs)
- Optimized monorepo setup
- Production-ready configuration

For detailed deployment instructions, see [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.