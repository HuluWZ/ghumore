import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
// import "./registers.css";
// import "./profile.css";
import "./cartt.css";
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
import { cancelBooking, getMyCartBookings, deleteBooking } from "../apiCalls/booking";

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
  const [historyBooking, setHistoryBooking] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = upcomingBooking.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(upcomingBooking.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
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
    return null;
  }

  return (

    <div className="">
      {/* banner image  */}
      <div className="  md:w-[1540px] w-[423px] min-h-[60rem] md:h-[90rem] flex flex-col items-center overflow-x-hidden">
        <div className=" Poster  h-[400px] bg-[url(/public/image90@2x.png)] bg-cover bg-no-repeat bg-[top]  w-[1300px] font-lato">
          <div className="font-semibold [text-shadow:0px_2px_3px_rgba(0,_0,_0,_0.25)]">
            Cart
          </div>

        </div>
        {/* the contents of profile */}
        <div>
          <div className=" 
           px-10 md:w-[1240px] md:h-[1000px] my-4   flex md:flex-row gap-4 flex-col md:mt-12">
            <div
              className="  md:w-[90%] 
               w-[380px] md:h-[900px] md:m-[1rem]"
              id="my-booking-form"
            >
              <h2 className=" text-[35px]">{historyBooking}  Items In Cart</h2>
              {/* pc web view  */}
              <div className="bookingss  md:pt-20px md:px-40px hidden    md:block">
                {upcomingBooking.map((u) => {
                  return (
                    <div className="upcoming-booking" key={u.id}>
                      <div className="single-book">
                        <div className="single-book-col">
                          <span className="font-semibold flex">
                            <img
                              className=" w-5 h-5 overflow-hidden shrink-0"
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
                        <div className="single-book-col ml-2 mr-2">
                          <span className="font-semibold flex mr-4">
                            <img
                              className=" w-5 h-5 overflow-hidden shrink-0"
                              alt=""
                              src="/location7.svg"
                            />
                            Location
                          </span>
                          <span>{u.activity.location.name}</span>
                        </div>
                        <div className="single-book-col">
                          <span className="font-semibold flex">
                            <img
                              className=" w-5 h-5 overflow-hidden shrink-0"
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
                            onClick={() => {
                              cancelBookings(u.activity);
                            }}
                            className="rounded-md bg-red-600 m-2 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row py-[3px] px-12 items-center justify-center text-center text-sm text-white border-[1px] border-solid border-button-stroke"
                          >
                            <div className="font-semibold">Cancel Booking</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Pagination */}
                <div className="pagination flex flex-row gap-12 text-xl text-orange-500 ml-32 mt-12">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={currentPage === i + 1 ? 'active' : ''}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>




              </div>


              {/* mobile view  */}
              <div className="bookings  md:py-20px md:px-40px md:hidden">
                {currentItems.map((u) => {
                  return (
                    <div className="upcoming-booking" key={u.id}>
                      <div className="single-book">
                        <div className="single-book-col">
                          <span className="font-semibold flex">
                            <img
                              className=" w-5 h-5 overflow-hidden shrink-0"
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
                          <div className="rounded-md bg-darkslateblue-100 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row py-[3px] px-3.5 items-center justify-center text-center text-sm text-white border-[1px] border-solid border-button-stroke">
                            <div className="">{`View & Manage`}</div>
                          </div>
                          <div
                            onClick={() => {
                              cancelBookings(u.activity);
                            }}
                            className="rounded-md bg-red-600 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row py-[3px] px-12 items-center justify-center text-center text-sm text-white border-[1px] border-solid border-button-stroke"
                          >
                            <div className="font-semibold">Cancel Booking</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Pagination */}
                <div className="pagination flex flex-row gap-3 text-orange-500 ml-32 mt-12">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={currentPage === i + 1 ? 'active' : ''}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>




              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
    // <div className="Profile">
    //   <div className="header-contact-us mt-24 Poster w-[1920px] h-[400px] bg-[url(/public/image90@2x.png)] bg-cover bg-no-repeat bg-[top] font-lato">
    //     <div className="font-semibold [text-shadow:0px_2px_3px_rgba(0,_0,_0,_0.25)]">
    //       <div>
    //         My Cart
    //       </div>
    //     </div>
    //   </div>
    //   {/* <Navbar /> */}
    //   <br />
    //   <br />
    //   <br />
    //   <div className="profile-form-container mt-64">
    //     <div className="profile-form-navbar">
    //       {/* <div className="profile-image"></div> */}
    //       <h2>Cart</h2>
    //       <div className="profile-form-navbar-options">
    //         <button
    //           onClick={() => handleChangeForm("my-booking-form")}
    //           className={`form-option-btn ${activeForm === "my-booking-form" ? "active" : "active"
    //             }`}
    //           type="button">
    //           My Cart
    //         </button>


    //       </div>
    //     </div>
    //     <div
    //       className="right-sider booking-container"
    //       id="my-booking-form"
    //       style={{
    //         display: activeForm === "my-booking-form" ? "block" : "block",
    //       }}>
    //       <h2>{historyBooking}  Items In Cart</h2>
    //       <div className="bookings">

    //         {upcomingBooking.map((u) => {
    //           return (
    //             <div className="upcoming-booking">
    //               <div className="single-book">
    //                 <div className="single-book-col">
    //                   <span className="font-semibold flex">
    //                     <img
    //                       className="relative w-5 h-5 overflow-hidden shrink-0"
    //                       alt=""
    //                       src="/passport.svg"
    //                     />
    //                     Product
    //                   </span>
    //                   <span className="font-semibold inline-block font-medium text-orange-800">
    //                     {u.option.name}
    //                   </span>
    //                 </div>
    //                 <div className="single-book-col">
    //                   <span className="font-semibold text-sm flex">
    //                     <img
    //                       className="relative w-5 h-5 overflow-hidden shrink-0"
    //                       alt=""
    //                       src="/date4.svg"
    //                     />

    //                   </span>
    //                   <span>{new Date(u.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
    //                 </div>
    //                 <div className="single-book-col">
    //                   <span className="font-semibold flex">
    //                     <img
    //                       className="relative w-5 h-5 overflow-hidden shrink-0"
    //                       alt=""
    //                       src="/location7.svg"
    //                     />

    //                   </span>
    //                   <span>Delhi, India</span>
    //                 </div>
    //                 <div className="single-book-col">
    //                   <span className="font-semibold flex">
    //                     <img
    //                       className="relative w-5 h-5 overflow-hidden shrink-0"
    //                       alt=""
    //                       src="/table.svg"
    //                     />

    //                   </span>
    //                   <span>{u.status}</span>
    //                 </div>
    //                 <div className="single-book-col">

    //                   <div className="rounded-md bg-red-600 m-2 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row py-[3px] px-3.5 items-center justify-center text-center text-sm text-white border-[1px] border-solid border-button-stroke">
    //                     <div className=""
    //                       onClick={
    //                         () => {
    //                           deleteBooking(u._id)
    //                         }
    //                       }
    //                     >Delete Booking
    //                     </div>
    //                   </div>
    //                   <div
    //                     onClick={
    //                       () => {
    //                         cancelBookings(u.activity)
    //                       }
    //                     }
    //                     className="rounded-md  bg-darkslateblue-100 m-2 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row py-[3px] px-12 items-center justify-center text-center text-sm text-white border-[1px] border-solid border-button-stroke">
    //                     <div className="font-semibold">Cancel Booking</div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           );
    //         })}


    //       </div>
    //     </div>
    //     <div
    //       className="right-sider"
    //       id="log-out-form"
    //       style={{
    //         display: activeForm === "log-out-form" ? "block" : "none",
    //       }}>
    //       <h2>Log Out</h2>
    //       <form onSubmit={handlePasswordSubmit} className="form">
    //       </form>
    //     </div>
    //   </div>

    //   <br />
    //   <br />
    //   <br />
    // </div>
  );
}
