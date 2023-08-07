import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
// import "./registers.css";
import "./profile.css";
import { Form, message, Input } from "antd";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/loaderSlice";
import {
  RegisterUser,
  UpdateUserProfile,
  changePassword,
} from "../apiCalls/users";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { logout } from "../redux/userSlice";

const rules = [{}];

export default function Profile() {
  const { user } = useSelector((state) => state.users);
  const [data, setData] = React.useState({
    name: "",
    email: "",
    address: "",
    city: "",
  });
  const [dataPassword, setDataPassword] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [activeForm, setActiveForm] = useState("profile-detail-form");

  const handleChangeForm = (formId) => {
    setActiveForm(formId);
  };

  const handlePasswordSubmit = async (values) => {
    // take data to submit
    console.log(values);
    if (values.newPassword !== values.confirmPassword) {
      message.error("New password and confirm password do not match");
      return;
    }
    try {
      dispatch(setLoader(true));
      const response = await changePassword(
        values.oldPassword,
        values.newPassword
      );
      console.log(response, "response passowrd change");
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      message.error(error.message);
      console.log(error.message, "error");
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");

  const onFinish = async (values) => {
    values.phoneNumber = phone;
    console.log(values, "finish");
    try {
      dispatch(setLoader(true));

      const response = await UpdateUserProfile(user._id, values);
      console.log(response, "response");
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        navigate("/");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      console.log(error.message, "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setDataPassword((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  useEffect(() => {
    if (user) {
      setData({
        fullName: user.fullName || "",
        phone: user.phone || "",
        email: user.email || "",
        address: user.address || "",
        city: user.city || "",
      });
      setPhone(user.phoneNumber || "");
    }
  }, [user]);

  if (!user) {
    return null; // or display a loading state
  }

  return (
    <div className="Profile">
      <div className="header-contact-us mt-24 Poster w-[1920px] h-[400px] bg-[url(/public/image90@2x.png)] bg-cover bg-no-repeat bg-[top] font-lato">
        <div className="font-semibold [text-shadow:0px_2px_3px_rgba(0,_0,_0,_0.25)]">
          My Account
        </div>
      </div>
      {/* <Navbar /> */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="profile-form-container">
        <div className="profile-form-navbar">
          <div className="profile-image"></div>
          <h2>Profile</h2>
          <div className="profile-form-navbar-options">
            <button
              onClick={() => handleChangeForm("profile-detail-form")}
              className={`form-option-btn ${
                activeForm === "profile-detail-form" ? "active" : ""
              }`}
              type="button">
              Profile Detail
            </button>
            <button
              onClick={() => handleChangeForm("my-booking-form")}
              className={`form-option-btn ${
                activeForm === "my-booking-form" ? "active" : ""
              }`}
              type="button">
              My Booking
            </button>
            <button
              onClick={() => handleChangeForm("change-password-form")}
              className={`form-option-btn ${
                activeForm === "change-password-form" ? "active" : ""
              }`}
              type="button">
              Change Password
            </button>
            <button
              onClick={() => {
                handleChangeForm("log-out-form");
                dispatch(logout());
                localStorage.removeItem("token");
                navigate("/");
              }}
              className="form-option-btn"
              type="button"
              style={{ color: "orangered" }}>
              Log Out
            </button>
          </div>
        </div>
        <div
          className="profile-form right-sider"
          id="profile-detail-form"
          style={{
            display: activeForm === "profile-detail-form" ? "block" : "none",
          }}>
          <h2>Profile Detail</h2>
          <Form onFinish={onFinish} className="form">
            <Form.Item noStyle name="fullName" rules={rules}>
              <div className="form-item">
                <label>Full Name</label>
                <Input
                  value={data.fullName}
                  onChange={handleChange}
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                />
              </div>
            </Form.Item>
            <Form.Item noStyle rules={rules}>
              <div className="form-item">
                <label>Mobile Number</label>
                <PhoneInput
                  rules={rules}
                  country={"in"}
                  value={phone}
                  onChange={handlePhoneChange}
                  name="phone"
                />
              </div>
            </Form.Item>
            <Form.Item noStyle name="email" rules={rules}>
              <div className="form-item">
                <label>Email</label>
                <Input
                  value={data.email}
                  type="email"
                  onChange={handleChange}
                  placeholder="Email"
                  name="email"
                />
              </div>
            </Form.Item>
            <Form.Item noStyle name="address">
              <div className="form-item">
                <label>Address</label>
                <Input
                  name="address"
                  type="text"
                  value={data.address}
                  onChange={handleChange}
                  placeholder="Address"
                />
              </div>
            </Form.Item>
            <Form.Item noStyle name="city">
              <div className="form-item">
                <label>City</label>
                <Input
                  onChange={handleChange}
                  type="text"
                  placeholder="City"
                  value={data.city}
                  name="city"
                />
              </div>
            </Form.Item>
            <button className="submit-btn bg-darkslateblue-100" type="submit">
              Save Changes
            </button>
          </Form>
        </div>
        <div
          className="right-sider booking-container"
          id="my-booking-form"
          style={{
            display: activeForm === "my-booking-form" ? "block" : "none",
          }}>
          <h2>My Bookings</h2>
          <div className="bookings">
            {/* Add your code for the My Booking view form here (cloned from the profile detail form) */}
            <h3>Upcoming Booking</h3>
            <div className="upcoming-booking">
              <table>
                <tr>
                  <th>Product</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Booking Status</th>
                  <th> </th>
                </tr>
                <tr>
                  <td>Alfreds Futterkiste</td>
                  <td>Maria Anders</td>
                  <td>Germany</td>
                  <td>Germany</td>
                  <td>Germany</td>
                </tr>
                <tr>
                  <td>Centro comercial Moctezuma</td>
                  <td>Francisco Chang</td>
                  <td>Mexico</td>
                  <td>Mexico</td>
                  <td>Mexico</td>
                </tr>
              </table>
            </div>
            <div className="completed-booking">
            <table>
                <tr>
                  <th>Booking Ref Number</th>
                  <th>Trip Details</th>
                  <th>Journey Date</th>
                  <th>Booking Date</th>
                  <th>Booking Status</th>
                  <th>View and Manage</th>
                </tr>
                <tr>
                  <td>Alfreds Futterkiste</td>
                  <td>Maria Anders</td>
                  <td>Germany</td>
                  <td>confirmed</td>
                  <td>Germany</td>
                </tr>
                <tr>
                  <td>Centro comercial Moctezuma</td>
                  <td>Francisco Chang</td>
                  <td>Mexico</td>
                  <td>confirmed</td>
                  <td>Mexico</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div
          className="profile-form right-sider"
          id="change-password-form"
          style={{
            display: activeForm === "change-password-form" ? "block" : "none",
          }}>
          <h2>Change Password</h2>
          <Form onFinish={handlePasswordSubmit} className="form">
            <Form.Item noStyle name="oldPassword">
              <div className="form-item">
                <label>Old Password</label>
                <Input
                  required
                  name="oldPassword"
                  type="password"
                  value={dataPassword.oldPassword}
                  onChange={handlePasswordChange}
                  placeholder="Old Password"
                />
              </div>
              {/* <Form onFinish={onFinish} className="form">
            <Form.Item name="fullName" rules={rules}>
              <div className="form-item">
                <label>Full Name</label>
                <Input
                  value={data.fullName}
                  onChange={handleChange}
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                />
              </div>
            </Form.Item> */}
            </Form.Item>
            <Form.Item noStyle name="newPassword">
              <div className="form-item">
                <label>New Password</label>
                <Input
                  required
                  name="newPassword"
                  type="password"
                  value={dataPassword.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="New Password"
                />
              </div>
            </Form.Item>
            <Form.Item noStyle name="confirmPassword">
              <div className="form-item">
                <label>Confirm Passowrd</label>
                <Input
                  required
                  name="confirmPassword"
                  type="password"
                  value={dataPassword.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm Password"
                />
              </div>
            </Form.Item>
            <button className="submit-btn bg-darkslateblue-100" type="submit">
              Change Password
            </button>
          </Form>
        </div>
        <div
          className="right-sider"
          id="log-out-form"
          style={{
            display: activeForm === "log-out-form" ? "block" : "none",
          }}>
          <h2>Log Out</h2>
          <form onSubmit={handlePasswordSubmit} className="form">
            {/* Add your code for the Log Out view form here (cloned from the profile detail form) */}
          </form>
        </div>
      </div>

      <br />
      <br />
      <br />
      {/* <Footer /> */}
    </div>
  );
}
