import AnalysisDashboard from './components/AnalysisDashboard';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            SEO Analysis Tool
          </h1>
          <p className="text-lg text-gray-600">
            Comprehensive SEO analysis and optimization recommendations
          </p>
        </div>
        
        <AnalysisDashboard />
      </div>
    </main>
  );
}
