// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SuccessApiResponse } from 'next-api-handler'

import { EmployeeInput } from './EmployeeForm'
import { Employee } from './EmployeeList'

type EmployeeUpdateInput = {
  _id: string
  payload: EmployeeInput
}

export const employeeApi = createApi({
  reducerPath: 'employee',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Employee', 'Employees'],
  endpoints: (builder) => ({
    getUsers: builder.query<Employee[], void>({
      query: () => '/api/users',
      transformResponse: (res: SuccessApiResponse<Employee[]>) => {
        return res.data.map((employee: Employee) => employee)
      },
      providesTags: ['Employees'],
    }),
    addUser: builder.mutation<SuccessApiResponse<Employee>, EmployeeInput>({
      query: (employee) => ({
        url: '/api/users',
        method: 'post',
        body: employee,
      }),
      onQueryStarted: async (patch, { dispatch, queryFulfilled }) => {
        const createResult = dispatch(
          employeeApi.util.updateQueryData('getUsers', undefined, (draft) => {
            draft.push({ ...patch, _id: '' })
          })
        )
        try {
          await queryFulfilled
        } catch {
          createResult.undo()
        }
      },
      invalidatesTags: ['Employees'],
    }),
    editUser: builder.mutation<
      SuccessApiResponse<Employee>,
      EmployeeUpdateInput
    >({
      query: ({ _id, payload }) => ({
        url: `/api/users/${_id}`,
        method: 'put',
        body: payload,
      }),
      invalidatesTags: ['Employees', 'Employee'],
    }),
    deleteUser: builder.mutation<unknown, string>({
      query: (employeeId) => ({
        url: `/api/users/${employeeId}`,
        method: 'delete',
      }),
      onQueryStarted: async (employeeId, { dispatch, queryFulfilled }) => {
        const deleteResult = dispatch(
          employeeApi.util.updateQueryData('getUsers', undefined, (draft) => {
            draft.filter((employee) => employee._id !== employeeId)
          })
        )
        try {
          await queryFulfilled
        } catch {
          deleteResult.undo()
        }
      },
      invalidatesTags: ['Employees'],
    }),
    revalidateUser: builder.mutation({
      query: (employeeId) => ({
        url: `/api/revalidate/${employeeId}`,
        method: 'post',
      }),
      invalidatesTags: ['Employee'],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useRevalidateUserMutation,
} = employeeApi
