
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FlagPt, FlagGb, FlagUs, FlagEs } from 'lucide-react';

const languages = [
  { code: 'pt-BR', name: 'Português (Brasil)', icon: FlagPt },
  { code: 'pt-PT', name: 'Português (Portugal)', icon: FlagPt },
  { code: 'en', name: 'English', icon: FlagGb },
  { code: 'es', name: 'Español', icon: FlagEs },
];

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState('pt-BR');

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    // Here you would implement i18n logic
    console.log('Language changed to:', langCode);
  };

  const getCurrentLanguageIcon = () => {
    const language = languages.find(lang => lang.code === selectedLanguage);
    const Icon = language?.icon || FlagPt;
    return <Icon className="mr-2 h-4 w-4" />;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
          {getCurrentLanguageIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => {
          const Icon = language.icon;
          return (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Icon className="h-4 w-4" />
              <span>{language.name}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
