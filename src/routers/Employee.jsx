import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

function Employee() {
  
  const links = [
    { path: "/addemployee", label: "➕ Add Employee" },
    { path: "/getallemployee", label: "📋 Get All Employees" },
    { path: "/getemployeebycity", label: "🌆 Get Employees By City" },
    { path: "/getemployeesbyid", label: "🆔 Get Employee By ID" },
    { path: "/getemployeesbyofficecode", label: "🏢 Get Employees By Office Code" },
    { path: "/deleteemployee", label: "❌ Delete Employee" },
    {path:"/updateemployee", label: "Update Employee"},
    {path:"/updaterole",label:"Update Employee Role"},
    {path:"/updateemployeereporting",label:"Update Employee Reporting Manager"},
    {path:"/updateemployeeofficedetails",label:"Update Employee Office Code"}
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1497294815431-9365093b7331?auto=format&fit=crop&w=1350&q=80')",
      }}
    >
      <div className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-md w-full border border-white/40">
        <h2 className="text-3xl font-bold text-white text-center mb-6">👨‍💼 Employee Operations</h2>
        <div className="space-y-3">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="block w-full text-center bg-white/80 hover:bg-white text-blue-800 font-semibold py-2 rounded-lg shadow transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
          <BackButton/>
      </div>
    
    </div>
  );
}

export default Employee;
