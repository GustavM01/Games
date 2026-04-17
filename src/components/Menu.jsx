import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./Menu.css";

function Menu() {
  const location = useLocation();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  function changeTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <div>
        {/* <h1>Menu</h1> */}
        <nav className="navbar">
          <div style={{ width: "50px" }} />
          <Link
            className={
              location.pathname === "/"
                ? "navbar-item btn active"
                : "navbar-item btn"
            }
            to="/"
          >
            Home
          </Link>
          <br />
          <Link
            className={
              location.pathname === "/tictactoe"
                ? "navbar-item btn active"
                : "navbar-item btn"
            }
            to="/tictactoe"
          >
            TicTacToe
          </Link>
          <br />
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
      </div>
    </>
  );
}

export default Menu;
