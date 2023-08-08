import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

const GuestPickerModal = ({ onClose, onApply, buttonRef }) => {
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
    <Modal
      visible={true}
      onCancel={onClose}
      footer={null}
      closable={false}
      getContainer={() => buttonRef.current}
      className="guest-picker-modal"
    >
      <div
        ref={modalRef}
        className="guest-picker-container p-6 rounded-lg shadow-xl bg-white"
      >
        <h2 className="text-2xl font-bold mb-4">Select Guests</h2>
        <div className="flex items-center mb-4">
          <div className="mr-4">
            <p className="text-lg font-semibold">Adults</p>
            <div className="flex items-center">
              <Button
                type="text"
                className="px-3 py-2 border rounded-full hover:bg-gray-200 focus:outline-none"
                onClick={handleSubtractAdult}
              >
                <MinusCircleOutlined />
              </Button>
              <span className="mx-2 text-lg">{adults}</span>
              <Button
                type="text"
                className="px-3 py-2 border rounded-full hover:bg-gray-200 focus:outline-none"
                onClick={handleAddAdult}
              >
                <PlusCircleOutlined />
              </Button>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold">Infants</p>
            <div className="flex items-center">
              <Button
                type="text"
                className="px-3 py-2 border rounded-full hover:bg-gray-200 focus:outline-none"
                onClick={handleSubtractInfant}
              >
                <MinusCircleOutlined />
              </Button>
              <span className="mx-2 text-lg">{infants}</span>
              <Button
                type="text"
                className="px-3 py-2 border rounded-full hover:bg-gray-200 focus:outline-none"
                onClick={handleAddInfant}
              >
                <PlusCircleOutlined />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="mr-2" onClick={onClose}>
            Cancel
          </Button>
          <Button type="primary" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default GuestPickerModal;
