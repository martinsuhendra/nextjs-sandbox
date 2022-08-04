import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { deleteUser, getUsers } from '../../../../lib/helper';
import { Statuses } from './EmployeeForm';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Typography, Grid, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

type Employee = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  salary: number;
  birthday: Date;
  status: Statuses;
};

const EmployeeList = () => {
  const [rows, setRows] = useState([]);

  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery(['users'], getUsers);
  const { mutate } = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.prefetchQuery(['users'], getUsers);
    },
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 260,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'birthday',
      headerName: 'Birthday',
      type: 'date',
      width: 160,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'salary',
      headerName: 'Salary',
      type: 'number',
      width: 160,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 160,
    },
    {
      field: '',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Link href={`/employee/${params.row._id}`}>
              <IconButton color="info" size="small" aria-label="edit">
                <EditIcon fontSize="small" />
              </IconButton>
            </Link>
          </Grid>
          <Grid item>
            <IconButton
              color="error"
              size="small"
              aria-label="delete"
              onClick={() => mutate(params.row._id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      ),
    },
  ];

  useEffect(() => {
    if (data) {
      const employeesWithId = data.map((employee: Employee) => {
        return { id: employee._id, ...employee };
      });
      setRows(employeesWithId);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Box>
        <Typography>Employee is loading...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box>
        <Typography>Got Error...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
};

export default EmployeeList;
