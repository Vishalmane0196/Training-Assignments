import React, { useContext, useState, useEffect, useRef } from "react";
import navbarCSS from "../../style/Navbar.module.css";
import logo from "../../assets/Doctor-Symbol-Caduceus-PNG-Picture.png";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../utils/ContextApi";

export const Navbar = () => {
  const ContextData = useContext(MyContext);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };


  const handleLogout = () => {
    localStorage.clear();
    ContextData.setToken(null);
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
                      {ContextData.userInfo?.first_name}{" "}
                      {ContextData.userInfo?.last_name}
                    </h3>
                    <p>{ContextData.userInfo?.email}</p>
                  </div>

                  <ul className={navbarCSS.popupOptions}>
                    <li>
                      <Link to='/admin/dashboard/profile'>
                        <i className="fa-solid fa-user"></i>
                        <span style={{ marginLeft: "5px" }}>Profile</span>
                      </Link>
                    </li>
                    <li onClick={handleLogout}>
                      <Link>
                        <i className="fa-solid fa-right-from-bracket"></i> Sign Out
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
