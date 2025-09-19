
import { ScheduleFormValues } from '@/types/scheduleForm';

// Determine email based on language
export const getContactEmail = (i18n: any) => {
  const currentLanguage = i18n.language;
  console.log('Current language:', currentLanguage);
  
  // For English, use contact@agenciadigitalhub.com
  if (currentLanguage === 'en') {
    return 'contact@agenciadigitalhub.com';
  }
  
  // For Portuguese (BR and PT) and Spanish, use contato@agenciadigitalhub.com
  return 'contato@agenciadigitalhub.com';
};

// Format message for submission
export const formatSubmissionMessage = (values: ScheduleFormValues, t: (key: string) => string, i18n: any) => {
  return `
*${t('form.newBriefing')}*
-------------------
*${t('form.personalData')}*
${t('form.name')}: ${values.name}
${t('form.email')}: ${values.email}
${t('form.phone')}: ${values.phone}
${t('form.role')}: ${values.role}

*${t('form.companyData')}*
${t('form.company')}: ${values.companyName}
${t('form.segment')}: ${values.segment}
${t('form.size')}: ${values.companySize}
${t('form.website')}: ${values.website || t('form.notProvided')}

*${t('form.projectData')}*
${t('form.service')}: ${values.serviceType}
${t('form.description')}: ${values.projectDescription}
${t('form.deadline')}: ${values.deadline}
${t('form.budget')}: ${values.budget || t('form.notProvided')}

*${t('form.contactPreference')}*
${values.preferWhatsApp ? "• WhatsApp" : ""}
${values.preferEmail ? `• ${t('form.email')}` : ""}
${values.preferPhone ? `• ${t('form.phone')}` : ""}
${values.preferCalendly ? `• ${t('form.onlineScheduling')}` : ""}

*${t('form.systemInfo')}*
${t('form.submissionTime')}: ${new Date().toLocaleString()}
${t('form.language')}: ${i18n.language}
  `;
};

// Handle WhatsApp submission
export const sendToWhatsApp = (message: string) => {
  try {
    const whatsappUrl = `https://w.app/agenciadigitalhub?text=${encodeURIComponent(message)}`;
    console.log('Opening WhatsApp with message');
    window.open(whatsappUrl, "_blank");
    return true;
  } catch (error) {
    console.error('Error opening WhatsApp:', error);
    return false;
  }
};

// Handle email submission
export const sendToEmail = (message: string, contactEmail: string, t: (key: string) => string) => {
  try {
    const emailSubject = t('form.newBriefingSubject');
    const emailBody = message;
    const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    console.log('Opening email client with message to:', contactEmail);
    window.location.href = mailtoUrl;
    return true;
  } catch (error) {
    console.error('Error opening email client:', error);
    return false;
  }
};
