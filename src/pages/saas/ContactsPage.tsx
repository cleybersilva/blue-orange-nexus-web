import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useContacts, useClients } from "@/hooks/useSaasQueries";
import { useCreateContact, useUpdateContact, useDeleteContact } from "@/hooks/useSaasMutations";
import { Plus, Mail, Phone, User, Building, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  client_id: string;
  is_primary: boolean;
}

export default function ContactsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<any>(null);
  
  const { data: contacts, refetch } = useContacts();
  const { data: clients } = useClients();
  const createContact = useCreateContact();
  const updateContact = useUpdateContact();
  const deleteContact = useDeleteContact();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    role: '',
    client_id: '',
    is_primary: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingContact) {
        await updateContact.mutateAsync({
          id: editingContact.id,
          data: formData
        });
      } else {
        await createContact.mutateAsync(formData);
      }
      
      setIsDialogOpen(false);
      setEditingContact(null);
      resetForm();
      refetch();
    } catch (error) {
      toast.error('Erro ao salvar contato');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: '',
      client_id: '',
      is_primary: false
    });
  };

  const handleEdit = (contact: any) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      email: contact.email || '',
      phone: contact.phone || '',
      role: contact.role || '',
      client_id: contact.client_id,
      is_primary: contact.is_primary || false
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este contato?')) {
      try {
        await deleteContact.mutateAsync(id);
        refetch();
      } catch (error) {
        toast.error('Erro ao excluir contato');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contatos</h1>
          <p className="text-muted-foreground">Gerencie todos os contatos dos clientes</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingContact(null);
              resetForm();
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Contato
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingContact ? 'Editar Contato' : 'Novo Contato'}</DialogTitle>
              <DialogDescription>
                {editingContact ? 'Edite as informações do contato.' : 'Adicione um novo contato ao cliente.'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="client_id">Cliente *</Label>
                <Select value={formData.client_id} onValueChange={(value) => setFormData({...formData, client_id: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients?.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="role">Cargo</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  placeholder="ex: Gerente, Diretor, CEO..."
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  id="is_primary"
                  type="checkbox"
                  checked={formData.is_primary}
                  onChange={(e) => setFormData({...formData, is_primary: e.target.checked})}
                  className="rounded"
                />
                <Label htmlFor="is_primary">Contato principal</Label>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingContact ? 'Salvar' : 'Criar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Contacts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contacts?.map((contact) => (
          <Card key={contact.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {contact.name}
                  {contact.is_primary && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Principal
                    </span>
                  )}
                </CardTitle>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(contact)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => handleDelete(contact.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building className="h-4 w-4" />
                <span className="text-sm">{contact.client?.name}</span>
              </div>
              
              {contact.role && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{contact.role}</span>
                </div>
              )}
              
              {contact.email && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{contact.email}</span>
                </div>
              )}
              
              {contact.phone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">{contact.phone}</span>
                </div>
              )}
              
              <div className="flex gap-2 pt-2">
                {contact.email && (
                  <Button size="sm" variant="outline" className="flex-1">
                    <Mail className="mr-2 h-3 w-3" />
                    E-mail
                  </Button>
                )}
                {contact.phone && (
                  <Button size="sm" variant="outline" className="flex-1">
                    <Phone className="mr-2 h-3 w-3" />
                    Ligar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {contacts?.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Nenhum contato cadastrado</h3>
            <p className="text-muted-foreground">
              Comece adicionando o primeiro contato de cliente
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}