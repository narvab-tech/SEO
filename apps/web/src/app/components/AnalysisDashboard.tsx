'use client';

import { useState } from 'react';
import { Search, BarChart3, Globe, Zap, AlertCircle, CheckCircle } from 'lucide-react';
import KeywordResearch from './KeywordResearch';
import BacklinkAnalysis from './BacklinkAnalysis';

interface AnalysisResult {
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

export default function AnalysisDashboard() {
  const [activeTab, setActiveTab] = useState('website');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [performanceResult, setPerformanceResult] = useState<PerformanceResult | null>(null);
  const [error, setError] = useState('');

  const analyzeWebsite = async () => {
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Call our API endpoint
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }
      
      setAnalysisResult(data.analysis);
      setPerformanceResult(data.performance);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-600" />;
    return <AlertCircle className="w-5 h-5 text-red-600" />;
  };

  const tabs = [
    { id: 'website', label: 'Website Analysis', icon: Globe },
    { id: 'keywords', label: 'Keyword Research', icon: Search },
    { id: 'backlinks', label: 'Backlink Analysis', icon: BarChart3 }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex space-x-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Website Analysis Tab */}
        {activeTab === 'website' && (
          <>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter website URL (e.g., https://example.com)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={analyzeWebsite}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>{loading ? 'Analyzing...' : 'Analyze'}</span>
              </button>
            </div>
            
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
          </>
        )}
      </div>

      {/* Tab Content */}
      {activeTab === 'website' && analysisResult && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SEO Analysis Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Globe className="w-6 h-6 mr-2 text-blue-600" />
                SEO Analysis
              </h3>
              <div className="flex items-center space-x-2">
                {getScoreIcon(analysisResult.score)}
                <span className={`text-xl font-bold ${getScoreColor(analysisResult.score)}`}>
                  {analysisResult.score}/100
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Title Tag</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  {analysisResult.title || 'No title found'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Length: {analysisResult.title.length} characters
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">Meta Description</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  {analysisResult.metaDescription || 'No meta description found'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Length: {analysisResult.metaDescription.length} characters
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {analysisResult.headings.h1.length}
                  </div>
                  <div className="text-xs text-gray-500">H1 Tags</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {analysisResult.images.withAlt}
                  </div>
                  <div className="text-xs text-gray-500">Images with Alt</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {analysisResult.links.total}
                  </div>
                  <div className="text-xs text-gray-500">Total Links</div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Card */}
          {performanceResult && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Zap className="w-6 h-6 mr-2 text-yellow-600" />
                  Performance
                </h3>
                <div className="flex items-center space-x-2">
                  {getScoreIcon(performanceResult.score)}
                  <span className={`text-xl font-bold ${getScoreColor(performanceResult.score)}`}>
                    {Math.round(performanceResult.score)}/100
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Load Time</div>
                    <div className="text-lg font-bold text-blue-600">
                      {performanceResult.loadTime}ms
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">FCP</div>
                    <div className="text-lg font-bold text-green-600">
                      {Math.round(performanceResult.firstContentfulPaint)}ms
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">LCP</div>
                    <div className="text-lg font-bold text-yellow-600">
                      {Math.round(performanceResult.largestContentfulPaint)}ms
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">CLS</div>
                    <div className="text-lg font-bold text-purple-600">
                      {performanceResult.cumulativeLayoutShift.toFixed(3)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recommendations */}
      {activeTab === 'website' && analysisResult && analysisResult.recommendations.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-orange-600" />
            Recommendations
          </h3>
          <div className="space-y-3">
            {analysisResult.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Tab Content */}
      {activeTab === 'keywords' && <KeywordResearch />}
      {activeTab === 'backlinks' && <BacklinkAnalysis />}
    </div>
  );
}