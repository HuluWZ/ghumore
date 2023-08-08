import React from "react";
import "./securecheckout.css";
import { useLocation } from "react-router-dom";

export default function SecurePayConfirm() {
  const location = useLocation()
  console.log(location.state.data)
  const { data } = location.state || {}
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
  return (
    <div className="SecureCheckoutConfirm">
      <span>Booking date : {data.createdAt}</span>
      <h1>
        Thanks for your Booking{" "}
        <span style={{ color: "lightgreen" }}> Your Booking is Confirmed!</span>
      </h1>
      <h2>
        We’ve sent the booking confirmation voucher & ticket to
        {data.contactDetails.email}
      </h2>
      <h1>{data.date}</h1>

      <ColoredLine color="black" />
      <div className="booked-data">
        <div className="booked-data-info">
          <div className="booked-data-info-header">
            Product/Activity/Tour Name : <br />
            Category : <br />
            Travel Date : <br />
            Booking Reference :<br />
            Travelers (Persons) :<br />
            Departing from : <br />
            Total Price :<br />
          </div>
          <div className="booked-data-info-body">
            {data.option.name} <br />
            lorem epsum <br />
            {data.date} <br />
            {data.createdAt} <br />
            {data.contactDetails.firstName} {data.contactDetails.lastName}<br />
            {data.pickupLocation} <br />
            {data.totalPrice.toFixed(0)}<br />
          </div>
        </div>
        <div className="booked-data-card"></div>
      </div>
      {/* optional 1 */}
      <h1>PriceBreakdown</h1>
      <div className="booked-data-cancel-info">
        <div className="booked-data-info-header">
          Total Price : <br />
          Canclation Fee : <br />
          Refundable Amount : <br />
        </div>
        <div className="booked-data-info-body">
        {data.totalPrice.toFixed(0)} <br />
          {data.totalPrice.toFixed(0) * (3/10) } <br />
          {data.totalPrice.toFixed(0) - (data.totalPrice.toFixed(0) * (3/10))} <br />
        </div>
      </div>
      <h1>Reason For Cancelling</h1>
      <h2>Reason</h2>
      <label for="dog-names">Select Reason</label>
      <br />
      <select
        style={{
          width: "50rem",
          padding: "10px 40px",
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
      <br />
      <button className="cancel-booking">Cancel Booking</button>
      <span>Don’t Cancel this booking</span>
      <div className="footer-copyright">
        © 2023 GhumoRe, All rights reserved.
      </div>
    </div>
  );
}
