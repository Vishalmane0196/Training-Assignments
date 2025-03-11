import React, { useContext, useState } from 'react'
import profil from '../../assets/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg'
import { NavLink } from 'react-router'
import profilimage from '../../assets/IMG20240425145501.jpg'
import { Data } from '../../App';
export default function Navbar() {
    let data = useContext(Data);

    const handleimage = (url) =>{
            console.log('image clicked');
            window.open(url,'_blank');
    };
    return (
        <>
            <div className="side">
                <div className="sidebar">
                    <div className="profile">
                        <div className="rig">
                            <img src={data.isLogin ? profilimage : profil} alt="Profile Picture"
                                className="profile-img" onClick={()=>{handleimage(data.isLogin ? profilimage : profil)}} />
                            <span className="profile-name">{data.isLogin ? 'Hello!' : 'Guest'}</span>
                        </div>

                    </div>
                    <div className="line">

                    </div>
                    <span className="menu-name">
                        <h3>Menu</h3>
                    </span>
                    <br />
                    <nav>
                        <ul className="menu">

                            <li className="home">
                                <NavLink
                                    to='/'
                                    className={({ isActive }) => isActive ? 'liactive' : ''}>
                                    <span className="icon"><i className="fa-solid fa-house"></i></span>
                                    Home
                                </NavLink>
                            </li>

                            {data.isLogin ? <li className="addtoli">
                                <NavLink
                                    to='/user/addtodo'
                                    className={({ isActive }) => isActive ? 'liactive' : ''}>
                                    <span className="icon"><i className="fa-solid fa-plus"></i></span>
                                    Add New
                                </NavLink>

                            </li> : null}

                            {
                                data.isLogin ?
                                    <li className="view-todo">
                                        <NavLink
                                            to='/user/display'
                                            className={({ isActive }) => isActive ? 'liactive' : ''}>
                                            <span className="icon"><i className="fa-solid fa-list"></i></span> View Tasks
                                        </NavLink>
                                        {/* <span className="badge">
                                            <p className="todototal">1</p>
                                        </span> */}

                                    </li> :
                                    null
                            }
                            
                            {
                                data.isLogin ? null
                                    :
                                    <li className="view-todo">
                                        <NavLink
                                            to='/register'
                                            className={({ isActive }) => isActive ? 'liactive' : ''}>
                                            <span className="icon"><i className="fa-solid fa-list"></i></span> Register
                                        </NavLink>
                                        

                                    </li>
                                    
                            }
                            {
                                data.isLogin ? null
                                    :
                                    <li className="view-todo">
                                        <NavLink
                                            to='/login'
                                            className={({ isActive }) => isActive ? 'liactive' : ''}>
                                            <span className="icon"><i class="fa-solid fa-right-to-bracket"></i></span> Login
                                        </NavLink>
                                        

                                    </li>
                                    
                            }

                        </ul>
                    </nav>
                    <div className="line">

                    </div>
                    <div className="footer">
                        {/* <h3>Connect us</h3>
                        <div className="icon-connect">
                            <a href="#"><i className="fab fa-facebook"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fa-brands fa-square-instagram"></i></a>
                            <a href="#"><i className="fab fa-linkedin"></i></a>

                        </div> */}
                        <div className="footer-right">
                            <p>2025 Task Manager UI. All rights reserved.</p>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
