import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';

export default function GetAllEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    try {
      const res = await axios.get(`${BASE_URL}/employees/all`);
      setEmployees(res.data);
    } catch (err) {
      alert('Error fetching employee data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Employees</h2>
      <BackButton />

      {loading ? (
        <p>Loading...</p>
      ) : employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
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
  <p>Office Code: {emp.office ? emp.office.officeCode : 'N/A'}</p>
  <p>Office City: {emp.office ? emp.office.city : 'N/A'}</p>
  <p>Extension: {emp.extension}</p>
  <p>
    Reports To: {emp.manager ? `${emp.manager.firstName} ${emp.manager.lastName}` : 'N/A'}
  </p>
</div>

          ))}
        </div>
      )}
    </div>
  );
}
