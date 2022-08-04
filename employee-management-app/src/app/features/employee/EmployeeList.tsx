import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {
  deleteUser,
  getUsers,
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../../../lib/helper';
import { Statuses } from './EmployeeForm';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Typography,
  Grid,
  IconButton,
  Avatar,
  Chip,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import dayjs from 'dayjs';
import { fCurrency } from '../../../common/utils/formatNumber';

export type Employee = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  salary: number;
  birthday: Date;
  status: Statuses;
  avatar?: string;
};

const EmployeeList = () => {
  const [rows, setRows] = useState<Employee[] | []>([]);

  //REACT-QUERY
  // const queryClient = useQueryClient();
  // const { isLoading, is Error, data, error } = useQuery(['users'], getUsers);

  // const { mutate } = useMutation(deleteUser, {
  //   onSuccess: () => {
  //     queryClient.prefetchQuery(['users'], getUsers);
  //   },
  // });

  //RTK-QUERY

  const { data, isError, isLoading } = useGetUsersQuery();

  const [deleteEmployee] = useDeleteUserMutation();

  const onDelete = async (deleteId: string) => {
    await deleteEmployee(deleteId);
  };

  const columns: GridColDef[] = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 90,
      sortable: false,
      headerAlign: 'center',
      renderCell: (params) => (
        <Grid container justifyContent="center">
          <Avatar alt={params.row.firstName} src={params.row.avatar} />
        </Grid>
      ),
    },
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
      valueGetter: (params: GridValueGetterParams) =>
        dayjs(params.row.birthday).format('DD-MM-YYYY'),
    },
    {
      field: 'salary',
      headerName: 'Salary',
      type: 'number',
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        fCurrency(params.row.salary),
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 160,
      renderCell: (params) => (
        <Chip
          variant="outlined"
          label={params.row.status}
          color={params.row.status === 'active' ? 'success' : 'error'}
        />
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 200,
      sortable: false,
      flex: 1,
    },
    {
      field: '',
      headerName: 'Action',
      headerAlign: 'center',
      minWidth: 100,
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
              onClick={() => onDelete(params.row._id)}>
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
        disableSelectionOnClick
        sx={{
          boxShadow: 1,
          border: 0.5,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
      />
    </Box>
  );
};

export default EmployeeList;
