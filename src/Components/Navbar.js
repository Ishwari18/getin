import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";

export const Navbar = () => {
  
  const isLoggedIn = !!localStorage.getItem("token"); // Check if a token is present

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="brandname navbar-brand" to="/">
            GETIN
          </Link>
          <div className=" navbar-collapse" id="navbarSupportedContent">
            <div className="btns">
              <Link className="btnn" to="/login" role="button">
                Login
              </Link>
              <Link className="btnn" to="/signup" role="button">
                Signup
              </Link>
              {isLoggedIn && ( // Only show "Profile" button when logged in
                <Link className="btnn" to="/profile" role="button">
                  Profile
                </Link>
              )}
            </div>
          </div>
      
        </div>
      </nav>
    </>
  );
};
