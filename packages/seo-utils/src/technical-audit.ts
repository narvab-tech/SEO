import * as cheerio from 'cheerio';
import { TechnicalSEOIssue } from './advanced-types.js';

export async function performTechnicalAudit(url: string, html: string): Promise<TechnicalSEOIssue[]> {
  const $ = cheerio.load(html);
  const issues: TechnicalSEOIssue[] = [];

  // Check for SSL
  if (!url.startsWith('https://')) {
    issues.push({
      type: 'error',
      category: 'Security',
      description: 'Website is not using HTTPS',
      recommendation: 'Implement SSL certificate to secure your website'
    });
  }

  // Check for robots.txt meta tags
  const robotsMeta = $('meta[name="robots"]').attr('content');
  if (robotsMeta && robotsMeta.includes('noindex')) {
    issues.push({
      type: 'warning',
      category: 'Indexing',
      description: 'Page is set to noindex',
      element: `<meta name="robots" content="${robotsMeta}">`,
      recommendation: 'Remove noindex if you want this page to be indexed'
    });
  }

  // Check for canonical tag
  const canonical = $('link[rel="canonical"]').attr('href');
  if (!canonical) {
    issues.push({
      type: 'warning',
      category: 'Duplicate Content',
      description: 'Missing canonical tag',
      recommendation: 'Add a canonical tag to prevent duplicate content issues'
    });
  }

  // Check for Open Graph tags
  const ogTitle = $('meta[property="og:title"]').attr('content');
  const ogDescription = $('meta[property="og:description"]').attr('content');
  const ogImage = $('meta[property="og:image"]').attr('content');
  
  if (!ogTitle) {
    issues.push({
      type: 'info',
      category: 'Social Media',
      description: 'Missing Open Graph title',
      recommendation: 'Add og:title meta tag for better social media sharing'
    });
  }
  
  if (!ogDescription) {
    issues.push({
      type: 'info',
      category: 'Social Media',
      description: 'Missing Open Graph description',
      recommendation: 'Add og:description meta tag for better social media sharing'
    });
  }
  
  if (!ogImage) {
    issues.push({
      type: 'info',
      category: 'Social Media',
      description: 'Missing Open Graph image',
      recommendation: 'Add og:image meta tag for better social media sharing'
    });
  }

  // Check for Twitter Cards
  const twitterCard = $('meta[name="twitter:card"]').attr('content');
  if (!twitterCard) {
    issues.push({
      type: 'info',
      category: 'Social Media',
      description: 'Missing Twitter Card markup',
      recommendation: 'Add Twitter Card meta tags for better Twitter sharing'
    });
  }

  // Check for structured data
  const jsonLd = $('script[type="application/ld+json"]');
  if (jsonLd.length === 0) {
    issues.push({
      type: 'info',
      category: 'Structured Data',
      description: 'No structured data found',
      recommendation: 'Add JSON-LD structured data to help search engines understand your content'
    });
  }

  // Check for XML sitemap
  const sitemapLink = $('link[rel="sitemap"]').attr('href');
  if (!sitemapLink) {
    issues.push({
      type: 'info',
      category: 'Indexing',
      description: 'No sitemap reference found',
      recommendation: 'Add a link to your XML sitemap in the HTML head'
    });
  }

  // Check for viewport meta tag
  const viewport = $('meta[name="viewport"]').attr('content');
  if (!viewport) {
    issues.push({
      type: 'warning',
      category: 'Mobile',
      description: 'Missing viewport meta tag',
      recommendation: 'Add viewport meta tag for mobile responsiveness'
    });
  }

  // Check for language declaration
  const htmlLang = $('html').attr('lang');
  if (!htmlLang) {
    issues.push({
      type: 'warning',
      category: 'Accessibility',
      description: 'Missing language declaration',
      element: '<html>',
      recommendation: 'Add lang attribute to HTML tag (e.g., <html lang="en">)'
    });
  }

  // Check for heading hierarchy
  const headings = $('h1, h2, h3, h4, h5, h6').map((_, el) => ({
    tag: el.tagName.toLowerCase(),
    text: $(el).text()
  })).get();

  if (headings.length > 0) {
    let previousLevel = 0;
    for (const heading of headings) {
      const currentLevel = parseInt(heading.tag.charAt(1));
      if (previousLevel > 0 && currentLevel > previousLevel + 1) {
        issues.push({
          type: 'warning',
          category: 'Content Structure',
          description: `Heading hierarchy skip detected: ${heading.tag.toUpperCase()}`,
          element: heading.text,
          recommendation: 'Maintain proper heading hierarchy (h1 → h2 → h3, etc.)'
        });
        break;
      }
      previousLevel = currentLevel;
    }
  }

  return issues;
}

export function analyzePageSpeed(loadTime: number): TechnicalSEOIssue[] {
  const issues: TechnicalSEOIssue[] = [];

  if (loadTime > 3000) {
    issues.push({
      type: 'error',
      category: 'Performance',
      description: `Slow page load time: ${loadTime}ms`,
      recommendation: 'Optimize images, minify CSS/JS, enable compression, use CDN'
    });
  } else if (loadTime > 1500) {
    issues.push({
      type: 'warning',
      category: 'Performance',
      description: `Moderate page load time: ${loadTime}ms`,
      recommendation: 'Consider optimizing images and reducing server response time'
    });
  }

  return issues;
}

export function analyzeMobileReadiness(html: string): TechnicalSEOIssue[] {
  const $ = cheerio.load(html);
  const issues: TechnicalSEOIssue[] = [];

  // Check viewport
  const viewport = $('meta[name="viewport"]').attr('content');
  if (!viewport) {
    issues.push({
      type: 'error',
      category: 'Mobile',
      description: 'Missing viewport meta tag',
      recommendation: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">'
    });
  } else if (!viewport.includes('width=device-width')) {
    issues.push({
      type: 'warning',
      category: 'Mobile',
      description: 'Viewport may not be optimized for mobile',
      recommendation: 'Ensure viewport includes width=device-width'
    });
  }

  // Check for fixed width elements that might cause horizontal scrolling
  const fixedWidthElements = $('[width], [style*="width"]').filter((_, el) => {
    const width = $(el).attr('width') || $(el).attr('style');
    return width && /width:\s*\d+px/.test(width || '');
  });

  if (fixedWidthElements.length > 0) {
    issues.push({
      type: 'warning',
      category: 'Mobile',
      description: `${fixedWidthElements.length} elements with fixed pixel widths found`,
      recommendation: 'Use responsive units (%, em, rem, vw) instead of fixed pixel widths'
    });
  }

  return issues;
}