import React, { useEffect, useState } from "react";
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
  const segments = pathname.split("/").filter(Boolean);

  const [breadcrumbLinks, setBreadcrumbLinks] = useState([]);

  useEffect(() => {
    const historyPatientId =
      new URLSearchParams(search).get("id") ||
      localStorage.getItem("historyPatientId");

    // If visiting /patients/history?id=1, store ID for future use
    if (pathname.startsWith("/patients/history") && historyPatientId) {
      localStorage.setItem("historyPatientId", historyPatientId);
    }

    const links = segments.map((segment, index) => {
      const path = "/" + segments.slice(0, index + 1).join("/");
      let query = "";

      if (path === "/patients/history") {
        const id = localStorage.getItem("historyPatientId");
        if (id) query = `?id=${id}`;
      }

      return {
        label: formatBreadcrumb(segment),
        path,
        search: query,
      };
    });

    setBreadcrumbLinks(links);
  }, [pathname, search]);

  return (
    <div className={style.breadcrumbs}>
      <ul className={style.breadcrumbs__list}>
        {breadcrumbLinks.map((crumb, index) => (
          <li key={index} className={style.breadcrumbs__item}>
            <Link
              to={crumb.path + crumb.search}
              className={style.breadcrumbs__link}
            >
              {crumb.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
