import React, { useContext } from 'react'
import { Data } from '../../App'
import { Navigate } from 'react-router';
export const ProtectedComponent = ({ component }) => {
    let data = useContext(Data);
    if (!data.token) {
        return <Navigate to='/login' />
    }
    else {
        return component
    }

}
