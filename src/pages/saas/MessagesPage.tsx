import React, { useState } from 'react';
import { Search, Filter, Mail, MessageSquare, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMessages } from '@/hooks/useSaasQueries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const MessagesPage = () => {
  const { data: messages = [], isLoading } = useMessages();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'whatsapp': return <MessageSquare className="h-4 w-4" />;
      case 'internal': return <Phone className="h-4 w-4" />;
      default: return <Mail className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-800';
      case 'whatsapp': return 'bg-green-100 text-green-800';
      case 'internal': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.sender_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.sender_email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || message.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const unreadCount = messages.filter(msg => msg.status === 'unread').length;
  const todayMessages = messages.filter(msg => 
    new Date(msg.created_at).toDateString() === new Date().toDateString()
  ).length;

  if (isLoading) {
    return <div className="p-6">Carregando mensagens...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mensagens</h1>
          <p className="text-muted-foreground">Central de mensagens e comunicações</p>
        </div>
        
        <div className="flex space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
            <div className="text-xs text-muted-foreground">Não lidas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{todayMessages}</div>
            <div className="text-xs text-muted-foreground">Hoje</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{messages.length}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </div>
      </div>

      <Tabs value={selectedType} onValueChange={setSelectedType} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="internal">Internas</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar mensagens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 max-w-sm"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        <TabsContent value={selectedType} className="space-y-4">
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <Card key={message.id} className={`hover:shadow-md transition-shadow ${
                message.status === 'unread' ? 'border-l-4 border-l-red-500' : ''
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(message.type)}`}>
                        {getTypeIcon(message.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <CardTitle className="text-lg">{message.subject || 'Sem assunto'}</CardTitle>
                          <Badge className={`text-xs ${getStatusColor(message.status)}`}>
                            {message.status === 'unread' ? 'Não lida' :
                             message.status === 'read' ? 'Lida' : 'Respondida'}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {message.type === 'email' ? 'Email' :
                             message.type === 'whatsapp' ? 'WhatsApp' : 'Interna'}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                          <span>De: {message.sender_name || message.sender_email || 'Desconhecido'}</span>
                          {message.client?.name && (
                            <span>Cliente: {message.client.name}</span>
                          )}
                          {message.project?.name && (
                            <span>Projeto: {message.project.name}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(message.created_at).toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {message.content}
                  </p>
                  
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button size="sm" variant="outline">
                      Ver Completa
                    </Button>
                    {message.status !== 'replied' && (
                      <Button size="sm">
                        Responder
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMessages.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Nenhuma mensagem encontrada</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Tente buscar com outros termos' : 'Você não tem mensagens nesta categoria'}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};