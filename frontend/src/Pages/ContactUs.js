import { useState } from "react";
import React from "react";
import "./radical.css";

export default function ContactUs() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Message:", message);
  };
  return (
    <div className="ContactUs">
      <div className="header-contact-us Poster w-[1920px] h-[400px] bg-[url(/public/image87@2x.png)] bg-cover bg-no-repeat bg-[top] font-lato">
        <div className="font-semibold [text-shadow:0px_2px_3px_rgba(0,_0,_0,_0.25)]">
          Contact us
        </div>
      </div>
      <br/>
        <br/>
        <br/>
      <div className="main-contact-us">
        <div className="image-section">
          <img
            className="rounded-3xs w-[430px] h-[540px] m-16 object-cover"
            alt=""
            src="/unsplashtyandmpxwhc@2x.png"
          />
        </div>
        <br />
        <br />
        <br />
        <div className="form-section-extra">
          <div className="font-bold font-extrabold">
            <h1> Contact Us</h1>
          </div>
          <div className="form-extra">
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-field">
                  <input
                    type="text"
                    className="custom-fields"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                  />
                  <div className="form-line"></div>
                </div>
                <div className="form-field">
                  <input
                    className="custom-fields"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <div className="form-line"></div>
                </div>
                <div className="form-field">
                  <textarea
                    className="custom-new-fields"
                    placeholder="Message"
                    value={message}
                    onChange={(event) =>
                      setMessage(event.target.value)
                    }></textarea>
                  <div className="form-line"></div>
                </div>
                <button
                  className="btn-contact rounded-sm bg-darkslateblue-100 flex flex-row py-6 px-[120px] items-center justify-center text-5xl text-white"
                  type="submit">
                  Contact Us
                </button>
              </form>
            </div>
            <div className="address">
              <h2>Contact</h2>
              <p>ghumoreindia@gmail.com</p>
              <h2>Address</h2>
              <p>Banjara Hills, Hyderabad, India</p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}
