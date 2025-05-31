import React, { useState } from 'react';

export default function GetCustomerByRange() {
  const [minLimit, setMinLimit] = useState('');
  const [maxLimit, setMaxLimit] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setSearchTriggered(true);
    try {
      const BASE_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(
        `${BASE_URL}/api/v1/customer/credit_range/${minLimit}/${maxLimit}`
      );
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      alert("Error fetching customers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-4 flex gap-2">
        <input
          type="number"
          placeholder="Min Limit"
          value={minLimit}
          onChange={(e) => setMinLimit(e.target.value)}
          className="border px-3 py-2 rounded w-40"
        />
        <input
          type="number"
          placeholder="Max Limit"
          value={maxLimit}
          onChange={(e) => setMaxLimit(e.target.value)}
          className="border px-3 py-2 rounded w-40"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-700">Loading...</p>}

      {!loading && searchTriggered && customers.length === 0 && (
        <p className="text-red-500 font-semibold">
          No customers found within credit limit range {minLimit} - {maxLimit}
        </p>
      )}

      {!loading && customers.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {customers.map((cust) => (
            <div
              key={cust.customerNumber}
              className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-all"
            >
              <h3 className="text-lg font-semibold text-blue-600">{cust.customerName}</h3>
              <p className="text-sm text-gray-600">
                Contact: {cust.contactFirstName} {cust.contactLastName}
              </p>
              <p className="text-sm">📞 {cust.phone}</p>
              <p className="text-sm">
                🏠 {cust.addressLine1}
                {cust.addressLine2 ? `, ${cust.addressLine2}` : ''}
              </p>
              <p className="text-sm">
                {cust.city}, {cust.state} - {cust.postalcode}
              </p>
              <p className="text-sm">🌍 {cust.country}</p>
              <p className="text-sm font-medium text-green-700">
                💰 Credit Limit: ${cust.creditLimit}
              </p>

              {cust.salesRepEmployeeNumber && (
                <div className="mt-3 border-t pt-2 text-sm text-gray-700">
                  <p className="font-semibold">Sales Rep Info:</p>
                  <p>
                    {cust.salesRepEmployeeNumber.firstName}{' '}
                    {cust.salesRepEmployeeNumber.lastName}
                  </p>
                  <p>{cust.salesRepEmployeeNumber.email}</p>
                  <p>{cust.salesRepEmployeeNumber.jobTitle}</p>
                  <p>
                    🏢 Office:{' '}
                    {cust.salesRepEmployeeNumber.office?.city},{' '}
                    {cust.salesRepEmployeeNumber.office?.state}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
