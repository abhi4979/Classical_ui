import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import BackButton from '../components/BackButton';

const schema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  extension: Yup.string().required('Extension is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  jobTitle: Yup.string().required('Job title is required'),
  officeCode: Yup.string().required('Office code is required'),
  reportsTo: Yup.number().nullable().typeError('Must be a number'),
});

export default function AddEmployee() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:8099/api/v1/employees/add', data);
      alert('Employee added successfully!');
      reset();
    } catch (err) {
      alert('Error adding employee');
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Add New Employee</h2>
      <BackButton />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
        {[
          { name: 'firstName', label: 'First Name' },
          { name: 'lastName', label: 'Last Name' },
          { name: 'extension', label: 'Extension' },
          { name: 'email', label: 'Email' },
          { name: 'jobTitle', label: 'Job Title' },
          { name: 'officeCode', label: 'Office Code' },
          { name: 'reportsTo', label: 'Reports To (Employee Number)' },
        ].map((field) => (
          <div key={field.name}>
            <label className="block mb-1 font-semibold">{field.label}</label>
            <input
              {...register(field.name)}
              placeholder={field.label}
              className="block border p-2 w-full rounded"
            />
            <p className="text-red-500 text-sm">{errors[field.name]?.message}</p>
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
