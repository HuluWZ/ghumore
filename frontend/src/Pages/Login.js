import React, { useEffect } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginUser, SocailAuth } from "../apiCalls/users";
import { setLoader } from "../redux/loaderSlice";
import { Form, Input, message } from "antd";
import { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "./register.css";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
const rules = [
  {
    required: true,
    message: "required",
  },
];
var clientId = "432429443335-no9l1o05qnh9a30qht4h5hok2m9eu49k.apps.googleusercontent.com"

export default function Login({ modalState }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginMessage, setLoginMessage] = useState('');
  const [isSuccess, setIsSucess] = useState('green');
  const onFinish = async (values) => {
    console.log(values, "login");
    try {
      dispatch(setLoader(true));
      const response = await LoginUser(values);
      dispatch(setLoader(false));
      console.log(response, " Response");
      if (response.success) {
        setLoginMessage('Loged in Successfully!')
        setIsSucess('green')
        message.success("Login Successfully");
        localStorage.setItem("token", response.token);
        window.location.href = "/";
      } else {
        // throw new Error(response.message);
        setLoginMessage('Invalid Credentials!')
        setIsSucess('red')
        message.error("Invalid Credentials!");
      }
      // setLoginMessage('')
    } catch (error) {
      setLoginMessage('Invalid Credentials!')
      setIsSucess('red')
      message.error("Invalid Credentials!");
      console.log(error, 'error')
    }
  };
  useEffect(() => {
    setLoginMessage('')
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleGoogleSuccess = (response) => {
    // const data
    console.log(' Google login success = ', response);
  };

  const handleGoogleFailure = (error) => {
    console.log("Error")
    // console.error(' Google login error = ', error);
    if (error.error === "popup_closed_by_user") {
      // Handle the case where the user closed the popup
      console.log("Google login popup closed by user");
      // You can show a message to the user or take other actions here
    } else {
      // Handle other error cases
      console.error("Google login error:", error);
    }

  };

  const validateEmail = (rule, value, callback) => {
    console.log(" Value Email ", value)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) {
      callback(); // Validation successful
    } else {
      callback('Invalid email address'); // Validation failed
    }
  };

  const validatePassword = (rule, value, callback) => {
    console.log(" Value Password ", value);
    if (value.length >= 8) {
      callback(); // Validation successful
    } else {
      callback('Password must be at least 8 characters long'); // Validation failed
    }
  };

  return (
    <div className="Register pb-[100px] mt-[50px] ">

      <div className="flex flex-row gap-5 ml-[-50px]">
        <div className="register-form-image">
          <img className="object-cover hidden md:block" alt="" src="/rectangle-10891@2x.png" />
        </div>
        <div className="register-form">
          <div className="register-form-icon">
            <img
              className=""
              alt=""
              src="/gumo-re-indiafinal-128.svg"
            />
          </div>
          <h2>Login</h2>
          <Form onFinish={onFinish} className="form  ml-8">
            <label style={{ color: isSuccess }} >{loginMessage}</label>
            <div className=" ml-12">
              <div className="email-div">
                <label>Email</label>
                <Form.Item rules={[{ required: true, validator: validateEmail }]} className="form-item " name="email" >
                  <Input type="email" placeholder="Email" className="md:w-[300px] w-[250px]" />
                </Form.Item>

              </div>

              <div className="password-div">
                <label>Password</label>
                <Form.Item rules={[{ required: true, validator: validatePassword }]} name="password" >
                  <Input type="password" placeholder="Password" className=" md:w-[300px] w-[250px]" />
                </Form.Item>
              </div>
            </div>
            <div>
            </div>
            <div className="button-div">
              <button
                className="submit-btn bg-darkslateblue-100"
                typeof="submit">
                Submit
              </button>
            </div>
          </Form>
          <div id="googleSigninDiv" className="googleSigninDiv mb-5"></div>
          {/* <FacebookLoginComponent /> */}
          {/* <a href="http://localhost:4000/api/auth/google">Login with Google</a> */}
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
              onSuccess={async credentialResponse => {
                const data = jwt_decode(credentialResponse.credential)
                console.log(" Socail Data Success ", data);
                const response = await SocailAuth(data);
                console.log(response, response?.token, " Response");
                if (response.success) {
                  console.log("Token Please ", response.token)
                  localStorage.setItem("token", response?.token);
                  // if (localStorage.getItem("token")) {
                  window.location.href = "/";
                  // }
                } else {
                  // throw new Error(response.message);
                  message.error("Invalid Credentials!");
                  window.location.href = "/login";
                }

                // localStorage.setItem("token", data.email);
              }}
              onError={() => {
                console.log('Login Failed');
              }}

            />
          </GoogleOAuthProvider>
          <span>
            Don't have an account?
            <Link to='/register'>
              <span className="hover:text-blue-500 cursor-pointer ml-1">
                Signup
              </span>
            </Link>
          </span>
          <span></span>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
