import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
// import "./registers.css";
import "./profile.css";
import { Form, message, Input,Button } from "antd";
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
import { cancelBooking, getMyCartBookings ,deleteBooking} from "../apiCalls/booking";

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
      console.log(response,values, " Update Response");
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
    console.log(" Name ",name,value,e.target)
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(" Data ",data)
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
  const [historyBooking, setHistoryBooking] = useState(0);

  const getMyBooking = async () => {
    const token = localStorage.getItem("token"); // Replace with how you store the authentication token

    try {
      const response = await getMyCartBookings(token);
      if (response.success) {
        setHistoryBooking(response["totalCart"]);
        setUpcomingBooking(response["cart"]);
        // console.log("my booking history", historyBooking);
        // console.log("my booking upcoming", upcomingBooking);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const cancelBookings = async (id,)=>{
    const token = localStorage.getItem("token")
    try {
      dispatch(setLoader(true))
      const response = await cancelBooking(id);
      console.log("response",response.message)
      dispatch(setLoader(false))
      if (response.success){
        message.success(response.message)
      }
      else{
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
    <div className="Profile">
      <div className="header-contact-us mt-24 Poster w-[1920px] h-[400px] bg-[url(/public/image90@2x.png)] bg-cover bg-no-repeat bg-[top] font-lato">
      <div className="font-semibold [text-shadow:0px_2px_3px_rgba(0,_0,_0,_0.25)]">
      <div>
          My Cart
      </div>
        </div>
      </div>
      {/* <Navbar /> */}
      <br />
      <br />
      <br />
      <div className="profile-form-container">
        <div className="profile-form-navbar">
          <div className="profile-image"></div>
          <h2>Cart</h2>
          <div className="profile-form-navbar-options">
            <button
              onClick={() => handleChangeForm("my-booking-form")}
              className={`form-option-btn ${
                activeForm === "my-booking-form" ? "active" : "active"
              }`}
              type="button">
              My Cart
            </button>
            
            {/* <button
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
            </button> */}
          </div>
        </div>
        <div
          className="right-sider booking-container"
          id="my-booking-form"
          style={{
            display: activeForm === "my-booking-form" ? "block" : "block",
          }}>
          <h2>{historyBooking}  Items In Cart</h2>
          <div className="bookings">
            {/* Add your code for the My Booking view form here (cloned from the profile detail form) */}
            {/* <h3>Cart</h3> */}
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
                        
                      </span>
                      <span>{new Date(u.date).toLocaleDateString('en-US', {year: 'numeric',month: 'long', day: 'numeric'})}</span>
                    </div>
                    <div className="single-book-col">
                      <span className="font-semibold flex">
                        <img
                          className="relative w-5 h-5 overflow-hidden shrink-0"
                          alt=""
                          src="/location7.svg"
                        />
                        
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
                         
                      </span>
                      <span>{u.status}</span>
                    </div>
                    <div className="single-book-col">
                      
                      <div className="rounded-md bg-red-600 m-2 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row py-[3px] px-3.5 items-center justify-center text-center text-sm text-white border-[1px] border-solid border-button-stroke">
                        <div className=""
                          onClick={
                            () => {
                              deleteBooking(u._id)
                            }
                          }
                        >Delete Booking
                        </div>
                      </div>
                      <div 
                      onClick={
                      ()=>{
                        cancelBookings(u.activity)
                      }
                      }
                      className="rounded-md  bg-darkslateblue-100 m-2 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row py-[3px] px-12 items-center justify-center text-center text-sm text-white border-[1px] border-solid border-button-stroke">
                        <div className="font-semibold">Cancel Booking</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* <div className="completed-booking">
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
            </div> */}
          </div>
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
