import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Smartphone, Monitor, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Detectar iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Verificar se já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Capturar evento de instalação
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Detectar quando o app foi instalado
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsInstallable(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstallable(false);
    }

    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-8"
        >
          ← Voltar para o site
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Instale Nosso App</h1>
          <p className="text-lg text-muted-foreground">
            Acesse nosso site de forma rápida e fácil direto da tela inicial do seu dispositivo
          </p>
        </div>

        {isInstalled ? (
          <Card className="border-2 border-green-500/50 bg-green-500/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <CardTitle>App Instalado!</CardTitle>
                  <CardDescription>
                    O Blue Orange Nexus já está instalado no seu dispositivo
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Você pode acessar nosso app diretamente da tela inicial do seu dispositivo.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {isInstallable && !isIOS && (
              <Card className="mb-8 border-2 border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle>Instalar Agora</CardTitle>
                  <CardDescription>
                    Instale nosso app com um clique e tenha acesso rápido
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={handleInstallClick}
                    size="lg"
                    className="w-full"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Instalar App
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-8 w-8 text-primary" />
                    <CardTitle>No Celular</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {isIOS ? (
                    <ol className="space-y-3 text-sm">
                      <li className="flex gap-2">
                        <span className="font-semibold min-w-[24px]">1.</span>
                        <span>Toque no botão "Compartilhar" (ícone de quadrado com seta)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold min-w-[24px]">2.</span>
                        <span>Role para baixo e toque em "Adicionar à Tela de Início"</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold min-w-[24px]">3.</span>
                        <span>Toque em "Adicionar" no canto superior direito</span>
                      </li>
                    </ol>
                  ) : (
                    <ol className="space-y-3 text-sm">
                      <li className="flex gap-2">
                        <span className="font-semibold min-w-[24px]">1.</span>
                        <span>Toque no menu do navegador (três pontos)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold min-w-[24px]">2.</span>
                        <span>Selecione "Adicionar à tela inicial" ou "Instalar app"</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold min-w-[24px]">3.</span>
                        <span>Confirme tocando em "Adicionar" ou "Instalar"</span>
                      </li>
                    </ol>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Monitor className="h-8 w-8 text-primary" />
                    <CardTitle>No Computador</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3 text-sm">
                    <li className="flex gap-2">
                      <span className="font-semibold min-w-[24px]">1.</span>
                      <span>Clique no ícone de instalação na barra de endereços (à direita)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold min-w-[24px]">2.</span>
                      <span>Ou clique no menu do navegador e selecione "Instalar Blue Orange Nexus"</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold min-w-[24px]">3.</span>
                      <span>Confirme a instalação clicando em "Instalar"</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Benefícios do App</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid md:grid-cols-2 gap-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Acesso rápido da tela inicial</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Funciona offline</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Carregamento instantâneo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Experiência nativa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Sem ocupar espaço na memória</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Atualizações automáticas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default InstallPWA;
