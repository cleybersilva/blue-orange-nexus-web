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
  views?: number;
  shares?: number;
  likes?: number;
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

export interface ArticleAnalytics {
  id: string;
  article_id: string;
  view_date: string;
  views_count: number;
  shares_count: number;
  likes_count: number;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email?: string;
  full_name?: string;
  role?: 'admin' | 'author_admin' | 'author';
  approved?: boolean;
  admin_level?: 'root' | 'admin';
  created_at: string;
  updated_at: string;
}

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

// Hook atualizado para verificar permissões do usuário
export const useIsApprovedAdmin = () => {
  return useQuery({
    queryKey: ['is-approved-admin'],
    queryFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      console.log('useIsApprovedAdmin - Current user:', user.user?.email);
      
      if (!user.user) {
        console.log('useIsApprovedAdmin - No user found');
        return { isAdmin: false, isRoot: false, isAuthorAdmin: false, isAuthor: false, profile: null };
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('role, approved, admin_level, email, full_name')
        .eq('id', user.user.id)
        .single();

      console.log('useIsApprovedAdmin - Profile data:', data);
      console.log('useIsApprovedAdmin - Profile error:', error);

      if (error) {
        console.error('useIsApprovedAdmin - Error fetching profile:', error);
        return { isAdmin: false, isRoot: false, isAuthorAdmin: false, isAuthor: false, profile: null };
      }
      
      const isAdmin = data?.role === 'admin' && data?.approved === true;
      const isRoot = isAdmin && data?.admin_level === 'root';
      const isAuthorAdmin = data?.role === 'author_admin' && data?.approved === true;
      const isAuthor = data?.role === 'author' && data?.approved === true;
      
      console.log('useIsApprovedAdmin - Calculated permissions:', {
        isAdmin,
        isRoot,
        isAuthorAdmin,
        isAuthor,
        profile: data
      });
      
      return { 
        isAdmin, 
        isRoot, 
        isAuthorAdmin,
        isAuthor,
        profile: data as UserProfile
      };
    },
    retry: 1,
    staleTime: 1000 * 60 * 5 // Cache por 5 minutos
  });
};

// Hook para buscar analytics dos artigos
export const useArticleAnalytics = () => {
  return useQuery({
    queryKey: ['article-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('article_analytics')
        .select(`
          *,
          article:articles(title, slug)
        `)
        .order('view_date', { ascending: false });

      if (error) throw error;
      return data;
    }
  });
};

// Hook para buscar estatísticas gerais
export const useAnalyticsStats = () => {
  return useQuery({
    queryKey: ['analytics-stats'],
    queryFn: async () => {
      // Buscar artigos mais visitados
      const { data: mostViewed, error: viewError } = await supabase
        .from('articles')
        .select('title, slug, views, shares, likes')
        .eq('status', 'published')
        .order('views', { ascending: false })
        .limit(10);

      if (viewError) throw viewError;

      // Buscar estatísticas totais
      const { data: totalStats, error: statsError } = await supabase
        .from('articles')
        .select('views, shares, likes')
        .eq('status', 'published');

      if (statsError) throw statsError;

      const totals = totalStats?.reduce((acc, article) => ({
        totalViews: acc.totalViews + (article.views || 0),
        totalShares: acc.totalShares + (article.shares || 0),
        totalLikes: acc.totalLikes + (article.likes || 0)
      }), { totalViews: 0, totalShares: 0, totalLikes: 0 });

      return {
        mostViewed: mostViewed || [],
        totals: totals || { totalViews: 0, totalShares: 0, totalLikes: 0 }
      };
    }
  });
};

// Hook para buscar todos os perfis de usuário (apenas para root)
export const useUserProfiles = () => {
  return useQuery({
    queryKey: ['user-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as UserProfile[];
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
      const { data: user } = await supabase.auth.getUser();
      console.log('useMyAdminRequest - Current user:', user.user?.email);
      
      if (!user.user) {
        console.log('useMyAdminRequest - No user found');
        return null;
      }

      const { data, error } = await supabase
        .from('admin_requests')
        .select('*')
        .eq('user_id', user.user.id)
        .single();

      console.log('useMyAdminRequest - Request data:', data);
      console.log('useMyAdminRequest - Request error:', error);

      if (error && error.code !== 'PGRST116') {
        console.error('useMyAdminRequest - Error fetching request:', error);
        throw error;
      }
      
      return data as AdminRequest | null;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5 // Cache por 5 minutos
  });
};

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

// Mutation para criar solicitação de admin com seleção de role
export const useCreateAdminRequest = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (requestData: { email: string; full_name: string; message?: string; role: 'admin' | 'author_admin' | 'author' }) => {
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
        description: "Sua solicitação de acesso foi enviada. Aguarde a aprovação.",
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

// Mutation para aprovar solicitação com role específico
export const useApproveAdminRequest = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ requestId, role }: { requestId: string; role: 'admin' | 'author_admin' | 'author' }) => {
      // Primeiro, buscar dados da solicitação
      const { data: request, error: requestError } = await supabase
        .from('admin_requests')
        .select('*')
        .eq('id', requestId)
        .single();

      if (requestError) throw requestError;

      // Atualizar status da solicitação
      const { error: updateError } = await supabase
        .from('admin_requests')
        .update({ 
          status: 'approved',
          reviewed_at: new Date().toISOString(),
          reviewed_by: (await supabase.auth.getUser()).data.user?.id
        })
        .eq('id', requestId);

      if (updateError) throw updateError;

      // Criar ou atualizar perfil com o role selecionado
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: request.user_id,
          email: request.email,
          full_name: request.full_name,
          role: role,
          approved: true,
          updated_at: new Date().toISOString()
        });

      if (profileError) throw profileError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-requests'] });
      queryClient.invalidateQueries({ queryKey: ['user-profiles'] });
      toast({
        title: "Solicitação aprovada!",
        description: "O usuário agora tem acesso com o role selecionado.",
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

// Mutation para deletar perfil de usuário (apenas root)
export const useDeleteUserProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profiles'] });
      toast({
        title: "Usuário removido com sucesso!",
        description: "O perfil do usuário foi deletado permanentemente.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao remover usuário",
        description: error.message,
        variant: "destructive",
      });
    }
  });
};

// Mutation para atualizar nível de admin
export const useUpdateAdminLevel = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ userId, adminLevel }: { userId: string; adminLevel: 'admin' | 'root' }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          admin_level: adminLevel,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profiles'] });
      toast({
        title: "Nível atualizado com sucesso!",
        description: "O nível de administrador foi alterado.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao atualizar nível",
        description: error.message,
        variant: "destructive",
      });
    }
  });
};

// Mutation para alterar role do usuário
export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: 'admin' | 'author_admin' | 'author' }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          role: role,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profiles'] });
      toast({
        title: "Role atualizado com sucesso!",
        description: "O role do usuário foi alterado.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao atualizar role",
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
