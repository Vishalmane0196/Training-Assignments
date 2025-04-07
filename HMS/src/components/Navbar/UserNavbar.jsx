import React from 'react'
import navbarCSS from '../../style/Navbar.module.css'
import logo from '../../assets/Doctor-Symbol-Caduceus-PNG-Picture.png'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authentication/authSlice';
export const UserNavbar = () => {
  const dispatch = useDispatch();

  const handleLogOutBtn = () =>{
       dispatch(logout());
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

