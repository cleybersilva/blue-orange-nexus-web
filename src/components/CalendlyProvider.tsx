
import React from 'react';
import { useCalendlyModal } from '@/hooks/useCalendlyModal';

type CalendlyContextType = {
  openCalendly: () => void;
  closeCalendly: () => void;
};

export const CalendlyContext = React.createContext<CalendlyContextType | undefined>(undefined);

export const CalendlyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { openCalendly, closeCalendly, CalendlyModal } = useCalendlyModal();

  return (
    <CalendlyContext.Provider value={{ openCalendly, closeCalendly }}>
      {children}
      <CalendlyModal />
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
