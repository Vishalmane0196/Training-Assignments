import React, { useState, useEffect, useRef } from "react";
import navbarCSS from "../../style/Navbar.module.css";
import logo from "../../assets/Doctor-Symbol-Caduceus-PNG-Picture.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authentication/authSlice";
import { useDispatch, useSelector } from "react-redux";

export const Navbar = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/account/user/login");
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  return (
    <>
      <div className={navbarCSS.container}>
        <nav className={navbarCSS.navbar}>
          <img className={navbarCSS.avatarLogo} src={logo} alt="Logo" />
          <section className={navbarCSS.main}></section>

          <section className={navbarCSS.profile}>
            <h3>Admin</h3>
            <img
              className={navbarCSS.avatar}
              src="https://ud2.spinehrm.in/SUD/ELLICI/UserData/EmpPhotoes/EmpPhoto.jpg"
              alt="avatar"
              onClick={togglePopup}
            />
            {showPopup && (
              <div className={navbarCSS.popup} ref={popupRef}>
                <div className={navbarCSS.popupContent}>
                  <div className={navbarCSS.userInfo}>
                    <img
                      className={navbarCSS.popupAvatar}
                      src="https://ud2.spinehrm.in/SUD/ELLICI/UserData/EmpPhotoes/EmpPhoto.jpg"
                      alt="User"
                    />
                    <h3>
                      {userInfo?.first_name} {userInfo?.last_name}
                    </h3>
                    <p>{userInfo?.email}</p>
                  </div>

                  <ul className={navbarCSS.popupOptions}>
                    <li>
                      <Link to="/dashboard/profile">
                        <i className="fa-solid fa-user"></i>
                        <span style={{ marginLeft: "5px" }}>Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/setting">
                        <i class="fa-solid fa-gear"></i> Settings
                      </Link>
                    </li>
                    <li onClick={handleLogout}>
                      <Link>
                        <i className="fa-solid fa-right-from-bracket"></i> Sign
                        Out
                      </Link>
                    </li>
                  </ul>
                  <hr />
                  <p className={navbarCSS.timestamp}>
                    {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </section>
        </nav>
      </div>
    </>
  );
};
