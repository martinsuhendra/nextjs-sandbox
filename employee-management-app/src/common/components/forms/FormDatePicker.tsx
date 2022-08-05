import { CalendarToday as CalendarIcon } from '@mui/icons-material';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { fDate, getCalendarDate, getDate } from '../../utils/formatTime';

// import DatePicker, { DatePickerProps } from '@mui/lab/DatePicker';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Chip,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from '@mui/material';
import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
} from 'react-hook-form';

interface FormDatePickerProps<T extends FieldValues>
  extends Partial<DatePickerProps> {
  label: string;
  name: Path<T>;
  control: Control<T>;
}

const renderInput: DatePickerProps['renderInput'] = (params) => (
  <TextField fullWidth {...params} />
);

const FormDatePicker = <T extends FieldValues>({
  name,
  control,
  label,
  ...props
}: FormDatePickerProps<T>) => {
  const render: ControllerProps<T>['render'] = ({
    field: { value, onChange },
    fieldState: { isDirty },
  }) => {
    const color = isDirty ? 'secondary' : 'primary';
    // Reference https://day.js.org/docs/en/plugin/calendar
    // e.g. Today at 5:02 pm
    const text = getCalendarDate(getDate(value)).split(' at ')[0];

    return (
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        renderInput={renderInput}
        InputProps={{
          color,
          startAdornment: (
            <InputAdornment position="start">
              <Tooltip title={fDate(getDate(value))}>
                <Chip
                  size="small"
                  variant="outlined"
                  color={color}
                  label={text}
                />
              </Tooltip>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton arial-label="Change date">
                <CalendarIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...props}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Controller name={name} control={control} render={render} />
    </LocalizationProvider>
  );
};

export default FormDatePicker;
