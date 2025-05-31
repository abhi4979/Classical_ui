import React, { useState } from 'react';

export default function GetCustomerByContactLastName() {
  const [lastname, setLastname] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    if (!lastname.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/v1/customer/customer_lastname/${lastname}`);
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching customers by last name.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Search Customers by Last Name</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Enter last name"
          className="p-2 border border-gray-300 rounded-md w-64"
        />
        <button
          onClick={fetchCustomers}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600 mt-4">Loading...</p>
      ) : customers.length > 0 ? (
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

              {cust.salesRepEmployeeNumber && (
                <div className="mt-3 border-t pt-2 text-sm text-gray-700">
                  <p className="font-semibold">Sales Rep Info:</p>
                  <p>{cust.salesRepEmployeeNumber.firstName} {cust.salesRepEmployeeNumber.lastName}</p>
                  <p>{cust.salesRepEmployeeNumber.email}</p>
                  <p>{cust.salesRepEmployeeNumber.jobTitle}</p>
                  <p>🏢 Office: {cust.salesRepEmployeeNumber.office?.city}, {cust.salesRepEmployeeNumber.office?.state}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        lastname && <p className="text-gray-600 mt-4">No customers found.</p>
      )}
    </div>
  );
}
2