export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            GSC Intelligence
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Supabase + Vercel SaaS for marketers: GSC ingest, clustering, cannibalization, CTR gap, opportunities, briefs, link planner.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                GSC Integration
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect your Google Search Console for automated data ingestion and 16-month backfill
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Smart Clustering
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                AI-powered topic clustering with embeddings and auto-labeling for better insights
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Advanced Analytics
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                CTR gap analysis, cannibalization detection, and SERP volatility tracking
              </p>
            </div>
          </div>
          
          <div className="mt-12 flex gap-4 justify-center">
            <a
              href="/api/health"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Check System Health
            </a>
            <a
              href="#"
              className="border border-gray-300 hover:border-gray-400 text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:border-gray-500 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
