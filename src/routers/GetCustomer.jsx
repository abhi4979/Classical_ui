import React, { useEffect, useState } from 'react'

function GetCustomer() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [customer,setCustomer]=useState([]);

  useEffect(()=>{
    try{
   const fetchdata= async ()=>{
    const respond= await fetch(`${BASE_URL}/customer/all`);
    const data=await respond.json();
    setCustomer(data);
   }

    fetchdata();
  }catch(error){
    alert("Error Found",error);
  }
  },[])

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

        <h2 className="text-2xl font-bold mb-4">Customer List</h2>
           {customer.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {customer.map((cust) => (
            <div key={cust.customerNumber} className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-all">
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
        <p className="text-gray-600 text-center mt-10">Loading data...</p>
      )}
    </div>
  );
}
  

export default GetCustomer