import React from "react";
import "./testimonial.css";

export default function Testimonial() {
  return (
    <div className="Testimonial mt-5" id="testimonial">
      <div
        className="flex flex-col items-center justify-start"
        data-scroll-to="titleContainer">
        <b className=" text-[48px] inline-block font-outfit text-center w-[591px] text-black-100">

          <span className="text-ghumore-orange">Testimonials</span>

        </b>
        <b className="uppercase">Satisfied customers all over the world</b>

      </div>
      <div className="testimonoal-cards">
        <div className="testimonoal-card">
          <img
            className="rounded-[50%] w-20 h-20 object-cover"
            alt=""
            src="/ellipse-1@2x.png"
          />
          <div className="flex flex-col items-center justify-start gap-[4px]">
            <b className="relative">Eleanor Pena</b>
            <div className="relative text-sm">UI/UX Designer</div>
            <div className="flex flex-row items-center justify-center">
              <img className="relative w-4 h-4" alt="" src="/magicstar3.svg" />
              <img className="relative w-4 h-4" alt="" src="/magicstar3.svg" />
              <img className="relative w-4 h-4" alt="" src="/magicstar3.svg" />
              <img className="relative w-4 h-4" alt="" src="/magicstar3.svg" />
              <img className="relative w-4 h-4" alt="" src="/magicstar3.svg" />
            </div>
          </div>
          <div className=" text-sm leading-[133%] inline-block w-56">{`Customer testimonials are more effective than paid marketing copy as they take the spotlight away from the seller to shine it on the customers. `}</div>
          <img
            className="w-10 h-10"
            alt=""
            src="/vuesaxboldquotedowncircle.svg"
          />
        </div>
        <div className="testimonoal-card">
          <img
            className=" rounded-[50%] w-20 h-20 object-cover"
            alt=""
            src="/ellipse-11@2x.png"
          />
          <div className="flex flex-col items-center justify-start gap-[4px]">
            <b className="relative">Theresa Webb</b>
            <div className="relative text-sm">Vlogger</div>
            <div className="flex flex-row items-center justify-center">
              <img
                className="relative w-4 h-4"
                alt=""
                src="/magicstar4.svg"
              />
              <img
                className="relative w-4 h-4"
                alt=""
                src="/magicstar4.svg"
              />
              <img
                className="relative w-4 h-4"
                alt=""
                src="/magicstar4.svg"
              />
              <img
                className="relative w-4 h-4"
                alt=""
                src="/magicstar4.svg"
              />
              <img
                className="relative w-4 h-4"
                alt=""
                src="/magicstar4.svg"
              />
            </div>
          </div>
          <div className="text-sm leading-[133%] inline-block w-56">
            In promotion and advertising, a testimonial or show consists of a
            person's written statement extolling the virtue of a product.
          </div>
          <img
            className=" w-10 h-10"
            alt=""
            src="/vuesaxboldquotedowncircle.svg"
          />
        </div>

        <div className="testimonoal-card">
          <img
            className="rounded-[50%] w-20 h-20 object-cover"
            alt=""
            src="/ellipse-12@2x.png"
          />
          <div className="flex flex-col items-center justify-start gap-[4px]">
            <b className="relative">Annette Black</b>
            <div className="relative text-sm">Doctor</div>
            <div className="flex flex-row items-center justify-center">
              <img
                className="relative w-4 h-4"
                alt=""
                src="/magicstar3.svg"
              />
              <img
                className="relative w-4 h-4"
                alt=""
                src="/magicstar3.svg"
              />
              <img
                className="relative w-4 h-4"
                alt=""
                src="/magicstar3.svg"
              />
              <img
                className="relative w-4 h-4"
                alt=""
                src="/magicstar3.svg"
              />
              <img
                className="relative w-4 h-4"
                alt=""
                src="/magicstar3.svg"
              />
            </div>
          </div>
          <div className=" text-sm leading-[133%] inline-block w-56">
            Testimonials work because they aren''t strong sales pitches, they
            come across in an unbiased voice and establish trust
          </div>
          <img
            className="w-10 h-10"
            alt=""
            src="/vuesaxboldquotedowncircle.svg"
          />
        </div>
      </div>
    </div>
  );
}
