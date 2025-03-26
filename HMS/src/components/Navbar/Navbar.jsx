import React from 'react';
import NavbarCSS from '../../style/Navbar.module.css';
import logo from '../../assets/Doctor-Symbol-Caduceus-PNG-Picture.png';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <>
       
<div className={NavbarCSS.container}>
     
    <nav className={NavbarCSS.navbar}>
    <img className={NavbarCSS.avatarlogo} src={logo} alt="" />
      <section className={NavbarCSS.main}>
        <Link to={'/admin/dashboard/dashboard'} className={({isActive})=>
        {
          isActive ? `${NavbarCSS.active} ${NavbarCSS.navbarlink}` : NavbarCSS.navbarlink
        }}>
          <span className="material-symbols-rounded">
            home
          </span>
          <span>
            Dashboard
          </span>
         
        </Link>
        <Link to='/admin/profile' className={({isActive})=>
        {
          isActive ? `${NavbarCSS.active} ${NavbarCSS.navbarlink}` : NavbarCSS.navbarlink
        }}>
          <span className="material-symbols-rounded">
            person
          </span>
          <span>
            Profile
          </span>
         
        </Link>
        <Link to='/admin/patients' className={({isActive})=>
        {
          isActive ? `${NavbarCSS.active} ${NavbarCSS.navbarlink}` : NavbarCSS.navbarlink
        }}>
          <span className="material-symbols-rounded">
            article
          </span>
          <span>
            Patients Data
          </span>
          
        </Link>
        

      </section>
     
      <section className={NavbarCSS.profile}>
        <img  className={NavbarCSS.avatar} src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="avatar" />
       
      </section>
      <hr/>
    </nav>
  
  </div>
        
    </>
  )
}
