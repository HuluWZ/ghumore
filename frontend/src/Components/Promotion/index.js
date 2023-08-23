import React from "react";
import { useNavigate  } from 'react-router-dom';
import "./promotion.css";

export default function Promotion() {
    const history = useNavigate ();

  const handleClick = () => {
    history('search?category=&location=&activity=');
  };

  return (
    <div className="Promotion">
      <h1>Promotion & Exclusive Offers</h1>
      <div className="promotion-cards">
        <div className="promotion-card">
          <div className="promotion-card-image">
            <img
              className="rounded-md w-[134px] h-[134px] object-cover"
              alt=""
              src="/image1@2x.png"
            />
          </div>
          <div className="promotion-card-detail">
            <div className="inline-block w-[249px]">{`Get Up to 25% OFF* on Flights, Hotels & Holidays`}</div>
            <div className="text-smi leading-[16px] text-darkslategray-100 inline-block w-[244px]">{`& get your next refreshing break sorted!`}</div>
            <div className=" rounded-md bg-sandybrown-100 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row py-1.5 px-6 items-center justify-center text-center text-sm border-[1px] border-solid border-button-stroke">
              {/* <div className="relative leading-[24px]">Book Now</div> */}
              <button className="relative  leading-[24px]" variant="contained" onClick={handleClick}>Book Now</button>
            </div>
          </div>
        </div>
        <div className="promotion-card">
          <div className="promotion-card-image">
            <img
              className="rounded-md w-[134px] h-[134px] object-cover"
              alt=""
              src="/image2@2x.png"
            />
          </div>
          <div className="promotion-card-detail">
            <div className="inline-block w-[249px]">{`Get Up to 25% OFF* on Flights, Hotels & Holidays`}</div>
            <div className="text-smi leading-[16px] text-darkslategray-100 inline-block w-[244px]">{`& get your next refreshing break sorted!`}</div>
            <div className=" rounded-md bg-sandybrown-100 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row py-1.5 px-6 items-center justify-center text-center text-sm border-[1px] border-solid border-button-stroke">
              {/* <div className="relative leading-[24px]">Book Now</div> */}
              <button className="relative  leading-[24px]" variant="contained" onClick={handleClick}>Book Now</button>

            </div>
          </div>
        </div>
        <div className="promotion-card">
          <div className="promotion-card-image">
            <img
              className=" rounded-md w-[134px] h-[134px] object-cover"
              alt=""
              src="/image1@2x.png"
            />
          </div>
          <div className="promotion-card-detail">
            <div className="leading-[22px] inline-block w-[249px]">{`Get Up to 25% OFF* on Flights, Hotels & Holidays`}</div>
            <div className="text-smi leading-[16px] text-darkslategray-100 inline-block w-[244px]">{`& get your next refreshing break sorted!`}</div>
            <div className=" rounded-md bg-sandybrown-100 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row py-1.5 px-6 items-center justify-center text-center text-sm border-[1px] border-solid border-button-stroke">
              <button className="relative  leading-[24px]" variant="contained" onClick={handleClick}>Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
