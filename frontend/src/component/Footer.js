import React from 'react';

export default function Footer() {
  return (
    <div className="bg-gainsboro-100">
      <div className="container mx-auto py-8 px-4 flex flex-wrap justify-center">
        <div className="w-full md:w-1/4 lg:w-auto mb-8">
          <img
            className="w-32 h-32 mx-auto mb-4"
            src="/gumo-re-indiafinal-1.svg"
            alt=""
          />
          <div className="uppercase font-bold mb-2">About</div>
          <div className="text-sm">
            <div className="mb-2">Company</div>
            <div className="mb-2">Contact Us</div>
            <div>Terms And Conditions</div>
          </div>
        </div>
        <div className="w-full md:w-1/4 lg:w-auto mb-8">
          <div className="uppercase font-bold mb-2">Activities</div>
          <div className="text-sm">
            <div className="mb-2">Outdoor Activities</div>
            <div className="mb-2">Trekking</div>
            <div className="mb-2">Skydiving</div>
            <div>Tree Ziplining</div>
          </div>
        </div>
        <div className="w-full md:w-1/4 lg:w-auto mb-8">
          <div className="uppercase font-bold mb-2">Quick Links</div>
          <div className="text-sm">
            <div className="mb-2">Destinations</div>
            <div className="mb-2">Terms Of Use</div>
            <div className="mb-2">Security</div>
            <div>Privacy</div>
          </div>
        </div>
        <div className="w-full md:w-1/4 lg:w-auto mb-8">
          <div className="uppercase font-bold mb-2">Company</div>
          <div className="text-sm">
            <div className="mb-2">Login</div>
            <div>Register</div>
          </div>
        </div>
        <div className="w-full">
          <div className="uppercase font-bold mb-2">Pay Safely With US</div>
          <div className="text-sm">
            payment information Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, repellat.
          </div>
        </div>
      </div>
      <div className="text-center py-4 text-sm">
        © 2023 GhumoRe, All rights reserved.
      </div>
    </div>
  );
}
