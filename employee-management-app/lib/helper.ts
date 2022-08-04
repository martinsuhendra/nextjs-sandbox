import { EmployeeInput } from '../src/app/features/employee/EmployeeForm';

const BASE_URL = 'http://localhost:3000';

type EmployeeUpdateInput = {
  _id: string;
  payload: EmployeeInput;
};

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
