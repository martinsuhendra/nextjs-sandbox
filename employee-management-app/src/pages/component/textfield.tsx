import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Paper, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

import yup from '@/common/utils/yupLocale'
import CurrencyTextField from '@/features/component/CurrencyTextField'

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
        message: 'Price number must be within minimum and maximum',
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
        <Controller
          name="price"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <CurrencyTextField
                required
                error={!!error}
                value={value}
                name="price"
                label="Price"
                currencySymbol="$S"
                onChange={onChange}
                helperText={error?.message || 'Minimum 1 And Maximum 1000'}
                suffix=",00"
              />
            )
          }}
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
