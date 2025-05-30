import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';

export default function GetEmployeeById() {
  const [id, setId] = useState('');
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchEmployee = async () => {
    if (!id.trim()) return alert('Please enter an employee ID');

    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8099/api/v1/employees/${id}`);
      setEmployee(res.data);
    } catch (err) {
      alert('Employee not found');
      setEmployee(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Search Employee by ID</h2>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Enter employee ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button
          onClick={fetchEmployee}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && employee && (
        <div className="mt-4 bg-white shadow-md p-4 rounded-lg border w-full max-w-md">
          <h3 className="text-lg font-bold mb-2">
            {employee.firstName} {employee.lastName}
          </h3>
          <p>Email: {employee.email}</p>
          <p>Job Title: {employee.jobTitle}</p>
          <p>Extension: {employee.extension}</p>
          <p>Office Code: {employee.office?.officeCode || 'N/A'}</p>
          <p>
            Reports To:{' '}
            {employee.manager
              ? `${employee.manager.firstName} ${employee.manager.lastName}`
              : 'N/A'}
          </p>
        </div>
      )}

      <BackButton />
    </div>
  );
}
