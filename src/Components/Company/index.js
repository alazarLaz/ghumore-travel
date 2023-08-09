import React from "react";
import "./company.css";

export default function Company() {
  return (
    <div className="Company">
      <div className="company-image">
        <img
          className=" rounded w-[725px] h-[477px] object-cover"
          alt=""
          src="/image8@2x.png"
        />
      </div>
      <div className="company-card flex flex-col items-start justify-start gap-[34px]">
        <h1>Our Company</h1>
        <div className="relative text-3xl  font-medium inline-block h-[158.85px]">
          GhumoRe India is an adventure tourism company founded in 20YY. Our
          vision is to be the most recognised and respected adventure business
          in India and in all over the world.
        </div>
        <div className="rounded-md bg-darkslateblue-100 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] box-border w-[182.96px] h-[65.96px] flex flex-row py-4 px-10 items-center justify-center text-xl border-[1px] border-solid border-button-stroke">
          <div className="relative">About Us</div>
        </div>
      </div>
    </div>
  );
}
