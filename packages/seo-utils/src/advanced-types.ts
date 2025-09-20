export interface BacklinkData {
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  linkType: 'internal' | 'external' | 'nofollow' | 'sponsored';
  discoveredAt: Date;
}

export interface CompetitorData {
  url: string;
  domain: string;
  similarityScore: number;
  commonKeywords: string[];
  backlinksCount: number;
}

export interface TechnicalSEOIssue {
  type: 'error' | 'warning' | 'info';
  category: string;
  description: string;
  element?: string;
  recommendation: string;
}

export interface ContentAnalysis {
  wordCount: number;
  readabilityScore: number;
  keywordDensity: { [keyword: string]: number };
  duplicateContent: boolean;
  contentGaps: string[];
}