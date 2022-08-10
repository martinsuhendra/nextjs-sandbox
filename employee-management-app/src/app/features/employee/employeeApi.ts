// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { EmployeeInput } from './EmployeeForm'
import { Employee } from './EmployeeList'

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_BASE_URL

type EmployeeUpdateInput = {
  _id: string
  payload: EmployeeInput
}

export const employeeApi = createApi({
  reducerPath: 'employee',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Employee', 'Employees'],
  endpoints: (builder) => ({
    getUsers: builder.query<Employee[], void>({
      query: () => '/api/users',
      transformResponse: (res: Employee[]) => {
        return res.map((employee: Employee) => {
          return { id: employee._id, ...employee }
        })
      },
      providesTags: ['Employees'],
    }),
    getUser: builder.query<Employee, string>({
      query: (employeeId) => `/api/users/${employeeId}`,
      providesTags: ['Employee'],
    }),
    addUser: builder.mutation<unknown, EmployeeInput>({
      query: (employee) => ({
        url: '/api/users',
        method: 'post',
        body: employee,
      }),
      invalidatesTags: ['Employees'],
    }),
    editUser: builder.mutation<unknown, EmployeeUpdateInput>({
      query: ({ _id, payload }) => ({
        url: `/api/users/${_id}`,
        method: 'put',
        body: payload,
      }),
      onQueryStarted: async (
        { _id, payload },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          employeeApi.util.updateQueryData('getUser', _id, (draft) => {
            Object.assign(draft, payload)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
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
  }),
})

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
} = employeeApi
