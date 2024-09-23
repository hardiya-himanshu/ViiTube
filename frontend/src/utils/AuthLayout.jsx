import React, {useState } from 'react'
import { useSelector} from 'react-redux'

function AuthLayout(Component) {
  return (props)=>{
    const [loader, setLoader] = useState(false)
    const authStatus = useSelector(state => state.auth.status)
    console.log(authStatus);

  return (
    loader ? <h1>Loading...</h1> :
    <div>
      <Component {...props} authStatus={authStatus}/>
    </div>
  )
}
}

export default AuthLayout
