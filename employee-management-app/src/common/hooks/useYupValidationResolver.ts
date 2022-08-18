import { useCallback } from 'react'

import { useTranslation } from 'next-i18next'
import { AnyObjectSchema, ValidationError } from 'yup'

import { camelCaseToTitleCase } from '../utils/formatText'

export const useYupValidationResolver = (validationSchema: AnyObjectSchema) => {
  const { t } = useTranslation()

  const localisationOptionsHandler = useCallback(
    (type: ValidationError['type'], path: ValidationError['path']) => {
      switch (type) {
        case 'required':
          return { field: t(camelCaseToTitleCase(path)) }

        default:
          return { field: path }
      }
    },
    [t]
  )

  return useCallback(
    async (data: { [key: string]: unknown }) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        })

        return {
          values,
          errors: {},
        }
      } catch (error) {
        if (error instanceof ValidationError) {
          return {
            values: {},
            errors: Object.fromEntries(
              error.inner.map((currentError) => [
                currentError.path,
                {
                  type: currentError.type ?? 'validation',
                  message: t(
                    currentError.message,
                    localisationOptionsHandler(
                      currentError.type,
                      currentError.path
                    )
                  ),
                },
              ])
            ),
          }
        }
        return {
          values: {},
          errors: {},
        }
      }
    },
    [localisationOptionsHandler, t, validationSchema]
  )
}
