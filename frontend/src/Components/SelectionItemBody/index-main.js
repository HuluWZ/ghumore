

import React, { useState, useRef, useEffect } from "react";
import "./selectionitembody.css";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Form } from "antd";

export default function SelectedItemBody({ item }) {
  const [selectedTime, setSelectedTime] = useState("");
  const [showModal, setShowModal] = useState(false);
  const buttonRef = useRef(null);
  const [showCost, setShowCost] = useState(0);
  const [optionData, setOptionData] = useState("");
  const [time, setTime] = useState({
    time: ""
  });
  const [date, setDate] = useState(new Date());
  
  const [formData, setFormData] = useState({
    cost: "",
    people: "",
    option: "",
    time: "",
    date: "",
  });
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log(formData);
  };


  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Handle form submission with adults and infants values
  //   console.log("Adults:", adults);
  //   console.log("Infants:", infants);
  // };

  // const [dateDate, setDateDate] = useState(
  //   {date: "",}
  // );





  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: "AIzaSyAWoIkWZaUYa3hIw2HgaOn2XLEoBL09Efo",
  // });
  // const url = item.location;
  // const defaultCenter = {
  //   lat: 18.52043,
  //   lng: 73.856743,
  // };
  // const locationRegex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
  // const match = url.match(locationRegex);
  // const center = match
  //   ? { lat: parseFloat(match[1]), lng: parseFloat(match[2]) }
  //   : defaultCenter;
  // const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // console.log(item, "SelectedItemBody");
  console.log(item.options, "time");


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
                    "w-20 h-20 object-cover rounded-md cursor-pointer" +
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
            src={item.images[selectedImageIndex]}
            className="w-100 h-100 object-cover rounded-md"
            alt=""
          />
        </div>
        <form>
          <div className="item-image-book">
            <h1>Check Availability</h1>
            <div className="status">
              <div>
                Date
                <div>
                  <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    value={date}
                  />
                  <div>{/* <h2>Select a date and time:</h2> */}</div>
                </div>
              </div>
              <div>
                Number
                <div>
                  {/* <button
                    ref={buttonRef}
                    className="px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none"
                    type="button"
                    onClick={handleOpenModal}>
                    <img
                      className="relative w-6 h-6 overflow-hidden shrink-0"
                      alt=""
                      src="/group.svg"
                    />
                    {adults + infants}
                  </button> */}
                  {/* <button
                className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded-lg focus:outline-none"
                type="submit">
                Submit
              </button> */}
                  {/* {showModal && (
                    <GuestPickerModal
                      onClose={handleCloseModal}
                      onApply={handleGuestsChange}
                      buttonRef={buttonRef}
                    />
                  )} */}

                  
                </div>
              </div>
            </div>
            <span>
              {Object.keys(item.options).length} options are available
            </span>
            
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

            {/* <div className="option-card">
            <h2>Tour Price without Hotels</h2>
            <p>Includes: Private Car with Driver + Pickup included</p>
            <span>3 adult</span>
            <span>Total of : <span className="text-bold">$12000</span></span>
            <span>(Including all taxes and booking fees)</span>
            <div className="option-card-time-options">
              <span>7:00 AM</span>
              <span>8:00 AM</span>
              <span>9:00 AM</span>
            </div>
          </div> */}
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Book Now
            </button>
            <button
              type="button"
              class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              Send as a Gift
            </button>
          </div>
        </form>
      </div>

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
