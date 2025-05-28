
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Article } from '@/types/blog';

// Mutation para criar artigo (agora cria vínculo automático para authors)
export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (articleData: Omit<Article, 'id' | 'created_at' | 'updated_at' | 'author'>) => {
      const { data, error } = await supabase
        .from('articles')
        .insert([articleData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-articles'] });
      queryClient.invalidateQueries({ queryKey: ['my-articles'] });
      queryClient.invalidateQueries({ queryKey: ['blog-articles'] });
      toast({
        title: "Artigo criado com sucesso!",
        description: "O artigo foi salvo e está disponível no dashboard.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao criar artigo",
        description: error.message,
        variant: "destructive",
      });
    }
  });
};

// Mutation para atualizar artigo
export const useUpdateArticle = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...articleData }: Partial<Article> & { id: string }) => {
      const { data, error } = await supabase
        .from('articles')
        .update({ ...articleData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-articles'] });
      queryClient.invalidateQueries({ queryKey: ['my-articles'] });
      queryClient.invalidateQueries({ queryKey: ['blog-articles'] });
      queryClient.invalidateQueries({ queryKey: ['article-edit'] });
      toast({
        title: "Artigo atualizado com sucesso!",
        description: "As alterações foram salvas.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao atualizar artigo",
        description: error.message,
        variant: "destructive",
      });
    }
  });
};

// Mutation para deletar artigo
export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-articles'] });
      queryClient.invalidateQueries({ queryKey: ['my-articles'] });
      queryClient.invalidateQueries({ queryKey: ['blog-articles'] });
      toast({
        title: "Artigo deletado com sucesso!",
        description: "O artigo foi removido permanentemente.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao deletar artigo",
        description: error.message,
        variant: "destructive",
      });
    }
  });
};

// Função para incrementar views
export const useIncrementViews = () => {
  return useMutation({
    mutationFn: async (slug: string) => {
      const { error } = await supabase.rpc('increment_article_views', {
        article_slug: slug
      });
      if (error) throw error;
    }
  });
};

// Função para incrementar shares
export const useIncrementShares = () => {
  return useMutation({
    mutationFn: async (slug: string) => {
      const { error } = await supabase.rpc('increment_article_shares', {
        article_slug: slug
      });
      if (error) throw error;
    }
  });
};

// Função para incrementar likes
export const useIncrementLikes = () => {
  return useMutation({
    mutationFn: async (slug: string) => {
      const { error } = await supabase.rpc('increment_article_likes', {
        article_slug: slug
      });
      if (error) throw error;
    }
  });
};
