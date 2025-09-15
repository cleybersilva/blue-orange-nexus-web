import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Clients
export const useClients = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
};

export const useClientById = (id: string) => {
  return useQuery({
    queryKey: ['client', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });
};

// Contacts
export const useContacts = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select(`
          *,
          client:clients(name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
};

// Projects
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          client:clients(name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
};

export const useProjectById = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          client:clients(name),
          tasks:project_tasks(*)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });
};

// Project Tasks
export const useProjectTasks = (projectId?: string) => {
  return useQuery({
    queryKey: ['project_tasks', projectId],
    queryFn: async () => {
      let query = supabase
        .from('project_tasks')
        .select(`
          *,
          project:projects(name)
        `)
        .order('created_at', { ascending: false });
      
      if (projectId) {
        query = query.eq('project_id', projectId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    }
  });
};

// Site Pages
export const useSitePages = () => {
  return useQuery({
    queryKey: ['site_pages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_pages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
};

export const useSitePageById = (id: string) => {
  return useQuery({
    queryKey: ['site_page', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_pages')
        .select(`
          *,
          sections:site_sections(*)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });
};

// Site Sections
export const useSiteSections = (pageId?: string) => {
  return useQuery({
    queryKey: ['site_sections', pageId],
    queryFn: async () => {
      let query = supabase
        .from('site_sections')
        .select(`
          *,
          page:site_pages(title)
        `)
        .order('order_index');
      
      if (pageId) {
        query = query.eq('page_id', pageId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    }
  });
};

// Menus
export const useMenus = () => {
  return useQuery({
    queryKey: ['menus'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('menus')
        .select(`
          *,
          items:menu_items(*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
};

// Forms
export const useForms = () => {
  return useQuery({
    queryKey: ['forms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('forms')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
};

// Form Submissions
export const useFormSubmissions = (formId?: string) => {
  return useQuery({
    queryKey: ['form_submissions', formId],
    queryFn: async () => {
      let query = supabase
        .from('form_submissions')
        .select(`
          *,
          form:forms(name)
        `)
        .order('created_at', { ascending: false });
      
      if (formId) {
        query = query.eq('form_id', formId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    }
  });
};

// Automation Workflows
export const useAutomationWorkflows = () => {
  return useQuery({
    queryKey: ['automation_workflows'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('automation_workflows')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
};

// Messages
export const useMessages = () => {
  return useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          client:clients(name),
          project:projects(name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
};

// Categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });
};

// Tags
export const useTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });
};

// Media
export const useMedia = () => {
  return useQuery({
    queryKey: ['media'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
};