import React from "react";
import style from "src/style/Breadcrumbs.module.css";
import { Link, useLocation } from "react-router-dom";

export const Breadcrumb = () => {
  const pathname = useLocation();
  const BreadcrumbsArray = pathname?.pathname.split("/");
  BreadcrumbsArray.shift();
  console.log(BreadcrumbsArray);
  return (
    <>
      <div className={style.breadcrumbs}>
        <ul className={style.breadcrumbs__list}>
          {BreadcrumbsArray.map((item, index) => {
            const href = BreadcrumbsArray.slice(0, index + 1).join("/");
            return (
              <>
                <li key={index}>
                  <Link to={`http://localhost:5173/${href}`}>{item}</Link>
                </li>
              </>
            );
          })}
        </ul>
        {/* <hr /> */}
      </div>
    </>
  );
};
