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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const rules = [
  {
    required: true,
    message: "Required",
  }
];

const validateInput = (rule, value, callback) => {
  // console.log(" Value Phone ", value);
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
// const validatePassword = (rule, value, callback) => {
//   console.log(" Value Password ", value);
//   if (value.length >= 8) {
//     callback(); // Validation successful
//   } else {
//     callback('Password must be at least 8 characters long'); // Validation failed
//   }
// };
const validatePassword = (rule, value, callback) => {
  console.log("Value Password ", value);
  if (value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value) && /[!@#$%^&*]/.test(value)) {
    callback(); // Validation successful
  } else {
    callback('Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol (!@#$%^&*)'); // Validation failed
  }
};

export default function Register({ modalState }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("")
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

  const handleError = () => {
    toast.error('your phone number or email already exist please login');
  }
  const handleSuccess = () => {
    toast.success('Registered Succesfuly you can login In with your account now');
  }

  const onFinish = async (values) => {
    if (!phone || phone.length < 8) {
      setPhoneError(true);
      return;
    }
    values.phoneNumber = phone;
    // console.log(values, "finish");
    try {
      dispatch(setLoader(true));
      const response = await RegisterUser(values);
      console.log(response, "Sign Up message is going in here ");
      dispatch(setLoader(false));
      if (response.success) {

        message.success(response.message);
        handleSuccess()
        navigate("/login");
      } else {
        form.resetFields();

        handleError()
        navigate("/login")
        // responseMessage('Phone number already registered')
        // alert(<h4 className=" text-2xl text-red-500">this phone number Already registered!</h4>)
        // setPhoneError(true)
        // throw new Error(response.message);
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

        <div className="register-form md:ml-[-80px] md:mt-0 mt-20 w-[70rem]">


          <h2 className=" ml-[-120px] md:ml-0">Create Account</h2>
          <Form onFinish={onFinish} className="form  flex flex-row justify-center mb-32 pb-10 ml-8">
            <div className=" ml-8">
              <Form.Item name="fullName" rules={[{ required: true, validator: validateInput },]}>
                <div className=" flex flex-col gap-2">
                  <label>Full Name: </label>
                  <Input type="text" required name="fullName" className=" w-[300px] " placeholder="Full Name" />
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

                <div className=" flex flex-col gap-2">
                  <label>Email:</label>
                  <Input required type="email" name="Email" value={email} onChange={(e) => setEmail(e.target.value)} className=" w-[300px]" placeholder="johndoe@gmail.com" />
                </div>
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, validator: validatePassword }]}>
                <div className="flex flex-col gap-2">
                  <label>Password</label>
                  <Input type="password" required placeholder="Password" className=" w-[300px]" />
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