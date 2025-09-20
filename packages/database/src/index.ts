import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface AnalysisRecord {
  id: string;
  url: string;
  title: string;
  meta_description: string;
  seo_score: number;
  performance_score: number;
  recommendations: string[];
  created_at: string;
  updated_at: string;
}

export interface KeywordRecord {
  id: string;
  keyword: string;
  url: string;
  density: number;
  position: number;
  search_volume: number;
  created_at: string;
}

export class AnalysisDatabase {
  static async saveAnalysis(data: Omit<AnalysisRecord, 'id' | 'created_at' | 'updated_at'>) {
    const { data: result, error } = await supabase
      .from('analyses')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  }

  static async getAnalysis(url: string) {
    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('url', url)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  static async getAllAnalyses() {
    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async saveKeyword(data: Omit<KeywordRecord, 'id' | 'created_at'>) {
    const { data: result, error } = await supabase
      .from('keywords')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  }

  static async getKeywords(url: string) {
    const { data, error } = await supabase
      .from('keywords')
      .select('*')
      .eq('url', url)
      .order('density', { ascending: false });
    
    if (error) throw error;
    return data;
  }
}