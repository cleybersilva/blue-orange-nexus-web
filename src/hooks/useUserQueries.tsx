
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { UserProfile, AdminRequest } from '@/types/blog';

// Hook otimizado para verificar permissões do usuário
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

      // PRIORIDADE MÁXIMA: Admin root Cleyber - retorna imediatamente
      if (user.user.email === 'cleyber.silva@live.com') {
        console.log('useIsApprovedAdmin - ROOT ADMIN DETECTED: cleyber.silva@live.com');
        
        try {
          // Garantir que o perfil existe com permissões corretas
          const { data: updatedProfile, error: updateError } = await supabase
            .from('profiles')
            .upsert({
              id: user.user.id,
              email: 'cleyber.silva@live.com',
              full_name: 'Cleyber Gomes da Silva',
              role: 'admin',
              admin_level: 'root',
              approved: true,
              updated_at: new Date().toISOString()
            })
            .select()
            .single();

          if (updateError) {
            console.error('useIsApprovedAdmin - Error updating root admin profile:', updateError);
          } else {
            console.log('useIsApprovedAdmin - Root admin profile updated successfully:', updatedProfile);
          }
        } catch (error) {
          console.error('useIsApprovedAdmin - Exception updating root admin profile:', error);
        }

        // Retornar permissões completas sempre para o root admin
        const rootAdminResponse = {
          isAdmin: true,
          isRoot: true,
          isAuthorAdmin: true,
          isAuthor: true,
          profile: {
            id: user.user.id,
            email: 'cleyber.silva@live.com',
            full_name: 'Cleyber Gomes da Silva',
            role: 'admin' as const,
            admin_level: 'root' as const,
            approved: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          } as UserProfile
        };
        
        console.log('useIsApprovedAdmin - Returning root admin permissions:', rootAdminResponse);
        return rootAdminResponse;
      }

      // Buscar perfil para outros usuários
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.user.id)
          .single();

        console.log('useIsApprovedAdmin - Profile query result:', data);
        console.log('useIsApprovedAdmin - Profile query error:', error);

        if (error && error.code === 'PGRST116') {
          // Tentar buscar por email como fallback
          const { data: emailProfile, error: emailError } = await supabase
            .from('profiles')
            .select('*')
            .eq('email', user.user.email)
            .single();
          
          if (emailProfile) {
            const isAdmin = emailProfile.role === 'admin' && emailProfile.approved === true;
            const isRoot = isAdmin && emailProfile.admin_level === 'root';
            const isAuthorAdmin = emailProfile.role === 'author_admin' && emailProfile.approved === true;
            const isAuthor = emailProfile.role === 'author' && emailProfile.approved === true;
            
            const result = { 
              isAdmin, 
              isRoot, 
              isAuthorAdmin,
              isAuthor,
              profile: emailProfile as UserProfile
            };
            
            console.log('useIsApprovedAdmin - Email fallback result:', result);
            return result;
          }
        }

        if (error) {
          console.error('useIsApprovedAdmin - Error fetching profile:', error);
          return { isAdmin: false, isRoot: false, isAuthorAdmin: false, isAuthor: false, profile: null };
        }
        
        const isAdmin = data?.role === 'admin' && data?.approved === true;
        const isRoot = isAdmin && data?.admin_level === 'root';
        const isAuthorAdmin = data?.role === 'author_admin' && data?.approved === true;
        const isAuthor = data?.role === 'author' && data?.approved === true;
        
        const finalResult = { 
          isAdmin, 
          isRoot, 
          isAuthorAdmin,
          isAuthor,
          profile: data as UserProfile
        };
        
        console.log('useIsApprovedAdmin - Final permissions:', finalResult);
        return finalResult;
      } catch (error) {
        console.error('useIsApprovedAdmin - Exception in profile query:', error);
        return { isAdmin: false, isRoot: false, isAuthorAdmin: false, isAuthor: false, profile: null };
      }
    },
    retry: 1,
    staleTime: 1000 * 30, // Cache reduzido para 30 segundos
    refetchOnWindowFocus: false,
    refetchOnMount: true
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

      // Admin root não precisa de solicitação
      if (user.user.email === 'cleyber.silva@live.com') {
        console.log('useMyAdminRequest - Root admin detected, no request needed');
        return null;
      }

      try {
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
      } catch (error) {
        console.error('useMyAdminRequest - Exception:', error);
        return null;
      }
    },
    retry: 1,
    staleTime: 1000 * 60 * 5 // Cache por 5 minutos
  });
};
