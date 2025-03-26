import React, { useContext } from 'react'
import NavbarCSS from '../../style/Navbar.module.css'
import logo from '../../assets/Doctor-Symbol-Caduceus-PNG-Picture.png'
import { MyContext } from '../../utils/ContextApi'
export const UserNavbar = () => {
  const contextData = useContext(MyContext)
  const handleLogOutBtn = () =>{
     contextData.setToken(()=>{
      localStorage.removeItem('token')
       return null
     }
    )
    contextData.setIsAdmin(()=>{
      localStorage.removeItem('isAdmin')
       return null
     }
    )
  }
  return (
    <>
    <div className={NavbarCSS.container}>
    <nav className={NavbarCSS.navbar}>
        <div>
            <img className={NavbarCSS.avatarlogo} src={logo} alt="logo" />
        </div>
      
      <button onClick={handleLogOutBtn} className={NavbarCSS.logoutbtn}>Log Out </button>
     
    </nav>
  
  </div>
    </>
  )
}

