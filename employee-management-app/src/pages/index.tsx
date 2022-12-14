import { useState } from 'react'

import { Add as AddIcon } from '@mui/icons-material'
import { Button, Grid, Typography, useTheme } from '@mui/material'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useDispatch } from 'react-redux'

import DndDialog from '@/common/components/forms/DndDialog'
import DnDFramerDialog from '@/common/components/forms/DnDFramerDialog'
import FormDialog from '@/common/components/forms/FormDialog'
import Highlights from '@/common/components/forms/Highlights'
import EmployeeForm from '@/features/employee/EmployeeForm'
import EmployeeList from '@/features/employee/EmployeeList'
import { toggleChangeAction } from '@/redux/rootReducer'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  }
}

const Home = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation()
  const [showDnd, setShowDnd] = useState(false)
  const [showFramerDnd, setShowFramerDnd] = useState(false)

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
              {t('Employee List')}
            </Typography>
          </Grid>
          <Grid item xs container>
            <Button
              onClick={toggleForm}
              endIcon={<AddIcon />}
              variant="contained"
              disableElevation
            >
              {t('Add Employee')}
            </Button>
            <Button
              onClick={() => setShowDnd(true)}
              variant="contained"
              disableElevation
              sx={{ ml: 4 }}
            >
              {t('List Employee DND')}
            </Button>
            <Button
              onClick={() => setShowFramerDnd(true)}
              variant="contained"
              disableElevation
              sx={{ ml: 4 }}
            >
              {t('List Employee Framer Motion')}
            </Button>
            <Button
              onClick={() => router.push('/component/textfield')}
              variant="contained"
              disableElevation
              sx={{ ml: 4 }}
            >
              {t('Text Field')}
            </Button>
          </Grid>
          <Grid item xs container>
            <Highlights />
          </Grid>
          <Grid item container>
            <EmployeeList />
          </Grid>
          <FormDialog title="Add New Employee">
            <EmployeeForm onCancel={toggleForm} />
          </FormDialog>
          <DndDialog open={showDnd} onClose={() => setShowDnd(false)} />
          <DnDFramerDialog
            open={showFramerDnd}
            onClose={() => setShowFramerDnd(false)}
          />
        </Grid>
      </main>
    </div>
  )
}

export default Home
