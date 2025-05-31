import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import BackButton from '../components/BackButton';

const schema = Yup.object().shape({
  jobTitle: Yup.string().required('Job title is required'),
});

export default function UpdateEmployeeRoles() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [employeeNumberInput, setEmployeeNumberInput] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const fetchEmployee = async () => {
    if (!employeeNumberInput) return alert('Please enter an employee number');

    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/employees/${employeeNumberInput}`);

      const employee = res.data;

      // Flatten nested office and manager before resetting the form
      const flattened = {
        jobTitle: employee.jobTitle || '',
      };

      reset(flattened);
      setEmployeeNumber(employeeNumberInput);
      setFormVisible(true);
    } catch (err) {
      alert('Error fetching employee data');
      setFormVisible(false);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      await axios.put(`${BASE_URL}/api/v1/employees/update/${employeeNumber}/role/${data.jobTitle}`);
      alert('Employee updated successfully!');
    } catch (err) {
      alert('Error updating employee');
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Update Employee</h2>
      <BackButton />

      {/* Input for Employee Number */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Enter Employee Number"
          value={employeeNumberInput}
          onChange={(e) => setEmployeeNumberInput(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={fetchEmployee}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Fetch
        </button>
      </div>

      {/* Loading */}
      {loading && <p>Loading employee data...</p>}

      {/* Form */}
      {formVisible && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mt-6">
          {[
            { name: 'jobTitle', label: 'Job Title' },
            
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
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Update
          </button>
        </form>
      )}
    </div>
  );
}
