import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Clock, FileText, Eye, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface Approval {
  id: string;
  type: 'design' | 'content' | 'functionality' | 'final';
  title: string;
  description: string;
  project_name: string;
  client_name: string;
  submitted_date: string;
  due_date: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs_revision';
  files: string[];
  feedback?: string;
}

export default function ApprovalsPage() {
  const [selectedApproval, setSelectedApproval] = useState<Approval | null>(null);
  const [feedback, setFeedback] = useState('');
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Mock data - in real app, this would come from API
  const approvals: Approval[] = [
    {
      id: '1',
      type: 'design',
      title: 'Aprovação de Design - Homepage',
      description: 'Mockups finais da página inicial do e-commerce',
      project_name: 'E-commerce ABC Corp',
      client_name: 'João Silva - ABC Corp',
      submitted_date: '2025-01-15T10:00:00Z',
      due_date: '2025-01-17T18:00:00Z',
      status: 'pending',
      files: ['homepage-mockup.pdf', 'style-guide.pdf']
    },
    {
      id: '2',
      type: 'content',
      title: 'Aprovação de Conteúdo - Páginas de Produto',
      description: 'Textos e descrições dos produtos principais',
      project_name: 'E-commerce ABC Corp',
      client_name: 'Maria Santos - ABC Corp',
      submitted_date: '2025-01-14T14:30:00Z',
      due_date: '2025-01-16T12:00:00Z',
      status: 'approved',
      files: ['content-products.docx'],
      feedback: 'Conteúdo aprovado. Excelente trabalho!'
    },
    {
      id: '3',
      type: 'functionality',
      title: 'Aprovação - Sistema de Pagamento',
      description: 'Fluxo de checkout e integração com gateway',
      project_name: 'E-commerce ABC Corp',
      client_name: 'Carlos Oliveira - ABC Corp',
      submitted_date: '2025-01-13T09:15:00Z',
      due_date: '2025-01-15T17:00:00Z',
      status: 'needs_revision',
      files: ['checkout-flow.pdf', 'payment-specs.pdf'],
      feedback: 'Necessário adicionar opção de pagamento via PIX'
    }
  ];

  const handleApprove = (approvalId: string) => {
    toast.success('Aprovação confirmada!');
    // In real app, make API call to update approval status
  };

  const handleReject = (approvalId: string) => {
    toast.error('Aprovação rejeitada');
    // In real app, make API call to update approval status
  };

  const handleRequestRevision = (approvalId: string) => {
    toast.info('Revisão solicitada');
    // In real app, make API call to update approval status
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'needs_revision': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'needs_revision': return <MessageSquare className="h-4 w-4 text-yellow-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-blue-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Aprovações</h1>
        <p className="text-muted-foreground">Gerencie aprovações de clientes e stakeholders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold">
                  {approvals.filter(a => a.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Aprovadas</p>
                <p className="text-2xl font-bold">
                  {approvals.filter(a => a.status === 'approved').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rejeitadas</p>
                <p className="text-2xl font-bold">
                  {approvals.filter(a => a.status === 'rejected').length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revisões</p>
                <p className="text-2xl font-bold">
                  {approvals.filter(a => a.status === 'needs_revision').length}
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Approvals List */}
      <div className="grid gap-4">
        {approvals.map((approval) => (
          <Card key={approval.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(approval.status)}
                    <h3 className="font-semibold">{approval.title}</h3>
                    <Badge className={getStatusColor(approval.status)}>
                      {approval.status}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-2">{approval.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                    <div>
                      <span className="font-medium">Projeto:</span> {approval.project_name}
                    </div>
                    <div>
                      <span className="font-medium">Cliente:</span> {approval.client_name}
                    </div>
                    <div>
                      <span className="font-medium">Enviado em:</span> {formatDate(approval.submitted_date)}
                    </div>
                    <div>
                      <span className="font-medium">Prazo:</span> {formatDate(approval.due_date)}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">Arquivos: {approval.files.join(', ')}</span>
                  </div>
                  
                  {approval.feedback && (
                    <div className="bg-muted rounded-lg p-3">
                      <p className="text-sm"><strong>Feedback:</strong> {approval.feedback}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedApproval(approval);
                      setViewDialogOpen(true);
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Visualizar
                  </Button>
                  
                  {approval.status === 'pending' && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-green-600"
                        onClick={() => handleApprove(approval.id)}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Aprovar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-red-600"
                        onClick={() => handleReject(approval.id)}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Rejeitar
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View/Action Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedApproval?.title}</DialogTitle>
            <DialogDescription>
              Detalhes da aprovação e ações disponíveis
            </DialogDescription>
          </DialogHeader>
          
          {selectedApproval && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Descrição</h4>
                <p className="text-muted-foreground">{selectedApproval.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Projeto</h4>
                  <p>{selectedApproval.project_name}</p>
                </div>
                <div>
                  <h4 className="font-medium">Cliente</h4>
                  <p>{selectedApproval.client_name}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Arquivos</h4>
                <div className="space-y-1">
                  {selectedApproval.files.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4" />
                      <span>{file}</span>
                      <Button variant="link" size="sm" className="h-auto p-0">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedApproval.status === 'pending' && (
                <div>
                  <h4 className="font-medium mb-2">Adicionar Feedback</h4>
                  <Textarea
                    placeholder="Adicione comentários sobre esta aprovação..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>
              )}
              
              <div className="flex justify-end gap-2">
                {selectedApproval.status === 'pending' && (
                  <>
                    <Button 
                      variant="outline"
                      onClick={() => handleRequestRevision(selectedApproval.id)}
                    >
                      Solicitar Revisão
                    </Button>
                    <Button 
                      variant="outline"
                      className="text-red-600"
                      onClick={() => handleReject(selectedApproval.id)}
                    >
                      Rejeitar
                    </Button>
                    <Button onClick={() => handleApprove(selectedApproval.id)}>
                      Aprovar
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}