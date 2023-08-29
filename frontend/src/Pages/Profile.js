import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
// import "./registers.css";
import "./profile.css";
import { Form, message, Input, Button } from "antd";
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
import { cancelBooking, getMyBookings } from "../apiCalls/booking";

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
    console.log(" FORMD ID = ", formId);
    setActiveForm(formId);
    console.log(" FORM DATA ", activeForm);
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
    console.log("On Finish Called")
    values.phoneNumber = phone;
    console.log(values, "finish");
    try {
      dispatch(setLoader(true));

      const response = await UpdateUserProfile(user._id, values);
      console.log(response, values, " Update Response");
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

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(" Name ",name,value,e.target)
  //   setData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  //   console.log(" Data ",data)
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(" Name ", name, value, e.target)
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(" Data ", data)
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
  const [upcomingBooking, setUpcomingBooking] = useState([]);
  const [historyBooking, setHistoryBooking] = useState([]);

  const getMyBooking = async () => {
    const token = localStorage.getItem("token"); // Replace with how you store the authentication token

    try {
      const response = await getMyBookings(token);
      if (response.success) {
        setHistoryBooking(response["history"]);
        setUpcomingBooking(response["upcoming"]);
        // console.log("my booking history", historyBooking);
        // console.log("my booking upcoming", upcomingBooking);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const cancelBookings = async (id,) => {
    const token = localStorage.getItem("token")
    try {
      dispatch(setLoader(true))
      const response = await cancelBooking(id);
      console.log("response", response.message)
      dispatch(setLoader(false))
      if (response.success) {
        message.success(response.message)
      }
      else {
        throw new Error(response.error)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  // useEffect(() => {
  //   if (user) {
  //     setData({
  //       fullName: user.fullName || "",
  //       phone: user.phone || "",
  //       email: user.email || "",
  //       address: user.address || "",
  //       city: user.city || "",
  //     });
  //     setPhone(user.phoneNumber || "");
  //   }
  // }, [user, upcomingBooking]);

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
  getMyBooking();

  if (!user) {
    return null; // or display a loading state
  }

  return (
    <div>
      <div className="header-contact-us Poster w-[1920px] h-[400px] bg-[url(/public/image90@2x.png)] bg-cover bg-no-repeat bg-[top] font-lato">
        <div className="font-semibold [text-shadow:0px_2px_3px_rgba(0,_0,_0,_0.25)]">
          My Account
        </div>
      </div>
      {/* <Navbar /> */}

      <div className="profile-form-container ml-40 my-40">
        <div className="profile-form-navbar ">
          <div className="profile-image"></div>
          <h2>Profile</h2>
          <div className="profile-form-navbar-options">
            <button
              onClick={() => handleChangeForm("profile-detail-form")}
              className={`form-option-btn ${activeForm === "profile-detail-form" ? "active" : ""
                }`}
              type="button">
              Profile Detail
            </button>
            <button
              onClick={() => handleChangeForm("my-booking-form")}
              className={`form-option-btn ${activeForm === "my-booking-form" ? "active" : ""
                }`}
              type="button">
              My Booking
            </button>
            <button
              onClick={() => handleChangeForm("change-password-form")}
              className={`form-option-btn ${activeForm === "change-password-form" ? "active" : ""
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
                  required
                  name="fullName"
                  placeholder="Full Name"
                />
              </div>
            </Form.Item>
            <Form.Item noStyle rules={rules}>
              <div className="form-item">
                <label>Mobile Number</label>
                <PhoneInput
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
                  required
                  onChange={handleChange}
                  placeholder="Email"
                  name="email"
                />
              </div>
            </Form.Item>
            <Form.Item noStyle name="address" rules={rules}>
              <div className="form-item">
                <label>Address</label>
                <Input
                  name="address"
                  type="text"
                  required
                  value={data.address}
                  onChange={handleChange}
                  placeholder="Address"
                />
              </div>
            </Form.Item>
            <Form.Item noStyle name="city" rules={rules}>
              <div className="form-item">
                <label>City</label>
                <Input
                  onChange={handleChange}
                  type="text"
                  placeholder="City"
                  required
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
            {/* <div className="upcoming-booking">
              <div className="single-book">
                <div className="single-book-col">
                  <span className="font-semibold flex">
                    <img
                      className="relative w-5 h-5 overflow-hidden shrink-0"
                      alt=""
                      src="/passport.svg"
                    />
                    Product
                  </span>
                  <span className="font-semibold inline-block font-medium text-orange-800">
                    Four-Day Private Luxury Golden Triangle Tour to Agra and
                    Jaipur...
                  </span>
                </div>
                <div className="single-book-col">
                  <span className="font-semibold text-sm flex">
                    <img
                      className="relative w-5 h-5 overflow-hidden shrink-0"
                      alt=""
                      src="/date4.svg"
                    />
                    Date
                  </span>
                  <span>05 Jun 2023</span>
                </div>
                <div className="single-book-col">
                  <span className="font-semibold flex">
                    <img
                      className="relative w-5 h-5 overflow-hidden shrink-0"
                      alt=""
                      src="/location7.svg"
                    />
                    Location
                  </span>
                  <span>Delhi, India</span>
                </div>
                <div className="single-book-col">
                  <span className="font-semibold flex">
                    <img
                      className="relative w-5 h-5 overflow-hidden shrink-0"
                      alt=""
                      src="/table.svg"
                    />
                    Booking Status
                  </span>
                  <span>Confirmed</span>
                </div>
                <div className="single-book-col">
                  <div className="rounded-md bg-red-600 m-2 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row py-[3px] px-12 items-center justify-center text-center text-sm text-white border-[1px] border-solid border-button-stroke">
                    <div className="font-semibold">Cancel Booking</div>
                  </div>
                  <div className="rounded-md bg-darkslateblue-100 m-2 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row py-[3px] px-3.5 items-center justify-center text-center text-sm text-white border-[1px] border-solid border-button-stroke">
                    <div className="">{`View & Manage`}</div>
                  </div>
                </div>
              </div>
            </div> */}
            {upcomingBooking.map((u) => {
              return (
                <div className="upcoming-booking">
                  <div className="single-book">
                    <div className="single-book-col">
                      <span className="font-semibold flex">
                        <img
                          className="relative w-5 h-5 overflow-hidden shrink-0"
                          alt=""
                          src="/passport.svg"
                        />
                        Product
                      </span>
                      <span className="font-semibold inline-block font-medium text-orange-800">
                        {u.option.name}
                      </span>
                    </div>
                    <div className="single-book-col">
                      <span className="font-semibold text-sm flex">
                        <img
                          className="relative w-5 h-5 overflow-hidden shrink-0"
                          alt=""
                          src="/date4.svg"
                        />
                        Date
                      </span>
                      <span>{u.date}</span>
                    </div>
                    <div className="single-book-col">
                      <span className="font-semibold flex">
                        <img
                          className="relative w-5 h-5 overflow-hidden shrink-0"
                          alt=""
                          src="/location7.svg"
                        />
                        Location
                      </span>
                      <span>Delhi, India</span>
                    </div>
                    <div className="single-book-col">
                      <span className="font-semibold flex">
                        <img
                          className="relative w-5 h-5 overflow-hidden shrink-0"
                          alt=""
                          src="/table.svg"
                        />
                        Booking Status
                      </span>
                      <span>{u.status}</span>
                    </div>
                    <div className="single-book-col">

                      <div className="rounded-md bg-darkslateblue-100 m-2 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row py-[3px] px-3.5 items-center justify-center text-center text-sm text-white border-[1px] border-solid border-button-stroke">
                        <div className="">{`View & Manage`}</div>
                      </div>
                      <div
                        onClick={
                          () => {
                            cancelBookings(u.activity)
                          }
                        }
                        className="rounded-md bg-red-600 m-2 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row py-[3px] px-12 items-center justify-center text-center text-sm text-white border-[1px] border-solid border-button-stroke">
                        <div className="font-semibold">Cancel Booking</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="completed-booking">
              <table>
                <tr className="tr">
                  <th className="text-sm font-medium">Booking Ref Number</th>
                  <th className="text-sm font-medium">Trip Details</th>
                  <th className="text-sm font-medium">Journey Date</th>
                  <th className="text-sm font-medium">Booking Date</th>
                  <th className="text-sm font-medium">Booking Status</th>
                  <div className="text-sm font-medium">View and Manage</div>
                </tr>

                {historyBooking.map((h) => {
                  return (
                    <tr className="tr">
                      <td className="font-medium text-orange-800">
                        {h.option.name}
                      </td>
                      <td className="font-medium">{h.option.description}</td>
                      <td className="font-medium">{h.date}</td>
                      <td className="font-medium">{h.createdAt}</td>
                      <td className="font-medium">{h.status}</td>
                      <div className=" rounded-md bg-darkslateblue-100 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row py-[3px] px-3.5 items-center justify-center text-center text-sm text-white border-[1px] border-solid border-button-stroke">
                        View and Manage
                      </div>
                    </tr>
                  );
                })}
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
