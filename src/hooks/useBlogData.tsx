import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

export interface AdminRequest {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  requested_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
  created_at: string;
  updated_at: string;
}

// Hook para buscar todos os artigos (incluindo rascunhos para admin)
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

// Hook para verificar se o usuário é admin aprovado
export const useIsApprovedAdmin = () => {
  return useQuery({
    queryKey: ['is-approved-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('role, approved')
        .eq('id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (error) throw error;
      return data?.role === 'admin' && data?.approved === true;
    }
  });
};

// Hook para buscar solicitações de admin
export const useAdminRequests = () => {
  return useQuery({
    queryKey: ['admin-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as AdminRequest[];
    }
  });
};

// Hook para verificar status da solicitação do usuário atual
export const useMyAdminRequest = () => {
  return useQuery({
    queryKey: ['my-admin-request'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_requests')
        .select('*')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data as AdminRequest | null;
    }
  });
};

// Mutation para criar artigo
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

// Mutation para criar autor
export const useCreateAuthor = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (authorData: Omit<Author, 'id'>) => {
      const { data, error } = await supabase
        .from('authors')
        .insert([authorData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
      toast({
        title: "Autor criado com sucesso!",
        description: "O novo autor foi adicionado ao sistema.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao criar autor",
        description: error.message,
        variant: "destructive",
      });
    }
  });
};

// Mutation para criar solicitação de admin
export const useCreateAdminRequest = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (requestData: { email: string; full_name: string; message?: string }) => {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('admin_requests')
        .insert([{
          user_id: user.id,
          email: requestData.email,
          full_name: requestData.full_name,
          message: requestData.message
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-admin-request'] });
      queryClient.invalidateQueries({ queryKey: ['admin-requests'] });
      toast({
        title: "Solicitação enviada!",
        description: "Sua solicitação de acesso administrativo foi enviada. Aguarde a aprovação.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao enviar solicitação",
        description: error.message,
        variant: "destructive",
      });
    }
  });
};

// Mutation para aprovar solicitação
export const useApproveAdminRequest = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (requestId: string) => {
      const { error } = await supabase.rpc('approve_admin_request', {
        request_id: requestId
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-requests'] });
      toast({
        title: "Solicitação aprovada!",
        description: "O usuário agora tem acesso administrativo.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao aprovar solicitação",
        description: error.message,
        variant: "destructive",
      });
    }
  });
};

// Mutation para rejeitar solicitação
export const useRejectAdminRequest = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (requestId: string) => {
      const { error } = await supabase
        .from('admin_requests')
        .update({ 
          status: 'rejected',
          reviewed_at: new Date().toISOString(),
          reviewed_by: (await supabase.auth.getUser()).data.user?.id
        })
        .eq('id', requestId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-requests'] });
      toast({
        title: "Solicitação rejeitada",
        description: "A solicitação foi rejeitada.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao rejeitar solicitação",
        description: error.message,
        variant: "destructive",
      });
    }
  });
};
