import { i18n } from 'next-i18next'
import * as yup from 'yup'

yup.setLocale({
  mixed: {
    default: i18n?.t('Invalid value'),
    required: ({ label }) => i18n?.t('__field__ is required', { field: label }),
    oneOf: ({ values }) =>
      i18n?.t('Must be one of the following: __values__', { values }),
    notOneOf: ({ values }) =>
      i18n?.t('These are not allowed: __values__', { values }),
    notType: ({ type }) => i18n?.t('Must be a __type__ type', { type }),
    defined: () => i18n?.t('This is required'),
  },
  string: {
    length: ({ length }) =>
      i18n?.t('Must be exactly __length__ characters', { length }),
    min: ({ min }) => i18n?.t('Must be at least __min__ characters', { min }),
    max: ({ max }) =>
      i18n?.t('Cannot be more than __max__ characters', { max }),
    matches: ({ regex }) =>
      i18n?.t('Must match the following: "__regex__"', { regex }),
    email: ({ value }) => i18n?.t('__value__ is not a valid email', { value }),
    url: () => i18n?.t('Must be a valid URL'),
    uuid: () => i18n?.t('Must be a valid UUID'),
    trim: () => i18n?.t('Cannot contain spaces before or after'),
    lowercase: () => i18n?.t('Must be lowercase'),
    uppercase: () => i18n?.t('Must be uppercase'),
  },
  number: {
    min: ({ min }) =>
      i18n?.t('Must be greater than or equal to __min__', { min }),
    max: ({ max }) => i18n?.t('Must be less than or equal to __max__', { max }),
    lessThan: ({ less }) => i18n?.t('Must be less than __less__', { less }),
    moreThan: ({ more }) => i18n?.t('Must be greater than __more__', { more }),
    positive: () => i18n?.t('Must be a positive number'),
    negative: () => i18n?.t('Must be a negative number'),
    integer: () => i18n?.t('Must be a number'),
  },
  date: {
    min: ({ min }) => i18n?.t('Must be later than __min__', { min }),
    max: ({ max }) => i18n?.t('Must be before __max__', { max }),
  },
  boolean: {
    isValue: ({ value }) => i18n?.t('Must be __value__', { value }),
  },
  object: {
    noUnknown: () => i18n?.t('Unknown key __unknown__'),
  },
  array: {
    min: ({ min }) => i18n?.t('Must have at least __min__ items', { min }),
    max: ({ max }) => i18n?.t('Cannot have more than __max__ items', { max }),
    length: ({ length }) => i18n?.t('Must have __length__ items', { length }),
  },
})

export default yup
