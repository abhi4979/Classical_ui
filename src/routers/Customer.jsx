import React from 'react';
import { Link } from 'react-router-dom';
import App from '../App';


function Customer() {
  const links = [
    { path: "/addcustomer", label: "➕ Add Customer" },
    { path: "/getcustomer", label: "📋 Get Customer" },
    { path: "/getbyfirstname", label: "🔍 Get Customer By First Name" },
    { path: "/getbylastname", label: "🔍 Get Customer By Last Name" },
    { path: "/greaterthancreditlimit", label: "💰 Greater Than Credit Limit" },
    { path: "/lessthancreditlimit", label: "💸 Lesser Than Credit Limit" },
    { path: "/getbyofficecode", label: "🏢 Get Customer By Office Code" },
    { path: "/getcustomerbycreditrange", label: "📊 Get By Credit Range" },
    { path: "/getcustomerbypostalcode", label: "📮 Get By Postal Code" },
    { path: "/updatecustomername", label: "✏️ Update Customer Name" },
    { path: "/updatecustomeraddress", label: "🏠 Update Customer Address" },
    { path: "/updatecustomerfirstname", label: "✏️ Update First Name" },
    { path: "/updatecustomerlastname", label: "✏️ Update Last Name" },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1350&q=80')",
      }}
    >
      <div className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-md w-full border border-white/40">
        <h2 className="text-3xl font-bold text-white text-center mb-6">📂 Customer Operations</h2>
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
      </div>
    </div>
  );
}

export default App;
