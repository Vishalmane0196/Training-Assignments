import React from 'react'
import UserDashboardCSS from '../../style/Userdashboard.module.css'
export const UserProfile = () => {
  return (
    <>
                <section className={UserDashboardCSS.section}>
                <h3>Profile</h3>
                <div className={UserDashboardCSS.line}></div>
                <p>Changing your username can have <a href="#">unintended side effects.</a></p>
                <button className={UserDashboardCSS.btn}>Edit Profile</button>
            </section>
    </>
  )
}
