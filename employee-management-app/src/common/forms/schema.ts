import * as yup from 'yup'

yup.setLocale({
  mixed: {
    default: 'validation.yup.mixed.default',
    // required: 'validation.yup.mixed.required {{field}}',
    required: 'validation.yup.mixed.required',
  },
  string: {
    email: 'validation.yup.string.email',
  },
  number: {
    positive: 'validation.yup.number.positive',
  },
})

export const EMPLOYEE_SCHEMA = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  salary: yup.number().positive(),
})
