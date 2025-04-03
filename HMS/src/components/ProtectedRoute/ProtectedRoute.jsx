import React, { useContext, useEffect } from 'react';
import { MyContext } from '../../utils/ContextApi';
import {  useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthProtected';

export const ProtectedRoute = ({ children, isAdminProp }) => {
    const navigate = useNavigate();
    const contextData = useContext(MyContext);
    const authContextApi = useContext(AuthContext);
   
    useEffect(() => {
        if (!contextData.token) {
            
           navigate('/account/user/login'); 
           
        } else if (contextData.token &&(parseInt(authContextApi.isAdmin) !== parseInt(isAdminProp))) {
           if(
            parseInt(authContextApi.isAdmin) == 1
           ){
            navigate('/admin/dashboard')
            }else{
             navigate('/user/dashboard/profile')
 
           } 
        }
    }, [contextData.token, authContextApi.isAdmin, isAdminProp, navigate]);

    
 
    return children;
};
