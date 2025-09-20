export interface SEOAnalysisResult {
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

export interface PerformanceResult {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  score: number;
}

export interface KeywordAnalysis {
  keyword: string;
  density: number;
  count: number;
  suggestions: string[];
}