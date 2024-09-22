import React, {useState} from 'react'
import { useDispatch, useSelector} from 'react-redux'


function Home() {
  const [loader, setLoader] = useState(true)
  const authStatus = useSelector(state => state.auth.status)
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
