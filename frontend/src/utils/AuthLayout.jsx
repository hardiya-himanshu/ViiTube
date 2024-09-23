import React, {useState, useEffect, Children } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

function AuthLayout({Children, auth="true"}) {
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate()
    
    useEffect(() => {

        if(auth && authStatus !== auth){
            navigate("/login")
        } else if(!auth && authStatus !== auth){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, auth])
  return (
    loader ? <h1>Loading...</h1> :
    <>
      {Children}
    </>
  )
}

export default AuthLayout
