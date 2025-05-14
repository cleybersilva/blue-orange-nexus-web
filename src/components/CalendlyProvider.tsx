
import React from 'react';
import { useCalendlyDialog } from '@/hooks/useCalendlyDialog';

type CalendlyContextType = {
  openCalendly: () => void;
  closeCalendly: () => void;
};

export const CalendlyContext = React.createContext<CalendlyContextType | undefined>(undefined);

export const CalendlyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { openCalendly, closeCalendly, CalendlyDialog } = useCalendlyDialog();

  return (
    <CalendlyContext.Provider value={{ openCalendly, closeCalendly }}>
      {children}
      <CalendlyDialog />
    </CalendlyContext.Provider>
  );
};

export const useCalendly = () => {
  const context = React.useContext(CalendlyContext);
  
  if (context === undefined) {
    throw new Error('useCalendly must be used within a CalendlyProvider');
  }
  
  return context;
};
