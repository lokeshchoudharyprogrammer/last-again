import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
        <Link to="/product">Product</Link>
      </div>
    </>
  );
};

export default Navbar;
