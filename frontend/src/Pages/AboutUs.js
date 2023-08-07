import React from "react";
import Company from "../Components/Company";

export default function AboutUs() {
  return (
    <div className="AboutUs">
      <div className="header-contact-us Poster w-[1920px] h-[400px] bg-[url(/public/image114@2x.png)] bg-cover bg-no-repeat bg-[top] font-lato">
        <div className="font-semibold [text-shadow:0px_2px_3px_rgba(0,_0,_0,_0.25)]">
          About us
        </div>
      </div>
      <br />
      <br />
      <br />
      <h1> About Our Company </h1>
      <Company />
      <br/>
        <br/>
        <br/>
    </div>
  );
}
