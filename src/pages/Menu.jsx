import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./Menu.css";

function Menu() {
  const location = useLocation();

  return (
    <>
      <div>
        {/* <h1>Menu</h1> */}
        <nav className="navbar">
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
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export default Menu;
