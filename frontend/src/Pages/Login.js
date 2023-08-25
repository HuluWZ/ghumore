import React, { useEffect } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginUser } from "../apiCalls/users";
import { setLoader } from "../redux/loaderSlice";
import { Form, Input, message } from "antd";
import { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "./register.css";

const rules = [
  {
    required: true,
    message: "required",
  },
];
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
      console.log(error,'error')
    }
  };
  useEffect(() => {
    setLoginMessage('')
    if (localStorage.getItem("token")) {
      navigate("/");  
    }
  }, [navigate]);

  return (
    <div className="Register">
      {/* <Navbar /> */}
      <div className="close-button font-bold" onClick={() => modalState(false)}>
        x
      </div>
      <div className="register-form-container">
        <div className="register-form-image">
          <img className="object-cover" alt="" src="/rectangle-10891@2x.png" />
        </div>
        <div className="register-form">
          <div className="register-form-icon">
            <img
              className="overflow-hidden"
              alt=""
              src="/gumo-re-indiafinal-128.svg"
            />
          </div>
          <h2>Login</h2>
          <Form onFinish={onFinish} className="form">
            <label style={{ color: isSuccess }} >{ loginMessage}</label>
            <div className="email-div">
              <label>Email</label>
              <Form.Item rules={rules} className="form-item" name="email">
                <Input type="email" placeholder="Email" />
              </Form.Item>
            </div>
            <div className="password-div">
              <label>Password</label>
              <Form.Item className="form-item" rules={rules} name="password">
                <Input type="password" placeholder="Password" />
              </Form.Item>
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
          <div id="googleSigninDiv" className="googleSigninDiv"></div>
          {/* <FacebookLoginComponent /> */}
          <span>
            Dont have an account? <Link to='/register'>Signup</Link>
          </span>
          <span></span>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
