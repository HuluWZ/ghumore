import React from "react";
import "./footer.css";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TermsAndCondition from "../TermsAndCondition";
import { useEffect } from "react";



export default function Footer() {
  useEffect(() => {
    const handleLinkClick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const links = document.querySelectorAll('.footer-link');
    links.forEach((link) => {
      link.addEventListener('click', handleLinkClick);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', handleLinkClick);
      });
    };
  }, []);

  const navigate = useNavigate();
  return (
    <footer className="Footer">
      <div className="footer-main">
        <div className="footer-logo mt-5">
          <img
            className="footer-logo overflow-hidden cursor-pointer md:w-24 md:h-24 lg:w-36 lg:h-36"
            alt=""
            src="/gumo-re-indiafinal-11.svg"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className=" md:footer-main flex flow-row flex-wrap ml-5" ><div className="footer-lists">
          <h2>About</h2>
          <ul>
            <li>
              {" "}
              <Link to="/aboutus" className=" footer-link">Company</Link>
            </li>
            <li>
              <Link to="/contactus" className=" footer-link">Contact Us</Link>
            </li>

            <li><Link to="/termsandconditions" className=" footer-link">Terms and Conditions</Link> </li>
          </ul>
        </div>
          <div className="footer-lists">
            <h2>Activities</h2>
            <ul>
              <li className=" footer-link"
                onClick={() => {
                  navigate(
                    `/search?category=&location=&activity=outdoor activities`
                  );
                }}
              >
                <Link to="/search?category=&location=&activity=outdoor activities">
                  Outdoor Activities
                </Link>
              </li>
              <li className=" footer-link"
                onClick={() => {
                  navigate(`/search?category=trekking&location=&activity=`);
                }}
              >
                <Link to="/search?category=trekking&location=&activity=">
                  Trekking
                </Link>
              </li>
              <li className=" footer-link"
                onClick={() => {
                  navigate(`/search?category=skydiving&location=&activity=`);
                }}
              >
                <Link to="/search?category=skydiving&location=&activity=" className=" footer-link"> 
                  Skydiving
                </Link>
              </li>
              <li className=" footer-link"
                onClick={() => {
                  navigate(`/search?category=tree ziplining&location=&activity=`);
                }}
              >
                <Link to="/search?category=tree ziplining&location=&activity=" className=" footer-link">
                  Tree Ziplining
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-lists">
            <h2>Quick Link</h2>
            <ul>
              <li className=" footer-link"
                onClick={() => {
                  navigate(`/destinations`);
                }}
              >
                <Link to="/destinations" className=" footer-link">Destinations</Link>
              </li>

              <li><Link to="/privacypolicy" className=" footer-link">Privacy</Link> </li>


            </ul>
          </div>





          

        </div>




        <div className="footer-paragraph">
          <h3>Pay Safely With US</h3>
          <p>
            Experience hassle-free payments with our seamless and secure payment
            gateway.{" "}
          </p>
        </div>
      </div>
      <div className="footer-copyright">
        © 2023 GhumoRe, All rights reserved.
      </div>
    </footer>
  );
}
