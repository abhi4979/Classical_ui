import React, { useState } from 'react';

export default function GetCustomerByOfficecode() {
  const [officeCode, setOfficeCode] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
    if (!officeCode.trim()) {
      alert("Please enter an office code");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8099/api/v1/customer/office/${officeCode}`);
      if (!response.ok) throw new Error("Failed to fetch customers");
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      alert("Error fetching customers: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Get Customers by Office Code</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={officeCode}
          onChange={(e) => setOfficeCode(e.target.value)}
          placeholder="Enter Office Code"
          className="p-2 border border-gray-300 rounded-md w-48"
        />
        <button
          onClick={fetchCustomers}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-600">Loading...</p>}

      {!loading && customers.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {customers.map((cust) => (
            <div key={cust.customerNumber} className="bg-white rounded-xl shadow p-4">
              <h3 className="text-lg font-semibold text-blue-600">{cust.customerName}</h3>
              <p className="text-sm text-gray-600">Contact: {cust.contactFirstName} {cust.contactLastName}</p>
              <p className="text-sm">📞 {cust.phone}</p>
              <p className="text-sm">🏠 {cust.addressLine1}{cust.addressLine2 ? `, ${cust.addressLine2}` : ''}</p>
              <p className="text-sm">{cust.city}, {cust.state} - {cust.postalcode}</p>
              <p className="text-sm">🌍 {cust.country}</p>
              <p className="text-sm font-medium text-green-700">💰 Credit Limit: ${cust.creditLimit}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && officeCode && customers.length === 0 && (
        <p className="text-gray-600 mt-4">No customers found for office code: {officeCode}</p>
      )}
    </div>
  );
}
