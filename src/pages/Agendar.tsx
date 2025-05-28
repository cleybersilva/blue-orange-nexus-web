
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Send } from "lucide-react";
import { useTranslation } from 'react-i18next';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FormProgress, FormStage } from "@/components/agendar/FormProgress";
import FormStages from "@/components/agendar/FormStages";
import ContactInfo from "@/components/agendar/ContactInfo";
import CalendlyWidget from "@/components/agendar/CalendlyWidget";
import { useScheduleForm } from "@/hooks/useScheduleForm";

const Agendar = () => {
  const { t } = useTranslation();
  const {
    form,
    stage,
    showCalendly,
    goToPreviousStage,
    handleNext,
    onSubmit,
    closeCalendly
  } = useScheduleForm();

  if (showCalendly) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <div className="container mx-auto py-16 md:py-24 flex-grow">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-navy text-center">
                {t('form.scheduleYourMeeting')}
              </h2>
              
              <CalendlyWidget 
                onEventScheduled={() => {
                  console.log('Event scheduled from Agendar page');
                  setTimeout(() => {
                    closeCalendly();
                  }, 2000);
                }}
                className="mb-6"
              />
              
              <div className="text-center">
                <Button 
                  onClick={closeCalendly} 
                  variant="outline"
                  className="mt-4 hover:bg-gray-50"
                >
                  {t('form.backToForm')}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stage === FormStage.CONFIRMATION) {
      // Final submission
      form.handleSubmit(onSubmit)();
    } else {
      // Navigate to next stage
      handleNext();
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
        
        <div className="max-w-2xl mx-auto">
          <Form {...form}>
            <form onSubmit={handleFormSubmit}>
              <Card className="shadow-md">
                <FormProgress currentStage={stage} />
                <FormStages stage={stage} form={form} />
                <CardFooter className="flex justify-between mt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={goToPreviousStage}
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

          <ContactInfo />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Agendar;
