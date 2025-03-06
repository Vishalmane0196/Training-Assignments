import React from 'react'
import { Outlet } from 'react-router'

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
