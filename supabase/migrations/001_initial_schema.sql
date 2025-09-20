-- Create analyses table
CREATE TABLE analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT,
  meta_description TEXT,
  seo_score INTEGER DEFAULT 0,
  performance_score INTEGER DEFAULT 0,
  recommendations TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create keywords table
CREATE TABLE keywords (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  keyword TEXT NOT NULL,
  url TEXT NOT NULL,
  density DECIMAL DEFAULT 0,
  position INTEGER DEFAULT 0,
  search_volume INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create backlinks table
CREATE TABLE backlinks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source_url TEXT NOT NULL,
  target_url TEXT NOT NULL,
  anchor_text TEXT,
  link_type TEXT DEFAULT 'external',
  discovered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create competitors table
CREATE TABLE competitors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  primary_url TEXT NOT NULL,
  competitor_url TEXT NOT NULL,
  similarity_score DECIMAL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX idx_analyses_url ON analyses(url);
CREATE INDEX idx_analyses_created_at ON analyses(created_at);
CREATE INDEX idx_keywords_url ON keywords(url);
CREATE INDEX idx_keywords_keyword ON keywords(keyword);
CREATE INDEX idx_backlinks_target_url ON backlinks(target_url);
CREATE INDEX idx_backlinks_source_url ON backlinks(source_url);

-- Enable RLS (Row Level Security)
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE backlinks ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitors ENABLE ROW LEVEL SECURITY;

-- Create policies (allowing all operations for now)
CREATE POLICY "Allow all operations on analyses" ON analyses FOR ALL USING (true);
CREATE POLICY "Allow all operations on keywords" ON keywords FOR ALL USING (true);
CREATE POLICY "Allow all operations on backlinks" ON backlinks FOR ALL USING (true);
CREATE POLICY "Allow all operations on competitors" ON competitors FOR ALL USING (true);