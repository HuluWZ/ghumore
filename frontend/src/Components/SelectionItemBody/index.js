import React, { useState, useRef, useEffect } from "react";
import { Form, message } from "antd";
import DatePicker from "react-datepicker";
// import { DatePickerProps } from 'antd';
// import { DatePicker, Space } from 'antd';
import "./selectionitembody.css";
import "react-datepicker/dist/react-datepicker.css";
import GuestPickerModal from "../../Pages/GuestPicker";
import { InputNumber, Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { addDays } from "date-fns";
import { checkActivityAvailability } from "../../apiCalls/activities";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";
import ActivityDetail from "../ActivityDetail";
import SimilarActivity from "../SimilarActivity";
import LocationMap from "../LocationMap";

export default function SelectedItemBody({ item }) {

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  //adult infant modal
  const [showModal, setShowModal] = useState(false);
  const buttonRef = useRef(null);
  const [date, setDate] = useState(new Date());
  const [adults, setAdults] = useState(1);
  const [infants, setInfant] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log('this items detail', item)
  const handleAdultIncrease = () => {
    setAdults(adults + 1);
  };

  const handleAdultDecrease = () => {
    setAdults(adults - 1);
  };
  const handleInfantIncrease = () => {
    setInfant(infants + 1);
  };

  const handleInfantDecrease = () => {
    setInfant(infants - 1);
  };
  const handleCheckboxChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    // console.log(item, "Last Booking Update");
    // Perform form submission logic here
    if (!selectedOption || !selectedTime) {
      console.log(selectedOption, selectedTime, item)
      return message.error("Fill all the inputs");
    }
    try {
      dispatch(setLoader(true));
      console.log('its not working')
      const response = await checkActivityAvailability(
        item._id,
        infants + adults,
        date
      );
      if (response.success) {
        dispatch(setLoader(false));
        console.log('send gift')
        navigate("/securecheckout", {
          state: {
            selectedActivity: item,
            selectedOption: item.options[selectedOption],
            adults: adults,
            infants: infants,
            date: date,
            selectedTime: selectedTime,
            activityId: item._id,
          },
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }

  };

  const getExcludedDateIntervals = () => {
    const excludedDates = [];
    const numDaysToExclude = 500; // Change this value as per your requirement

    const date = new Date(item.lastBookingDate);

    for (let i = 0; i < numDaysToExclude; i++) {
      const excludedStartDate = addDays(date, i + 1);
      const excludedEndDate = addDays(excludedStartDate, 1);
      excludedDates.push({ start: excludedStartDate, end: excludedEndDate });
    }

    return excludedDates;
  };

  return (

    <div className="grid grid-cols-2 gap-10">
      <div className=" col-span-1">
        {/* the images section */}
        <div>
          <div><h1 className=" ml-7 md:ml-32 text-[30px] w-[500px] mb-4 text-start">{item.name}</h1></div>
          <div className=" flex flex-col md:flex-row ml-16  w-[900px]">
            <div className="pt-5  ml-[-82px] pr-1 md:ml-0 mb-3 flex  flex-row md:flex-col  px-5 gap-1">
              {item.images.map((img, indx) => {
                return (
                  // <div></div> 
                  <div className="flex gap-1" key={indx}>
                    <img
                      src={img}
                      className={
                        "md:img-choice w-[129px] h-32 object-cover rounded-md cursor-pointer" +
                        (selectedImageIndex === indx
                          ? "border-2  border-solid"
                          : "")
                      }
                      onClick={() => setSelectedImageIndex(indx)}
                      alt="images"
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap md:justify-center justify-start">
              <div className="md:w-[600px] md:h-[500px] w-[400px] ml-[-64px] md:ml-4 px-2  overflow-hidden"
              >
                <img
                  src={item?.images[selectedImageIndex]}
                  className="object-cover w-full h-full"
                  alt=""
                />
              </div>
            </div>
            <div>

            </div>
          </div>

        </div>
        <div className="bg-gray-200 p-4 mt-4 md:hidden">
          <div>
            <form onSubmit={handleBookingSubmit}>
              <div className="item-image-book justify-center items-center w-72 mx-10 my-10 md:my-0">
                <h1 className=" text-[30px]">Check Availability</h1>
                <div className="status">
                  <div>
                    <h2>Date</h2>
                    <div className="date-top">
                      <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        value={date}
                        // customInput={<CustomInput />}
                        excludeDateIntervals={getExcludedDateIntervals()}

                      />
                      <div>{/* <h2>Select a date and time:</h2> */}</div>
                    </div>
                  </div>
                </div>
                {/* <div> */}
                <h2>Adults</h2>
                <div className="flex items-center">
                  <Button
                    type="text"
                    icon={<MinusOutlined />}
                    onClick={handleAdultDecrease}
                    disabled={adults <= 0}
                  />
                  <InputNumber
                    className="mx-2"
                    min={0}
                    value={adults}
                    onChange={setAdults}
                  />
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={handleAdultIncrease}
                  />
                </div>
                <h2>Infants</h2>
                <div className="flex items-center">
                  <Button
                    type="text"
                    icon={<MinusOutlined />}
                    onClick={handleInfantDecrease}
                    disabled={infants <= 0}
                  />
                  <InputNumber
                    className="mx-2"
                    min={0}
                    value={infants}
                    onChange={setInfant}
                  />
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={handleInfantIncrease}
                  />
                </div>
                {/* </div> */}
                <span>
                  {item ? Object.keys(item.options).length : 0} options are
                  available
                </span>
                {Object.keys(item.options).map((i) => {
                  const option = item.options[i];
                  const isSelectedOption = selectedOption === i;
                  return (
                    <label key={i}>
                      <div
                        className={
                          isSelectedOption ? "option-card selected" : "option-card"
                        }>
                        <div className="form-header flex flex-row">
                          <h2>{option.name}</h2>
                          <input
                            className="ml-16 md:ml-6"
                            type="checkbox"
                            value={i}
                            checked={isSelectedOption}
                            onChange={handleCheckboxChange}
                          />
                        </div>
                        <p>{option.description}</p>
                        <span>
                          {adults} adult & {infants} infants
                        </span>
                        <span>
                          Total of:{" "}
                          <h2 className="text-bold">
                            ₹ {(option.unitPrice * (adults + infants)).toFixed(2)}
                          </h2>
                        </span>
                        <span>(Including all taxes and booking fees)</span>
                        <br />
                        <div className="option-card-time-options">
                          {option.time.map((t, indx) => {
                            const isSelectedTime =
                              isSelectedOption && selectedTime === t;
                            const className = isSelectedTime
                              ? "time-option selected"
                              : "time-option";
                            return (
                              <span
                                key={indx}
                                className={className}
                                onClick={() =>
                                  isSelectedOption && setSelectedTime(t)
                                }>
                                {t}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </label>
                  );
                })}
                <button
                  type="submit"
                  // className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                  Book Now
                </button>
                <button
                  type="submit"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                  Send as a Gift
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* the bottom overview section */}
        <div className="">
          <div className=" md:w-[1000px]  w-96 ml-2 md:ml-1  md:flex md:flex-col md:items-center text-left px-16 gap-5">
            <div className=" md:px-16">
              <div><ActivityDetail response={item} /></div>

            </div>







            <SimilarActivity />
            <LocationMap item={item} />
          </div>
        </div>

      </div>

      <div className=" col-span-1 w-96 ml-32">
        {/* sidebar section  */}
        <div>
          <form onSubmit={handleBookingSubmit}>
            <div className="item-image-book justify-center items-center w-72 mx-10 my-10 md:my-0">
              <h1 className=" text-[30px]">Check Availability</h1>
              <div className="status">
                <div>
                  <h2>Date</h2>
                  <div className="date-top">
                    <DatePicker
                      selected={date}
                      onChange={(date) => setDate(date)}
                      value={date}
                      // customInput={<CustomInput />}
                      excludeDateIntervals={getExcludedDateIntervals()}

                    />
                    <div>{/* <h2>Select a date and time:</h2> */}</div>
                  </div>
                </div>
              </div>
              {/* <div> */}
              <h2>Adults</h2>
              <div className="flex items-center">
                <Button
                  type="text"
                  icon={<MinusOutlined />}
                  onClick={handleAdultDecrease}
                  disabled={adults <= 0}
                />
                <InputNumber
                  className="mx-2"
                  min={0}
                  value={adults}
                  onChange={setAdults}
                />
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={handleAdultIncrease}
                />
              </div>
              <h2>Infants</h2>
              <div className="flex items-center">
                <Button
                  type="text"
                  icon={<MinusOutlined />}
                  onClick={handleInfantDecrease}
                  disabled={infants <= 0}
                />
                <InputNumber
                  className="mx-2"
                  min={0}
                  value={infants}
                  onChange={setInfant}
                />
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={handleInfantIncrease}
                />
              </div>
              {/* </div> */}
              <span>
                {item ? Object.keys(item.options).length : 0} options are
                available
              </span>
              {Object.keys(item.options).map((i) => {
                const option = item.options[i];
                const isSelectedOption = selectedOption === i;
                return (
                  <label key={i}>
                    <div
                      className={
                        isSelectedOption ? "option-card selected" : "option-card"
                      }>
                      <div className="form-header flex flex-row">
                        <h2>{option.name}</h2>
                        <input
                          className="ml-16 md:ml-6"
                          type="checkbox"
                          value={i}
                          checked={isSelectedOption}
                          onChange={handleCheckboxChange}
                        />
                      </div>
                      <p>{option.description}</p>
                      <span>
                        {adults} adult & {infants} infants
                      </span>
                      <span>
                        Total of:{" "}
                        <h2 className="text-bold">
                          ₹ {(option.unitPrice * (adults + infants)).toFixed(2)}
                        </h2>
                      </span>
                      <span>(Including all taxes and booking fees)</span>
                      <br />
                      <div className="option-card-time-options">
                        {option.time.map((t, indx) => {
                          const isSelectedTime =
                            isSelectedOption && selectedTime === t;
                          const className = isSelectedTime
                            ? "time-option selected"
                            : "time-option";
                          return (
                            <span
                              key={indx}
                              className={className}
                              onClick={() =>
                                isSelectedOption && setSelectedTime(t)
                              }>
                              {t}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </label>
                );
              })}
              <button
                type="submit"
                // className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Book Now
              </button>
              <button
                type="submit"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Send as a Gift
              </button>
            </div>
          </form>
        </div>

      </div>{" "}

    </div>
  );
}
