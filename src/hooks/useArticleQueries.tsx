
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Article } from '@/types/blog';

// Hook para buscar todos os artigos (com base no nível de permissão do usuário)
export const useAllArticles = () => {
  return useQuery({
    queryKey: ['all-articles'],
    queryFn: async () => {
      console.log('useAllArticles - Fetching all articles...');
      
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          author:authors(*)
        `)
        .order('created_at', { ascending: false });

      console.log('useAllArticles - Articles data:', data);
      console.log('useAllArticles - Articles error:', error);

      if (error) {
        console.error('useAllArticles - Error fetching articles:', error);
        throw error;
      }
      
      return data as Article[];
    },
    retry: 3,
    staleTime: 1000 * 30, // Cache por 30 segundos
    refetchOnWindowFocus: false
  });
};

// Hook para buscar artigos do usuário atual (para authors)
export const useMyArticles = () => {
  return useQuery({
    queryKey: ['my-articles'],
    queryFn: async () => {
      console.log('useMyArticles - Fetching user articles...');
      
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        console.log('useMyArticles - No user found');
        return [];
      }

      console.log('useMyArticles - Current user:', user.user.email);

      // Primeiro tentar buscar por user_articles
      const { data: userArticles, error: userArticlesError } = await supabase
        .from('user_articles')
        .select(`
          article:articles(
            *,
            author:authors(*)
          )
        `)
        .eq('user_id', user.user.id);

      console.log('useMyArticles - User articles data:', userArticles);
      console.log('useMyArticles - User articles error:', userArticlesError);

      if (userArticlesError) {
        console.error('useMyArticles - Error fetching user articles:', userArticlesError);
        return [];
      }

      const articles = userArticles?.map(item => item.article).filter(Boolean) as Article[];
      console.log('useMyArticles - Final articles:', articles);
      
      return articles || [];
    },
    retry: 3,
    staleTime: 1000 * 30, // Cache por 30 segundos
    refetchOnWindowFocus: false
  });
};

// Hook para buscar artigos publicados (para o blog público)
export const useBlogArticles = () => {
  return useQuery({
    queryKey: ['blog-articles'],
    queryFn: async () => {
      console.log('useBlogArticles - Fetching published articles...');
      
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          author:authors(*)
        `)
        .eq('status', 'published')
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false });

      console.log('useBlogArticles - Published articles data:', data);
      console.log('useBlogArticles - Published articles error:', error);

      if (error) {
        console.error('useBlogArticles - Error fetching published articles:', error);
        throw error;
      }
      
      return data as Article[];
    },
    retry: 3,
    staleTime: 1000 * 60 * 5 // Cache por 5 minutos
  });
};

export const useArticleBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: async () => {
      console.log('useArticleBySlug - Fetching article by slug:', slug);
      
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

      console.log('useArticleBySlug - Article data:', data);
      console.log('useArticleBySlug - Article error:', error);

      if (error) {
        console.error('useArticleBySlug - Error fetching article by slug:', error);
        throw error;
      }
      
      return data as Article;
    },
    enabled: !!slug,
    retry: 3,
    staleTime: 1000 * 60 * 10 // Cache por 10 minutos
  });
};

// Hook para buscar artigo por ID (para edição) - CORRIGIDO COMPLETAMENTE
export const useArticleById = (id: string) => {
  return useQuery({
    queryKey: ['article-edit', id],
    queryFn: async () => {
      console.log('useArticleById - Starting fetch for ID:', id);
      
      if (!id || id === 'undefined' || id === 'null') {
        console.log('useArticleById - Invalid ID provided:', id);
        return null;
      }
      
      console.log('useArticleById - Making Supabase query for ID:', id);
      
      const { data, error } = await supabase
        .from('articles')
        .select(`
          id,
          title,
          subtitle,
          slug,
          summary,
          content,
          cover_image_url,
          author_id,
          status,
          published_at,
          scheduled_at,
          read_time,
          category,
          views,
          shares,
          likes,
          created_at,
          updated_at,
          author:authors(
            id,
            name,
            bio,
            avatar_url,
            social_links
          )
        `)
        .eq('id', id)
        .maybeSingle();

      console.log('useArticleById - Supabase response data:', data);
      console.log('useArticleById - Supabase response error:', error);

      if (error) {
        console.error('useArticleById - Error fetching article:', error);
        throw error;
      }

      if (!data) {
        console.log('useArticleById - No article found with ID:', id);
        return null;
      }
      
      // Log detalhado dos dados encontrados
      console.log('useArticleById - Article found:', {
        id: data.id,
        title: data.title,
        subtitle: data.subtitle,
        summary: data.summary,
        content: data.content ? `${data.content.substring(0, 100)}...` : 'No content',
        author_id: data.author_id,
        status: data.status,
        category: data.category,
        cover_image_url: data.cover_image_url,
        read_time: data.read_time
      });
      
      return data as Article;
    },
    enabled: !!id && id !== 'undefined' && id !== 'null',
    retry: 2,
    staleTime: 1000 * 10, // Cache muito baixo para edição
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });
};
