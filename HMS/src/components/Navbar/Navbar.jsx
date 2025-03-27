import React, { useContext, useState, useEffect, useRef } from "react";
import NavbarCSS from "../../style/Navbar.module.css";
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
      <div className={NavbarCSS.container}>
        <nav className={NavbarCSS.navbar}>
          <img className={NavbarCSS.avatarlogo} src={logo} alt="Logo" />
          <section className={NavbarCSS.main}></section>

          <section className={NavbarCSS.profile}>
            <img
              className={NavbarCSS.avatar}
              src="https://ud2.spinehrm.in/SUD/ELLICI/UserData/EmpPhotoes/EmpPhoto.jpg"
              alt="avatar"
              onClick={togglePopup}
            />
            {showPopup && (
              <div className={NavbarCSS.popup} ref={popupRef}>
                <div className={NavbarCSS.popupContent}>
                  <div className={NavbarCSS.userInfo}>
                    <img
                      className={NavbarCSS.popupAvatar}
                      src="https://ud2.spinehrm.in/SUD/ELLICI/UserData/EmpPhotoes/EmpPhoto.jpg"
                      alt="User"
                    />
                    <h3>
                      {ContextData.userInfo?.first_name}{" "}
                      {ContextData.userInfo?.last_name}
                    </h3>
                    <p>{ContextData.userInfo?.email}</p>
                  </div>

                  <ul className={NavbarCSS.popupOptions}>
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
                  <p className={NavbarCSS.timestamp}>
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
