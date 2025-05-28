
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

// Hook para buscar artigo por ID (para edição) - CORRIGIDO
export const useArticleById = (id: string) => {
  return useQuery({
    queryKey: ['article-edit', id],
    queryFn: async () => {
      console.log('useArticleById - Fetching article by ID:', id);
      
      if (!id) {
        console.log('useArticleById - No ID provided');
        return null;
      }
      
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          author:authors(*)
        `)
        .eq('id', id)
        .maybeSingle(); // Mudança para maybeSingle() para evitar erro se não encontrar

      console.log('useArticleById - Raw response data:', data);
      console.log('useArticleById - Raw response error:', error);

      if (error) {
        console.error('useArticleById - Error fetching article by ID:', error);
        throw error;
      }

      if (!data) {
        console.log('useArticleById - No article found with ID:', id);
        return null;
      }
      
      console.log('useArticleById - Final article data:', data);
      return data as Article;
    },
    enabled: !!id,
    retry: 3,
    staleTime: 1000 * 30, // Cache reduzido para 30 segundos
    refetchOnWindowFocus: true, // Permitir refetch quando a janela ganhar foco
    refetchOnMount: true // Sempre refetch quando o hook for montado
  });
};
