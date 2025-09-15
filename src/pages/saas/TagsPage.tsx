import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useTags } from "@/hooks/useSaasQueries";
import { Plus, Tag, Edit, Trash2, Hash } from "lucide-react";
import { toast } from "sonner";

interface TagFormData {
  name: string;
  slug: string;
  color: string;
}

export default function TagsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<any>(null);
  
  const { data: tags, refetch } = useTags();

  const [formData, setFormData] = useState<TagFormData>({
    name: '',
    slug: '',
    color: '#6B7280'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Generate slug if not provided
      const slug = formData.slug || formData.name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      // In real app, make API call
      toast.success('Tag salva com sucesso!');
      
      setIsDialogOpen(false);
      setEditingTag(null);
      resetForm();
      refetch();
    } catch (error) {
      toast.error('Erro ao salvar tag');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      color: '#6B7280'
    });
  };

  const handleEdit = (tag: any) => {
    setEditingTag(tag);
    setFormData({
      name: tag.name,
      slug: tag.slug,
      color: tag.color || '#6B7280'
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Tem certeza que deseja excluir a tag "${name}"?`)) {
      try {
        // In real app, make API call
        toast.success('Tag excluída com sucesso!');
        refetch();
      } catch (error) {
        toast.error('Erro ao excluir tag');
      }
    }
  };

  const predefinedColors = [
    '#6B7280', '#EF4444', '#10B981', '#F59E0B',
    '#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4',
    '#84CC16', '#F97316', '#14B8A6', '#F472B6'
  ];

  // Group tags by color for better visualization
  const tagsByColor = tags?.reduce((acc: any, tag) => {
    const color = tag.color || '#6B7280';
    if (!acc[color]) acc[color] = [];
    acc[color].push(tag);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tags</h1>
          <p className="text-muted-foreground">Gerencie tags para classificação de conteúdo</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingTag(null);
              resetForm();
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Tag
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingTag ? 'Editar Tag' : 'Nova Tag'}</DialogTitle>
              <DialogDescription>
                {editingTag ? 'Edite as informações da tag.' : 'Crie uma nova tag para classificação.'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setFormData({
                      ...formData, 
                      name,
                      slug: name.toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-+|-+$/g, '')
                    });
                  }}
                  required
                  placeholder="Ex: JavaScript, Design, SEO..."
                />
              </div>
              
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  placeholder="tag-exemplo"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  URL amigável para a tag (gerado automaticamente se não informado)
                </p>
              </div>
              
              <div>
                <Label htmlFor="color">Cor da Tag</Label>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Input
                      id="color"
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                      placeholder="#6B7280"
                      className="font-mono"
                    />
                    <Badge style={{ backgroundColor: formData.color, color: 'white' }}>
                      Preview
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-6 gap-2">
                    {predefinedColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className="w-8 h-8 rounded border-2 hover:scale-110 transition-transform"
                        style={{ 
                          backgroundColor: color,
                          borderColor: formData.color === color ? '#000' : 'transparent'
                        }}
                        onClick={() => setFormData({...formData, color})}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingTag ? 'Salvar' : 'Criar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tags Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{tags?.length || 0}</p>
              <p className="text-sm text-muted-foreground">Total de Tags</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{Object.keys(tagsByColor || {}).length}</p>
              <p className="text-sm text-muted-foreground">Cores Diferentes</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Tags Mais Usadas</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Tags Sem Uso</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tags Display */}
      <div className="space-y-6">
        {Object.entries(tagsByColor || {}).map(([color, colorTags]: [string, any]) => (
          <Card key={color}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: color }}
                />
                Tags - {color}
                <span className="text-sm font-normal text-muted-foreground">
                  ({colorTags.length} tag{colorTags.length !== 1 ? 's' : ''})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {colorTags.map((tag: any) => (
                  <div key={tag.id} className="flex items-center gap-2">
                    <Badge 
                      style={{ backgroundColor: tag.color, color: 'white' }}
                      className="text-sm py-1 px-3"
                    >
                      <Hash className="h-3 w-3 mr-1" />
                      {tag.name}
                    </Badge>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0"
                        onClick={() => handleEdit(tag)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(tag.id, tag.name)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* All Tags Cloud View */}
      <Card>
        <CardHeader>
          <CardTitle>Nuvem de Tags</CardTitle>
          <CardDescription>Todas as tags em um só lugar</CardDescription>
        </CardHeader>
        <CardContent>
          {tags && tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge 
                  key={tag.id}
                  style={{ backgroundColor: tag.color, color: 'white' }}
                  className="text-sm py-1 px-3 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <Hash className="h-3 w-3 mr-1" />
                  {tag.name}
                </Badge>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">Nenhuma tag cadastrada</h3>
              <p className="text-muted-foreground">
                Crie tags para classificar e organizar melhor seu conteúdo
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}