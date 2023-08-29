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
    // setPhoneError(false);

    // if (phoneNumber.length < 8) {
    //   setPhoneError(true);
    // }
  };

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigate("/");
  //   }
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id:
  //       "568457192893-r9u8catqupr689p0qaps44p303tcob3f.apps.googleusercontent.com",
  //     callback: onGoogleFinish,
  //   });
  //   console.log("rendered");
  //   google.accounts.id.renderButton(
  //     document.getElementById("googleSigninDiv"),
  //     {
  //       theme: "outline",
  //       size: "large",
  //     }
  //   );
  // }, []); 

  return (
    <div className="Register pb-[50px] mt-[100px] ">

      <div className="flex flex-row  ml-[-50px]">
        <div className="register-form-image">
          <img className="object-cover mt-16" alt="" src="/rectangle-10891@2x.png" />
        </div>
        <div className="register-form">

          <div className="register-form-icon">
            <img
              className=""
              alt=""
              src="/gumo-re-indiafinal-128.svg"
            />
          </div>
          <h2>Create Account</h2>
          <Form onFinish={onFinish} className="form">
            <Form.Item name="fullName" rules={[{ required: true, validator: validateInput },]}>
              <div className="form-item">
                <label>Full Name: </label>
                <Input type="text" name="fullName" className=" md:w-[300px] w-[200px]" placeholder="Full Name" />
              </div>
            </Form.Item>
            <Form.Item name="phone" rules={[{ required: true, validator: validatePhoneNumber }]}>
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
            <div>
              <span>
                Already have account?<Link to='/login'>Login</Link>
              </span>
              <button className="submit-btn bg-darkslateblue-100" type="submit">
                Submit
              </button>
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