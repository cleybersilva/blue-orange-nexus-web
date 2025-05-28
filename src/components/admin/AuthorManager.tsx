
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuthors, useCreateAuthor } from '@/hooks/useBlogData';
import { Loader2, Plus, User } from 'lucide-react';

const AuthorManager = () => {
  const { data: authors, isLoading } = useAuthors();
  const createAuthor = useCreateAuthor();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    avatar_url: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) return;

    try {
      await createAuthor.mutateAsync(formData);
      setFormData({ name: '', bio: '', avatar_url: '' });
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Erro ao criar autor:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-orange" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-navy">Gerenciar Autores</h2>
          <p className="text-gray-600">Adicione e gerencie os autores dos artigos</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange hover:bg-orange-dark text-white">
              <Plus size={16} className="mr-2" />
              Novo Autor
            </Button>
          </DialogTrigger>
          <DialogContent className="border-navy/20">
            <DialogHeader>
              <DialogTitle className="text-navy">Criar Novo Autor</DialogTitle>
              <DialogDescription>
                Adicione um novo autor ao sistema
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-navy">Nome *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nome do autor"
                  required
                  className="border-navy/20 focus:border-orange"
                />
              </div>
              
              <div>
                <Label htmlFor="bio" className="text-navy">Biografia</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Breve biografia do autor"
                  rows={3}
                  className="border-navy/20 focus:border-orange"
                />
              </div>
              
              <div>
                <Label htmlFor="avatar_url" className="text-navy">URL do Avatar</Label>
                <Input
                  id="avatar_url"
                  value={formData.avatar_url}
                  onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                  placeholder="https://exemplo.com/avatar.jpg"
                  className="border-navy/20 focus:border-orange"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-orange hover:bg-orange-dark text-white"
                disabled={createAuthor.isPending}
              >
                {createAuthor.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando...
                  </>
                ) : (
                  'Criar Autor'
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors?.map((author) => (
          <Card key={author.id} className="border-navy/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                {author.avatar_url ? (
                  <img 
                    src={author.avatar_url} 
                    alt={author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={24} className="text-gray-400" />
                  </div>
                )}
                <div>
                  <CardTitle className="text-lg text-navy">{author.name}</CardTitle>
                </div>
              </div>
            </CardHeader>
            {author.bio && (
              <CardContent>
                <p className="text-sm text-gray-600">{author.bio}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {authors?.length === 0 && (
        <Card className="border-navy/20">
          <CardContent className="text-center py-8">
            <User size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-navy mb-2">Nenhum autor encontrado</h3>
            <p className="text-gray-600 mb-4">Comece criando seu primeiro autor</p>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-orange hover:bg-orange-dark text-white"
            >
              <Plus size={16} className="mr-2" />
              Criar Primeiro Autor
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AuthorManager;
