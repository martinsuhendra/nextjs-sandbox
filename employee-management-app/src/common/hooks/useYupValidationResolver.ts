import { useCallback } from 'react'

import { useTranslation } from 'next-i18next'
import { AnyObjectSchema } from 'yup'

type YupErrorInner = {
  value: string
  path: string
  params: {
    value: string
    originalValue: string
    path: string
  }
  inner: string[]
  name: string
  message: string
}

type YupError = {
  value: { [key: string]: unknown }
  errors: string[]
  inner: YupErrorInner
}

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
        // console.log(JSON.stringify(error, null, 2))
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
    },
    [t, validationSchema]
  )
}
