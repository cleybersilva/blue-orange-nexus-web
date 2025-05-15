
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
import { useScheduleForm } from "@/hooks/useScheduleForm";

const Agendar = () => {
  const { t } = useTranslation();
  const {
    form,
    stage,
    showCalendly,
    goToPreviousStage,
    onSubmit,
    closeCalendly
  } = useScheduleForm();

  if (showCalendly) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <div className="container mx-auto py-16 md:py-24 flex-grow">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">{t('form.scheduleYourMeeting')}</h2>
              <div className="calendly-embed mb-6" style={{ minHeight: '650px' }}>
                <iframe
                  src={`https://calendly.com/agenciadigital/30min?lang=${t('form.lang')}`}
                  width="100%"
                  height="650"
                  frameBorder="0"
                  title={t('form.scheduleTitle')}
                ></iframe>
              </div>
              <Button 
                onClick={closeCalendly} 
                variant="outline"
                className="mt-4"
              >
                {t('form.backToForm')}
              </Button>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

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
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
