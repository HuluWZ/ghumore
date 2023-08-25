import React from "react";
import "./footer.css";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="Footer">
      <div className="footer-main">
        <div className="footer-logo">
          <img
            className="footer-logo overflow-hidden cursor-pointer"
            alt=""
            src="/gumo-re-indiafinal-11.svg"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="footer-lists">
          <h2>About</h2>
          <ul>
            <li>              <Link to="/aboutus">Company</Link>
</li>
            <li
              
            >
              <Link to="/contactus">Contact Us</Link>
            </li>
            <li>Terms and Conditions</li>
          </ul>
        </div>
        <div className="footer-lists">
          <h2>Activities</h2>
          <ul>
            <li
            onClick={() => {
              navigate(`/search?category=&location=&activity=outdoor activities`)

            }}
            ><Link to='/search?category=&location=&activity=outdoor activities'>Outdoor Activities</Link></li>
            <li
            onClick={() => {
              navigate(`/search?category=trekking&location=&activity=`)
            }}
            ><Link to='/search?category=trekking&location=&activity='>Trekking</Link></li>
            <li
            onClick={() => {
              navigate(`/search?category=skydiving&location=&activity=`)
            }}
            ><Link to='/search?category=skydiving&location=&activity='>Skydiving</Link></li>
            <li
            onClick={() => {
              navigate(`/search?category=tree ziplining&location=&activity=`)
            }}
            ><Link to="/search?category=tree ziplining&location=&activity=">Tree Ziplining</Link></li>
          </ul>
        </div>
        <div className="footer-lists">
          <h2>Quick Link</h2>
          <ul>
            <li
            onClick={() => {
              navigate(`/destinations`)
            }}
            ><Link to='/destinations'>Destinations</Link></li>
            <li>Terms Of Use</li>
            <li>Security</li>
            <li>Privacy</li>
          </ul>
        </div>
        <div className="footer-lists">
          <h2>Company</h2>
          <ul>
            <li
            onClick={() => {
              navigate(`/login`);
            }}
            ><Link to='/login'>Login</Link></li>
            <li
            onClick={() => {
              navigate(`/register`);
            }}
            ><Link to='/register'>Register</Link></li>
          </ul>
        </div>
        <div className="footer-paragraph">
          <h3>Pay Safely With US</h3>
          <p>
            Experience hassle-free payments with our seamless and secure payment gateway.
            {" "} 
          </p>
        </div>
      </div>
      <div className="footer-copyright">
        © 2023 GhumoRe, All rights reserved.
      </div>
    </footer>
  );
}
