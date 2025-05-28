
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Article } from '@/types/blog';

// Hook para buscar todos os artigos (com base no nível de permissão do usuário)
export const useAllArticles = () => {
  return useQuery({
    queryKey: ['all-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          author:authors(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Article[];
    }
  });
};

// Hook para buscar artigos do usuário atual (para authors)
export const useMyArticles = () => {
  return useQuery({
    queryKey: ['my-articles'],
    queryFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return [];

      const { data, error } = await supabase
        .from('user_articles')
        .select(`
          article:articles(
            *,
            author:authors(*)
          )
        `)
        .eq('user_id', user.user.id);

      if (error) throw error;
      return data?.map(item => item.article).filter(Boolean) as Article[];
    }
  });
};

// Hook para buscar artigos publicados (para o blog público)
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

// Hook para buscar artigo por ID (para edição)
export const useArticleById = (id: string) => {
  return useQuery({
    queryKey: ['article-edit', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          author:authors(*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Article;
    },
    enabled: !!id
  });
};
