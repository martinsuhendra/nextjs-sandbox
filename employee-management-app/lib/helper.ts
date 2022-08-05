import { EmployeeInput } from '../src/app/features/employee/EmployeeForm';

const BASE_URL = 'http://localhost:3000';

type EmployeeUpdateInput = {
  _id: string;
  payload: EmployeeInput;
};

// React Query
export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/api/users`);
  const json = response.json();

  return json;
};

export const getUser = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/api/users/${userId}`);
  const json = await response.json();
  if (json) {
    return json;
  }
  return {};
};

export const addUser = async (employee: EmployeeInput) => {
  try {
    const Options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee),
    };
    const response = await fetch(`${BASE_URL}/api/users`, Options);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};

export const updateUser = async (employee: EmployeeUpdateInput) => {
  try {
    const Options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee.payload),
    };
    const response = await fetch(
      `${BASE_URL}/api/users/${employee._id}`,
      Options,
    );
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const Options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(`${BASE_URL}/api/users/${userId}`, Options);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};

// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Employee } from '../src/app/features/employee/EmployeeList';

export const employeeApi = createApi({
  reducerPath: 'employee',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Employee', 'Employees'],
  endpoints: (builder) => ({
    getUsers: builder.query<Employee[], void>({
      query: () => '/api/users',
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
