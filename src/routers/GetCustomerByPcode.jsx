import React, { useState } from 'react';

export default function GetCustomerByPcode() {
  const [postalCode, setPostalCode] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
      const BASE_URL = import.meta.env.VITE_API_URL;
    if (!postalCode.trim()) {
      alert("Please enter a postal code");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/customer/postal_code/${postalCode}`);
      if (!res.ok) throw new Error("Failed to fetch customers");
      const data = await res.json();
      setCustomers(data);
    } catch (error) {
      alert("Error fetching customers: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Get Customers by Postal Code</h2>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="Enter Postal Code"
          className="p-2 border border-gray-300 rounded-md w-48"
        />
        <button
          onClick={fetchCustomers}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && customers.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {customers.map((cust) => (
            <div key={cust.customerNumber} className="bg-white rounded-xl shadow p-4">
              <h3 className="text-lg font-semibold text-blue-600">{cust.customerName}</h3>
              <p>Contact: {cust.contactFirstName} {cust.contactLastName}</p>
              <p>Phone: {cust.phone}</p>
              <p>Address: {cust.addressLine1}{cust.addressLine2 ? `, ${cust.addressLine2}` : ''}</p>
              <p>{cust.city}, {cust.state} - {cust.postalcode}</p>
              <p>Country: {cust.country}</p>
              <p>Credit Limit: ${cust.creditLimit}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && postalCode && customers.length === 0 && (
        <p>No customers found for postal code: {postalCode}</p>
      )}
    </div>
  );
}
