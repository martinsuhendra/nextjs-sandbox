import {
  SelectProps as SelectPropsType,
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

export type SelectOption = {
  value: string
  label?: string
}

interface FormTextFieldProps<T extends FieldValues>
  extends StandardTextFieldProps {
  name: Path<T>
  control: Control<T>
}

const DEFAULT_SELECT_PROPS: SelectPropsType = {
  MenuProps: { sx: { maxHeight: 480 } },
}

const FormTextField = <T extends FieldValues>({
  name,
  control,
  fullWidth = true,
  helperText,
  SelectProps = DEFAULT_SELECT_PROPS,
  ...props
}: FormTextFieldProps<T>) => {
  const render: ControllerProps<T>['render'] = ({
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  }) => (
    <TextField
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={invalid}
      fullWidth={fullWidth}
      helperText={error?.message || helperText}
      SelectProps={SelectProps}
      {...props}
    />
  )

  return <Controller name={name} control={control} render={render} />
}

export default FormTextField
