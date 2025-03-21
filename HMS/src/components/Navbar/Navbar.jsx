import React from 'react'
import NavbarCSS from '../../style/Navbar.module.css'

export const Navbar = () => {
  return (
    <>
       
<div class={NavbarCSS.container}>
    <nav class={NavbarCSS.navbar}>
      <section class={NavbarCSS.main}>
        <div class={NavbarCSS.navitem}>
          <span class="material-symbols-rounded">
            home
          </span>
          <span>
            Dashboard
          </span>
         
        </div>
        <div class={NavbarCSS.navitem}>
          <span class="material-symbols-rounded">
            person
          </span>
          <span>
            Profile
          </span>
         
        </div>
        <div class={NavbarCSS.navitem}>
          <span class="material-symbols-rounded">
            article
          </span>
          <span>
            Patients Data
          </span>
          
        </div>
        

      </section>
     
      <section class={NavbarCSS.profile}>
        <img  className={NavbarCSS.avatar} src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="avatar" />
       
      </section>
      <hr/>
    </nav>
  
  </div>
        
    </>
  )
}
