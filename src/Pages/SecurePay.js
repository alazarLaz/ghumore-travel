import React, { useState } from "react";
import "./securecheckout.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function SecurePay() {
  const [selectOption, setSelectedOption] = useState("");
  const location = useLocation();
  const { selectedActivity, data } = location.state || {};

  const navigate = useNavigate();
  console.log(data, "data");
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
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any necessary logic with the selected option
    console.log("Selected option:", selectOption);
    navigate("/securepayconfirm1", {
      state: {
        data: data,
        selectedActivity: selectedActivity
      },
    });
  };
  return (
    <div className="SecureCheckoutPage">
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
      <div className="secure-checkout-form">
        <h1>Secure Checkout</h1>

        <h2>Pay with</h2>
        <form className="pay-form" onSubmit={handleSubmit}>
          <div className="pay-option">
            <input
              type="radio"
              id="option1"
              name="options"
              value="Visa"
              checked={selectOption === "Visa"}
              onChange={() => setSelectedOption("Visa")}
            />

            {/* <img
              className="relative w-[46px] h-[46px]"
              alt=""
              src="/select-plan-radio-button.svg"
            /> */}
            <img
              className="relative rounded-lg w-[60px] h-[58px] object-cover"
              alt=""
              src="/rectangle-631@2x.png"
            />
            <img
              className="relative rounded-lg w-[60px] h-[58px] object-cover"
              alt=""
              src="/rectangle-64@2x.png"
            />
            <label htmlFor="option1" className="font-semibold">
              {/* <div className="relative tracking-[0.1px] leading-[18px] font-semibold"> */}
                Debit/Credit Card
              {/* </div> */}
            </label>
          </div>
          <br />
          <div className="pay-option">
            <input
              type="radio"
              id="option2"
              name="options"
              value="Paytm"
              checked={selectOption === "Paytm"}
              onChange={() => setSelectedOption("Paytm")}
            />
            <img
              className=" w-[10%] rounded-lg object-cover"
              alt=""
              src="/rectangle-63@2x.png"
            />
            <label htmlFor="option2" className="font-semibold">Paytm</label>
            
          </div>
          <br />
          <br />
          <input className="book-now-input font-semibold rounded-lg bg-darkslateblue-100 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] box-border w-[70%] flex flex-row py-4 px-8 items-center justify-center cursor-pointer text-white font-helvetica border-[1px] border-solid border-button-stroke" type="submit" value="Book Now" />
        </form>
      </div>
      <div className="review-order-detail">
        <h2>Review order details</h2>
        <div className="review-order-card">
          <div className="review-order-img">
            <img src={selectedActivity.images[0]} alt="" />
          </div>
          <div className="review-order-description">
            <span className="font-bold">{data.option.name}</span>
            <div className="star">
              {[0, 1, 2, 3, 4].map(() => (
                <img
                  className="relative w-[15.55px] h-[15.64px]"
                  alt=""
                  src="/magicstar20.svg"
                />
              ))}
              {selectedActivity.rating}
            </div>
          </div>
        </div>
        <div className="font-bold flex flex-row">
          <img className="pr-2" src="/group3.svg" alt="" /> {data.quantity}
        </div>
        <div className="font-bold flex flex-row">
          <img className="pr-2" src="/date3.svg" alt="" /> {data.date}
        </div>
        <div className="font-bold flex flex-row">
          <img className="pr-2" src="/crosscircle.svg" alt="" /> Non Refundable
        </div>
        <div className="review-order-cost py-10">
          <span className="font-bold">Total</span>
          <div className="review-order-cost-number">
            <span className="text-lg font-bold text-right">
              ₹{data.totalPrice.toFixed(2)}
            </span>
            <span className="text-right text-sm">
              (Including all taxes and booking fees)
            </span>
          </div>
        </div>
        {/* create a line under the review-order-cost div */}
        <ColoredLine color="black" />

        <li>Lowest price guarantee</li>
        <li>Find it cheaper? We'll refund the difference</li>
        <li>Privacy protection</li>
        <li>We use SSL encryption to keep your data secure</li>
        <li>24/7 global support</li>
        <li>Get the answers you need, when you need them</li>
        <li>Give us a call</li>
        <li>We’d be happy to help you out with your booking</li>
        <li>Call now: 1800-0123-456-7890</li>
      </div>
      <div className="footer-copyright">
        © 2023 GhumoRe, All rights reserved.
      </div>
    </div>
  );
}
