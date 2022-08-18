import { setLocale } from 'yup'

const buildYupLocale = () => {
  setLocale({
    mixed: {
      default: 'validators.mixed.default',
      required: 'validators.mixed.required',
      oneOf: 'validators.mixed.oneOf',
      notOneOf: 'validators.mixed.notOneOf',
      notType: 'validators.mixed.notType',
      defined: 'validators.mixed.defined',
    },
    string: {
      length: 'validators.string.length',
      min: 'validators.string.min',
      max: 'validators.string.max',
      matches: 'validators.string.matches',
      email: 'validators.string.email',
      url: 'validators.string.url',
      uuid: 'validators.string.uuid',
      trim: 'validators.string.trim',
      lowercase: 'validators.string.lowercase',
      uppercase: 'validators.string.uppercase',
    },
    number: {
      min: 'validators.number.min',
      max: 'validators.number.max',
      lessThan: 'validators.number.lessThan',
      moreThan: 'validators.number.moreThan',
      positive: 'validators.number.positive',
      negative: 'validators.number.negative',
      integer: 'validators.number.integer',
    },
    date: {
      min: 'validators.date.min',
      max: 'validators.date.max',
    },
    boolean: {
      isValue: 'validators.boolean.isValue',
    },
    object: {
      noUnknown: 'validators.object.noUnknown',
    },
    array: {
      min: 'validators.array.min',
      max: 'validators.array.max',
      length: 'validators.array.length',
    },
  })
}

export default buildYupLocale
