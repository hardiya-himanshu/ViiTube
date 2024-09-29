import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import ViiTubeTheme from '../../utils/ViiTubeTheme';
import '../../css/BlurAnimatedBg.css'
import {VIITUBE_SERVER} from '../../utils/Constants';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';

const Login = ({darkMode}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    try {
      const response = await axios.post(`${VIITUBE_SERVER}/users/login`, {
        email:data.email,
        password:data.password
      });
      
      if (response.status === 200) {
        console.log('Success:', response.data);
        dispatch(login(response.data))
        navigate("/")
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  
  return (
    <div className='w-full'>
    <div className={`${darkMode?"bg-customDark text-customWhite":"bg-customLight text-customBlack"} max-w-md mx-auto mt-10 overflow-hidden rounded-xl p-1`}>

      <form onSubmit={handleSubmit(onSubmit)} className=' relative flex flex-col items-center rounded-xl'>
        
      <h2 className={`${darkMode?"bg-customDark text-customWhite":"bg-customLight text-customBlack"}  absolute font-bold text-center w-fit text-3xl  px-5 py-1 rounded-b-lg z-30`}>LOGIN</h2>
        
        <div className='h-40 relative w-full bg-[url("/login-bg.jpg")] bg-cover bg-center rounded-t-lg bg-gray-700 border-2'></div>

        {/* Email */}
        <div className="mb-4 mt-4 p-2 w-full">
          {/* <label className="block text-sm font-medium mb-1">Email</label> */}
          <input
            type="email"
            className={`outline-none border-b placeholder:text-gray-600 ${darkMode?"border-white":"border-gray-500"} p-2 w-full bg-transparent`}
            placeholder='Email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <div className="border border-red-500 duration-150 shadow-sm shadow-red-500 h-full w-full"></div>}
        </div>

        {/* Password */}
        <div className="mb-4 p-2 w-full">
          {/* <label className="block text-sm font-medium mb-1">Password</label> */}
          <input
            type="password"
            className={`outline-none border-b placeholder:text-gray-600 ${darkMode?"border-white":"border-gray-500"} p-2 w-full bg-transparent`}
            placeholder='Password'
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
          />
          {errors.password &&  <div className="border border-red-500 duration-150 shadow-sm shadow-red-500 h-full w-full"></div>}
          {errors.password &&  <p className=" text-red-500 duration-150 ">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-700 text-white mt-4 p-2 text-xl rounded-lg w-full"
        >
          Login
        </button>
      </form>
    </div>
    </div>
  );
};

export default ViiTubeTheme(Login);
