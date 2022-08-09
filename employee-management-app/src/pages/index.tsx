import { Add as AddIcon } from '@mui/icons-material'
import { Button, Grid, Typography, useTheme } from '@mui/material'
import Head from 'next/head'
import { useDispatch } from 'react-redux'

import EmployeeForm from '@/app/features/employee/EmployeeForm'
import EmployeeList from '@/app/features/employee/EmployeeList'
import { toggleChangeAction } from '@/app/redux/rootReducer'
import FormDialog from '@/common/components/forms/FormDialog'

const Home = () => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const toggleForm = () => {
    dispatch(toggleChangeAction())
  }

  return (
    <div>
      <Head>
        <title>Employee Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          p={theme.spacing(8)}
        >
          <Grid item>
            <Typography
              variant="h4"
              sx={{ fontWeight: 500, letterSpacing: -1 }}
            >
              Employee Management
            </Typography>
          </Grid>
          <Grid item xs container>
            <Button
              onClick={toggleForm}
              endIcon={<AddIcon />}
              variant="contained"
              disableElevation
            >
              Add Employee
            </Button>
          </Grid>
          <Grid item container>
            <EmployeeList />
          </Grid>
          <FormDialog title="Add New Employee">
            <EmployeeForm onCancel={toggleForm} />
          </FormDialog>
        </Grid>
      </main>
    </div>
  )
}

export default Home
