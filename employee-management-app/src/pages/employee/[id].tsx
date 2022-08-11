import { ParsedUrlQuery } from 'querystring'

import React, { FC } from 'react'

import { Grid, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'

import EmployeeForm from '@/app/features/employee/EmployeeForm'
import { Employee } from '@/app/features/employee/EmployeeList'
import {
  loadEmployee,
  loadEmployees,
} from '@/app/features/employee/lib/helpers'

const EmployeeDetailPage: FC<{ employee: Employee }> = ({ employee }) => {
  const router = useRouter()

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
        <EmployeeForm employee={employee} onCancel={() => router.back()} />
      </Grid>
    </Grid>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const employees = await loadEmployees()
  const paths = employees.map((employee: Employee) => ({
    params: { id: employee._id.toString() },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

interface IParams extends ParsedUrlQuery {
  id: string
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { id } = params as IParams
  const employee = await loadEmployee(id)

  return {
    props: { employee },
  }
}

export default EmployeeDetailPage
