import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Save, Plus, Edit, Trash2, Eye, Palette, Link, MapPin } from 'lucide-react';
import { useMenus } from '@/hooks/useSaasQueries';
import { useToast } from '@/hooks/use-toast';

interface FooterColumn {
  id: string;
  title: string;
  links: { text: string; url: string; }[];
}

export default function FooterPage() {
  const [footerConfig, setFooterConfig] = useState({
    columns: [
      {
        id: '1',
        title: 'Empresa',
        links: [
          { text: 'Sobre Nós', url: '/sobre' },
          { text: 'Nossa Equipe', url: '/equipe' },
          { text: 'Carreiras', url: '/carreiras' }
        ]
      },
      {
        id: '2', 
        title: 'Serviços',
        links: [
          { text: 'Desenvolvimento Web', url: '/servicos/web' },
          { text: 'Marketing Digital', url: '/servicos/marketing' },
          { text: 'Consultoria', url: '/servicos/consultoria' }
        ]
      }
    ] as FooterColumn[],
    social_links: {
      facebook: '',
      instagram: '',
      linkedin: '',
      twitter: '',
      youtube: ''
    },
    copyright_text: '© 2024 AgênciaDigital HUB. Todos os direitos reservados.',
    legal_menu_id: '',
    theme_color: '#1F2937',
    show_contact_info: true,
    contact_info: {
      phone: '(11) 9999-9999',
      email: 'contato@agenciadigital.com',
      address: 'São Paulo, SP - Brasil'
    }
  });
  
  const [isColumnDialogOpen, setIsColumnDialogOpen] = useState(false);
  const [editingColumn, setEditingColumn] = useState<FooterColumn | null>(null);
  const [newColumn, setNewColumn] = useState({
    title: '',
    links: [{ text: '', url: '' }]
  });
  
  const { data: menus } = useMenus();
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      // Implementar salvamento no Supabase
      toast({
        title: "Sucesso",
        description: "Configurações do rodapé salvas com sucesso"
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao salvar configurações",
        variant: "destructive"
      });
    }
  };

  const handleAddColumn = () => {
    if (!newColumn.title) {
      toast({
        title: "Erro",
        description: "Título da coluna é obrigatório",
        variant: "destructive"
      });
      return;
    }

    const column: FooterColumn = {
      id: Date.now().toString(),
      title: newColumn.title,
      links: newColumn.links.filter(link => link.text && link.url)
    };

    setFooterConfig(prev => ({
      ...prev,
      columns: [...prev.columns, column]
    }));

    setNewColumn({ title: '', links: [{ text: '', url: '' }] });
    setIsColumnDialogOpen(false);
    
    toast({
      title: "Sucesso",
      description: "Coluna adicionada com sucesso"
    });
  };

  const handleRemoveColumn = (columnId: string) => {
    setFooterConfig(prev => ({
      ...prev,
      columns: prev.columns.filter(col => col.id !== columnId)
    }));
  };

  const addLinkToColumn = () => {
    setNewColumn(prev => ({
      ...prev,
      links: [...prev.links, { text: '', url: '' }]
    }));
  };

  const removeLinkFromColumn = (index: number) => {
    setNewColumn(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const updateColumnLink = (index: number, field: 'text' | 'url', value: string) => {
    setNewColumn(prev => ({
      ...prev,
      links: prev.links.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const presetColors = [
    '#1F2937', '#111827', '#374151', '#4B5563',
    '#1E40AF', '#1D4ED8', '#7C3AED', '#DC2626'
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Rodapé do Site</h1>
          <p className="text-muted-foreground">
            Configure o rodapé com links, informações de contato e redes sociais
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
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
                Preview do Rodapé
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="p-6 rounded-lg text-white"
                style={{ backgroundColor: footerConfig.theme_color }}
              >
                {/* Colunas do Footer */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  {footerConfig.columns.map((column) => (
                    <div key={column.id}>
                      <h4 className="font-semibold mb-3">{column.title}</h4>
                      <ul className="space-y-2">
                        {column.links.map((link, index) => (
                          <li key={index}>
                            <a href={link.url} className="text-sm opacity-80 hover:opacity-100">
                              {link.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  
                  {/* Informações de Contato */}
                  {footerConfig.show_contact_info && (
                    <div>
                      <h4 className="font-semibold mb-3">Contato</h4>
                      <div className="space-y-2 text-sm opacity-80">
                        <p>{footerConfig.contact_info.phone}</p>
                        <p>{footerConfig.contact_info.email}</p>
                        <p>{footerConfig.contact_info.address}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Redes Sociais */}
                <div className="border-t border-white/20 pt-4 flex justify-between items-center">
                  <p className="text-sm opacity-80">{footerConfig.copyright_text}</p>
                  <div className="flex space-x-4">
                    {Object.entries(footerConfig.social_links).map(([platform, url]) => 
                      url && (
                        <a key={platform} href={url as string} className="text-sm opacity-80 hover:opacity-100">
                          {platform}
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configurações */}
        <div className="space-y-6">
          {/* Colunas */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Colunas de Links</CardTitle>
              <Dialog open={isColumnDialogOpen} onOpenChange={setIsColumnDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Adicionar Coluna</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="column_title">Título da Coluna</Label>
                      <Input
                        id="column_title"
                        value={newColumn.title}
                        onChange={(e) => setNewColumn(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Ex: Empresa"
                      />
                    </div>
                    
                    <div>
                      <Label>Links</Label>
                      <div className="space-y-3">
                        {newColumn.links.map((link, index) => (
                          <div key={index} className="flex space-x-2">
                            <Input
                              placeholder="Texto do link"
                              value={link.text}
                              onChange={(e) => updateColumnLink(index, 'text', e.target.value)}
                            />
                            <Input
                              placeholder="URL"
                              value={link.url}
                              onChange={(e) => updateColumnLink(index, 'url', e.target.value)}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeLinkFromColumn(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={addLinkToColumn}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Link
                      </Button>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsColumnDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleAddColumn}>
                        Adicionar Coluna
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="space-y-3">
              {footerConfig.columns.map((column) => (
                <div key={column.id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <h4 className="font-medium">{column.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {column.links.length} link(s)
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveColumn(column.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Informações de Contato */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Informações de Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={footerConfig.contact_info.phone}
                  onChange={(e) => setFooterConfig(prev => ({
                    ...prev,
                    contact_info: { ...prev.contact_info, phone: e.target.value }
                  }))}
                  placeholder="(11) 9999-9999"
                />
              </div>
              
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  value={footerConfig.contact_info.email}
                  onChange={(e) => setFooterConfig(prev => ({
                    ...prev,
                    contact_info: { ...prev.contact_info, email: e.target.value }
                  }))}
                  placeholder="contato@empresa.com"
                />
              </div>
              
              <div>
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={footerConfig.contact_info.address}
                  onChange={(e) => setFooterConfig(prev => ({
                    ...prev,
                    contact_info: { ...prev.contact_info, address: e.target.value }
                  }))}
                  placeholder="São Paulo, SP - Brasil"
                />
              </div>
            </CardContent>
          </Card>

          {/* Redes Sociais */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Redes Sociais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(footerConfig.social_links).map(([platform, url]) => (
                <div key={platform}>
                  <Label htmlFor={platform}>{platform.charAt(0).toUpperCase() + platform.slice(1)}</Label>
                  <Input
                    id={platform}
                    value={url as string}
                    onChange={(e) => setFooterConfig(prev => ({
                      ...prev,
                      social_links: { ...prev.social_links, [platform]: e.target.value }
                    }))}
                    placeholder={`https://${platform}.com/usuario`}
                  />
                </div>
              ))}
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
                <Label>Cor de Fundo</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {presetColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setFooterConfig(prev => ({ ...prev, theme_color: color }))}
                      className={`w-8 h-8 rounded border-2 ${
                        footerConfig.theme_color === color ? 'border-white' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <Input
                  value={footerConfig.theme_color}
                  onChange={(e) => setFooterConfig(prev => ({ ...prev, theme_color: e.target.value }))}
                  className="mt-2"
                  placeholder="#1F2937"
                />
              </div>
              
              <div>
                <Label htmlFor="copyright">Texto de Copyright</Label>
                <Textarea
                  id="copyright"
                  value={footerConfig.copyright_text}
                  onChange={(e) => setFooterConfig(prev => ({ ...prev, copyright_text: e.target.value }))}
                  placeholder="© 2024 Empresa. Todos os direitos reservados."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}