import React, { useContext, useState } from 'react'
import profil from '../../assets/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg'
import { NavLink } from 'react-router'
import { Data } from '../../App';
export default function Navbar() {
    let data = useContext(Data);

    return (
        <>
            <div className="side">
                <div className="sidebar">
                    <div className="profile">
                        <div className="rig">
                            <img src={profil} alt="Profile Picture"
                                className="profile-img" />
                            <span className="profile-name">{data.isLogin ? 'Hey Dear !' : 'Guest'}</span>
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
                                            <span className="icon"><i className="fa-solid fa-list"></i></span> View Todos
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
                                            <span className="icon"><i className="fa-solid fa-list"></i></span> Register/Login
                                        </NavLink>
                                        

                                    </li>
                            }

                        </ul>
                    </nav>
                    <div className="line">

                    </div>
                    <div className="footer">
                        <h3>Connect us</h3>
                        <div className="icon-connect">
                            <a href="#"><i className="fab fa-facebook"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fa-brands fa-square-instagram"></i></a>
                            <a href="#"><i className="fab fa-linkedin"></i></a>

                        </div>
                        <div className="footer-right">
                            <p>2024 Task Manager UI. All rights reserved.</p>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
