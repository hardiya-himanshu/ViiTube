import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";


function Home({authStatus}) {
  const navigate = useNavigate()
    
  return (
    <div className='flex justify-center items-center h-full'>
      {
        authStatus?
        <div>

        </div>
        :
        <div className='text-3xl'>
            <span onClick={()=>navigate("/login")} className='hover:text-blue-500 cursor-pointer'>Login</span>  to watch content
        </div>
      }
    </div>
  )
}

export default Home
