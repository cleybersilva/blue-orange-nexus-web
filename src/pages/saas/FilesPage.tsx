import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useMedia } from "@/hooks/useSaasQueries";
import { Plus, File, Image, Video, Download, Eye, Search, Filter } from "lucide-react";
import { toast } from "sonner";

export default function FilesPage() {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  
  const { data: files } = useMedia();

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <Image className="h-8 w-8 text-blue-500" />;
    if (mimeType.startsWith('video/')) return <Video className="h-8 w-8 text-purple-500" />;
    return <File className="h-8 w-8 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileType = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.includes('pdf')) return 'document';
    return 'other';
  };

  const filteredFiles = files?.filter(file => {
    const matchesSearch = file.original_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.filename.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    return matchesSearch && getFileType(file.mime_type) === filterType;
  }) || [];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // In real app, handle file upload to Supabase Storage
      toast.success(`${files.length} arquivo(s) enviado(s) com sucesso!`);
      setUploadDialogOpen(false);
    }
  };

  const handleDownload = (file: any) => {
    // In real app, create download link
    toast.success(`Baixando ${file.original_name}`);
  };

  const handlePreview = (file: any) => {
    // In real app, open file preview
    toast.info(`Visualizando ${file.original_name}`);
  };

  const fileStats = {
    total: files?.length || 0,
    images: files?.filter(f => getFileType(f.mime_type) === 'image').length || 0,
    videos: files?.filter(f => getFileType(f.mime_type) === 'video').length || 0,
    documents: files?.filter(f => getFileType(f.mime_type) === 'document').length || 0,
    totalSize: files?.reduce((acc, file) => acc + file.size, 0) || 0
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Arquivos</h1>
          <p className="text-muted-foreground">Gerencie todos os arquivos e mídia do sistema</p>
        </div>
        
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Upload de Arquivos
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload de Arquivos</DialogTitle>
              <DialogDescription>
                Selecione os arquivos para fazer upload
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="files">Selecionar Arquivos</Label>
                <Input
                  id="files"
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Suporte para imagens, vídeos, documentos e outros arquivos
                </p>
              </div>
              
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <File className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  Ou arraste e solte os arquivos aqui
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* File Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{fileStats.total}</p>
              <p className="text-sm text-muted-foreground">Total de Arquivos</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{fileStats.images}</p>
              <p className="text-sm text-muted-foreground">Imagens</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{fileStats.videos}</p>
              <p className="text-sm text-muted-foreground">Vídeos</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{fileStats.documents}</p>
              <p className="text-sm text-muted-foreground">Documentos</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{formatFileSize(fileStats.totalSize)}</p>
              <p className="text-sm text-muted-foreground">Espaço Usado</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar arquivos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Tipos</SelectItem>
            <SelectItem value="image">Imagens</SelectItem>
            <SelectItem value="video">Vídeos</SelectItem>
            <SelectItem value="document">Documentos</SelectItem>
            <SelectItem value="other">Outros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Files Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredFiles.map((file) => (
          <Card key={file.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-4">
                {file.mime_type.startsWith('image/') ? (
                  <img
                    src={file.url}
                    alt={file.alt_text || file.original_name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-32 flex items-center justify-center bg-muted rounded-lg">
                    {getFileIcon(file.mime_type)}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium truncate" title={file.original_name}>
                  {file.original_name}
                </h3>
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatFileSize(file.size)}</span>
                  <Badge variant="secondary" className="text-xs">
                    {file.mime_type.split('/')[1]?.toUpperCase()}
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  {new Date(file.created_at).toLocaleDateString('pt-BR')}
                </p>
                
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handlePreview(file)}
                  >
                    <Eye className="mr-1 h-3 w-3" />
                    Ver
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleDownload(file)}
                  >
                    <Download className="mr-1 h-3 w-3" />
                    Baixar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFiles.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <File className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Nenhum arquivo encontrado</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterType !== 'all' 
                ? 'Tente ajustar os filtros de busca'
                : 'Faça upload dos seus primeiros arquivos'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}