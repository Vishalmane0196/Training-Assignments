import React from "react";
import { Link, useLocation } from "react-router-dom";
import style from "src/style/Breadcrumbs.module.css";

function formatBreadcrumb(segment) {
  return segment
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export const Breadcrumb = () => {
  const { pathname, search } = useLocation();

  const segments = pathname.split("/").filter(Boolean); // e.g., ['patients', 'history', 'bookAppointment']
  console.log(segments, search);
  return (
    <div className={style.breadcrumbs}>
      <ul className={style.breadcrumbs__list}>
        {segments.map((segment, index) => {
          const path = "/" + segments.slice(0, index + 1).join("/");

          const link =
            segments.at(0) == segment ? `${path}` : `${path}${search}`;

          return (
            <li key={index} className={style.breadcrumbs__item}>
              <Link to={link} className={style.breadcrumbs__link}>
                {formatBreadcrumb(segment)}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
