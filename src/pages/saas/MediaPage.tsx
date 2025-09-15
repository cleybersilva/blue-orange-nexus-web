import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  Image, 
  Video, 
  FileText, 
  Download, 
  Trash2, 
  Eye,
  Edit,
  Search,
  Filter,
  Grid3X3,
  List,
  FolderPlus,
  Share2,
  Copy,
  ExternalLink,
  HardDrive,
  Folder
} from 'lucide-react';
import { useMedia } from '@/hooks/useSaasQueries';
import { useToast } from '@/hooks/use-toast';

export default function MediaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedType, setSelectedType] = useState('all');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [newFolder, setNewFolder] = useState({
    name: '',
    description: ''
  });

  const { data: media, isLoading } = useMedia();
  const { toast } = useToast();

  // Mock data para demonstração
  const mediaFiles = [
    {
      id: '1',
      filename: 'hero-image.jpg',
      original_name: 'Hero Image Background.jpg',
      mime_type: 'image/jpeg',
      size: 2048576, // 2MB
      url: '/lovable-uploads/1912350f-7bdb-459c-b8cc-2e9f1ad46335.png',
      alt_text: 'Imagem de fundo para hero section',
      created_at: '2024-01-15T10:30:00Z',
      folder: 'Images',
      usage: ['Homepage Hero', 'About Page']
    },
    {
      id: '2',
      filename: 'company-logo.svg',
      original_name: 'Company Logo.svg',
      mime_type: 'image/svg+xml',
      size: 45231,
      url: '/logo.svg',
      alt_text: 'Logo da empresa',
      created_at: '2024-01-14T15:20:00Z',
      folder: 'Logos',
      usage: ['Header', 'Footer', 'Email Templates']
    },
    {
      id: '3',
      filename: 'product-demo.mp4',
      original_name: 'Product Demo Video.mp4',
      mime_type: 'video/mp4',
      size: 25600000, // 25MB
      url: '/videos/demo.mp4',
      alt_text: 'Vídeo demonstrativo do produto',
      created_at: '2024-01-13T09:45:00Z',
      folder: 'Videos',
      usage: ['Landing Page', 'Product Page']
    },
    {
      id: '4',
      filename: 'terms-conditions.pdf',
      original_name: 'Terms and Conditions.pdf',
      mime_type: 'application/pdf',
      size: 156789,
      url: '/documents/terms.pdf',
      alt_text: 'Documento de termos e condições',
      created_at: '2024-01-12T14:15:00Z',
      folder: 'Documents',
      usage: ['Footer Links', 'Legal Page']
    }
  ];

  const folders = [
    { name: 'Images', count: 45, size: '120 MB' },
    { name: 'Videos', count: 12, size: '2.1 GB' },
    { name: 'Documents', count: 28, size: '85 MB' },
    { name: 'Logos', count: 8, size: '2.3 MB' },
    { name: 'Icons', count: 156, size: '12 MB' }
  ];

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;

    try {
      // Implementar upload de arquivos
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log('Uploading file:', file.name);
      }
      
      toast({
        title: "Sucesso",
        description: `${files.length} arquivo(s) enviado(s) com sucesso`
      });
      setIsUploadDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao fazer upload",
        variant: "destructive"
      });
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolder.name) {
      toast({
        title: "Erro",
        description: "Nome da pasta é obrigatório",
        variant: "destructive"
      });
      return;
    }

    try {
      // Implementar criação de pasta
      toast({
        title: "Sucesso",
        description: "Pasta criada com sucesso"
      });
      setIsFolderDialogOpen(false);
      setNewFolder({ name: '', description: '' });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar pasta",
        variant: "destructive"
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <Image className="h-5 w-5 text-blue-600" />;
    if (mimeType.startsWith('video/')) return <Video className="h-5 w-5 text-purple-600" />;
    return <FileText className="h-5 w-5 text-gray-600" />;
  };

  const getFileTypeColor = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return 'bg-blue-100 text-blue-800';
    if (mimeType.startsWith('video/')) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.original_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.alt_text?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || 
                       (selectedType === 'images' && file.mime_type.startsWith('image/')) ||
                       (selectedType === 'videos' && file.mime_type.startsWith('video/')) ||
                       (selectedType === 'documents' && !file.mime_type.startsWith('image/') && !file.mime_type.startsWith('video/'));
    
    return matchesSearch && matchesType;
  });

  const totalSize = mediaFiles.reduce((sum, file) => sum + file.size, 0);
  const totalFiles = mediaFiles.length;

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
          <h1 className="text-3xl font-bold">Biblioteca de Mídia</h1>
          <p className="text-muted-foreground">
            Gerencie todos os arquivos e mídias do site
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Dialog open={isFolderDialogOpen} onOpenChange={setIsFolderDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FolderPlus className="h-4 w-4 mr-2" />
                Nova Pasta
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Pasta</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="folder_name">Nome da Pasta</Label>
                  <Input
                    id="folder_name"
                    value={newFolder.name}
                    onChange={(e) => setNewFolder(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: Imagens do Blog"
                  />
                </div>
                <div>
                  <Label htmlFor="folder_description">Descrição (Opcional)</Label>
                  <Textarea
                    id="folder_description"
                    value={newFolder.description}
                    onChange={(e) => setNewFolder(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descrição da pasta..."
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsFolderDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateFolder}>
                    Criar Pasta
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload de Arquivos
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload de Arquivos</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">Arraste e solte arquivos aqui</p>
                  <p className="text-muted-foreground mb-4">ou clique para selecionar</p>
                  <Input
                    type="file"
                    multiple
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                  <Button asChild>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Selecionar Arquivos
                    </label>
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Formatos suportados: JPG, PNG, SVG, MP4, PDF, DOC, etc.</p>
                  <p>Tamanho máximo: 50MB por arquivo</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Arquivos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFiles}</div>
            <p className="text-xs text-muted-foreground">Arquivos na biblioteca</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Espaço Usado</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatFileSize(totalSize)}</div>
            <p className="text-xs text-muted-foreground">de 10 GB disponível</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Imagens</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mediaFiles.filter(f => f.mime_type.startsWith('image/')).length}
            </div>
            <p className="text-xs text-muted-foreground">Arquivos de imagem</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pastas</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{folders.length}</div>
            <p className="text-xs text-muted-foreground">Pastas organizadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Controles */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar arquivos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              <SelectItem value="images">Imagens</SelectItem>
              <SelectItem value="videos">Vídeos</SelectItem>
              <SelectItem value="documents">Documentos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="files" className="w-full">
        <TabsList>
          <TabsTrigger value="files">Arquivos</TabsTrigger>
          <TabsTrigger value="folders">Pastas</TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="space-y-4">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredFiles.map((file) => (
                <Card key={file.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-3">
                      {file.mime_type.startsWith('image/') ? (
                        <img
                          src={file.url}
                          alt={file.alt_text}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        getFileIcon(file.mime_type)
                      )}
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-sm truncate" title={file.original_name}>
                        {file.original_name}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <Badge className={getFileTypeColor(file.mime_type)}>
                          {file.mime_type.split('/')[1].toUpperCase()}
                        </Badge>
                        <span className="text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFiles.map((file) => (
                <Card key={file.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {getFileIcon(file.mime_type)}
                      </div>
                      <div>
                        <p className="font-medium">{file.original_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {file.folder} • {formatFileSize(file.size)} • 
                          {new Date(file.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getFileTypeColor(file.mime_type)}>
                        {file.mime_type.split('/')[1].toUpperCase()}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="folders" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {folders.map((folder) => (
              <Card key={folder.name} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <Folder className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-medium">{folder.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {folder.count} arquivos • {folder.size}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}