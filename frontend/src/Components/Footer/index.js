import React from "react";
import "./footer.css";
import { useNavigate } from "react-router-dom";

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
            <li
            onClick={() => {
              navigate(`/aboutus`);
            }}
            >Company</li>
            <li
              onClick={() => {
                navigate(`/contactus`);
              }}>
              Contact Us
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
            >Outdoor Activities</li>
            <li
            onClick={() => {
              navigate(`/search?category=trekking&location=&activity=`)
            }}
            >Trekking</li>
            <li
            onClick={() => {
              navigate(`/search?category=skydiving&location=&activity=`)
            }}
            >Skydiving</li>
            <li
            onClick={() => {
              navigate(`/search?category=tree ziplining&location=&activity=`)
            }}
            >Tree Ziplining</li>
          </ul>
        </div>
        <div className="footer-lists">
          <h2>Quick Link</h2>
          <ul>
            <li
            onClick={() => {
              navigate(`/destinations`)
            }}
            >Destinations</li>
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
              navigate(`/`);
            }}
            >Login</li>
            <li
            onClick={() => {
              navigate(`/`);
            }}
            >Register</li>
          </ul>
        </div>
        <div className="footer-paragraph">
          <h3>Pay Safely With US</h3>
          <p>
            payment information Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Dolorum, repellat.{" "}
          </p>
        </div>
      </div>
      <div className="footer-copyright">
        © 2023 GhumoRe, All rights reserved.
      </div>
    </footer>
  );
}
