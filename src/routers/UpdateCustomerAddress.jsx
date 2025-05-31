import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import BackButton from '../components/BackButton'
import {fetchCustomer} from '../components/FetchCustomer'
import { updateCustomer } from '../components/UpdateCustomer'


const schema = Yup.object().shape({
  addressLine1: Yup.string().required("Address 1 is required"),
  addressLine2: Yup.string()
});

export default function UpdateCustomerAddress() {
    const BASE_URL = import.meta.env.VITE_API_URL;
  const [customerNumber, setCustomerNumber] = useState('');
  const [isFetched, setIsFetched] = useState(false);


  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });


  const onSubmit = async (formData) => {
   updateCustomer({
     url: `${BASE_URL}/api/v1/customer/updateAddress/${customerNumber}`,
         data: formData,
         onSuccess: ()=> {
          alert("Customer Details updated successfully");
          reset();
          setIsFetched(false);
         },
         onError: ()=>{
          alert("Error found",errors.message);
          setIsFetched(true);
         }
   })
  }

  return (
    <div>
      <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Update Customer Address</h2>

        <div className="mb-4">
          <label className="block font-medium mb-1">Customer Number</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={customerNumber}
            onChange={(e) => setCustomerNumber(e.target.value)}
          />
          <button
            onClick={()=>fetchCustomer({
             url:`${BASE_URL}/customer/${customerNumber}`,
             schema,
             setValue,
             onSuccess:() => setIsFetched(true),
             onError:()=> setIsFetched(false)
            })}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Fetch Customer
          </button>
        </div>
      { isFetched &&
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <label className="block font-medium mb-1">Address Line 1</label>
            <input
              type="text"
              {...register("addressLine1")}
              className="w-full border rounded p-2"
            />
            {errors.addressLine1 && (
              <p className="text-red-600 text-sm">{errors.addressLine1.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Address Line 2</label>
            <input
              type="text"
              {...register("addressLine2")}
              className="w-full border rounded p-2"
            />
            {errors.addressLine2 && (
              <p className="text-red-600 text-sm">{errors.addressLine2.message}</p>
            )}
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" >
            Submit
          </button>
        </form>
  }  </div>
        <BackButton/>
    </div>
  )
}
