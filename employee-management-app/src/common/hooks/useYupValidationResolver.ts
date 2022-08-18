import { useCallback } from 'react'

import { useTranslation } from 'next-i18next'
import { AnyObjectSchema, ValidationError } from 'yup'

export const useYupValidationResolver = (validationSchema: AnyObjectSchema) => {
  const { t } = useTranslation()
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
                  // message: t(currentError.message, { field: currentError?.path }),
                  message: t(currentError.message),
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
    [t, validationSchema]
  )
}
