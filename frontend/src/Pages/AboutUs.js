import React from "react";

// import "./company.css";
import "../Components/Company/company.css"
import { LazyLoadImage } from "react-lazy-load-image-component";
export default function AboutUs() {
  return (
    <div className="">
      <div className="header-contact-us mb-[-50px] md:mt-7  Poster w-[1920px] h-[400px] bg-[url(/public/image114@2x.png)] bg-cover bg-no-repeat bg-[top] font-lato">
        <div className="font-semibold  [text-shadow:0px_2px_3px_rgba(0,_0,_0,_0.25)]">
          About us
        </div>
      </div>
      <br />
      <br />
      <br />
      <h1 className=" text-[40px] md:text-[60px] md:my-7 "> About Our Company </h1>
      <div className="Company  md:mb-5 md:ml-24 ml-5">
        <div className="company-image ">
          <LazyLoadImage className=" rounded w-[760px] h-[477px] object-cover" src="/image8@2x.png" lazy="lazy" />
        </div>

        <div className=" company-card  px-[3rem] md:w-[40vw] flex flex-col items-start justify-start gap-[20px]">
          <h2 className=" text-[37px]">Our Company</h2>
          <div className=' bg-orange-600 p-[2px] w-48  mb-10 ml-5' ><hr /></div>

          <div className=" text-3xl  font-medium inline-block h-[158.85px]">
            GhumoRe India is an adventure tourism company founded in 20YY. Our
            vision is to be the most recognised and respected adventure business
            in India and in all over the world.
          </div>

        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}
