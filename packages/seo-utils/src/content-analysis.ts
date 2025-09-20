import { ContentAnalysis } from './advanced-types.js';

export function analyzeContent(content: string): ContentAnalysis {
  // Remove HTML tags for text analysis
  const textContent = content.replace(/<[^>]*>/g, '').trim();
  const words = textContent.toLowerCase().split(/\s+/).filter(word => word.length > 0);
  
  return {
    wordCount: words.length,
    readabilityScore: calculateReadabilityScore(textContent),
    keywordDensity: calculateKeywordDensities(words),
    duplicateContent: detectDuplicateContent(textContent),
    contentGaps: identifyContentGaps(words)
  };
}

function calculateReadabilityScore(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const syllables = words.reduce((count, word) => count + countSyllables(word), 0);
  
  if (sentences.length === 0 || words.length === 0) return 0;
  
  // Flesch Reading Ease Score
  const avgWordsPerSentence = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;
  
  const score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
  return Math.max(0, Math.min(100, Math.round(score)));
}

function countSyllables(word: string): number {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  
  // Remove common endings that don't add syllables
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  
  // Count vowel groups
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? Math.max(1, matches.length) : 1;
}

function calculateKeywordDensities(words: string[]): { [keyword: string]: number } {
  const totalWords = words.length;
  const wordCount: { [word: string]: number } = {};
  
  // Count individual words
  words.forEach(word => {
    const cleanWord = word.replace(/[^\w]/g, '').toLowerCase();
    if (cleanWord.length >= 3) {
      wordCount[cleanWord] = (wordCount[cleanWord] || 0) + 1;
    }
  });
  
  // Calculate densities for words that appear more than once
  const densities: { [keyword: string]: number } = {};
  Object.entries(wordCount)
    .filter(([, count]) => count > 1)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20) // Top 20 keywords
    .forEach(([word, count]) => {
      densities[word] = Math.round((count / totalWords) * 100 * 100) / 100; // Round to 2 decimal places
    });
  
  return densities;
}

function detectDuplicateContent(text: string): boolean {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const sentenceSet = new Set(sentences.map(s => s.trim().toLowerCase()));
  
  // If we have significantly fewer unique sentences than total sentences,
  // it might indicate duplicate content
  return sentenceSet.size < sentences.length * 0.8;
}

function identifyContentGaps(words: string[]): string[] {
  const gaps: string[] = [];
  
  // Check for common SEO-important terms that might be missing
  const importantTerms = [
    'how', 'what', 'why', 'where', 'when', 'who',
    'guide', 'tutorial', 'tips', 'best', 'top',
    'review', 'comparison', 'vs', 'benefits',
    'solution', 'problem', 'help', 'learn'
  ];
  
  const wordSet = new Set(words);
  const missingTerms = importantTerms.filter(term => !wordSet.has(term));
  
  if (missingTerms.length > importantTerms.length * 0.7) {
    gaps.push('Consider adding more informational and question-based keywords');
  }
  
  if (words.length < 300) {
    gaps.push('Content length is below recommended minimum (300+ words)');
  }
  
  if (words.length > 2500) {
    gaps.push('Content might be too long - consider breaking into multiple pages');
  }
  
  return gaps;
}

export function generateContentRecommendations(analysis: ContentAnalysis): string[] {
  const recommendations: string[] = [];
  
  if (analysis.wordCount < 300) {
    recommendations.push(`Increase content length (current: ${analysis.wordCount} words, recommended: 300+)`);
  }
  
  if (analysis.readabilityScore < 60) {
    recommendations.push('Improve readability by using shorter sentences and simpler words');
  } else if (analysis.readabilityScore > 90) {
    recommendations.push('Content might be too simple - consider adding more detailed explanations');
  }
  
  if (analysis.duplicateContent) {
    recommendations.push('Reduce duplicate or repetitive content');
  }
  
  const topKeywords = Object.entries(analysis.keywordDensity)
    .filter(([, density]) => density > 3)
    .map(([keyword]) => keyword);
    
  if (topKeywords.length > 0) {
    recommendations.push(`Reduce keyword density for: ${topKeywords.join(', ')}`);
  }
  
  analysis.contentGaps.forEach(gap => {
    recommendations.push(gap);
  });
  
  return recommendations;
}