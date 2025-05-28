
import React, { useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from 'react-i18next';
import { useLanguage } from './LanguageProvider';

// Define languages with country codes
const languages = [
  { code: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷' },
  { code: 'pt-PT', name: 'Português (Portugal)', flag: '🇵🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

const LanguageSelector = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = (langCode: string) => {
    if (langCode === currentLanguage) return;
    
    changeLanguage(langCode);
    
    // Show toast notification
    toast({
      title: t('language.changed'),
      description: t('language.changedTo', { language: languages.find(lang => lang.code === langCode)?.name }),
      duration: 3000,
    });
    
    console.log('Language changed to:', langCode);
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLanguage);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-10 flex items-center gap-3 px-3 hover:bg-white/10 text-white transition-colors duration-300 border border-orange/30 hover:border-orange"
          aria-label="Select language"
        >
          <span className="text-xl">
            {getCurrentLanguage()?.flag}
          </span>
          <span className="text-sm font-medium">
            {getCurrentLanguage()?.name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-navy border-orange/20 animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-2 min-w-[220px]"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center gap-3 cursor-pointer text-white hover:bg-orange/20 hover:text-white transition-colors duration-200 py-3 px-4 ${
              currentLanguage === language.code ? 'bg-orange/20 border-l-4 border-orange' : ''
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <span className="text-sm">{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
