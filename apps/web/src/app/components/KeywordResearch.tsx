'use client';

import { useState } from 'react';
import { Search, TrendingUp, Eye, Target } from 'lucide-react';

interface KeywordData {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  trend: 'up' | 'down' | 'stable';
}

export default function KeywordResearch() {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<KeywordData[]>([]);

  const searchKeywords = async () => {
    if (!keyword.trim()) return;
    
    setLoading(true);
    
    // Mock keyword data for demonstration
    setTimeout(() => {
      const mockResults: KeywordData[] = [
        { keyword: keyword, searchVolume: 8100, difficulty: 45, cpc: 2.40, trend: 'up' },
        { keyword: `${keyword} tips`, searchVolume: 2900, difficulty: 32, cpc: 1.80, trend: 'up' },
        { keyword: `best ${keyword}`, searchVolume: 4500, difficulty: 58, cpc: 3.20, trend: 'stable' },
        { keyword: `${keyword} guide`, searchVolume: 1800, difficulty: 28, cpc: 1.50, trend: 'up' },
        { keyword: `${keyword} reviews`, searchVolume: 3200, difficulty: 41, cpc: 2.10, trend: 'down' },
        { keyword: `free ${keyword}`, searchVolume: 1500, difficulty: 35, cpc: 0.90, trend: 'stable' },
      ];
      
      setResults(mockResults);
      setLoading(false);
    }, 1500);
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return 'text-green-600';
    if (difficulty < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <Target className="w-6 h-6 mr-2 text-purple-600" />
        <h3 className="text-xl font-semibold text-gray-900">Keyword Research</h3>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter seed keyword (e.g., 'digital marketing')"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && searchKeywords()}
          />
        </div>
        <button
          onClick={searchKeywords}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <Search className="w-5 h-5" />
          <span>{loading ? 'Searching...' : 'Research'}</span>
        </button>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 pb-3 border-b border-gray-200 text-sm font-medium text-gray-700">
            <div>Keyword</div>
            <div>Search Volume</div>
            <div>Difficulty</div>
            <div>CPC</div>
          </div>
          
          {results.map((result, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 py-3 border-b border-gray-100 hover:bg-gray-50">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">{result.keyword}</span>
                {getTrendIcon(result.trend)}
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{result.searchVolume.toLocaleString()}</span>
              </div>
              <div className={`font-medium ${getDifficultyColor(result.difficulty)}`}>
                {result.difficulty}/100
              </div>
              <div className="text-gray-700">
                ${result.cpc.toFixed(2)}
              </div>
            </div>
          ))}
          
          <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-sm text-purple-800">
              💡 <strong>Demo Mode:</strong> This shows sample keyword data. In production, this would integrate with keyword research APIs or databases.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}