import React, {useState} from 'react'


function Home({authStatus}) {
    
  return (
    <div className='flex justify-center items-center h-full'>
      {
        authStatus?
        <div>

        </div>
        :
        <div className='text-3xl'>
            Login to ViiTube to watch content
        </div>
      }
    </div>
  )
}

export default Home
