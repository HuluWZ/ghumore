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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  RegisterUser,
  UpdateUserProfile,
  changePassword,
} from "../apiCalls/users";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { logout } from "../redux/userSlice";
import {
  cancelBooking,
  getMyCartBookings,
  deleteBooking,
  getAllCart,
  deleteCart,
} from "../apiCalls/booking";

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
    // console.log(" FORMD ID = ", formId);
    setActiveForm(formId);
    // console.log(" FORM DATA ", activeForm);
  };

  const handlePasswordSubmit = async (values) => {
    // take data to submit
    // console.log(values);
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
      // console.log(response, "response passowrd change");
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      message.error(error.message);
      // console.log(error.message, "error");
    }
  };

  const handleError = () => {
    toast.error("not added to cart please try again");
  };
  const handleSuccess = () => {
    toast.success("deleted success");
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");

  const onFinish = async (values) => {
    // console.log("On Finish Called")
    values.phoneNumber = phone;
    // console.log(values, "finish");
    try {
      dispatch(setLoader(true));

      const response = await UpdateUserProfile(user._id, values);
      // console.log(response, values, " Update Response");
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        navigate("/");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      // console.log(error.message, "error");
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

  const [upcomingBooking, setUpcomingBooking] = useState([]);
  const [historyBooking, setHistoryBooking] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = upcomingBooking.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(upcomingBooking.length / itemsPerPage);



  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const resetPage = () => {
    setCurrentPage(1);
  };

  useEffect(() => {
    resetPage();
  }, [upcomingBooking]);

  const getMyBooking = async () => {
    const token = localStorage.getItem("token"); // Replace with how you store the authentication token
    // const response = await getAllCart(token);
    try {
      const response = await getAllCart(token);
      if (response.success) {
        setHistoryBooking(response["totalCart"]);
        setUpcomingBooking(response["cart"]);
        // console.log(upcomingBooking.length)
        // console.log('this is the one i am chekcking ', response.cart.category)
        // console.log("my booking history", historyBooking);
        // console.log("my booking upcoming", upcomingBooking);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    // Simulating an API call to fetch upcoming bookings
    // Replace this with your actual API call
    setTimeout(() => {
      // setCurrentBooking(upcomingBooking);
    }, 1000);
  }, []);




  const DeleteCart = async (id) => {
    try {
      dispatch(setLoader(true));
      const response = await deleteCart(id);
      console.log("comeon show me the response");

      dispatch(setLoader(false));
      if (response.success) {
        handleSuccess();
        message.success(response.message);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      message.error(error.message);
    }
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
  getMyBooking();

  if (!user) {
    return null;
  }

  return (
    <div className="">
      <div className="header-contact-us mb-[-50px] md:mt-7  Poster w-[1920px] h-[400px] bg-[url(/public/image90@2x.png)] bg-cover bg-no-repeat bg-[top] font-lato">
        <div className="font-semibold  [text-shadow:0px_2px_3px_rgba(0,_0,_0,_0.25)]">
          My Cart
        </div>
      </div>

      {/* <h1 className=" text-[40px] md:text-[60px] md:my-7 "> About  Company </h1> */}
      <div className=" h-[90%]">
        <div
          className=" 
           px-10 md:w-[1240px]  my-4   flex md:flex-row gap-4 flex-col md:mt-12"
        >
          <div
            className="  md:w-[90%] 
               w-[380px] md:h-[900px] md:m-[1rem]"
            id="my-booking-form"
          >
            <h2 className=" text-[35px]">{historyBooking} Items In Cart</h2>
            {/* pc web view  */}


            <div className="bookingss  md:pt-20px md:px-40px hidden    md:block">

              {currentItems.map((u) => {
                return (
                  <div className="upcoming-booking" key={u.activity._id}>
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
                          {u.activity.name}
                        </span>
                      </div>
                      <div className="single-book-col">
                        <span className="font-semibold text-sm flex">
                          <img
                            className=" w-5 h-5 overflow-hidden shrink-0"
                            alt=""
                            src="/date4.svg"
                          />
                          Duration
                        </span>
                        <span>{u.activity.duration} Days</span>
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
                        <div className="rounded-md bg-darkslateblue-100 hover:cursor-pointer m-2 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row py-[3px] px-3.5 items-center justify-center text-center text-sm text-white border-[1px] border-solid border-button-stroke">
                          <div
                            onClick={() => {
                              navigate("/select", {
                                state: { item: { ...u.activity } },
                              });
                            }}
                            className=""
                          >{`Book Now`}</div>
                        </div>
                        <div
                          onClick={() => {
                            DeleteCart(u.activity._id);
                          }}
                          className="rounded-md bg-red-600 m-2 hover:cursor-pointer shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row md:py-[3px] px-12 items-center justify-center text-center text-sm text-white border-[1px] border-solid border-button-stroke"
                        >
                          <div className="font-semibold">Delete</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Pagination */}
              <div className="pagination flex flex-row gap-12 text-orange-500 ml-32 mt-12">
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
                  <div className="upcoming-booking" key={u.activity._id}>
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
                          {u.activity.name}
                        </span>
                      </div>
                      <div className="single-book-col">
                        <span className="font-semibold text-sm flex">
                          <img
                            className="relative w-5 h-5 overflow-hidden shrink-0"
                            alt=""
                            src="/date4.svg"
                          />
                          Duration
                        </span>
                        <span>{u.activity.duration}</span>
                      </div>

                      <div>
                        <div className="single-book-col">
                          {/* <div className="rounded-md bg-darkslateblue-100 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row py-[3px] px-3.5 items-center justify-center text-center text-sm text-white border-[1px] border-solid border-button-stroke">
                            <div className="">{`Book now`}</div>
                          </div> */}
                          <div
                            onClick={() => {
                              navigate("/select", {
                                state: { item: { ...u.activity } },
                              });
                            }}
                            className=""
                          >{`Book Now`}</div>
                        </div>
                        <div
                          onClick={() => {
                            DeleteCart(u.activity._id);
                          }}
                          className="rounded-md bg-red-600 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row md:py-[3px] md:px-10 h-16 w-16 items-center justify-center text-center text-sm text-white border-[1px] border-solid border-button-stroke"
                        >
                          <div className="font-semibold">Delete </div>
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
                    className={currentPage === i + 1 ? "active" : ""}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}
