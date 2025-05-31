import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MapEmployeeToOffice() {
    const BASE_URL = import.meta.env.VITE_API_URL;
  const [employees, setEmployees] = useState([]);
  const [offices, setOffices] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedOffice, setSelectedOffice] = useState('');

  useEffect(() => {
    // Fetch employees
    axios.get( `${BASE_URL}/api/v1/employees/all`)
      .then(res => setEmployees(res.data))
      .catch(() => alert('Failed to fetch employees'));

    // Fetch offices
    axios.get(`${BASE_URL}/offices/get`)
      .then(res => setOffices(res.data))
      .catch(() => alert('Failed to fetch offices'));
  }, []);

  const handleMapping = async () => {
    if (!selectedEmployee || !selectedOffice) {
      alert('Please select both employee and office.');
      return;
    }

    try {
      await axios.put(
        `${BASE_URL}/api/v1/employees/update/${selectedEmployee}/map to office/${selectedOffice}`
      );
      alert('Employee successfully mapped to office!');
    } catch {
      alert('Failed to map employee to office');
    }
  };

  return (
    <div className="p-6 max-w-xl space-y-4">
      <h2 className="text-xl font-bold">Map Employee to Office</h2>

      <div>
        <label className="block font-semibold mb-1">Select Employee:</label>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="">-- Choose Employee --</option>
          {employees.map(emp => (
            <option key={emp.employeeNumber} value={emp.employeeNumber}>
              {emp.firstName} {emp.lastName} (#{emp.employeeNumber})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Select Office:</label>
        <select
          value={selectedOffice}
          onChange={(e) => setSelectedOffice(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="">-- Choose Office --</option>
          {offices.map(office => (
            <option key={office.officeCode} value={office.officeCode}>
              {office.city} (#{office.officeCode})
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleMapping}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Map Employee to Office
      </button>
    </div>
  );
}
