import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Paper, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import yup from '@/common/utils/yupLocale'
import CurrencyTextField from '@/features/component/CurrencyTextField'
import FormCurrencyTextField from '@/features/component/FormCurrencyTextField'

const currencyValidator = yup.object({
  price: yup.string().required('Price number is required'),
})

const MINIMUM_VALUE = 1
const MAXIMUM_VALUE = 1000

const TextFieldPage = () => {
  const [inputValue, setinputValue] = useState('')
  const { control, handleSubmit, setError } = useForm<{ price: string }>({
    reValidateMode: 'onChange',
    resolver: yupResolver(currencyValidator),
    defaultValues: {
      price: '',
    },
  })

  const handleSubmitForm = (values: { price: string }) => {
    if (+values.price > MAXIMUM_VALUE || +values.price < MINIMUM_VALUE) {
      return setError('price', {
        type: 'onChange',
        message: `Price number must be within ${MINIMUM_VALUE} and ${MAXIMUM_VALUE}`,
      })
    }
    return alert(`Price is ${values.price}`)
  }

  return (
    <Paper>
      <Box component="form" p={3} onSubmit={handleSubmit(handleSubmitForm)}>
        <Typography sx={{ mb: 3 }}>Currency Textfield</Typography>
        <CurrencyTextField
          value={inputValue}
          name="price"
          label="Price"
          currencySymbol="$S"
          onChange={(e) => setinputValue(e.target.value)}
          suffix=",00"
        />
      </Box>
      <Box component="form" p={3} onSubmit={handleSubmit(handleSubmitForm)}>
        <Typography sx={{ mb: 3 }}>
          Currency Textfield w/ React Hook Form
        </Typography>
        <FormCurrencyTextField
          control={control}
          name="price"
          currencySymbol="$S"
          suffix=",00"
        />
        <Button
          sx={{ display: 'block', mt: 3 }}
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </Paper>
  )
}

export default TextFieldPage
