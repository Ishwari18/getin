import React from "react";
import "./css/Footer.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <div className="footer-content">
        <ul className="Footer Footer-links">
          <li>
            <Link className="brandname footer-brandname " to="/">
            GETIN
            </Link>
          </li>
          <li>
            <Link className="footer-menu" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="footer-menu" to="/contact">
              Contact Us
            </Link>
          </li>
          
        </ul>
     
      </div>
    </>
  );
};
