
import { useEffect } from 'react';
import { ScheduleFormValues } from '@/types/scheduleForm';
import { FormStage } from '@/components/agendar/FormProgress';

export const useFormStorage = (form: any, setStage: (stage: FormStage) => void) => {
  // Load stored data on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('scheduleFormData');
    const storedStage = localStorage.getItem('scheduleFormStage');
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        console.log('Loading stored form data:', parsedData);
        
        // Reset form with stored data
        form.reset(parsedData);
      } catch (error) {
        console.error('Error parsing stored form data:', error);
      }
    }
    
    if (storedStage) {
      const parsedStage = parseInt(storedStage);
      if (parsedStage >= FormStage.PERSONAL && parsedStage <= FormStage.CONFIRMATION) {
        console.log('Loading stored stage:', parsedStage);
        setStage(parsedStage);
      }
    }
  }, [form, setStage]);

  // Save data to localStorage whenever form values change
  const saveFormData = (data: ScheduleFormValues) => {
    localStorage.setItem('scheduleFormData', JSON.stringify(data));
    console.log('Form data saved to localStorage');
  };

  // Save current stage to localStorage
  const saveCurrentStage = (currentStage: FormStage) => {
    localStorage.setItem('scheduleFormStage', currentStage.toString());
    console.log('Current stage saved to localStorage:', currentStage);
  };

  const clearStoredData = () => {
    localStorage.removeItem('scheduleFormData');
    localStorage.removeItem('scheduleFormStage');
    console.log('Form storage cleared');
  };

  return {
    saveFormData,
    saveCurrentStage,
    clearStoredData
  };
};
