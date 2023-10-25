import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./css/Navbar.css";
import menutbn from "./images/icons8-menu-30.png";
import closebtn from "./images/icons8-close-24.png";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <Link className="brandname navbar-brand" to="/">
            GETIN
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            

            {/* Add Login and Signup buttons with Link */}
            <div>
              <Link className="btnn" to="/login" role="button">
                Login
              </Link>
              <Link className="btnn" to="/signup" role="button">
                Signup
              </Link>
            </div>
          </div>
          <div className="menui " onClick={toggleMenu}>
            <img src={menutbn} alt="Menutbn" />
            {isMenuOpen && (
              <div
                className={`menu ${isMenuOpen ? "show" : ""}`}
                id="navbarSupportedContent"
              >
                <div className="brandname-menu">Web3university</div>
                <img src={closebtn} alt="closebtn" onClick={toggleMenu} className="closebtn" />
                
                <Link className="menu-link" to="/about">
                  About
                </Link>
                <Link className="menu-link" to="/contact">
                  Contact
                </Link>
                <Link className="menu-link" to="/waitlist">
                  Waitlist
                </Link>
                <Link className="menu-link" to="/login">
                  Login
                </Link>
                <Link className="menu-link" to="/signup">
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
