
import * as z from "zod";

export const createFormSchema = (t: (key: string) => string) => z.object({
  // Personal data
  name: z.string().min(3, { message: t('form.errors.nameMin') }),
  email: z.string().email({ message: t('form.errors.emailInvalid') }),
  phone: z.string().min(10, { message: t('form.errors.phoneInvalid') }),
  role: z.string().min(2, { message: t('form.errors.roleRequired') }),
  
  // Company data
  companyName: z.string().min(2, { message: t('form.errors.companyNameRequired') }),
  segment: z.string().min(2, { message: t('form.errors.segmentRequired') }),
  companySize: z.string().min(1, { message: t('form.errors.companySizeRequired') }),
  website: z.string().optional(),
  
  // Project data
  serviceType: z.string().min(2, { message: t('form.errors.serviceTypeRequired') }),
  projectDescription: z.string().min(20, { message: t('form.errors.descriptionMin') }),
  deadline: z.string().min(1, { message: t('form.errors.deadlineRequired') }),
  budget: z.string().optional(),

  // Contact preferences
  preferWhatsApp: z.boolean().default(true),
  preferEmail: z.boolean().default(false),
  preferPhone: z.boolean().default(false),
  preferCalendly: z.boolean().default(false),
});

export type ScheduleFormValues = z.infer<ReturnType<typeof createFormSchema>>;
