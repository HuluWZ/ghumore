import React, { useState, useRef, useEffect } from "react";

export default function GuestPickerModal({ onClose, onApply, buttonRef }) {
    const [adults, setAdults] = useState(1);
    const [infants, setInfants] = useState(0);
    const modalRef = useRef(null);
  
    const handleAddAdult = () => {
      setAdults(adults + 1);
    };
  
    const handleSubtractAdult = () => {
      if (adults > 1) {
        setAdults(adults - 1);
      }
    };
  
    const handleAddInfant = () => {
      setInfants(infants + 1);
    };
  
    const handleSubtractInfant = () => {
      if (infants > 0) {
        setInfants(infants - 1);
      }
    };
  
    const handleApply = () => {
      onApply(adults, infants);
      onClose();
    };
  
    useEffect(() => {
      // Position the modal below the button
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const buttonTopOffset = window.pageYOffset + buttonRect.top;
      const buttonLeftOffset = window.pageXOffset + buttonRect.left;
      modalRef.current.style.top = `${
        buttonTopOffset + buttonRect.height + 10
      }px`;
      modalRef.current.style.left = `${buttonLeftOffset}px`;
    }, [buttonRef]);
  
    return (
      <div
        ref={modalRef}
        className="absolute bg-white p-6 rounded-lg shadow-xl z-50"
        style={{ minWidth: "240px" }}>
        <h2 className="text-2xl font-bold mb-4">Select Guests</h2>
        <div className="flex items-center mb-4">
          <div className="mr-4">
            <p className="text-lg font-semibold">Adults</p>
            <div className="flex items-center">
              <button
                className="px-3 py-2 border rounded-full hover:bg-gray-200 focus:outline-none"
                onClick={handleSubtractAdult}>
                {/* <MinusCircleOutlined /> */}-
              </button>
              <span className="mx-2 text-lg">{adults}</span>
              <button
                className="px-3 py-2 border rounded-full hover:bg-gray-200 focus:outline-none"
                onClick={handleAddAdult}>
                {/* <PlusCircleOutlined /> */}+
              </button>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold">Infants</p>
            <div className="flex items-center">
              <button
                className="px-3 py-2 border rounded-full hover:bg-gray-200 focus:outline-none"
                onClick={handleSubtractInfant}>
                <img
                  className="absolute top-[10px] left-[10px] w-[30px] h-[30px] overflow-hidden"
                  alt=""
                  src="/minus.svg"
                />
              </button>
              <span className="mx-2 text-lg">{infants}</span>
              <button
                className="px-3 py-2 border rounded-full hover:bg-gray-200 focus:outline-none"
                onClick={handleAddInfant}>
                <img
                  className="absolute top-[10px] left-[10px] w-[30px] h-[30px] overflow-hidden"
                  alt=""
                  src="/plus.svg"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-blue rounded-lg focus:outline-none"
            onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-orange-600 text-white hover:bg-orange-600 rounded-lg focus:outline-none"
            onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    );
  };
  