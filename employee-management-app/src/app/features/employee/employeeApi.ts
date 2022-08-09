import { EmployeeInput } from './EmployeeForm';

const BASE_URL = 'http://localhost:3000';

type EmployeeUpdateInput = {
  _id: string;
  payload: EmployeeInput;
};

// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Employee } from './EmployeeList';
import { NextApiResponse } from 'next';

export const employeeApi = createApi({
  reducerPath: 'employee',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Employee', 'Employees'],
  endpoints: (builder) => ({
    getUsers: builder.query<Employee[], void>({
      query: () => '/api/users',
      transformResponse: (res: Employee[]) => {
        return res.map((employee: Employee) => {
          return { id: employee._id, ...employee };
        });
      },
      providesTags: ['Employees'],
    }),
    getUser: builder.query<Employee, string>({
      query: (employeeId) => `/api/users/${employeeId}`,
      providesTags: ['Employee'],
    }),
    addUser: builder.mutation<{}, EmployeeInput>({
      query: (employee) => ({
        url: '/api/users',
        method: 'post',
        body: employee,
      }),
      invalidatesTags: ['Employees'],
    }),
    editUser: builder.mutation<{}, EmployeeUpdateInput>({
      query: ({ _id, payload }) => ({
        url: `/api/users/${_id}`,
        method: 'put',
        body: payload,
      }),
      invalidatesTags: ['Employees', 'Employee'],
    }),
    deleteUser: builder.mutation<{}, string>({
      query: (employeeId) => ({
        url: `/api/users/${employeeId}`,
        method: 'delete',
      }),
      invalidatesTags: ['Employees'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
} = employeeApi;
