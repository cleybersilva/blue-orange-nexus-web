
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Author } from '@/types/blog';

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
