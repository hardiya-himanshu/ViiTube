import React, {useRef} from 'react';
import { useForm } from 'react-hook-form';
import ViiTubeTheme from '../../utils/ViiTubeTheme';

const Signup = ({darkMode}) => {
  const[avatar, setAvatar] = ("")
  const avatarInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission (send data to the server)
  };

  const convertToBase64 = (e) =>{
    // console.log(e.target.files[0]);
    // setAvatar(e.target.files[0])
    var reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload=()=>{
      console.log(reader.result);
      setAvatar(reader.result)
    }
    reader.onerror=e=>{
      console.log("Error:", e);
    }
  }

  const handleAvatarUpload = ()=>{
    avatarInputRef.current.click()
  }

  
  return (
    <div className='w-full h-full '>

    <div className={`${darkMode?"bg-customDark text-customWhite":"bg-customLight text-customBlack"} max-w-md mx-auto mt-10 border overflow-hidden rounded-xl`}>

      <form onSubmit={handleSubmit(onSubmit)} className='relative border flex flex-col items-center rounded-xl'>
        
        <h2 className=" absolute font-bold text-center w-fit text-3xl border px-5 py-2 rounded-b-lg">Signup</h2>
        <div className='h-40 mb-11 w-full border-b-2'>

        </div>
        <div className='h-32 absolute w-32 rounded-full border top-16 left-1/3 translate-x-3 z-50 bg-slate-800' style={{ backgroundImage: `url(${avatar?avatar:null})` }}  >
          
          <input
              type="file"
              name="avatar"
              accept="image/*"
              ref={avatarInputRef}
              className='w-full h-full content-center rounded-full border-2 opacity-0'
              onChange={convertToBase64}
              {...register('avatar', {
                required: 'Avatar URL is required',
              })}
            />
            
              <div className='flex flex-col justify-center items-center absolute border left-0 right-0 top-0 bottom-0' onClick={handleAvatarUpload}>  
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                <span className='text-sm'>UPLOAD IMAGE</span>
              </div>
            
          
            {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar.message}</p>}
        </div>

        {/* Full Name */}
        <div className="mb-4 w-full">
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
        <div className="mb-4 w-full">
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
        <div className="mb-4 w-full">
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
        <div className="mb-4 w-full">
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
        <div className="mb-4 w-full">
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

        {/* Avatar */}
        <div className="mb-4 border p-2 w-full text-gray-400 flex ">
          <label className="block text-md font-medium ">Avatar  : </label>
          
        </div>

        {/* Cover Image */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Cover Image (Cloudinary URL)</label>
          <input
            type="text"
            className="border p-2 w-full"
            {...register('coverImage')}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Sign Up
        </button>
      </form>
    </div>
    </div>
  );
};

export default ViiTubeTheme(Signup);
