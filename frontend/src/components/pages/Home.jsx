import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

function Home() {
  const navigate = useNavigate()
  const authStatus = useSelector(state => state.auth.status)
  console.log(authStatus);

  return (
    <div className='flex justify-center items-center h-full'>
      {
        authStatus?
        <div className='text-3xl'>
            Welcome to Viitube
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
