import React from "react";
import { Link } from "react-router-dom";
import LandingCSS from "../../style/LandingPage.module.css";
import logo from "../../assets/Doctor-Symbol-Caduceus-PNG-Picture.png";
export const LandingPage = () => {
  return (
    <>
      <div className={LandingCSS.container}>
        <nav className={LandingCSS.navbar}>
          <div>
            <img className={LandingCSS.avatarlogo} src={logo} alt="logo" />
          </div>
          <div></div>
        </nav>
      </div>

      <div className={LandingCSS.content}>
        <div className={LandingCSS.backimg}>
          <div className={LandingCSS.coverdiv}>
            <h2>The Best Medical Center</h2>
            <h1 className={LandingCSS.text1}>Bringing health</h1>
            <h1 className={LandingCSS.text}>to life for the whole Family</h1>

            <section className={LandingCSS.button}>
              <div className={LandingCSS.searchBox}>
                <Link
                  to={"/account/new/register"}
                  className={LandingCSS.searchButton}
                  href="#"
                >
                 Get Started ->
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
