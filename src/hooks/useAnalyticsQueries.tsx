
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
