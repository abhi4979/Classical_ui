import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import BackButton from '../components/BackButton';
import {fetchCustomer} from '../components/FetchCustomer';
import { updateCustomer } from '../components/UpdateCustomer';

// Validation schema
const schema = Yup.object().shape({
  customerName: Yup.string().required('Customer Name is required'),
  contactFirstName: Yup.string().required('First name is required'),
   contactLastName: "",
  phone: Yup.string().matches(/^[0-9]{10}$/, 'Enter a valid 10-digit phone number'),
  addressLine1: Yup.string().required('Address1 is required'),
  addressLine2: "",
  city:Yup.string().required("City is required"),
  state: Yup.string().required('State is required'),
  postalcode: Yup.string().required('Postal code is required'),
  country: Yup.string().required('Country is required'),
  creditLimit: Yup.number().positive('Must be positive').required('Credit limit is required'),
  salesRepEmployeeNumber: Yup.number().typeError('Must be a number').required('Sales rep number is required'),
});

export default function UpdateCustomerByCustomerNumber() {
  const [customerNumber, setCustomerNumber] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Submit form data
  const onSubmit = async (formData) => {
       updateCustomer({
         url: `http://localhost:8099/api/v1/customer/update/${customerNumber}`,
         data: formData,
         onSuccess: ()=> {
          alert("Customer Details updated successfully");
          reset();
         },
         onError: ()=>{
          alert("Error found",errors.message)
         }
       })
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Update Customer</h2>

      {/* Customer Number Input */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Customer Number</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={customerNumber}
          onChange={(e) => setCustomerNumber(e.target.value)}
        />
        <button
         onClick={() => fetchCustomer({
          url: `http://localhost:8099/api/v1/customer/${customerNumber}`,
         schema,
         setValue
        })}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Fetch Customer
        </button>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {[
          { label: 'Customer Name', name: 'customerName' },
          { label: 'Contact First Name', name: 'contactFirstName' },
            { label: 'Contact Last Name', name: 'contactLastName' },
          { label: 'Phone', name: 'phone' },
          { label: 'Address Line 1', name: 'addressLine1' },
          { label: 'Address Line 2', name: 'addressLine2' },
          { label: 'City', name: 'city' },
          { label: 'State', name: 'state' },
          { label: 'Postal Code', name: 'postalcode' },
          { label: 'Country', name: 'country' },
          { label: 'Credit Limit', name: 'creditLimit', type: 'number' },
          { label: 'Sales Rep Employee Number', name: 'salesRepEmployeeNumber', type: 'number' }
        ].map(({ label, name, type = 'text' }) => (
          <div key={name}>
            <label className="block font-medium mb-1">{label}</label>
            <input
              type={type}
              {...register(name)}
              className="w-full border rounded p-2"
            />
            {errors[name] && <p className="text-red-600 text-sm">{errors[name].message}</p>}
          </div>
        ))}

        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Update Customer
        </button>
      </form>

      <BackButton />
    </div>
  );
}
