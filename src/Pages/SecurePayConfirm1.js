import React, { useEffect } from "react";
import "./securecheckout.css";
import { useLocation, useNavigate } from "react-router-dom";
import useSelection from "antd/es/table/hooks/useSelection";
import { useSelector } from "react-redux";
const { format } = require("date-fns");

const formattedDate = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date)) {
    return "Invalid Date";
  }

  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export default function SecurePayConfirm1() {
  const location = useLocation();
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  console.log(location.state.data);
  const { data, selectedActivity } = location.state || {};
  console.log("data ", data);
  console.log("selected ", selectedActivity);
  console.log("user ", user);
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
  useEffect(() => {}, [user]);
  return (
    <div className="SecureCheckoutConfirm">
      <div className="navbar-head">
        <div className="navbar-logo p-10">
          <img
            className="overflow-hidden cursor-pointer"
            alt=""
            src="/gumo-re-indiafinal-11.svg"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <span>Booking date : {data.createdAt}</span>
      <h1>
        Thanks for your Booking{" "}
        <span style={{ color: "lightgreen" }}> Your Booking is Confirmed!</span>
      </h1>
      <h2>
        We’ve sent the booking confirmation voucher & ticket to
        {selectedActivity.email}
      </h2>
      <h1>{formattedDate(data.date)}</h1>

      <ColoredLine color="black" />
      <div className="booked-data">
        <div className="booked-data-info font-bold">
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
            {selectedActivity.category.name} <br />
            {formattedDate(data.date)} <br />
            {Date(data.createdAt)} <br />
            {selectedActivity.firstName} {selectedActivity.lastName}
            <br />
            {selectedActivity.pickupLocation} <br />₹
            {data.totalPrice.toFixed(0)}
            <br />
          </div>
        </div>
        <div className="booked-data-card">
          <img src={selectedActivity.images[0]} alt="" />
        </div>
      </div>
      {/* optional 1 */}
      {/* <h1>PriceBreakdown</h1>
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
      </select> */}
      <br />
      <button
        className="cancel-booking"
        onClick={() =>
          navigate("/securepayconfirm2", {
            state: {
              data: data,
              selectedActivity: selectedActivity,
            },
          })
        }>
        Cancel Booking
      </button>
      {/* <span>Don’t Cancel this booking</span> */}
      <div className="footer-copyright">
        © 2023 GhumoRe, All rights reserved.
      </div>
    </div>
  );
}
