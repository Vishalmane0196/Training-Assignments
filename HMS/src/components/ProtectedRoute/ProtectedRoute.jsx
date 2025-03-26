import React, { useContext, useEffect } from 'react';
import { MyContext } from '../../utils/ContextApi';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthProtected';

export const ProtectedRoute = ({ children, isAdmin }) => {
    const navigate = useNavigate();
    const contextData = useContext(MyContext);
    const AuthContextApi = useContext(AuthContext);
   
    useEffect(() => {
        if (!contextData.token) {
            
           navigate('/account/user/login'); 
           
        } else if (contextData.token &&(parseInt(AuthContextApi.isadmin) !== parseInt(isAdmin))) {
           if(
            parseInt(AuthContextApi.isadmin) == 1
           ){
            navigate('/admin/dashboard')
            }else{
             navigate('/user/dashboard/profile')
 
           } 
        }
    }, [contextData.token, AuthContextApi.isadmin, isAdmin, navigate]);

    
    console.log("contextadmin",AuthContextApi.isadmin,"protected",isAdmin);
    console.log("i am here");
    return children;
};
