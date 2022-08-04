import React, { FC, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, useForm } from 'react-hook-form';
import FormTextField from '../../../common/components/forms/FormTextField';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addUser,
  getUsers,
  updateUser,
  useAddUserMutation,
  useEditUserMutation,
  useGetUsersQuery,
} from '../../../../lib/helper';
import { useDispatch } from 'react-redux';
import { toggleChangeAction } from '../../redux/rootReducer';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import { Employee } from './EmployeeList';

export enum Statuses {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export type EmployeeInput = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  salary: number;
  birthday: string;
  status: Statuses;
  avatar?: string;
};

interface EmployeeFormProps {
  onCancel?: () => void;
  employee?: Employee;
}

const EmployeeForm: FC<EmployeeFormProps> = ({ onCancel, employee }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { isSubmitted, isValid },
  } = useForm<EmployeeInput>({
    defaultValues: {
      firstName: employee?.firstName || '',
      lastName: employee?.lastName || '',
      email: employee?.email || '',
      salary: employee?.salary || 0,
      birthday: employee?.birthday
        ? dayjs(employee?.birthday).format()
        : dayjs().format(),
      status: employee?.status || Statuses.ACTIVE,
      avatar: employee?.avatar || '',
    },
  });

  //REACT QUERY
  // const queryClient = useQueryClient();
  // const { mutate, isLoading, isError } = useMutation(addUser, {
  //   onSuccess: () => {
  //     dispatch(toggleChangeAction());
  //     queryClient.prefetchQuery(['users'], getUsers);
  //   },
  // });
  // const { mutate: updateMutation } = useMutation(updateUser, {
  //   onSuccess: () => {
  //     queryClient.prefetchQuery(['users'], getUsers);
  //   },
  // });

  //RTK QUERY
  const result = useGetUsersQuery();
  const [createEmployee, { isLoading, isError }] = useAddUserMutation();
  const [editEmployee, { isLoading: updateLoading, isError: updateError }] =
    useEditUserMutation();

  const onChangeStatus = useCallback(
    (value: Statuses) => {
      setValue('status', value);
    },
    [setValue],
  );

  const onSubmit = async (data: EmployeeInput) => {
    const payload = {
      ...data,
      birthday: dayjs(data.birthday).format('DD/MM/YYYY'),
    };

    //React Query
    // employee
    //   ? updateMutation({ _id: employee._id as string, payload })
    //   : mutate(payload);

    //RTK Query
    if (employee) {
      await editEmployee({ _id: employee._id as string, payload });
    } else {
      await createEmployee(payload);
      dispatch(toggleChangeAction());
    }
    result.refetch();
  };

  if (isError) {
    return (
      <Box>
        <Typography>Got Error...</Typography>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <FormTextField
            name="firstName"
            control={control}
            label="First Name"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField name="lastName" control={control} label="Last Name" />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            name="email"
            control={control}
            type="email"
            label="Email"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            name="salary"
            control={control}
            label="Salary"
            type="number"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="birthday"
            control={control}
            render={({ field: { value, onChange } }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Birthday"
                  onChange={onChange}
                  value={value}
                  renderInput={(params) => (
                    <TextField required fullWidth {...params} />
                  )}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="status"
            control={control}
            render={({ field: { value } }) => (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={value === Statuses.ACTIVE}
                      onChange={() => onChangeStatus(Statuses.ACTIVE)}
                    />
                  }
                  label="Active"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={value === Statuses.INACTIVE}
                      onChange={() => onChangeStatus(Statuses.INACTIVE)}
                    />
                  }
                  label="Inactive"
                />
              </FormGroup>
            )}
          />
        </Grid>
        <Grid
          mt={4}
          item
          container
          spacing={3}
          justifyContent="flex-end"
          alignItems="center">
          <Grid item>
            <Button
              onClick={onCancel}
              type="button"
              disableElevation
              color="primary">
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <LoadingButton
              type="submit"
              disableElevation
              variant="contained"
              color="primary"
              loading={isLoading}
              loadingIndicator="Loading...">
              {employee ? 'Update' : 'Submit'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeForm;
