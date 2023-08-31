import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./register.css";
import { Form, message, Input, theme } from "antd";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoader } from "../redux/loaderSlice";
import { RegisterUser, authenticateWithGoogle } from "../apiCalls/users";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import FacebookLogin from "react-facebook-login";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import FacebookLoginComponent from "./FacebookComponent";

const rules = [
  {
    required: true,
    message: "Required",
  }
];

const validateInput = (rule, value, callback) => {
  console.log(" Value Phone ", value);
  if (/^[a-zA-Z ]*$/.test(value)) {
    callback(); // Validation successful
  } else {
    callback('Only alphabets are allowed'); // Validation failed
  }
};

const validatePhoneNumber = (rule, value, callback) => {
  const val = value.split("+")[1].replace(/[\s-]+/g, '')
  console.log(" Validation Phone = ", value.split("+")[1].replace(/[\s-]+/g, ''));
  if (/^[0-9]{12}$/.test(val)) {
    callback(); // Validation successful
  } else {
    callback('Invalid phone number. It should be a 10-digit number.'); // Validation failed
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

export default function Register({ modalState }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const onGoogleFinish = (values) => {

    // authenticateWithGoogle("email")
    // console.log("Encoded JWT ID token: " + values.credential);

    try {
      dispatch(setLoader(true));
      console.log(values);
      const userObject = jwt_decode(values.credential);
      console.log("object::: ", userObject);
      const response = authenticateWithGoogle(userObject.email);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      console.log(error.message, "error");
    }
  };
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (!phone || phone.length < 8) {
      setPhoneError(true);
      return;
    }
    values.phoneNumber = phone;
    console.log(values, "finish");
    try {
      dispatch(setLoader(true));
      const response = await RegisterUser(values);
      console.log(response, "Sign Up");
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        form.resetFields();
        setPhone('')
        throw new Error(response.message);
      }
    } catch (error) {
      form.resetFields();
      setPhone('')
      message.error(error.message);
      console.log(error.message, "error");
    }
  };

  const handlePhoneChange = (value) => {
    console.log(" Phone Change ", value);
    const phoneNumber = value.replace(/\D/g, ""); // Remove non-digit characters
    setPhone(phoneNumber);
  };


  return (
    <div className="Register md:pb-[50px] mt-[40px] ">

      <div className="flex flex-row w-[50rem] md:ml-1   ml-[-205px] ">
        <div className="register-form-image">
          <img
            className="object-cover hidden md:block"
            alt=""
            src="/rectangle-10891@2x.png"
          />
        </div>
        <div className="register-form  md:mt-0 mt-12 w-[70rem]">


          <h2>Create Account</h2>
          <Form onFinish={onFinish} className="form  flex flex-row justify-center mb-32 pb-10 ml-8">
            <div className=" ml-12">
              <Form.Item name="fullName" rules={[{ required: true, validator: validateInput },]}>
                <div className="form-item">
                  <label>Full Name: </label>
                  <Input type="text" name="fullName" className=" md:w-[300px] w-[200px]" placeholder="Full Name" />
                </div>
              </Form.Item>
              <Form.Item name="phone" className=" w-[200px]" rules={[{ required: true, validator: validatePhoneNumber }]}>
                <div>
                  <label>Mobile Number</label>
                  <PhoneInput
                    required
                    country={"in"}
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                </div>
              </Form.Item>
              <Form.Item name="email" rules={[{ required: true, validator: validateEmail }]}>
                <div className="form-item">
                  <label>Email:</label>
                  <Input type="email" placeholder="Email" className=" md:w-[300px] w-[200px]" />
                </div>
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, validator: validatePassword }]}>
                <div className="form-item">
                  <label>Password</label>
                  <Input type="password" placeholder="Password" className=" md:w-[300px] w-[200px]" />
                </div>
              </Form.Item>
            </div>
            <div className=" ml-6">

              {/* <button className="submit-btn bg-darkslateblue-100 " type="submit">
                Submit
              </button> */}
              <button type="submit" className=" bg-darkslateblue-100 ml-16 rounded px-5 mb-4">
                Submit
              </button>
              <span className=" ml-8">
                Already have an account?
                <Link to='/login'>
                  <span className="hover:text-blue-500 cursor-pointer ml-1">
                    Login
                  </span>
                </Link>
              </span>

            </div>
          </Form>
          {/* <div id="googleSigninDiv" className="googleSigninDiv"></div> */}
          {/* <FacebookLoginComponent /> */}
          <span></span>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}