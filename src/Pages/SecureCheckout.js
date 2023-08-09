import React from "react";
import "./securecheckout.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoader } from "../redux/loaderSlice";
import { Form, message, Input } from "antd";
import { createBooking } from "../apiCalls/booking";

export default function SecureCheckout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    selectedActivity,
    selectedOption,
    adults,
    infants,
    date,
    selectedTime,
    activityId,
  } = location.state || {};

  console.log(selectedActivity, "selected option");

  const numberRange = Array.from(
    { length: infants + adults },
    (_, index) => index + 1
  );
  console.log(
    selectedOption,
    adults,
    infants,
    "data" + date,
    selectedTime,
    activityId
  );
  const ColoredLine = ({ color }) => (
    <hr
      className="line-break"
      style={{
        color: color,
        backgroundColor: color,
        height: 4,
      }}
    />
  );
  console.log(selectedTime, "selectedime");
  const onFinish = async (values) => {
    const travellerDetails = [];
    for (let i = 1; i <= numberRange.length; i++) {
      const firstName = values[`firstName${i}`];
      const lastName = values[`lastName${i}`];
      travellerDetails.push({ firstName, lastName });
    }
    const totalPrice = +selectedOption.unitPrice * (+adults + infants);

    const formData = {
      contactDetails: {
        email: values.email,
        firstName: values.firstname,
        lastName: values.lastname,
        phoneNumber: values.mobile,
      },
      option: {
        name: selectedOption.name,
        description: selectedOption.description,
        unitPrice: selectedOption.unitPrice,
        time: selectedTime,
      },
      pickupLocation: values.pickupLocation,
      promoCode: values.promoCode,
      travellerDetails,
      activity: activityId,
      quantity: adults + infants,
      totalPrice: totalPrice,
      date: date,
    };
    console.log(selectedOption, "selectedOption");

    try {
      dispatch(setLoader(true));
      const response = await createBooking(formData);
      console.log(response, "response");
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        console.log("success");
        navigate("/securepay", {
          state: {
            data: response.booking,
            selectedActivity: selectedActivity,
          },
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      console.log(error.message, "error");
    }
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
      <Form onFinish={onFinish}>
        <div className="secure-checkout-form">
          <h1>Secure Checkout</h1>
          <h2>Contact Detail</h2>
          <div className="contact-detail-form">
            <div>
              <Form.Item noStyle name="firstname" label="First Name">
                <label>First Name</label>

                <Input required placeholder="John" />
              </Form.Item>
              <Form.Item noStyle name="lastname" label="Last Name">
                <label>Last Name</label>
                <Input required placeholder="Kevin" />
              </Form.Item>
            </div>
            <div>
              <Form.Item name="email" noStyle label="Email">
                <label>Email</label>

                <Input required placeholder="johnkevin@gmail.com" />
              </Form.Item>
              <Form.Item noStyle name="mobile" label="Mobile">
                <label>Mobile</label>
                <Input required placeholder="John" />
              </Form.Item>
            </div>
          </div>
          <h2>Traveler Detail</h2>
          <div className="traveler-detail-form">
            {numberRange.map((i) => {
              return (
                <>
                  <div className="traveler-field">
                    <Form.Item
                      name={`firstName${i}`}
                      noStyle
                      label="First Name"
                      key={`travlerName${i}`}>
                      <label>First Name</label>
                      <Input placeholder="John" />
                    </Form.Item>
                  </div>
                  <div className="traveler-field">
                    <Form.Item
                      noStyle
                      name={`lastName${i}`}
                      label="Last Name"
                      key={`travelerMobile${i}`}>
                      <label>Last Name</label>
                      <Input placeholder="Kevin" />
                    </Form.Item>
                  </div>
                </>
              );
            })}
          </div>
          ;<h2>Pickup Point</h2>
          <div className="last-detail-form">
            <Form.Item name="pickupLocation" noStyle label="Pickup Location">
              <label>Pickup Location</label>
              <Input placeholder="Enter your pickup location" />
            </Form.Item>
          </div>
          <h2>Enter Promo (Coupon) Code</h2>
          <div className="last-detail-form">
            <Form.Item noStyle name="promoCode">
              <label>Promo Code</label>
              <Input
                type="text"
                placeholder="Enter Coupon code if you have any"
              />
            </Form.Item>
          </div>
          <button className="next-btn rounded-lg bg-darkslateblue-100 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] box-border w-[501px] flex flex-row py-4 px-8 items-center justify-center cursor-pointer text-white font-helvetica border-[1px] border-solid border-button-stroke">
            Next
          </button>
        </div>
      </Form>
      {/* selectedOption, adults, infants, date, selectedTime */}
      <div className="review-order-detail">
        <h2>Review order details</h2>
        <div className="review-order-card">
          <div className="review-order-img">
            <img src={selectedActivity.images[0]} alt="" />
          </div>
          <div className="review-order-description">
            <span className="font-bold">{selectedOption.name}</span>
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
          <img className="pr-2" src="/group3.svg" alt="" /> {adults + infants}
        </div>
        <div className="font-bold flex flex-row">
          <img className="pr-2" src="/date3.svg" alt="" />{" "}
          {date.toLocaleDateString()}
        </div>
        <div className="font-bold flex flex-row">
          <img className="pr-2" src="/crosscircle.svg" alt="" /> Non Refundable
        </div>
        <div className="review-order-cost py-10">
          <span className="font-bold">Total</span>
          <div className="review-order-cost-number">
            <span className="text-lg font-bold text-right">
              ₹{(selectedOption.unitPrice * (adults + infants)).toFixed(2)}
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
