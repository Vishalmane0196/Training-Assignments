import React from 'react'
import { Outlet } from 'react-router-dom'

export const Allpatient = () => {
  return (
    <div style={{padding:"2rem"}}>
        <h1 style={{   
            fontWeight:600,
            margin:0,
            marginBottom:'1.5rem',
            paddingLeft:'9px'
  }}> Patient Profile</h1>
        <Outlet/>
    </div>
  )
}
