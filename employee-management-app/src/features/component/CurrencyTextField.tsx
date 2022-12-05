import React from 'react'

import { InputAdornment, TextField, TextFieldProps } from '@mui/material'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

type CurrencyTextFieldProps = Omit<TextFieldProps, 'variant'> & {
  variant?: TextFieldProps['variant']
  currencySymbol: string
  suffix?: string
  thousandSeparator?: string
  decimalSeparator?: string
}

type NumericFormatCustomProps = {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
  suffix?: string
  thousandSeparator?: string
  decimalSeparator?: string
}

const NumericFormatCustom = React.forwardRef<
  NumericFormatProps,
  NumericFormatCustomProps
>((props: NumericFormatCustomProps, ref) => {
  const {
    onChange,
    suffix,
    thousandSeparator = ',',
    decimalSeparator = '.',
    ...other
  } = props
  return (
    <NumericFormat
      {...other}
      valueIsNumericString
      getInputRef={ref}
      suffix={suffix}
      thousandSeparator={thousandSeparator}
      decimalSeparator={decimalSeparator}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
    />
  )
})

const CurrencyTextField = ({
  currencySymbol,
  variant = 'outlined',
  value,
  name,
  suffix,
  thousandSeparator,
  decimalSeparator,
  ...props
}: CurrencyTextFieldProps) => {
  return (
    <TextField
      variant={variant}
      value={value}
      name={name}
      InputProps={{
        inputComponent: NumericFormatCustom as never,
        inputProps: { suffix, thousandSeparator, decimalSeparator },
        startAdornment: (
          <InputAdornment position="start">{currencySymbol}</InputAdornment>
        ),
      }}
      {...props}
    />
  )
}

export default CurrencyTextField
