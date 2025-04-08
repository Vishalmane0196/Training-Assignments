import React from "react";
import { Link } from "react-router-dom";
import landingCSS from "../../style/LandingPage.module.css";
import logo from "../../assets/Doctor-Symbol-Caduceus-PNG-Picture.png";
export const LandingPage = () => {
  return (
    <>
      <div className={landingCSS.container}>
        <nav className={landingCSS.navbar}>
          <div>
            <img className={landingCSS.avatarLogo} src={logo} alt="logo" />
          </div>
          <div></div>
        </nav>
      </div>

      <div className={landingCSS.content}>
        <div className={landingCSS.backImg}>
          <div className={landingCSS.coverDiv}>
            <h2>The Best Medical Center</h2>
            <h1 className={landingCSS.text1}>Bringing health</h1>
            <h1 className={landingCSS.text}>to life for the whole Family</h1>

            <section className={landingCSS.button}>
              <div className={landingCSS.searchBox}>
                <Link
                  to={"/account/user/login"}
                  className={landingCSS.searchButton}
                  href="#"
                >
                  Get Started
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
