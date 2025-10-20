# Deploy no cPanel - Guia Completo

## Pré-requisitos
- Acesso ao cPanel da sua hospedagem
- Node.js instalado localmente (para fazer o build)
- Credenciais do Supabase configuradas

## Passo 1: Preparar o Build Local

### 1.1 Instalar dependências
```bash
npm install
```

### 1.2 Fazer o build de produção
```bash
npm run build
```

Isso criará uma pasta `dist` com todos os arquivos otimizados.

## Passo 2: Upload dos Arquivos

### 2.1 Acessar o Gerenciador de Arquivos do cPanel
1. Faça login no seu cPanel
2. Acesse "Gerenciador de Arquivos" (File Manager)
3. Navegue até a pasta `public_html` (ou a pasta raiz do seu domínio)

### 2.2 Limpar a pasta (se necessário)
- Se houver arquivos antigos, remova-os ou faça backup

### 2.3 Upload dos arquivos
1. Faça upload de TODOS os arquivos da pasta `dist` para `public_html`
2. O arquivo `.htaccess` já está incluído na pasta `public`
3. Certifique-se de que a estrutura seja:
   ```
   public_html/
   ├── .htaccess
   ├── index.html
   ├── assets/
   │   ├── index-[hash].js
   │   ├── index-[hash].css
   │   └── ...
   ├── robots.txt
   └── outros arquivos...
   ```

## Passo 3: Configurar Variáveis de Ambiente

### Importante sobre Supabase
As credenciais do Supabase já estão incluídas no build porque são configuradas em `src/integrations/supabase/client.ts`. Essas são chaves públicas (anon key) e podem ser incluídas no código do cliente.

**Credenciais atuais:**
- Project ID: `gullluryfretqztoobxj`
- URL: `https://gullluryfretqztoobxj.supabase.co`
- Anon Key: Já configurada no código

## Passo 4: Configurar o Domínio (se necessário)

### 4.1 Se usar subdomínio
1. No cPanel, vá em "Domínios" ou "Subdomínios"
2. Configure o subdomínio para apontar para a pasta correta

### 4.2 Configurar SSL
1. No cPanel, vá em "SSL/TLS"
2. Configure o certificado SSL (Let's Encrypt é gratuito)
3. Ative "Forçar HTTPS" se disponível

## Passo 5: Testar o Site

### 5.1 Verificações importantes
- [ ] Página inicial carrega corretamente
- [ ] Todas as rotas funcionam (navegação não retorna 404)
- [ ] Imagens e assets carregam
- [ ] CSS está aplicado corretamente
- [ ] JavaScript funciona
- [ ] Formulários de contato funcionam
- [ ] Blog carrega artigos do Supabase
- [ ] Sistema de login funciona (se aplicável)

### 5.2 Resolver problemas comuns

#### Problema: Rotas retornam 404
**Solução:** Verifique se o arquivo `.htaccess` está na raiz do domínio

#### Problema: Imagens não carregam
**Solução:** Verifique se a pasta `assets` foi enviada corretamente

#### Problema: Página em branco
**Solução:** 
1. Abra o Console do navegador (F12)
2. Verifique erros de JavaScript
3. Confirme que os arquivos JS foram carregados corretamente

## Passo 6: Edge Functions (Opcional)

As Edge Functions do Supabase continuarão funcionando normalmente pois elas estão hospedadas no Supabase, não no cPanel. Certifique-se de que:

1. **RESEND_API_KEY** está configurado no Supabase (para envio de emails)
   - Acesse: https://supabase.com/dashboard/project/gullluryfretqztoobxj/settings/functions
   - Adicione o secret `RESEND_API_KEY`

## Notas Importantes

### Sobre o .htaccess
O arquivo `.htaccess` incluído configura:
- ✅ Redirecionamento para HTTPS
- ✅ Suporte a rotas do React Router
- ✅ Cache de assets estáticos
- ✅ Compressão GZIP
- ✅ Proteção de arquivos sensíveis

### Sobre Atualizações Futuras
Sempre que fizer alterações no código:
1. Execute `npm run build` localmente
2. Faça upload dos novos arquivos da pasta `dist`
3. Limpe o cache do navegador para ver as mudanças

### Performance
Para melhor performance no cPanel:
- Ative a compressão GZIP (já configurado no .htaccess)
- Configure o CDN Cloudflare (recomendado)
- Otimize imagens antes do upload

## Suporte

Se encontrar problemas:
1. Verifique os logs de erro no cPanel (Error Log)
2. Abra o Console do navegador (F12) e verifique erros
3. Confirme que todas as configurações do Supabase estão corretas

## Checklist Final

- [ ] Build gerado com sucesso (`npm run build`)
- [ ] Todos os arquivos da pasta `dist` foram enviados
- [ ] Arquivo `.htaccess` está na raiz
- [ ] SSL configurado e ativo
- [ ] Site carrega no navegador
- [ ] Todas as rotas funcionam
- [ ] Formulários de contato funcionam
- [ ] Blog carrega artigos
- [ ] Supabase está conectado e funcionando
