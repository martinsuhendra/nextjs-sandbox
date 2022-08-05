import { Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { getUser, useGetUserQuery } from '../../../lib/helper';
import EmployeeForm from '../../app/features/employee/EmployeeForm';

const EmployeeDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  //REACT QUERY
  // const { data, isLoading, isError, error } = useQuery(['user', id], () =>
  //   getUser(id as string),
  // );

  //RTK QUERY
  const { data, isLoading } = useGetUserQuery(id as string);

  const renderEmployeeForm = useMemo(() => {
    return <EmployeeForm employee={data} onCancel={() => router.back()} />;
  }, [data]);

  if (isLoading) {
    return <Typography>Employee is Loading...</Typography>;
  }

  return (
    <Grid
      container
      p={8}
      justifyContent="center"
      alignItems="center"
      spacing={8}>
      <Grid item>
        <Typography variant="h4" sx={{ fontWeight: 500, letterSpacing: -1 }}>
          Employee Detail
        </Typography>
      </Grid>
      <Grid item container>
        {renderEmployeeForm}
      </Grid>
    </Grid>
  );
};

export default EmployeeDetailPage;
