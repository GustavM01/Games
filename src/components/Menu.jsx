import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./Menu.css";
import { MenuIcon, X } from "lucide-react";

function Menu() {
  const location = useLocation();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  function changeTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <div className="mobile-menu">
        <div className="mobile-menu-left" />
        <button className="menu-btn" onClick={() => setIsOpen((prev) => !prev)}>
          {!isOpen ? <MenuIcon /> : <X />}
        </button>
      </div>

      <nav className={`navbar mobile-navbar ${isOpen ? "open" : ""}`}>
        <div style={{ width: "50px" }} />
        <Link
          className={
            location.pathname === "/"
              ? "navbar-item btn active"
              : "navbar-item btn"
          }
          to="/"
        >
          TicTacToe
        </Link>
        <Link
          className={
            location.pathname === "/snake"
              ? "navbar-item btn active"
              : "navbar-item btn"
          }
          to="/snake"
        >
          Snake
        </Link>
        <Link
          className={
            location.pathname === "/connectfour"
              ? "navbar-item btn active"
              : "navbar-item btn"
          }
          to="/connectfour"
        >
          Connect four
        </Link>
        <button
          className={theme === "dark" ? "theme-btn dark" : "theme-btn light"}
          onClick={() => changeTheme()}
        >
          <div className="knob"></div>
        </button>
      </nav>
      <Outlet />
    </>
  );
}

export default Menu;
