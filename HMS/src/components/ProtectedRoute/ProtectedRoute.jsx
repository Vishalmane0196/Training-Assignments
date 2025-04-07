import React, {useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children, isAdminProp }) => {
    const navigate = useNavigate();
    const { token,
        isAdmin,
        isDoctor } = useSelector(state=>state.auth);
   
    useEffect(() => {
        if (!token) {
            
           navigate('/account/user/login'); 
           
        } else if (token && (parseInt(isAdmin) !== parseInt(isAdminProp))) {
           
           if(
            parseInt(isAdmin) == 1
           ){
            navigate('/admin/dashboard/profile')
            }else{
             navigate('/user/dashboard/profile')
 
           } 
        }
    }, [token, isAdmin, isAdminProp, navigate]);

    
 
    return children;
};
