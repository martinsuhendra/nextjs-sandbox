import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import {
  InputAdornment,
  OutlinedTextFieldProps,
  TextField,
} from '@mui/material'
import AutoNumeric from 'autonumeric'

interface CurrencyTextFieldProps extends OutlinedTextFieldProps {
  type?: 'text' | 'tel' | 'hidden'
  id?: string
  /** If true, the input element will be disabled. */
  disabled?: boolean
  /** The label content. */
  label: string
  /** Align the numbers in the textField.
   * If you pass the `inputProps` from TextFieldAPI text align won't work.
   * then, you have handle it by className with your own class inside inputProps.
   *
  textAlign: "right" | "left" |"center",
  /** Tab index for the element */
  tabIndex?: number
  /** If true, the input element will be focused during the first mount. */
  autoFocus?: boolean
  /** The short hint displayed in the input before the user enters a value. */
  placeholder?: string
  /** value to be enter and display in input */
  value?: string | number
  /** Defines the currency symbol string. */
  currencySymbol: string
  /** Defines what decimal separator character is used. */
  decimalCharacter?: string
  /** Allow to declare an alternative decimal separator which is automatically replaced by `decimalCharacter` when typed. */
  decimalCharacterAlternative?: string
  /** Defines the default number of decimal places to show on the formatted value. */
  decimalPlaces?: number
  /** Defines how many decimal places should be visible when the element is unfocused null. */
  decimalPlacesShownOnBlur?: number
  /** Defines how many decimal places should be visible when the element has the focus. */
  decimalPlacesShownOnFocus?: number
  /** Defines the thousand grouping separator character */
  digitGroupSeparator?: string
  /** Controls the leading zero behavior */
  leadingZero?: 'allow' | 'deny' | 'keep'
  /** maximum value that can be enter */
  maximumValue?: string
  /** minimum value that can be enter */
  minimumValue?: string
  /** placement of the negitive and possitive sign symbols */
  negativePositiveSignPlacement?: 'l' | 'r' | 'p' | 's'
  /** Defines the negative sign symbol to use */
  negativeSignCharacter?: string
  /** how the value should be formatted,before storing it */
  outputFormat?: 'string' | 'number'
  /** Defines if the element value should be selected on focus. */
  selectOnFocus?: boolean
  /** Defines the positive sign symbol to use. */
  positiveSignCharacter?: string
  /** Defines if the element should be set as read only on initialization. */
  readOnly?: boolean
  /** predefined objects are available in <a href="https://www.nodenpm.com/autonumeric/4.5.1/detail.html#predefined-options">AutoNumeric</a> */
  preDefined?: object
}

type ChangeEventType =
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  | 'onKeyPress'
  | 'onKeyUp'
  | 'onKeyDown'

const CurrencyTextField = ({
  currencySymbol,
  InputProps,
  value,
  outputFormat = 'number',
  ...props
}: CurrencyTextFieldProps) => {
  const inputRef = useRef('')
  const [autonumeric, setAutonumeric] = useState<AutoNumeric>()

  const getValue = () => {
    if (autonumeric) return
    const valueMapper = {
      string: (numeric: AutoNumeric) => numeric.getNumericString(),
      number: (numeric: AutoNumeric) => numeric.getNumber(),
    }
    return valueMapper[outputFormat](autonumeric)
  }

  const callEventHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLDivElement>,
    eventName: ChangeEventType
  ) => {
    if (!props[eventName]) return
    props[eventName](e, getValue())
  }

  useEffect(() => {
    setAutonumeric(new AutoNumeric(inputRef.current, value))

    return () => autonumeric?.remove()
  }, [])

  return (
    <TextField
      inputRef={inputRef}
      onChange={(e) => callEventHandler(e, 'onChange')}
      onFocus={(e) => callEventHandler(e, 'onFocus')}
      onBlur={(e) => callEventHandler(e, 'onBlur')}
      onKeyPress={(e) => callEventHandler(e, 'onKeyPress')}
      onKeyUp={(e) => callEventHandler(e, 'onKeyUp')}
      onKeyDown={(e) => callEventHandler(e, 'onKeyDown')}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{currencySymbol}</InputAdornment>
        ),
        ...InputProps,
      }}
      {...props}
    />
  )
}

export default CurrencyTextField
