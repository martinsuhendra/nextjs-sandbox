import { Add as AddIcon } from '@mui/icons-material';
import {
  Typography,
  Grid,
  Button,
  Divider,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import EmployeeForm from '../app/features/employee/EmployeeForm';
import EmployeeList from '../app/features/employee/EmployeeList';
import { toggleChangeAction } from '../app/redux/rootReducer';
import FormDialog from '../common/components/forms/FormDialog';
import useAppSelector from '../common/hooks/useAppSelector';
// import { useToggle } from '../common/utils/useToggle';

export default function Home() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const showForm = useAppSelector((state) => state.app.client.toggleForm);

  const toggleForm = () => {
    dispatch(toggleChangeAction());
  };

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
          p={theme.spacing(8)}>
          <Grid item>
            <Typography variant="h4">Employee Management</Typography>
          </Grid>
          <Grid item xs container>
            <Button
              onClick={toggleForm}
              endIcon={<AddIcon />}
              variant="contained"
              disableElevation>
              Add Employee
            </Button>
          </Grid>
          <Grid item container>
            <EmployeeList />
          </Grid>
          <FormDialog
            open={showForm}
            title="Add New Employee"
            renderContent={<EmployeeForm onCancel={toggleForm} />}
          />
        </Grid>
      </main>
    </div>
  );
}
