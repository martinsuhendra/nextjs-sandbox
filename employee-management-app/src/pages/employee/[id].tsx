import React from 'react'

import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { useGetUserQuery } from '@/app/features/employee/employeeApi'
import EmployeeForm from '@/app/features/employee/EmployeeForm'

const EmployeeDetailPage = () => {
  const router = useRouter()
  const { id } = router.query

  // RTK QUERY
  const { data, isLoading } = useGetUserQuery(id as string)

  if (isLoading) {
    return <Typography>Employee is Loading...</Typography>
  }

  return (
    <Grid
      container
      p={8}
      justifyContent="center"
      alignItems="center"
      spacing={8}
    >
      <Grid item>
        <Typography variant="h4" sx={{ fontWeight: 500, letterSpacing: -1 }}>
          Employee Detail
        </Typography>
      </Grid>
      <Grid item container>
        <EmployeeForm employee={data} onCancel={() => router.back()} />
      </Grid>
    </Grid>
  )
}

export default EmployeeDetailPage
