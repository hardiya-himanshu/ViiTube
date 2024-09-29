import React, {useRef, useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import ViiTubeTheme from '../../utils/ViiTubeTheme';
import {VIITUBE_SERVER} from '../../utils/Constants';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Signup = ({darkMode}) => {
  const navigate = useNavigate()

  const[avatar, setAvatar] = useState("")
  const[coverImage, setCoverImage] = useState("")

  const coverImageInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    console.log(data);
    const formData = new FormData();

    formData.append('fullName', data.fullName);
    formData.append('userName', data.userName);
    formData.append('email', data.email);
    formData.append('password', data.password);
    
    // Append files (avatar and coverImage if they exist)
    if (avatarInputRef.current.files[0]) {
      formData.append('avatar', avatarInputRef.current.files[0]);
    }

    if (coverImageInputRef.current.files[0]) {
      formData.append('coverImage', coverImageInputRef.current.files[0]);
    }
    console.log(formData);
    
    try {
      const response = await axios.post(`${VIITUBE_SERVER}/users/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("done");
      
      if (response.status === 200) {
        console.log('Success:', response.data);
        navigate("/login")
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
    
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };
  const handleAvatarUpload = ()=>{
    avatarInputRef.current.click()
  }
  const handleCoverImageUpload = ()=>{
    coverImageInputRef.current.click()
  }

  
  return (
    <div className='w-full h-full '>

    <div className={`${darkMode?"bg-customDark text-customWhite":"bg-customLight text-customBlack"} max-w-md mx-auto mt-10 overflow-hidden rounded-xl p-1 `}>

      <form onSubmit={handleSubmit(onSubmit)} className=' relative flex flex-col items-center rounded-xl'>
        
      <h2 className={`${darkMode?"bg-customDark text-customWhite":"bg-customLight text-customBlack"}  absolute font-bold text-center w-fit text-3xl  px-5 py-1 rounded-b-lg z-30 `}>SIGNUP</h2>
        <div className={`rounded-t-md h-40 mb-11 border-b-2 w-full bg-cover bg-center bg-no-repeat bg-gray-500`} style={{ backgroundImage: `url(${coverImage})`  }}>
                          
            <Controller
              name="coverImage"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="file"
                  id="coverImageInput"
                  accept="image/*"
                  className="hidden w-full h-full content-center border-2"
                  onChange={(e) => {
                    field.onChange(e); // Integrate with React Hook Form
                    handleCoverImageChange(e);
                    console.log(e);
                    
                  }}
                  ref={coverImageInputRef} // Attach ref to the file input
                />
              )}
            />
            {errors.coverImage && <div className="text-red-500 h-full w-full rounded-full border-2 border-red-500 text-sm"></div>}

            

            <div className='relative  top-0 bg-white/20 flex flex-col items-end  p-2 w-full h-full  justify-end  opacity-0 hover:opacity-100 duration-300' onClick={handleCoverImageUpload}>  
                <div className=' flex flex-col justify-center items-center  '>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-fit text-center">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                  </svg>
                  <span className='text-sm w-fit font-bold'>COVER IMAGE</span>
                </div>
              </div>
        </div>
        <div className='h-32 absolute w-32 rounded-full top-16 left-1/3 translate-x-3 z-50 bg-slate-400 border-gray-800 border bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${avatar})`  }}   >
 
            <Controller
                name="avatar"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="file"
                    id="avatarInput"
                    accept="image/*"
                    className="w-full h-full content-center rounded-full border-2 hidden"
                    onChange={(e) => {
                      field.onChange(e); // Integrate with React Hook Form
                      handleAvatarChange(e);
                    }}
                    ref={avatarInputRef} 
                    
                  />
                )}
              />
            {/* {errors.avatar && <div className="border-red-500 duration-150 shadow-sm shadow-red-500 text-red-800 border-2 text-sm flex items-center justify-center  rounded-full h-full w-full ">Avatar is required </div>} */}

            

            <div className='absolute top-0 rounded-full flex flex-col bg-white/60  w-full h-full  justify-center items-center opacity-0 hover:opacity-100 duration-300' onClick={handleAvatarUpload}>  
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                <span className='text-sm font-bold'>AVATAR</span>
              </div>
        </div>

        
        {/* Full Name */}
        <div className="mb-4 p-2 w-full">
          <input
            type="text"
            className={`outline-none border-b placeholder:text-gray-600 ${darkMode?"border-white":"border-gray-500"} p-2 w-full bg-transparent`}
            placeholder='Full Name'
            {...register('fullName', {
              required: 'Full name is required',
            })}
          />
          {errors.fullName && <div className="border border-red-500 duration-150 shadow-sm shadow-red-500 h-full w-full"></div>}
        </div>

        {/* Username */}
        <div className="mb-4 p-2 w-full">
          {/* <label className="block text-sm font-medium mb-1">Username</label> */}
          <input
            type="text"
            className={`outline-none border-b placeholder:text-gray-600 ${darkMode?"border-white":"border-gray-500"} p-2 w-full bg-transparent`}
            placeholder='Username'
            {...register('userName', {
              required: 'Username is required',
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: 'Username must contain only letters, numbers, and underscores',
              },
            })}
          />
          {errors.userName &&  <div className="border border-red-500 duration-150 shadow-sm shadow-red-500 h-full w-full"></div>}
        </div>

        {/* Email */}
        <div className="mb-4 p-2 w-full">
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

        {/* Confirm Password */}
        <div className="mb-4 p-2 w-full">
          {/* <label className="block text-sm font-medium mb-1">Password</label> */}
          <input
            type="password"
            className={`outline-none border-b placeholder:text-gray-600 ${darkMode?"border-white":"border-gray-500"} p-2 w-full bg-transparent`}
            placeholder='Confirm Password'
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
          Register
        </button>
      </form>
    </div>
    </div>
  );
};

export default ViiTubeTheme(Signup);
