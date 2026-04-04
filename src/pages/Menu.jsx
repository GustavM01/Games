import React from "react";
import { Link, Outlet } from "react-router-dom";

function Menu() {
  return (
    <>
      <div>
        <h1>Menu</h1>
        <nav style={{ marginBottom: 40 }}>
          <Link to="/">Home</Link>
          <br />
          <Link to="/tictactoe">TicTacToe</Link>
          <br />
          <Link to="/snake">Snake</Link>
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export default Menu;
