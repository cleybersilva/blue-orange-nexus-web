
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CheckCircle, Send, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// Definindo os estágios do formulário
enum FormStage {
  PERSONAL = 0,
  COMPANY = 1,
  PROJECT = 2,
  CONFIRMATION = 3,
}

// Schema para validação dos dados
const formSchema = z.object({
  // Dados pessoais
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(10, { message: "Telefone inválido" }),
  role: z.string().min(2, { message: "Cargo é obrigatório" }),
  
  // Dados da empresa
  companyName: z.string().min(2, { message: "Nome da empresa é obrigatório" }),
  segment: z.string().min(2, { message: "Segmento é obrigatório" }),
  companySize: z.string().min(1, { message: "Tamanho da empresa é obrigatório" }),
  website: z.string().optional(),
  
  // Dados do projeto
  serviceType: z.string().min(2, { message: "Tipo de serviço é obrigatório" }),
  projectDescription: z.string().min(20, { message: "Descrição deve ter pelo menos 20 caracteres" }),
  deadline: z.string().min(1, { message: "Prazo é obrigatório" }),
  budget: z.string().optional(),

  // Preferências de contato
  preferWhatsApp: z.boolean().default(true),
  preferEmail: z.boolean().default(false),
  preferPhone: z.boolean().default(false),
});

