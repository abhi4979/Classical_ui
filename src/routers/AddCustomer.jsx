import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup"
import axios from 'axios'
import BackButton from '../components/BackButton'



 const schema=Yup.object().shape({
    customerName:Yup.string().required(),
    contactFirstName:Yup.string().required(),
    phone:Yup.string().matches(/^[0-9]{10}$/,"Please enter the correct mobile number"),
    addressLine1:Yup.string().required(),
    state:Yup.string().required(),
    postalcode:Yup.string().required(),
    country:Yup.string().required(),
    creditLimit:Yup.number().positive().required()
  })



export default function AddCustomer() {

 


  const {
    register,
    handleSubmit,
    reset,
    formState: {errors}
  }=useForm({resolver: yupResolver(schema)});

 const BASE_URL = import.meta.env.VITE_API_URL;
  const onSubmit= async (data)=>{
     try{
     await axios.post(`${BASE_URL}/api/v1/customer/add`,data);
     alert("Customer's details added successfully");
     reset()
     }catch(err){
        alert("Error adding customer")
     }
  }



  return (
    
    <div className="p-6 space-y-4">
     

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {[
          "customerName", "contactLastName", "contactFirstName", "phone",
          "addressLine1", "addressLine2", "city", "state",
          "postalcode", "country", "salesRepEmployeeNumber", "creditLimit"
        ].map((field) => (
          <div key={field}>
            <input
              {...register(field)}
              placeholder={field.replace(/([A-Z])/g, " $1")}
              className="block border p-2 w-full"
            />
            <p className="text-red-500 text-sm">{errors[field]?.message}</p>
          </div>
        ))}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
       <BackButton />
    </div>
  );
}