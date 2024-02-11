import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {auth} from '../Firebase/config'
import { onAuthStateChanged } from 'firebase/auth';

const ProtectedRoutes = ({components}) => {
    // const [isUser , setIsUser] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        onAuthStateChanged(auth , (user) => {
            if(!user) {
                navigate("/login");
                return
            }
            // setIsUser(true);
        })
    } , [])

  return  components 
  
}

export default ProtectedRoutes
