import { message } from "antd";
import React, { useEffect } from "react";
import { GetCurrentUser } from "../apiCalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/loaderSlice";
import { setUser } from "../redux/userSlice";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import DrawerAppBar from "../Components/Navbar/DrawerAppBar";
import "../Components/Navbar/navbar.css";

function ProtectedPage({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateToken = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetCurrentUser();
      dispatch(setLoader(false));
      if (response.success) {
        dispatch(setUser(response.user));
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      console.log(error.message);
      navigate("/");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    }
  }, []);
  return (
    <>

      <div className="yellow-bar">
        Book tours, attractions & things to do with GHUMORE
      </div>
      <DrawerAppBar />
      {/*body*/}
      <div>
        <div> {children} </div>
      </div>
      <Footer />
    </>
  );
}

export default ProtectedPage;
