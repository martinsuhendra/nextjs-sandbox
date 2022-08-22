import React, { FC, useCallback } from 'react'

import { faker } from '@faker-js/faker'
import { yupResolver } from '@hookform/resolvers/yup'
import { Save as SaveIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { Severity, snackbar, toggleChangeAction } from '../../redux/rootReducer'

import {
  useAddUserMutation,
  useEditUserMutation,
  useRevalidateUserMutation,
} from './employeeApi'
import { Employee } from './EmployeeList'

import FormTextField from '@/common/components/forms/FormTextField'
import { getEmployeeSchema } from '@/common/forms/schema'
// import { useYupValidationResolver } from '@/common/hooks/useYupValidationResolver'

export enum Statuses {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export type EmployeeInput = {
  _id?: string
  firstName: string
  lastName: string
  email: string
  salary: number
  birthday: Date
  status: Statuses
  avatar?: string
}

interface EmployeeFormProps {
  onCancel?: () => void
  employee?: Employee
}

const EmployeeForm: FC<EmployeeFormProps> = ({ onCancel, employee }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { control, handleSubmit, setValue, reset } = useForm<EmployeeInput>({
    resolver: yupResolver(getEmployeeSchema(t)),
    defaultValues: {
      firstName: employee?.firstName || '',
      lastName: employee?.lastName || '',
      email: employee?.email || '',
      salary: employee?.salary || 0,
      birthday: employee?.birthday || new Date(),
      status: employee?.status || Statuses.ACTIVE,
      avatar: employee?.avatar || '',
    },
  })

  const generatePeople = () => {
    const randomEmployee = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      salary: faker.datatype.number({ min: 1000, max: 10000 }),
      birthday: faker.date.birthdate(),
      avatar: faker.image.avatar(),
    }

    reset(randomEmployee)
  }

  // RTK QUERY
  const [createEmployee, { isLoading, isError, error }] = useAddUserMutation()
  const [
    editEmployee,
    { isError: isUpdateError, error: updateError, isLoading: updateIsLoading },
  ] = useEditUserMutation()
  const [revalidateUser, { isLoading: revalidateIsLoading }] =
    useRevalidateUserMutation()

  const onChangeStatus = useCallback(
    (value: Statuses) => {
      setValue('status', value)
    },
    [setValue]
  )

  const onSubmit = async (data: EmployeeInput) => {
    // RTK Query
    if (employee) {
      await editEmployee({ _id: employee._id as string, payload: data })
      await revalidateUser(employee._id)
      dispatch(snackbar({ message: 'Successfully update data!' }))
    } else {
      await createEmployee(data)
      dispatch(toggleChangeAction())
    }
  }

  if (isError || isUpdateError) {
    dispatch(
      snackbar({ message: error || updateError, severity: Severity.ERROR })
    )
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <FormTextField
            name="firstName"
            control={control}
            label={t('First Name')}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            name="lastName"
            control={control}
            label={t('Last Name')}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            name="email"
            control={control}
            // type="email"
            label={t('Email')}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            name="salary"
            control={control}
            label={t('Salary')}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="birthday"
            control={control}
            render={({ field: { value, onChange } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={t('Birthday')}
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
                  label={t('Active')}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={value === Statuses.INACTIVE}
                      onChange={() => onChangeStatus(Statuses.INACTIVE)}
                    />
                  }
                  label={t('Inactive')}
                />
              </FormGroup>
            )}
          />
        </Grid>
        <Grid
          container
          spacing={2}
          justifyContent="flex-end"
          alignItems="center"
          mt={4}
          pr={8}
        >
          <Grid item>
            <Link href="/" locale="en">
              English
            </Link>
          </Grid>
          <Grid item>
            <Link href="/" locale="id">
              Bahasa
            </Link>
          </Grid>
        </Grid>
        <Grid
          mt={4}
          item
          container
          spacing={3}
          justifyContent="flex-end"
          alignItems="center"
        >
          {!employee && (
            <Grid item>
              <Button
                onClick={generatePeople}
                type="button"
                variant="outlined"
                disableElevation
                color="primary"
              >
                Generate
              </Button>
            </Grid>
          )}
          <Grid item>
            <Button
              onClick={onCancel}
              type="button"
              disableElevation
              color="primary"
            >
              {employee ? 'Back' : 'Cancel'}
            </Button>
          </Grid>
          <Grid item>
            <LoadingButton
              type="submit"
              disableElevation
              variant="contained"
              color="primary"
              loading={isLoading || updateIsLoading || revalidateIsLoading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              sx={{ px: 2 }}
            >
              {employee ? 'Update' : 'Submit'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default EmployeeForm
