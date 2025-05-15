
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from "lucide-react";

// Define o enum para os estágios do formulário
export enum FormStage {
  PERSONAL = 0,
  COMPANY = 1,
  PROJECT = 2,
  CONFIRMATION = 3,
}

type FormProgressProps = {
  currentStage: FormStage;
};

const FormProgress: React.FC<FormProgressProps> = ({ currentStage }) => {
  const { t } = useTranslation();

  const stages = [
    { name: t('form.stages.personal'), stage: FormStage.PERSONAL },
    { name: t('form.stages.company'), stage: FormStage.COMPANY },
    { name: t('form.stages.project'), stage: FormStage.PROJECT },
    { name: t('form.stages.confirmation'), stage: FormStage.CONFIRMATION },
  ];

  return (
    <div className="flex justify-between mb-8 px-4">
      {stages.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center"
        >
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full mb-2 ${
              currentStage >= item.stage 
                ? "bg-orange text-white" 
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {currentStage > item.stage ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              index + 1
            )}
          </div>
          <span
            className={`text-xs ${
              currentStage >= item.stage ? "text-orange font-medium" : "text-gray-500"
            }`}
          >
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export { FormProgress };
