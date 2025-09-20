import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

interface SEOAnalysisResult {
  title: string;
  metaDescription: string;
  headings: {
    h1: string[];
    h2: string[];
    h3: string[];
  };
  images: {
    total: number;
    withAlt: number;
    withoutAlt: number;
  };
  links: {
    internal: number;
    external: number;
    total: number;
  };
  score: number;
  recommendations: string[];
}

interface PerformanceResult {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  score: number;
}

// Mock data for demonstration when fetch fails
function getMockAnalysis(_url: string): SEOAnalysisResult {
  return {
    title: "Example Website - Your Gateway to Quality Content",
    metaDescription: "Welcome to Example.com, your premier destination for quality content, resources, and information. Discover what makes us unique.",
    headings: {
      h1: ["Welcome to Example.com"],
      h2: ["About Our Services", "Why Choose Us", "Get Started Today"],
      h3: ["Quality Content", "Expert Team", "24/7 Support", "Free Resources", "Customer Testimonials"]
    },
    images: {
      total: 8,
      withAlt: 6,
      withoutAlt: 2
    },
    links: {
      internal: 12,
      external: 4,
      total: 16
    },
    score: 78,
    recommendations: [
      "Add alt text to 2 images missing descriptions",
      "Consider adding more internal links to improve site navigation",
      "Meta description could be slightly longer (currently 118 characters)"
    ]
  };
}

function getMockPerformance(): PerformanceResult {
  return {
    loadTime: 1240,
    firstContentfulPaint: 620,
    largestContentfulPaint: 980,
    cumulativeLayoutShift: 0.045,
    score: 85
  };
}

interface SEOAnalysisResult {
  title: string;
  metaDescription: string;
  headings: {
    h1: string[];
    h2: string[];
    h3: string[];
  };
  images: {
    total: number;
    withAlt: number;
    withoutAlt: number;
  };
  links: {
    internal: number;
    external: number;
    total: number;
  };
  score: number;
  recommendations: string[];
}

interface PerformanceResult {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  score: number;
}

async function analyzePage(url: string): Promise<SEOAnalysisResult> {
  try {
    // Fetch the webpage
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEO-Tool-Bot/1.0)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const html = await response.text();
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
    const imagesWithAlt = images.filter((_, el) => Boolean($(el).attr('alt'))).length;
    
    const imageAnalysis = {
      total: totalImages,
      withAlt: imagesWithAlt,
      withoutAlt: totalImages - imagesWithAlt
    };

    // Analyze links
    const links = $('a[href]');
    const internalLinks = links.filter((_, el) => {
      const href = $(el).attr('href');
      if (!href) return false;
      try {
        const urlObj = new URL(url);
        return href.startsWith('/') || href.includes(urlObj.hostname);
      } catch {
        return false;
      }
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

async function analyzePerformance(url: string): Promise<PerformanceResult> {
  try {
    const startTime = Date.now();
    
    // Make a simple request to measure basic load time
    const response = await fetch(url);
    await response.text(); // Read the response to complete the fetch
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    
    // Simulate other metrics (in production, use real Lighthouse)
    const mockResult: PerformanceResult = {
      loadTime,
      firstContentfulPaint: loadTime * 0.4,
      largestContentfulPaint: loadTime * 0.8,
      cumulativeLayoutShift: Math.random() * 0.1, // CLS should be < 0.1
      score: Math.max(0, 100 - (loadTime / 50)) // Simple scoring
    };

    return mockResult;
    
  } catch (error) {
    throw new Error(`Performance analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    let analysis: SEOAnalysisResult;
    let performance: PerformanceResult;

    try {
      // Try real analysis first
      [analysis, performance] = await Promise.all([
        analyzePage(url),
        analyzePerformance(url)
      ]);
    } catch (error) {
      console.log('Real analysis failed, using mock data:', error);
      
      // Fallback to mock data for demonstration
      analysis = getMockAnalysis(url);
      performance = getMockPerformance();
      
      // Add a note that this is demo data
      analysis.recommendations.unshift(
        "⚠️ Demo Mode: Using sample data as external fetch failed. In production, this would analyze the actual website."
      );
    }

    return NextResponse.json({
      analysis,
      performance
    });

  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Analysis service temporarily unavailable' },
      { status: 500 }
    );
  }
}