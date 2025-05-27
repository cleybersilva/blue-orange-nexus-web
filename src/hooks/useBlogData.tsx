
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Author {
  id: string;
  name: string;
  bio?: string;
  avatar_url?: string;
  social_links?: any;
}

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  summary: string;
  content: string;
  cover_image_url?: string;
  author_id: string;
  status: 'draft' | 'published' | 'scheduled';
  published_at?: string;
  scheduled_at?: string;
  read_time?: number;
  category?: string;
  created_at: string;
  updated_at: string;
  author?: Author;
}

export const useBlogArticles = () => {
  return useQuery({
    queryKey: ['blog-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          author:authors(*)
        `)
        .eq('status', 'published')
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false });

      if (error) throw error;
      return data as Article[];
    }
  });
};

export const useArticleBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          author:authors(*)
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .lte('published_at', new Date().toISOString())
        .single();

      if (error) throw error;
      return data as Article;
    },
    enabled: !!slug
  });
};

export const useAuthors = () => {
  return useQuery({
    queryKey: ['authors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('authors')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as Author[];
    }
  });
};
