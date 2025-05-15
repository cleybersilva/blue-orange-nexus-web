
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from 'lucide-react';

// Define languages with country codes
const languages = [
  { code: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷' },
  { code: 'pt-PT', name: 'Português (Portugal)', flag: '🇵🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState('pt-BR');

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    // Here you would implement i18n logic
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
          className="h-8 flex items-center gap-2 px-2 hover:bg-white/10"
          aria-label="Select language"
        >
          <Globe className="h-4 w-4" />
          <span className="text-sm hidden sm:inline">
            {getCurrentLanguageFlag()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-navy-dark border-navy">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center gap-2 cursor-pointer hover:bg-navy/80"
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
