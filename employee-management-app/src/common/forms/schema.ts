import * as yup from 'yup'

import buildYupLocale from '../utils/yupLocale'

buildYupLocale()

export const EMPLOYEE_SCHEMA = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  salary: yup.number().positive(),
})
