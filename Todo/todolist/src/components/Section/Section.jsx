import React from 'react'
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'

export default function Section() {
    return (
        <>
            
                <div className="outer">
                     
                      <Outlet/> 
                      {/* {FormListCOver  and  DashBoard} */}
                </div>
        
        </>
    )
}
