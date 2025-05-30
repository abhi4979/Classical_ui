import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
    const navigate=useNavigate();
  return (
   <>
   <button
        onClick={() => navigate(-1)} // ✅ Back button functionality
        className="bg-gray-400 text-white px-4 py-2 rounded"
      >
        ⬅ Back
      </button>
   </>
  )
}

export default BackButton