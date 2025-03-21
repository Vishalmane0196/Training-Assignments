import React, { useContext, useEffect } from 'react'
import { MyContext } from '../../utils/ContextApi'
import { Dashboard } from '../Dashboard/Dashboard';
import { UserDashboard } from '../Dashboard/UserDashboard';
import { useNavigate } from 'react-router-dom';
export const ProtectedRoute = () => {
    const navigate =  useNavigate();
    const contextData =  useContext(MyContext);

    
    useEffect(()=>{
        if(!contextData.token) navigate('/account/user/login')
},[contextData.token,navigate])
if (!contextData.token) return null;
  return (
    <>
    {
       contextData.token && contextData.IsAdmin
       ?
       <Dashboard />
       :
       <UserDashboard /> 
      
    }

    </>
  )
}
