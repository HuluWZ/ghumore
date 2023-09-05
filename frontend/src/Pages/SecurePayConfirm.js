import React from "react";
import "./securecheckout.css";
import { useLocation, useNavigate } from "react-router-dom";
import DrawerAppBar from "../Components/Navbar/DrawerAppBar";
import Footer from "../Components/Footer";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default function SecurePayConfirm() {
  const location = useLocation()
  console.log(location.state)
  const navigate = useNavigate()
  const { data } = location.state || {}

  const handleCancelError = () => {
    toast.error('Canot cancel this booking now')
  }
  const handleCancelSuccess = () => {
    toast.success('successfuly Canceled!')
  }

  const ColoredLine = ({ color }) => (
    <hr
      className="line-break"
      style={{
        color: color,
        backgroundColor: color,
        height: 1,
      }}
    />
  );
  const cancelBooking = () => {
    handleCancelSuccess()
    navigate('/')
  }
  return (
    <div className=" w-screen">
      <DrawerAppBar />

      <div className=" SecureCheckoutConfirm">
        <span>Booking date : {data.createdAt}</span>
        <h1 className=" text-[40px]">
          Thanks for your Booking{" "}
          <span style={{ color: "lightgreen" }}> Your Booking is Confirmed!</span>
        </h1>
        <h2>
          We’ve sent the booking confirmation voucher & ticket to
          {data.contactDetails.email}
        </h2>
        <h1>{data.date}</h1>
        {/*  */}

        <ColoredLine color="black" />

        {/* optional 1 */}
        <h1 className=" text-[40px]">Price-Breakdown</h1>
        <div className="booked-data-cancel-info justify-center items-center">
          <div className="booked-data-info-header">
            Total Price : <br />
            Canclation Fee : <br />
            Refundable Amount : <br />
          </div>
          <div className="booked-data-info-body">
            {data.totalPrice.toFixed(2)} <br />
            {(data.totalPrice.toFixed(2) * (3 / 10).toFixed(2)).toFixed(2)} <br />
            {(data.totalPrice.toFixed(2) - (data.totalPrice.toFixed(2) * (3 / 10).toFixed(2))).toFixed(2)} <br />
          </div>
        </div>
        <h1 className=" text-[40px]">Reason For Cancelling</h1>

        <label for="dog-names">Select Reason</label>
        <div className=" flex justify-center">
          <select
            style={{
              width: "20rem",
              // padding: "10px 40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "white",
              border: "1px solid black",
              borderRadius: "5px",
            }}
            name="reason"
            id="dog-names">
            <option value="rigatoni">Rigatoni</option>
            <option value="dave">Dave</option>
            <option value="pumpernickel">Pumpernickel</option>
            <option value="reeses">Reeses</option>
          </select>
        </div>
        <br />
        <button className="cancel-booking" onClick={cancelBooking}>Cancel Booking</button>
        <span>Don’t Cancel this booking</span>
        <div className="footer-copyright">
          © 2023 GhumoRe, All rights reserved.
        </div>
      </div>
      <Footer />
    </div>
  );
}
