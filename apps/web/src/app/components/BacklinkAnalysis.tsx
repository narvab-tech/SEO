'use client';

import { useState } from 'react';
import { ExternalLink, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface BacklinkData {
  sourceUrl: string;
  sourceDomain: string;
  anchorText: string;
  linkType: 'follow' | 'nofollow' | 'sponsored';
  domainAuthority: number;
  firstSeen: string;
}

export default function BacklinkAnalysis() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [backlinks, setBacklinks] = useState<BacklinkData[]>([]);

  const analyzeBacklinks = async () => {
    if (!url.trim()) return;
    
    setLoading(true);
    
    // Mock backlink data for demonstration
    setTimeout(() => {
      const mockBacklinks: BacklinkData[] = [
        {
          sourceUrl: 'https://techblog.example.com/best-tools',
          sourceDomain: 'techblog.example.com',
          anchorText: 'comprehensive SEO tool',
          linkType: 'follow',
          domainAuthority: 75,
          firstSeen: '2024-01-15'
        },
        {
          sourceUrl: 'https://marketing.guru/resources',
          sourceDomain: 'marketing.guru',
          anchorText: 'example.com',
          linkType: 'follow',
          domainAuthority: 68,
          firstSeen: '2024-02-03'
        },
        {
          sourceUrl: 'https://news.startup.io/featured-tools',
          sourceDomain: 'news.startup.io',
          anchorText: 'click here',
          linkType: 'nofollow',
          domainAuthority: 45,
          firstSeen: '2024-01-28'
        },
        {
          sourceUrl: 'https://directory.tools.com/seo',
          sourceDomain: 'directory.tools.com',
          anchorText: 'SEO analysis platform',
          linkType: 'sponsored',
          domainAuthority: 52,
          firstSeen: '2024-02-10'
        },
        {
          sourceUrl: 'https://blog.webmaster.dev/reviews',
          sourceDomain: 'blog.webmaster.dev',
          anchorText: 'professional SEO service',
          linkType: 'follow',
          domainAuthority: 82,
          firstSeen: '2024-01-22'
        }
      ];
      
      setBacklinks(mockBacklinks);
      setLoading(false);
    }, 2000);
  };

  const getLinkTypeIcon = (linkType: string) => {
    switch (linkType) {
      case 'follow':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'nofollow':
        return <Shield className="w-4 h-4 text-yellow-600" />;
      case 'sponsored':
        return <AlertTriangle className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getDAColor = (da: number) => {
    if (da >= 70) return 'text-green-600 bg-green-50';
    if (da >= 50) return 'text-yellow-600 bg-yellow-50';
    if (da >= 30) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const totalBacklinks = backlinks.length;
  const followLinks = backlinks.filter(b => b.linkType === 'follow').length;
  const avgDA = backlinks.reduce((sum, b) => sum + b.domainAuthority, 0) / totalBacklinks || 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <ExternalLink className="w-6 h-6 mr-2 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900">Backlink Analysis</h3>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL to analyze backlinks"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && analyzeBacklinks()}
          />
        </div>
        <button
          onClick={analyzeBacklinks}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <ExternalLink className="w-5 h-5" />
          <span>{loading ? 'Analyzing...' : 'Analyze'}</span>
        </button>
      </div>

      {backlinks.length > 0 && (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{totalBacklinks}</div>
              <div className="text-sm text-blue-800">Total Backlinks</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{followLinks}</div>
              <div className="text-sm text-green-800">Follow Links</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{Math.round(avgDA)}</div>
              <div className="text-sm text-purple-800">Avg Domain Authority</div>
            </div>
          </div>

          {/* Backlinks Table */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700 mb-3">Recent Backlinks</h4>
            
            {backlinks.map((backlink, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <a 
                        href={backlink.sourceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {backlink.sourceDomain}
                      </a>
                      {getLinkTypeIcon(backlink.linkType)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDAColor(backlink.domainAuthority)}`}>
                        DA {backlink.domainAuthority}
                      </span>
                    </div>
                    <div className="text-gray-600 text-sm mb-1">
                      <strong>Anchor Text:</strong> "{backlink.anchorText}"
                    </div>
                    <div className="text-gray-500 text-xs">
                      First seen: {new Date(backlink.firstSeen).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      backlink.linkType === 'follow' 
                        ? 'bg-green-100 text-green-800' 
                        : backlink.linkType === 'nofollow'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {backlink.linkType}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>Demo Mode:</strong> This shows sample backlink data. In production, this would integrate with backlink analysis APIs.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}