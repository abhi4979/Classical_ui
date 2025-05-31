import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';

export default function GetEmployeeByOfficeCode() {
  const [officeCode, setOfficeCode] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    if (!officeCode.trim()) return alert('Please enter an office code');

    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/employees/office/${officeCode}`);
      setEmployees(res.data);
    } catch (err) {
      alert('No employees found for this office code');
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Search Employees by Office Code</h2>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Enter office code"
          value={officeCode}
          onChange={(e) => setOfficeCode(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button
          onClick={fetchEmployees}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && employees.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {employees.map(emp => (
            <div
              key={emp.employeeNumber}
              className="bg-white shadow-md p-4 rounded-lg border"
            >
              <h3 className="text-lg font-bold mb-2">
                {emp.firstName} {emp.lastName}
              </h3>
              <p>Email: {emp.email}</p>
              <p>Job Title: {emp.jobTitle}</p>
              <p>Extension: {emp.extension}</p>
              <p>Office Code: {emp.office?.officeCode || 'N/A'}</p>
              <p>
                Reports To:{' '}
                {emp.manager
                  ? `${emp.manager.firstName} ${emp.manager.lastName}`
                  : 'N/A'}
              </p>
            </div>
          ))}
        </div>
      )}

      {!loading && employees.length === 0 && (
        <p className="text-gray-500">No employees found.</p>
      )}

      <BackButton />
    </div>
  );
}