const Agendar = () => {
  const [stage, setStage] = useState<FormStage>(FormStage.PERSONAL);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      companyName: "",
      segment: "",
      companySize: "",
      website: "",
      serviceType: "",
      projectDescription: "",
      deadline: "",
      budget: "",
      preferWhatsApp: true,
      preferEmail: false,
      preferPhone: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (stage < FormStage.CONFIRMATION) {
      setStage(stage + 1);
      return;
    }

    // Formatando os dados para envio
    const formattedMessage = `
*Novo Briefing*
-------------------
*Dados Pessoais*
Nome: ${values.name}
Email: ${values.email}
Telefone: ${values.phone}
Cargo: ${values.role}

*Dados da Empresa*
Empresa: ${values.companyName}
Segmento: ${values.segment}
Tamanho: ${values.companySize}
Site: ${values.website || "Não informado"}

*Dados do Projeto*
Serviço: ${values.serviceType}
Descrição: ${values.projectDescription}
Prazo: ${values.deadline}
Orçamento: ${values.budget || "Não informado"}

*Preferência de Contato*
${values.preferWhatsApp ? "• WhatsApp" : ""}
${values.preferEmail ? "• Email" : ""}
${values.preferPhone ? "• Telefone" : ""}
    `;

    // Simulando envio para WhatsApp
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(formattedMessage)}`;
    
    // Simulando envio para email com link mailto
    const emailSubject = "Novo Briefing - Site";
    const emailBody = formattedMessage;
    const mailtoUrl = `mailto:contato@empresa.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Determinando método de envio com base na preferência do usuário
    if (values.preferWhatsApp) {
      window.open(whatsappUrl, "_blank");
    } else if (values.preferEmail) {
      window.location.href = mailtoUrl;
    }
    
    toast.success("Briefing enviado com sucesso!", {
      description: "Entraremos em contato em breve.",
    });
    
    // Resetando o formulário e voltando para o primeiro estágio
    form.reset();
    setStage(FormStage.PERSONAL);
  };

  const goBack = () => {
    if (stage > FormStage.PERSONAL) {
      setStage(stage - 1);
    }
  };

  // Renderização condicional com base no estágio atual
  const renderStageContent = () => {
    switch (stage) {
      case FormStage.PERSONAL:
        return (
          <>
            <CardHeader>
              <CardTitle>Dados Pessoais</CardTitle>
              <CardDescription>Informe seus dados para contato</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(11) 99999-9999" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu cargo na empresa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </>
        );

      case FormStage.COMPANY:
        return (
          <>
            <CardHeader>
              <CardTitle>Sobre a Empresa</CardTitle>
              <CardDescription>Informações sobre a empresa contratante</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da empresa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="segment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Segmento</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Tecnologia, Saúde, Educação" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tamanho da Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Startup, Pequena, Média, Grande" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website (se existente)</FormLabel>
                    <FormControl>
                      <Input placeholder="www.seusite.com.br" {...field} />
                    </FormControl>
                    <FormDescription>
                      Deixe em branco se ainda não possui um site
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </>
        );

      case FormStage.PROJECT:
        return (
          <>
            <CardHeader>
              <CardTitle>Sobre o Projeto</CardTitle>
              <CardDescription>Detalhes do projeto que deseja desenvolver</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Serviço</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Site, Loja Virtual, App, Design Gráfico" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição do Projeto</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva o que você precisa, objetivos, referências..."
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prazo Desejado</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 1 mês, 3 meses, Flexível" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Orçamento Estimado</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu orçamento para o projeto" {...field} />
                    </FormControl>
                    <FormDescription>
                      Opcional, mas ajuda a alinharmos propostas adequadas
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </>
        );

      case FormStage.CONFIRMATION:
        return (
          <>
            <CardHeader>
              <CardTitle>Confirmação</CardTitle>
              <CardDescription>Como prefere ser contatado?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="preferWhatsApp"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>WhatsApp</FormLabel>
                        <FormDescription>
                          Enviar briefing pelo WhatsApp
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferEmail"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>E-mail</FormLabel>
                        <FormDescription>
                          Enviar briefing por e-mail
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferPhone"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Telefone</FormLabel>
                        <FormDescription>
                          Prefiro ser contatado por telefone
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="rounded-md bg-navy-light/10 p-4">
                <div className="flex flex-col gap-2">
                  <p className="font-medium">Resumo das Informações</p>
                  <p><span className="font-semibold">Nome:</span> {form.getValues("name")}</p>
                  <p><span className="font-semibold">Empresa:</span> {form.getValues("companyName")}</p>
                  <p><span className="font-semibold">Serviço:</span> {form.getValues("serviceType")}</p>
                  <p><span className="font-semibold">Prazo:</span> {form.getValues("deadline")}</p>
                </div>
              </div>
            </CardContent>
          </>
        );

      default:
        return null;
    }
  };

  const renderProgress = () => {
    const stages = [
      { name: "Pessoal", stage: FormStage.PERSONAL },
      { name: "Empresa", stage: FormStage.COMPANY },
      { name: "Projeto", stage: FormStage.PROJECT },
      { name: "Confirmação", stage: FormStage.CONFIRMATION },
    ];

    return (
      <div className="flex justify-between mb-8 px-4">
        {stages.map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center"
          >
            <div 
              className={`flex items-center justify-center w-8 h-8 rounded-full mb-2 ${
                stage >= item.stage 
                  ? "bg-orange text-white" 
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {stage > item.stage ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                index + 1
              )}
            </div>
            <span 
              className={`text-xs ${
                stage >= item.stage ? "text-orange font-medium" : "text-gray-500"
              }`}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-16 md:py-24">
      <h1 className="heading-lg text-center mb-2">Agendar Atendimento</h1>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Preencha o briefing abaixo para que possamos entender melhor sua necessidade 
        e preparar um atendimento personalizado para seu projeto.
      </p>
      
      <div className="max-w-2xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="shadow-md">
              {renderProgress()}
              {renderStageContent()}
              <CardFooter className="flex justify-between mt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={goBack}
                  disabled={stage === FormStage.PERSONAL}
                >
                  Voltar
                </Button>
                <Button 
                  type="submit" 
                  className="bg-orange hover:bg-orange-dark"
                >
                  {stage === FormStage.CONFIRMATION ? (
                    <>
                      <span>Enviar</span>
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  ) : "Próximo"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>

        <div className="mt-10 bg-navy rounded-lg p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">Precisa de ajuda imediata?</h3>
          <p className="mb-6">
            Você pode entrar em contato diretamente conosco por um dos canais abaixo:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Phone className="mr-3 text-orange" />
              <div>
                <p className="font-medium">Telefone</p>
                <p className="text-sm text-gray-200">(11) 9999-9999</p>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="mr-3 text-orange" />
              <div>
                <p className="font-medium">E-mail</p>
                <p className="text-sm text-gray-200">contato@empresa.com.br</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agendar;
