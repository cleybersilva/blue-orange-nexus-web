import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Building2, 
  Mail, 
  Phone, 
  Globe,
  Users,
  CreditCard,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useClients } from '@/hooks/useSaasQueries';
import { useCreateClient, useUpdateClient } from '@/hooks/useSaasMutations';
import { useToast } from '@/hooks/use-toast';

export default function AccountsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [newAccount, setNewAccount] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    cnpj: '',
    segment: '',
    company_size: 'small',
    status: 'active',
    billing_address: '',
    contact_person: '',
    annual_revenue: '',
    employees_count: ''
  });

  const { data: clients, isLoading } = useClients();
  const createClientMutation = useCreateClient();
  const updateClientMutation = useUpdateClient();
  const { toast } = useToast();

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newAccount.name || !newAccount.email) {
      toast({
        title: "Erro",
        description: "Nome e email são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    try {
      if (editingClient) {
        await updateClientMutation.mutateAsync({
          id: editingClient.id,
          data: newAccount
        });
        toast({
          title: "Sucesso",
          description: "Conta atualizada com sucesso"
        });
      } else {
        await createClientMutation.mutateAsync(newAccount);
        toast({
          title: "Sucesso", 
          description: "Conta criada com sucesso"
        });
      }
      
      resetForm();
      setIsDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao salvar conta",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setNewAccount({
      name: '',
      email: '',
      phone: '',
      website: '',
      cnpj: '',
      segment: '',
      company_size: 'small',
      status: 'active',
      billing_address: '',
      contact_person: '',
      annual_revenue: '',
      employees_count: ''
    });
    setEditingClient(null);
  };

  const handleEditAccount = (client: any) => {
    setNewAccount(client);
    setEditingClient(client);
    setIsDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
  };

  const getCompanySizeLabel = (size: string) => {
    const sizes = {
      micro: 'Micro (1-9)',
      small: 'Pequena (10-49)',
      medium: 'Média (50-249)',
      large: 'Grande (250+)'
    };
    return sizes[size as keyof typeof sizes] || size;
  };

  const filteredClients = clients?.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.segment?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

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
          <h1 className="text-3xl font-bold">Contas de Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie todas as contas e informações dos clientes
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Conta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {editingClient ? 'Editar Conta' : 'Criar Nova Conta'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateAccount} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company_name">Nome da Empresa *</Label>
                  <Input
                    id="company_name"
                    value={newAccount.name}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: Empresa LTDA"
                  />
                </div>
                <div>
                  <Label htmlFor="contact_person">Pessoa de Contato</Label>
                  <Input
                    id="contact_person"
                    value={newAccount.contact_person}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, contact_person: e.target.value }))}
                    placeholder="Ex: João Silva"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAccount.email}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="contato@empresa.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={newAccount.phone}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={newAccount.website}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="https://www.empresa.com"
                  />
                </div>
                <div>
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    value={newAccount.cnpj}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, cnpj: e.target.value }))}
                    placeholder="00.000.000/0000-00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="segment">Segmento</Label>
                  <Input
                    id="segment"
                    value={newAccount.segment}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, segment: e.target.value }))}
                    placeholder="Ex: Tecnologia"
                  />
                </div>
                <div>
                  <Label htmlFor="company_size">Porte da Empresa</Label>
                  <Select
                    value={newAccount.company_size}
                    onValueChange={(value) => setNewAccount(prev => ({ ...prev, company_size: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="micro">Micro (1-9 funcionários)</SelectItem>
                      <SelectItem value="small">Pequena (10-49 funcionários)</SelectItem>
                      <SelectItem value="medium">Média (50-249 funcionários)</SelectItem>
                      <SelectItem value="large">Grande (250+ funcionários)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newAccount.status}
                    onValueChange={(value) => setNewAccount(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                      <SelectItem value="suspended">Suspenso</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employees_count">Número de Funcionários</Label>
                  <Input
                    id="employees_count"
                    type="number"
                    value={newAccount.employees_count}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, employees_count: e.target.value }))}
                    placeholder="Ex: 25"
                  />
                </div>
                <div>
                  <Label htmlFor="annual_revenue">Faturamento Anual (R$)</Label>
                  <Input
                    id="annual_revenue"
                    value={newAccount.annual_revenue}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, annual_revenue: e.target.value }))}
                    placeholder="Ex: 1.000.000"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="billing_address">Endereço de Cobrança</Label>
                <Textarea
                  id="billing_address"
                  value={newAccount.billing_address}
                  onChange={(e) => setNewAccount(prev => ({ ...prev, billing_address: e.target.value }))}
                  placeholder="Endereço completo para faturamento..."
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingClient ? 'Atualizar Conta' : 'Criar Conta'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar contas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="inactive">Inativo</SelectItem>
            <SelectItem value="suspended">Suspenso</SelectItem>
            <SelectItem value="pending">Pendente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Contas</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients?.length || 0}</div>
            <p className="text-xs text-muted-foreground">Contas registradas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contas Ativas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {clients?.filter(c => c.status === 'active').length || 0}
            </div>
            <p className="text-xs text-muted-foreground">Em operação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {clients?.filter(c => c.status === 'pending').length || 0}
            </div>
            <p className="text-xs text-muted-foreground">Aguardando aprovação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grandes Empresas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clients?.filter(c => c.company_size === 'large').length || 0}
            </div>
            <p className="text-xs text-muted-foreground">250+ funcionários</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Contas */}
      <div className="grid gap-4">
        {filteredClients.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma conta encontrada</h3>
              <p className="text-muted-foreground text-center">
                {searchTerm ? 'Tente ajustar os filtros de busca.' : 'Crie sua primeira conta para começar.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredClients.map((client) => (
            <Card key={client.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <CardDescription className="flex items-center space-x-4">
                      {client.email && (
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {client.email}
                        </span>
                      )}
                      {client.phone && (
                        <span className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {client.phone}
                        </span>
                      )}
                      {client.website && (
                        <span className="flex items-center">
                          <Globe className="h-3 w-3 mr-1" />
                          {client.website}
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusBadge(client.status)}>
                      {client.status === 'active' ? 'Ativo' :
                       client.status === 'inactive' ? 'Inativo' :
                       client.status === 'suspended' ? 'Suspenso' : 'Pendente'}
                    </Badge>
                    {client.company_size && (
                      <Badge variant="outline">
                        {getCompanySizeLabel(client.company_size)}
                      </Badge>
                    )}
                    {client.segment && (
                      <Badge variant="secondary">{client.segment}</Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditAccount(client)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <CreditCard className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <Label className="text-xs text-muted-foreground">CNPJ</Label>
                    <p className="font-medium">{client.cnpj || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Segmento</Label>
                    <p className="font-medium">{client.segment || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Cadastro</Label>
                    <p className="font-medium">
                      {new Date(client.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Porte</Label>
                    <p className="font-medium">
                      {client.company_size ? getCompanySizeLabel(client.company_size) : 'N/A'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}