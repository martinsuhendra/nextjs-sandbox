import { TFunction } from 'next-i18next'

import yup from '@/common/utils/yupLocale'

export const getEmployeeSchema = (t: TFunction) =>
  yup.object({
    firstName: yup.string().label(t('First Name')).required(),
    lastName: yup.string().label(t('Last Name')).required(),
    email: yup.string().email().label(t('Email')).required(),
    salary: yup.number().label(t('Salary')).positive(),
  })
