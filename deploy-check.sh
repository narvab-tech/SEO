#!/bin/bash

echo "🚀 SEO Analysis Tool - Deployment Check"
echo "======================================="

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Installing..."
    npm install -g pnpm
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile || pnpm install --no-frozen-lockfile

# Run type check
echo "🔍 Running type check..."
pnpm typecheck

# Run linting
echo "🧹 Running linting..."
pnpm lint

# Build the project
echo "🏗️  Building project..."
pnpm build

echo ""
echo "✅ Deployment check complete!"
echo "🌐 Ready to deploy to Vercel!"
echo ""
echo "Next steps:"
echo "1. Push changes to GitHub"
echo "2. Connect repository to Vercel"
echo "3. Set environment variables"
echo "4. Deploy!"