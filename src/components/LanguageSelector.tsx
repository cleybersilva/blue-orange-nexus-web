
import React, { useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from 'react-i18next';

// Define languages with country codes
const languages = [
  { code: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷' },
  { code: 'pt-PT', name: 'Português (Portugal)', flag: '🇵🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = React.useState(() => {
    // Get saved language from localStorage or default to pt-BR
    return localStorage.getItem('preferredLanguage') || 'pt-BR';
  });

  // Set the language on component mount
  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [i18n, selectedLanguage]);

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('preferredLanguage', selectedLanguage);
  }, [selectedLanguage]);

  const handleLanguageChange = (langCode: string) => {
    if (langCode === selectedLanguage) return;
    
    setSelectedLanguage(langCode);
    i18n.changeLanguage(langCode);
    
    // Show toast notification
    toast({
      title: t('language.changed'),
      description: t('language.changedTo', { language: languages.find(lang => lang.code === langCode)?.name }),
      duration: 3000,
    });
    
    console.log('Language changed to:', langCode);
  };

  const getCurrentLanguageFlag = () => {
    const language = languages.find(lang => lang.code === selectedLanguage);
    return language?.flag || '🇧🇷';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 flex items-center gap-2 px-2 hover:bg-white/10 text-white transition-colors duration-300"
          aria-label="Select language"
        >
          <Globe className="h-4 w-4" />
          <span className="text-sm hidden sm:inline">
            {getCurrentLanguageFlag()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-orange border-orange animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-2"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center gap-2 cursor-pointer text-navy hover:bg-orange-light transition-colors duration-200 ${
              selectedLanguage === language.code ? 'bg-orange-light font-medium' : ''
            }`}
          >
            <span className="text-base">{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
