import React from "react";
import './baliexperience.css'
export default function BaliExperience() {
  return (
    <div className="BaliExperience rounded-[20px] w-[1863px] h-[848px] bg-[url(/public/one-of-top-banner@3x.png)] bg-cover bg-no-repeat bg-[top] text-center text-xl font-lato">
      <h1>Bali Experience</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore
        expedita magnam modi autem perspiciatis dolores voluptas rerum quam
        assumenda architecto.
      </p>
      <div className="experience-buttons">
        {/* <span className="rounded-lg bg-darkorange flex flex-row py-4 px-10 items-center justify-center border-[1px] border-solid border-button-stroke">Book Now</span>
        <span className="rounded-lg bg-white flex flex-row py-4 px-10 items-center justify-center text-darkslategray-200 border-[1px] border-solid border-button-stroke">Show Detail</span> */}
        <div className="experience-buttons">
          <div className=" rounded-lg bg-darkorange flex flex-row py-4 px-10 items-center justify-center border-[1px] border-solid border-button-stroke">
            <b className="relative">Book Now</b>
          </div>
          <div className=" rounded-lg bg-white flex flex-row py-4 px-10 items-center justify-center text-darkslategray-200 border-[1px] border-solid border-button-stroke">
            <b className="relative">Show Details</b>
          </div>
        </div>
      </div>
    </div>
  );
}
