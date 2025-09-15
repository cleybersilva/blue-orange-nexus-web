import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Save, Upload, Eye, Layout, Palette } from 'lucide-react';
import { useMenus } from '@/hooks/useSaasQueries';
import { useToast } from '@/hooks/use-toast';

export default function HeaderPage() {
  const [headerConfig, setHeaderConfig] = useState({
    logo_url: '',
    logo_alt: 'Logo da Empresa',
    menu_id: '',
    cta_text: 'Entre em Contato',
    cta_url: '/contato',
    show_search: false,
    theme_color: '#3B82F6',
    sticky: true,
    transparent: false,
    height: 'medium'
  });
  const [isLoading, setIsLoading] = useState(false);

  const { data: menus } = useMenus();
  const { toast } = useToast();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Aqui você implementaria a lógica de salvar no Supabase
      // await saveHeaderConfig(headerConfig);
      
      toast({
        title: "Sucesso",
        description: "Configurações do cabeçalho salvas com sucesso"
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao salvar configurações",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const presetColors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
    '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Cabeçalho do Site</h1>
          <p className="text-muted-foreground">
            Configure o cabeçalho e navegação principal do site
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Preview do Cabeçalho
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className={`border rounded-lg p-4 ${headerConfig.transparent ? 'bg-transparent' : 'bg-background'}`}
                style={{ borderColor: headerConfig.theme_color + '20' }}
              >
                <div className={`flex items-center justify-between ${
                  headerConfig.height === 'small' ? 'h-12' : 
                  headerConfig.height === 'medium' ? 'h-16' : 'h-20'
                }`}>
                  {/* Logo */}
                  <div className="flex items-center space-x-3">
                    {headerConfig.logo_url ? (
                      <img 
                        src={headerConfig.logo_url} 
                        alt={headerConfig.logo_alt}
                        className="h-8 w-auto"
                      />
                    ) : (
                      <div 
                        className="h-8 w-24 rounded flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: headerConfig.theme_color }}
                      >
                        LOGO
                      </div>
                    )}
                  </div>

                  {/* Menu */}
                  <div className="hidden md:flex items-center space-x-6">
                    <a href="#" className="text-sm font-medium hover:text-primary">Home</a>
                    <a href="#" className="text-sm font-medium hover:text-primary">Sobre</a>
                    <a href="#" className="text-sm font-medium hover:text-primary">Serviços</a>
                    <a href="#" className="text-sm font-medium hover:text-primary">Contato</a>
                  </div>

                  {/* Search e CTA */}
                  <div className="flex items-center space-x-3">
                    {headerConfig.show_search && (
                      <div className="hidden md:block">
                        <Input placeholder="Buscar..." className="w-32 h-8" />
                      </div>
                    )}
                    {headerConfig.cta_text && (
                      <Button 
                        size="sm"
                        style={{ backgroundColor: headerConfig.theme_color }}
                      >
                        {headerConfig.cta_text}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              {headerConfig.sticky && (
                <div className="mt-2 text-xs text-muted-foreground">
                  * Este cabeçalho ficará fixo no topo da página
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Configurações */}
        <div className="space-y-6">
          {/* Logo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Logo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="logo_url">URL do Logo</Label>
                <div className="flex space-x-2">
                  <Input
                    id="logo_url"
                    value={headerConfig.logo_url}
                    onChange={(e) => setHeaderConfig(prev => ({ ...prev, logo_url: e.target.value }))}
                    placeholder="https://exemplo.com/logo.png"
                  />
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="logo_alt">Texto Alternativo</Label>
                <Input
                  id="logo_alt"
                  value={headerConfig.logo_alt}
                  onChange={(e) => setHeaderConfig(prev => ({ ...prev, logo_alt: e.target.value }))}
                  placeholder="Logo da Empresa"
                />
              </div>
            </CardContent>
          </Card>

          {/* Navegação */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Navegação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="menu">Menu Principal</Label>
                <Select
                  value={headerConfig.menu_id}
                  onValueChange={(value) => setHeaderConfig(prev => ({ ...prev, menu_id: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o menu" />
                  </SelectTrigger>
                  <SelectContent>
                    {menus?.map((menu) => (
                      <SelectItem key={menu.id} value={menu.id}>
                        {menu.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="show_search"
                  checked={headerConfig.show_search}
                  onCheckedChange={(checked) => setHeaderConfig(prev => ({ ...prev, show_search: checked }))}
                />
                <Label htmlFor="show_search">Mostrar campo de busca</Label>
              </div>
            </CardContent>
          </Card>

          {/* Call-to-Action */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Call-to-Action</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cta_text">Texto do Botão</Label>
                <Input
                  id="cta_text"
                  value={headerConfig.cta_text}
                  onChange={(e) => setHeaderConfig(prev => ({ ...prev, cta_text: e.target.value }))}
                  placeholder="Entre em Contato"
                />
              </div>
              
              <div>
                <Label htmlFor="cta_url">URL do Botão</Label>
                <Input
                  id="cta_url"
                  value={headerConfig.cta_url}
                  onChange={(e) => setHeaderConfig(prev => ({ ...prev, cta_url: e.target.value }))}
                  placeholder="/contato"
                />
              </div>
            </CardContent>
          </Card>

          {/* Aparência */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Palette className="h-4 w-4 mr-2" />
                Aparência
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Cor do Tema</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {presetColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setHeaderConfig(prev => ({ ...prev, theme_color: color }))}
                      className={`w-8 h-8 rounded border-2 ${
                        headerConfig.theme_color === color ? 'border-gray-800' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <Input
                  value={headerConfig.theme_color}
                  onChange={(e) => setHeaderConfig(prev => ({ ...prev, theme_color: e.target.value }))}
                  className="mt-2"
                  placeholder="#3B82F6"
                />
              </div>
              
              <div>
                <Label htmlFor="height">Altura</Label>
                <Select
                  value={headerConfig.height}
                  onValueChange={(value) => setHeaderConfig(prev => ({ ...prev, height: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Pequena</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="sticky"
                    checked={headerConfig.sticky}
                    onCheckedChange={(checked) => setHeaderConfig(prev => ({ ...prev, sticky: checked }))}
                  />
                  <Label htmlFor="sticky">Cabeçalho fixo</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="transparent"
                    checked={headerConfig.transparent}
                    onCheckedChange={(checked) => setHeaderConfig(prev => ({ ...prev, transparent: checked }))}
                  />
                  <Label htmlFor="transparent">Fundo transparente</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}