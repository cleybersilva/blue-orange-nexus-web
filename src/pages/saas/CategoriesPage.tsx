import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCategories } from "@/hooks/useSaasQueries";
import { useCreateCategory } from "@/hooks/useSaasMutations";
import { Plus, Folder, Edit, Trash2, Palette } from "lucide-react";
import { toast } from "sonner";

interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  color: string;
}

export default function CategoriesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  
  const { data: categories, refetch } = useCategories();
  const createCategory = useCreateCategory();

  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    slug: '',
    description: '',
    color: '#3B82F6'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Generate slug if not provided
      const slug = formData.slug || formData.name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      await createCategory.mutateAsync({
        ...formData,
        slug
      });
      
      setIsDialogOpen(false);
      setEditingCategory(null);
      resetForm();
      refetch();
    } catch (error) {
      toast.error('Erro ao salvar categoria');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      color: '#3B82F6'
    });
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      color: category.color || '#3B82F6'
    });
    setIsDialogOpen(true);
  };

  const predefinedColors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16',
    '#6B7280', '#F97316', '#14B8A6', '#F472B6'
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Categorias</h1>
          <p className="text-muted-foreground">Organize conteúdo e projetos por categorias</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingCategory(null);
              resetForm();
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Categoria
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingCategory ? 'Editar Categoria' : 'Nova Categoria'}</DialogTitle>
              <DialogDescription>
                {editingCategory ? 'Edite as informações da categoria.' : 'Crie uma nova categoria para organizar conteúdo.'}
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
                />
              </div>
              
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  placeholder="categoria-exemplo"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  URL amigável para a categoria (gerado automaticamente se não informado)
                </p>
              </div>
              
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Descreva o propósito desta categoria..."
                />
              </div>
              
              <div>
                <Label htmlFor="color">Cor</Label>
                <div className="space-y-2">
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
                      placeholder="#3B82F6"
                      className="font-mono"
                    />
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
                  {editingCategory ? 'Salvar' : 'Criar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories?.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: category.color }}
                  />
                  {category.name}
                </CardTitle>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(category)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Folder className="h-4 w-4" />
                <code>/{category.slug}</code>
              </div>
              
              {category.description && (
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              )}
              
              <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                <span>Criada em {new Date(category.created_at).toLocaleDateString('pt-BR')}</span>
                <div className="flex items-center gap-1">
                  <Palette className="h-3 w-3" />
                  <span>{category.color}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {categories?.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Folder className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Nenhuma categoria cadastrada</h3>
            <p className="text-muted-foreground">
              Crie categorias para organizar melhor seu conteúdo
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}