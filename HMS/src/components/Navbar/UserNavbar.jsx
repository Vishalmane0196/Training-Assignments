import React, { useContext } from 'react'
import navbarCSS from '../../style/Navbar.module.css'
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
    <div className={navbarCSS.container}>
    <nav className={navbarCSS.navbar}>
        <div>
            <img className={navbarCSS.avatarLogo} src={logo} alt="logo" />
        </div>
      
      <button onClick={handleLogOutBtn} className={navbarCSS.logoutBtn}>Log Out </button>
     
    </nav>
  
  </div>
    </>
  )
}

