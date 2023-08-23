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
    console.log(item, "Last Booking Update");
    // Perform form submission logic here
    if (!selectedOption || !selectedTime) {
      return message.error("Fill all the inputs");
    }
    try {
      dispatch(setLoader(true));
      const response = await checkActivityAvailability(
        item._id,
        infants + adults,
        date
      );
      if (response.success) {
        dispatch(setLoader(false));
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
    //   if(){
    //   return ;
    // }
    // console.log(selectedOption);
    // console.log(adults, infants);
    // console.log(date);
    // console.log(selectedTime);
    //
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
    <div className="SelectedItemBody">
      <div className="booking-section">
        <div className="item-image-list">
          {item.images.map((img, indx) => {
            return (
              <div className="flex gap-5" key={indx}>
                <img
                  src={img}
                  className={
                    "img-choice object-cover rounded-md cursor-pointer" +
                    (selectedImageIndex === indx
                      ? "border-2 border-green-700 border-solid"
                      : "")
                  }
                  onClick={() => setSelectedImageIndex(indx)}
                  alt="images"
                />
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-5">
          <img
            src={item?.images[selectedImageIndex]}
            className="img-main object-cover rounded-md image-cover"
            alt=""
          />
        </div>
        <form onSubmit={handleBookingSubmit}>
          <div className="item-image-book">
            <h1>Check Availability</h1>
            <div className="status">
              <div>
                Date
                <div className="date-top">
                  <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    value={date}
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
                        className="select-checkbox"
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

            {/* {Object.keys(item.options).map((i) => {
              return (
                <div className="option-card">
                  <h2>{item.options[i].name}</h2>
                  <p>{item.options[i].description}</p>
                  <span>
                    {adults} adult & {infants} infants
                  </span>
                  <span>
                    Total of :{" "}
                    <h2 className="text-bold">
                      {" "}
                      ₹ {item.options[i].unitPrice * (adults + infants)}
                    </h2>
                  </span>
                  <span>(Including all taxes and booking fees)</span>
                  <div className="option-card-time-options">
                    {item.options[i].time.map((t) => {
                      return <span className="time-option">{t}</span>;
                    })}
                  </div>
                </div>
              );
            })} */}
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
      </div>{" "}
      <div className="item-description">
        <h1>Overview</h1>
        <p>
          See some of India's most iconic cities on this comprehensive 4-day
          Golden Triangle tour. Relax in the comfort of a private
          air-conditioned vehicle and make your way between Delhi, Agra, and
          Jaipur. Your driver shares details, insight, and the history of
          historic landmarks along the way. See the sunrise over the Taj Mahal—a
          UNESCO World Heritage Site—head up to Amber Fort, and explore the
          Maharaja's City Palace, with guides provided at each sight.
        </p>
        <ul>
          <li>
            Your driver guide and private guides at each stop provide historical
            commentary throughout the trip
          </li>
          <li>Transport in a private, air-conditioned vehicle</li>
          <li>
            See iconic India sights such as the UNESCO-listed Taj Mahal, Agra
            Fort, Amber Fort, and the City Palace
          </li>
        </ul>
        <h1>What’s Included</h1>
        <ul>
          <li>
            Three nights accommodation (If tour booked with option including
            hotels)
          </li>
          <li>
            Three nights accommodation (If tour booked with option including
            hotels)
          </li>
          <li>
            Three nights accommodation (If tour booked with option including
            hotels)
          </li>
          <li>
            Three nights accommodation (If tour booked with option including
            hotels)
          </li>
        </ul>
        <h1>What’s not Included</h1>
        <ul>
          <li>Entrance Fees</li>
          <li>Entrance Fees</li>
        </ul>
        <h1>What to Expect (Itinerary)</h1>
        <p>
          Day 1: New Delhi–Agra After pickup in Delhi by your driver-guide and
          private air-conditioned vehicle, visit the Qutub Minar, Lotus Temple
          (closed on Monday), and India Gate; and pass the Parliament and other
          public buildings. Then, after lunch (own expense), make the journey to
          Agra. Overnight at hotel in Agra (if option selected). 4-star Hotel
          Option: Crystal Sarovar Premier or Ramada or similar 5-star Hotel
          Option: Jaypee Palace or Courtyard by Marriott or Similar Day 2:
          Agra–Jaipur (B) Rise early for a sunrise visit and guided tour of the
          Taj Mahal, the exquisite mausoleum built by Emperor Shah Jahan in 1630
          for his favorite wife, and learn its tragic story as you explore.
          Then, take a guided tour of Agra Fort, the city’s 17th-century Mughal
          palace-fortress, before leaving for Jaipur. Overnight at hotel in
          Jaipur (if option selected). 4-star Hotel Option: Sarovar Premier or
          similar 5-star Hotel Option: Holiday Inn City Center or Similar Day 3:
          Jaipur (B) After breakfast, explore the UNESCO-listed Amber Fort and
          Jaipur, Rajasthan’s capital until 1728. Enjoy photo stops at Jal Mahal
          and the Palace of Winds and take guided tours of the City Palace and
          Jantar Mantar observatory, and time to relax at your hotel. Overnight
          at hotel in Jaipur (if option selected). 4-star Hotel Option: Sarovar
          Premier or similar 5-star Hotel Option: Holiday Inn City Center or
          similar Day 4: Jaipur–Delhi (B) Make the journey back to Delhi or, if
          you wish, choose a drop-off at Jaipur airport.
        </p>
        <h1>Additional Info</h1>
        <ul>
          <li>Confirmation will be received at time of booking</li>
          <li>Confirmation will be received at time of booking</li>
          <li>
            Rooms are generally provided on a twin-sharing basis at each
            booking. In a booking of 3 people, rooms are provided on
            triple-sharing basis by default. If 3 guests prefer 2 rooms, they
            will have to pay an additional charge.
          </li>
          <li>
            The duration of transfers are approximate; the exact duration will
            depend on the time of day and traffic conditions
          </li>
        </ul>
        <h1>Cancellation policy</h1>
        <p>
          For a full refund, cancel at least 24 hours in advance of the start
          date of the experience.
        </p>
        <h1>Location</h1>
        <div className="map">
          <div className="google-map-code">
            <iframe
              src={item.location}
              width="600"
              height="450"
              // style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
            {/* <iframe src={item.location} width="600" height="450" frameborder="0" style={{border:0}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe> */}
          </div>
        </div>
        <h1>Similar Tours & Experiences</h1>
        <div className="recomendation-cards">
          <div className="recomendation-card">
            <div className="recomendation-card-image">
              <img src="/image1@2x.png" alt="" />
            </div>
            <h2>Scuba Diving Experience In Malvan</h2>
            <p>Malvan Beach, Goa, Maharashtra</p>
            <span>12 hours</span>
          </div>
          <div className="recomendation-card">
            <div className="recomendation-card-image">
              <img src="/image1@2x.png" alt="" />
            </div>
            <h2>Scuba Diving Experience In Malvan</h2>
            <p>Malvan Beach, Goa, Maharashtra</p>
            <span>12 hours</span>
          </div>
          <div className="recomendation-card">
            <div className="recomendation-card-image">
              <img src="/image1@2x.png" alt="" />
            </div>
            <h2>Scuba Diving Experience In Malvan</h2>
            <p>Malvan Beach, Goa, Maharashtra</p>
            <span>12 hours</span>
          </div>
          <div className="recomendation-card">
            <div className="recomendation-card-image">
              <img src="/image1@2x.png" alt="" />
            </div>
            <h2>Scuba Diving Experience In Malvan</h2>
            <p>Malvan Beach, Goa, Maharashtra</p>
            <span>12 hours</span>
          </div>
        </div>
      </div>
    </div>
  );
}
