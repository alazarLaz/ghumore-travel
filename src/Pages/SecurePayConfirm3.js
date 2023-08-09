import React, { useEffect } from "react";
import "./securecheckout.css";
import { useLocation, useNavigate } from "react-router-dom";
import useSelection from "antd/es/table/hooks/useSelection";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/loaderSlice";
import { cancelBooking, updateBooking } from "../apiCalls/booking";
import { message } from "antd";
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

export default function SecurePayConfirm3() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
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
  const updateBookings = async (id) => {
    try {
      dispatch(setLoader(true));
      const response = await updateBooking(id, { status: "Pending" });
      console.log("response", response.message);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <span>Booking date : {data.createdAt}</span>
      <h1>
        <span style={{ color: "red" }}> Your Booking is Cancelled!</span>
      </h1>
      <h2>
        We’ll send you an email confirming your cancellation to
        {selectedActivity.email}
      </h2>
      <h1 className="line-through">{formattedDate(data.date)}</h1>

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
          <div className="booked-data-info-body" style={{ color: "green" }}>
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
      <h2>Price breakdown</h2>
      <div className="booked-data-cancel-info font-semibold">
        <div className="booked-data-info-header">
          Total Price : <br />
          <span className="h-1 w-full font-bold text-red-600">
            Canclation Fee : <br />
          </span>
          Refundable Amount : <br />
        </div>
        <div className="booked-data-info-body">
          ₹{data.totalPrice.toFixed(0)} <br />
          <span className="h-1 w-full font-bold text-red-600">
            ₹{data.totalPrice.toFixed(0) * (3 / 10)} <br />
          </span>
          ₹{data.totalPrice.toFixed(0) - data.totalPrice.toFixed(0) * (3 / 10)}{" "}
          <br />
        </div>
      </div>
      {/* <h2>Reason For Cancelling</h2>
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
        <option value="rigatoni">Better Deal Elsewhere</option>
        <option value="dave">Change in Plans</option>
        <option value="pumpernickel">Unsatisfactory Customer Service</option>
        <option value="reeses">Inaccurate or Misleading Information</option>
        <option value="reeses">Technical Issues</option>
      </select> */}
      <br />
      <div className="flex">
        <button
          className="book-again"
          onClick={() => {
            updateBookings(data._id);
            navigate("/securepayconfirm2", {
              state: {
                data: data,
                selectedActivity: selectedActivity,
              },
            });
          }}>
          Book Again
        </button>
        <span
          onClick={() => navigate("/")}
          className="my-[50px] mx-[20px] text-blue-800">
          Esplore with other experiences
        </span>
      </div>
      <div className="footer-copyright">
        © 2023 GhumoRe, All rights reserved.
      </div>
    </div>
  );
}
