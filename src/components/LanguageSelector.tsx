
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
          className="h-10 flex items-center gap-2 lg:gap-3 px-2 lg:px-3 hover:bg-white/10 text-white transition-all duration-300 border border-orange/30 hover:border-orange hover:scale-105 active:scale-95"
          aria-label="Select language"
        >
          <span className="text-lg lg:text-xl">
            {getCurrentLanguage()?.flag}
          </span>
          <span className="text-xs lg:text-sm font-medium hidden sm:block">
            {getCurrentLanguage()?.name}
          </span>
          <span className="text-xs font-medium sm:hidden">
            {getCurrentLanguage()?.code.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-navy border-orange/20 animate-in fade-in-80 slide-in-from-top-2 duration-300 min-w-[180px] lg:min-w-[220px] z-50"
        sideOffset={5}
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center gap-2 lg:gap-3 cursor-pointer text-white hover:bg-orange/20 hover:text-white transition-all duration-200 py-2 lg:py-3 px-3 lg:px-4 ${
              currentLanguage === language.code ? 'bg-orange/20 border-l-4 border-orange' : ''
            }`}
          >
            <span className="text-base lg:text-lg">{language.flag}</span>
            <span className="text-xs lg:text-sm">{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
