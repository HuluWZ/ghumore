import { useState } from "react";
import React from "react";
import axios from 'axios';
import "./radical.css";

const api = 'https://ghumore-travel.onrender.com/api/contact'
export default function ContactUs() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSucess, setSucess] = useState('green');

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log({ fullName, email, message });
      const response = await axios.post(`${api}/create`, {
        fullName,
        email,
        message,
      });
      const data = response.data
      console.log(" Respone ", response);
      if (data.success) {
        // Display the success message
        console.log("Success:", response.data);
        setMessage('');
        setEmail('');
        setFullName('')
        setSubmitMessage("Thank you for contacting us! We'll get back to you soon.")
        setSucess('green')
      } else {
        setSubmitMessage('Unable to submitt form')
        setSucess('red')
        console.log("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }

  };
  return (
    <div className="ContactUs flex flex-col justify-center overflow-x-hidden">
      <div className="header-contact-us Poster w-[1920px] h-[400px] bg-[url(/public/image87@2x.png)] bg-cover bg-no-repeat bg-[top] font-lato">
        <div className="font-semibold [text-shadow:0px_2px_3px_rgba(0,_0,_0,_0.25)]">
          Contact us
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="main-contact-us flex justify-center">
        <div className="image-section">
          <img
            className="hidden md:block rounded-3xs w-[430px] h-[540px] m-12 object-cover"
            alt=""
            src="/unsplashtyandmpxwhc@2x.png"
          />
        </div>

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
                    required={true}
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
                    required={true}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <div className="form-line"></div>
                </div>
                <div className="form-field">
                  <textarea
                    className="custom-new-fields"
                    placeholder="Message"
                    row={4}
                    value={message}
                    required={true}
                    onChange={(event) =>
                      setMessage(event.target.value)
                    }></textarea>
                  <div className="form-line"></div>
                </div>
                <div>
                  <label
                    style={{ color: isSucess }}>
                    {submitMessage}
                  </label>
                </div>
                <br>
                </br>
                <div>
                </div>
                <button
                  className="btn-contact rounded-sm bg-darkslateblue-100 flex flex-row py-6 px-[120px] items-center justify-center text-5xl text-white"
                  type="submit"
                  style={{ "margin-left": "50px" }}
                >
                  Contact Us
                </button>

              </form>
            </div>
            <div className="address md:ml-24 md:mt-16 mb-5">
              <h2>Email</h2>
              <a href="mailto:ghumoreindia@gmail.com">ghumoreindia@gmail.com</a>
              <h2>Address</h2>
              <p>Banjara Hills, Hyderabad, India</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
