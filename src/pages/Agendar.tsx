
import React, { useEffect } from 'react';
import { Send } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import refactored components
import { FormProgress, FormStage } from "@/components/agendar/FormProgress";
import FormStagePersonal from "@/components/agendar/FormStagePersonal";
import FormStageCompany from "@/components/agendar/FormStageCompany";
import FormStageProject from "@/components/agendar/FormStageProject";
import FormStageConfirmation from "@/components/agendar/FormStageConfirmation";
import DirectContact from "@/components/agendar/DirectContact";
import CalendlyEmbed from "@/components/agendar/CalendlyEmbed";
import { useScheduleForm } from "@/hooks/useScheduleForm";

const Agendar = () => {
  const { t, i18n } = useTranslation();
  const { 
    form, 
    stage, 
    showCalendly, 
    onSubmit, 
    goBack, 
    closeCalendly, 
    resetForm 
  } = useScheduleForm();
  
  // Force re-render when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log('Language changed in Agendar page:', i18n.language);
      // Re-initialize the form with new translations
      resetForm();
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [i18n, resetForm]);

  // Conditional rendering based on current stage
  const renderStageContent = () => {
    switch (stage) {
      case FormStage.PERSONAL:
        return <FormStagePersonal />;
      case FormStage.COMPANY:
        return <FormStageCompany />;
      case FormStage.PROJECT:
        return <FormStageProject />;
      case FormStage.CONFIRMATION:
        return <FormStageConfirmation />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto py-16 md:py-24 flex-grow">
        <h1 className="heading-lg text-center mb-2">{t('form.scheduleTitle')}</h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          {t('form.briefingInstructions')}
        </p>
        
        {showCalendly ? (
          <CalendlyEmbed onClose={closeCalendly} />
        ) : (
          <div className="max-w-2xl mx-auto">
            <Form {...form}>
              <form onSubmit={onSubmit}>
                <Card className="shadow-md">
                  <FormProgress currentStage={stage} />
                  {renderStageContent()}
                  <CardFooter className="flex justify-between mt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={goBack}
                      disabled={stage === FormStage.PERSONAL}
                    >
                      {t('form.back')}
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-orange hover:bg-orange-dark"
                    >
                      {stage === FormStage.CONFIRMATION ? (
                        <>
                          <span>{t('form.send')}</span>
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      ) : t('form.next')}
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </Form>

            <DirectContact />
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Agendar;
