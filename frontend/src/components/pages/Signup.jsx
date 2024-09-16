import React, {useRef, useState} from 'react';
import { useForm } from 'react-hook-form';
import ViiTubeTheme from '../../utils/ViiTubeTheme';

const Signup = ({darkMode}) => {
  const[avatar, setAvatar] = useState("")
  const[coverImage, setCoverImage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission (send data to the server)
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
    document.getElementById("avatarInput").click()
  }
  const handleCoverImageUpload = ()=>{
    document.getElementById("coverImageInput").click()
  }

  
  return (
    <div className='w-full h-full '>

    <div className={`${darkMode?"bg-customDark text-customWhite":"bg-customLight text-customBlack"} max-w-md mx-auto mt-10 border overflow-hidden rounded-xl`}>

      <form onSubmit={handleSubmit(onSubmit)} className='relative border flex flex-col items-center rounded-xl'>
        
      <h2 className={`${darkMode?"bg-customDark text-customWhite":"bg-customLight text-customBlack"}  absolute font-bold text-center w-fit text-3xl border px-5 py-1 rounded-b-lg z-30`}>SIGNUP</h2>
        <div className={`h-40 mb-11 border-b-2 w-full bg-cover bg-center bg-no-repeat bg-gray-500`} style={{ backgroundImage: `url(${coverImage})`  }}>
        <input
              type="file"
              id="coverImageInput"
              name="coverImage"
              accept="image/*"
              className='w-full h-full content-center border-2 hidden'
              onChange={handleCoverImageChange}
              
            />
            {errors.coverImage && <p className="text-red-500 text-sm">{errors.coverImage.message}</p>}

            

            <div className='relative  top-0 bg-white/20 flex flex-col items-end  p-2 w-full h-full  justify-end  opacity-0 hover:opacity-100 duration-300' onClick={handleCoverImageUpload}>  
                <div className=' flex flex-col justify-center items-center  '>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-fit text-center">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                  </svg>
                  <span className='text-sm w-fit font-bold'>COVER IMAGE</span>
                </div>
              </div>
        </div>
        <div className='h-32 absolute w-32 rounded-full top-16 left-1/3 translate-x-3 z-50 bg-slate-400 border-gray-800 border-2 bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${avatar})`  }}   >
 
              <input
              type="file"
              id="avatarInput"
              name="avatar"
              accept="image/*"
              className={`w-full h-full content-center rounded-full border-2 hidden`}
              onChange={handleAvatarChange}
              {...register('avatar', {
                required: 'Avatar is required',
              })}
            />
            {errors.avatar && <div className="border-red-500 text-red-800 border-2 text-sm flex items-center justify-center  rounded-full h-full w-full ">Avatar is required </div>}

            

            <div className='absolute top-0 rounded-full flex flex-col bg-white/20  w-full h-full  justify-center items-center opacity-0 hover:opacity-100 duration-300' onClick={handleAvatarUpload}>  
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
            className="border p-2 w-full rounded-md"
            placeholder='Full Name'
            {...register('fullName', {
              required: 'Full name is required',
            })}
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
        </div>

        {/* Username */}
        <div className="mb-4 p-2 w-full">
          {/* <label className="block text-sm font-medium mb-1">Username</label> */}
          <input
            type="text"
            className="border p-2 w-full"
            placeholder='Username'
            {...register('userName', {
              required: 'Username is required',
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: 'Username must contain only letters, numbers, and underscores',
              },
            })}
          />
          {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
        </div>

        {/* Email */}
        <div className="mb-4 p-2 w-full">
          {/* <label className="block text-sm font-medium mb-1">Email</label> */}
          <input
            type="email"
            className="border p-2 w-full"
            placeholder='Email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-4 p-2 w-full">
          {/* <label className="block text-sm font-medium mb-1">Password</label> */}
          <input
            type="password"
            className="border p-2 w-full"
            placeholder='Password'
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className="mb-4 p-2 w-full">
          {/* <label className="block text-sm font-medium mb-1">Password</label> */}
          <input
            type="password"
            className="border p-2 w-full"
            placeholder='Confirm Password'
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 text-xl rounded w-full"
        >
          Register
        </button>
      </form>
    </div>
    </div>
  );
};

export default ViiTubeTheme(Signup);
