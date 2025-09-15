import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Search, Plus, Edit, Trash2, Menu, Link2, ChevronRight } from 'lucide-react';
import { useMenus } from '@/hooks/useSaasQueries';
import { useCreateMenu, useCreateMenuItem } from '@/hooks/useSaasMutations';
import { useToast } from '@/hooks/use-toast';

export default function MenusPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuDialogOpen, setIsMenuDialogOpen] = useState(false);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState('');
  const [newMenu, setNewMenu] = useState({
    name: '',
    location: 'header'
  });
  const [newMenuItem, setNewMenuItem] = useState({
    menu_id: '',
    title: '',
    url: '',
    order_index: 0,
    is_active: true,
    parent_id: null
  });

  const { data: menus, isLoading } = useMenus();
  const createMenuMutation = useCreateMenu();
  const createMenuItemMutation = useCreateMenuItem();
  const { toast } = useToast();

  const handleCreateMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMenu.name) {
      toast({
        title: "Erro",
        description: "Nome do menu é obrigatório",
        variant: "destructive"
      });
      return;
    }

    try {
      await createMenuMutation.mutateAsync(newMenu);
      
      setNewMenu({ name: '', location: 'header' });
      setIsMenuDialogOpen(false);
      
      toast({
        title: "Sucesso",
        description: "Menu criado com sucesso"
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar menu",
        variant: "destructive"
      });
    }
  };

  const handleCreateMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMenuItem.title || !newMenuItem.menu_id) {
      toast({
        title: "Erro",
        description: "Título e menu são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    try {
      await createMenuItemMutation.mutateAsync(newMenuItem);
      
      setNewMenuItem({
        menu_id: '',
        title: '',
        url: '',
        order_index: 0,
        is_active: true,
        parent_id: null
      });
      setIsItemDialogOpen(false);
      
      toast({
        title: "Sucesso",
        description: "Item de menu criado com sucesso"
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar item",
        variant: "destructive"
      });
    }
  };

  const getLocationBadgeColor = (location: string) => {
    const colors = {
      header: 'bg-blue-100 text-blue-800',
      footer: 'bg-green-100 text-green-800',
      sidebar: 'bg-purple-100 text-purple-800',
      mobile: 'bg-orange-100 text-orange-800'
    };
    return colors[location as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const renderMenuItems = (items: any[], parentId = null, level = 0) => {
    const filteredItems = items?.filter(item => item.parent_id === parentId) || [];
    
    return filteredItems.map((item: any) => (
      <div key={item.id} className={`ml-${level * 4} border-l border-muted pl-4 py-2`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link2 className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{item.title}</span>
            {item.url && (
              <span className="text-sm text-muted-foreground">→ {item.url}</span>
            )}
            <Badge variant={item.is_active ? "default" : "secondary"} className="text-xs">
              {item.is_active ? "Ativo" : "Inativo"}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {renderMenuItems(items, item.id, level + 1)}
      </div>
    ));
  };

  const filteredMenus = menus?.filter(menu =>
    menu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    menu.location.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Menus de Navegação</h1>
          <p className="text-muted-foreground">
            Gerencie os menus e itens de navegação do site
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Link2 className="h-4 w-4 mr-2" />
                Novo Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Item de Menu</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateMenuItem} className="space-y-4">
                <div>
                  <Label htmlFor="menu_select">Menu</Label>
                  <Select
                    value={newMenuItem.menu_id}
                    onValueChange={(value) => setNewMenuItem(prev => ({ ...prev, menu_id: value }))}
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
                
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={newMenuItem.title}
                    onChange={(e) => setNewMenuItem(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Ex: Sobre Nós"
                  />
                </div>
                
                <div>
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    value={newMenuItem.url}
                    onChange={(e) => setNewMenuItem(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="Ex: /sobre"
                  />
                </div>
                
                <div>
                  <Label htmlFor="order_item">Ordem</Label>
                  <Input
                    id="order_item"
                    type="number"
                    value={newMenuItem.order_index}
                    onChange={(e) => setNewMenuItem(prev => ({ ...prev, order_index: parseInt(e.target.value) }))}
                    min="0"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="active_item"
                    checked={newMenuItem.is_active}
                    onCheckedChange={(checked) => setNewMenuItem(prev => ({ ...prev, is_active: checked }))}
                  />
                  <Label htmlFor="active_item">Item ativo</Label>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsItemDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Criar Item</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isMenuDialogOpen} onOpenChange={setIsMenuDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Menu
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Menu</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateMenu} className="space-y-4">
                <div>
                  <Label htmlFor="menu_name">Nome do Menu</Label>
                  <Input
                    id="menu_name"
                    value={newMenu.name}
                    onChange={(e) => setNewMenu(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: Menu Principal"
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Localização</Label>
                  <Select
                    value={newMenu.location}
                    onValueChange={(value) => setNewMenu(prev => ({ ...prev, location: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="header">Cabeçalho</SelectItem>
                      <SelectItem value="footer">Rodapé</SelectItem>
                      <SelectItem value="sidebar">Barra Lateral</SelectItem>
                      <SelectItem value="mobile">Menu Mobile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsMenuDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Criar Menu</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar menus..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="grid gap-6">
        {filteredMenus.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Menu className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum menu encontrado</h3>
              <p className="text-muted-foreground text-center">
                {searchTerm ? 'Tente ajustar os filtros de busca.' : 'Crie seu primeiro menu para começar.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredMenus.map((menu: any) => (
            <Card key={menu.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-4">
                  <Menu className="h-5 w-5" />
                  <div>
                    <CardTitle className="text-lg">{menu.name}</CardTitle>
                    <CardDescription>
                      {menu.items?.length || 0} itens
                    </CardDescription>
                  </div>
                  <Badge className={getLocationBadgeColor(menu.location)}>
                    {menu.location}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {menu.items && menu.items.length > 0 ? (
                    renderMenuItems(menu.items)
                  ) : (
                    <div className="text-muted-foreground text-center py-4">
                      Nenhum item neste menu
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}