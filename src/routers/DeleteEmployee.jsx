import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';

export default function DeleteEmployee() {
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    if (!employeeNumber.trim()) {
      alert('Please enter an Employee Number');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/employees/delete/${employeeNumber}`
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error deleting employee. Please check the ID and try again.');
    } finally {
      setLoading(false);
      setEmployeeNumber('');
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Delete Employee</h2>

      <div className="flex gap-4">
        <input
          type="number"
          placeholder="Enter Employee Number"
          value={employeeNumber}
          onChange={(e) => setEmployeeNumber(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>

      {message && <p className="text-blue-600">{message}</p>}

      <BackButton />
    </div>
  );
}
