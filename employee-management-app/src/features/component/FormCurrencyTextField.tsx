import React, { forwardRef } from 'react'

import {
  InputAdornment,
  StandardTextFieldProps,
  TextField,
} from '@mui/material'
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
} from 'react-hook-form'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

interface FormCurrencyTextFieldProps<T extends FieldValues>
  extends StandardTextFieldProps {
  name: Path<T>
  control: Control<T>
  helperText?: string
  fullWidth?: boolean
  currencySymbol: string
  suffix?: string
  thousandSeparator?: string
  decimalSeparator?: string
}

interface NumericFormatCustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
  suffix?: string
  thousandSeparator?: string
  decimalSeparator?: string
}

const NumericFormatCustom = forwardRef<
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

const FormCurrencyTextField = <T extends FieldValues>({
  name,
  control,
  helperText,
  fullWidth,
  currencySymbol,
  suffix,
  thousandSeparator,
  decimalSeparator,
  ...props
}: FormCurrencyTextFieldProps<T>) => {
  const render: ControllerProps<T>['render'] = ({
    field: { value, onChange },
    fieldState: { error },
  }) => {
    return (
      <TextField
        value={value}
        name={name}
        onChange={onChange}
        error={Boolean(error)}
        helperText={error?.message || helperText}
        fullWidth={fullWidth}
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
  return <Controller name={name} control={control} render={render} />
}

export default FormCurrencyTextField
