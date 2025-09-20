import * as cheerio from 'cheerio';
import axios from 'axios';
import { SEOAnalysisResult } from './types.js';

export async function analyzePage(url: string): Promise<SEOAnalysisResult> {
  try {
    // Fetch the webpage
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEO-Tool-Bot/1.0)'
      }
    });
    
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract basic SEO elements
    const title = $('title').text() || '';
    const metaDescription = $('meta[name="description"]').attr('content') || '';

    // Extract headings
    const headings = {
      h1: $('h1').map((_, el) => $(el).text()).get(),
      h2: $('h2').map((_, el) => $(el).text()).get(),
      h3: $('h3').map((_, el) => $(el).text()).get()
    };

    // Analyze images
    const images = $('img');
    const totalImages = images.length;
    const imagesWithAlt = images.filter((_, el) => !!$(el).attr('alt')).length;
    
    const imageAnalysis = {
      total: totalImages,
      withAlt: imagesWithAlt,
      withoutAlt: totalImages - imagesWithAlt
    };

    // Analyze links
    const links = $('a[href]');
    const internalLinks = links.filter((_, el) => {
      const href = $(el).attr('href');
      return !!(href && (href.startsWith('/') || href.includes(new URL(url).hostname)));
    }).length;
    
    const totalLinks = links.length;
    const externalLinks = totalLinks - internalLinks;

    const linkAnalysis = {
      internal: internalLinks,
      external: externalLinks,
      total: totalLinks
    };

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (!title) {
      recommendations.push('Add a title tag to your page');
    } else if (title.length < 30 || title.length > 60) {
      recommendations.push('Title should be between 30-60 characters');
    }

    if (!metaDescription) {
      recommendations.push('Add a meta description to your page');
    } else if (metaDescription.length < 120 || metaDescription.length > 160) {
      recommendations.push('Meta description should be between 120-160 characters');
    }

    if (headings.h1.length === 0) {
      recommendations.push('Add at least one H1 heading');
    } else if (headings.h1.length > 1) {
      recommendations.push('Use only one H1 heading per page');
    }

    if (imageAnalysis.withoutAlt > 0) {
      recommendations.push(`${imageAnalysis.withoutAlt} images missing alt text`);
    }

    // Calculate score (0-100)
    let score = 100;
    if (!title) score -= 20;
    else if (title.length < 30 || title.length > 60) score -= 10;
    
    if (!metaDescription) score -= 20;
    else if (metaDescription.length < 120 || metaDescription.length > 160) score -= 10;
    
    if (headings.h1.length === 0) score -= 15;
    else if (headings.h1.length > 1) score -= 10;
    
    if (imageAnalysis.withoutAlt > 0) {
      score -= Math.min(15, imageAnalysis.withoutAlt * 3);
    }

    score = Math.max(0, score);

    return {
      title,
      metaDescription,
      headings,
      images: imageAnalysis,
      links: linkAnalysis,
      score,
      recommendations
    };

  } catch (error) {
    throw new Error(`Failed to analyze page: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function calculateKeywordDensity(content: string, keyword: string): number {
  const words = content.toLowerCase().split(/\s+/);
  const keywordCount = words.filter(word => word.includes(keyword.toLowerCase())).length;
  return (keywordCount / words.length) * 100;
}

export function extractKeywords(content: string, minLength: number = 3): string[] {
  const words = content.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length >= minLength);
  
  const wordCount: { [key: string]: number } = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  return Object.entries(wordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20)
    .map(([word]) => word);
}