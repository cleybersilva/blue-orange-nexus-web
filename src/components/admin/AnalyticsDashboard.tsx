
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAnalyticsStats, useArticleAnalytics } from '@/hooks/useBlogData';
import { Loader2, Eye, Share, Heart, TrendingUp, BarChart3 } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#FF6F3C', '#1A2A44', '#16a34a', '#dc2626', '#7c3aed', '#ea580c'];

const AnalyticsDashboard = () => {
  const { data: stats, isLoading: statsLoading } = useAnalyticsStats();
  const { data: analytics, isLoading: analyticsLoading } = useArticleAnalytics();

  if (statsLoading || analyticsLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-orange" />
      </div>
    );
  }

  const chartConfig = {
    views: {
      label: "Visualizações",
      color: "#FF6F3C",
    },
    shares: {
      label: "Compartilhamentos",
      color: "#1A2A44",
    },
    likes: {
      label: "Curtidas",
      color: "#16a34a",
    },
  };

  const pieData = [
    { name: 'Visualizações', value: stats?.totals.totalViews || 0, color: '#FF6F3C' },
    { name: 'Compartilhamentos', value: stats?.totals.totalShares || 0, color: '#1A2A44' },
    { name: 'Curtidas', value: stats?.totals.totalLikes || 0, color: '#16a34a' },
  ];

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-navy/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-navy">Total de Visualizações</CardTitle>
            <Eye className="h-4 w-4 text-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange">{stats?.totals.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-navy/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-navy">Total de Compartilhamentos</CardTitle>
            <Share className="h-4 w-4 text-navy" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy">{stats?.totals.totalShares.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +15.3% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-navy/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-navy">Total de Curtidas</CardTitle>
            <Heart className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats?.totals.totalLikes.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12.7% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Barras - Artigos Mais Visitados */}
        <Card className="border-navy/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-navy">
              <BarChart3 className="h-5 w-5 text-orange" />
              Top 10 Artigos Mais Visitados
            </CardTitle>
            <CardDescription>
              Artigos com maior número de visualizações
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.mostViewed.slice(0, 8)}>
                  <XAxis 
                    dataKey="title" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="views" fill="#FF6F3C" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Pizza - Distribuição de Engajamento */}
        <Card className="border-navy/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-navy">
              <TrendingUp className="h-5 w-5 text-orange" />
              Distribuição de Engajamento
            </CardTitle>
            <CardDescription>
              Proporção entre visualizações, compartilhamentos e curtidas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Lista Detalhada dos Artigos Mais Populares */}
      <Card className="border-navy/20">
        <CardHeader>
          <CardTitle className="text-navy">Ranking Completo de Artigos</CardTitle>
          <CardDescription>
            Performance detalhada de todos os artigos publicados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats?.mostViewed.map((article, index) => (
              <div key={article.slug} className="flex items-center justify-between p-4 border border-navy/10 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="min-w-[2rem] justify-center border-navy/20">
                    #{index + 1}
                  </Badge>
                  <div>
                    <h4 className="font-medium text-navy">{article.title}</h4>
                    <p className="text-sm text-gray-600">/{article.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4 text-orange" />
                    <span className="font-medium">{article.views?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share className="h-4 w-4 text-navy" />
                    <span className="font-medium">{article.shares?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-green-600" />
                    <span className="font-medium">{article.likes?.toLocaleString() || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
