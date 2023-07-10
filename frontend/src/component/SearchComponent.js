import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SearchComponent() {
  const [location, setLocation] = useState('');
  const [activity, setActivity] = useState('');
  const navigate = useNavigate();
  

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleActivityChange = (event) => {
    setActivity(event.target.value);
  };

  const handleSearch = () => {
    // Navigate to the search route with location and activity as query parameters
    const searchParams = new URLSearchParams();
    searchParams.append('location', location);
    searchParams.append('activity', activity);
    navigate(`/search/${location}/${activity}`);
  };

  return (
    <div className="absolute top-[127px] left-[calc(50% - 620.5px)] w-[1241px] h-[285px] text-left text-base text-black-200 font-lato">
      <div className="absolute top-0 left-0 rounded-2xl bg-gray-200 w-[1241px] h-[226px]" />
      <div className="absolute top-[84px] left-[40px] rounded-xl bg-white shadow-[0px 4px 28px rgba(0, 0, 0, 0.14)] box-border w-[1160px] h-[102px] border-[1px] border-solid border-whitesmoke">
        <div className="absolute top-[1px] left-[687px] bg-lightgray w-px h-[100px]" />
        <div className="absolute top-0 left-[712px] flex flex-col items-start justify-start gap-[4px]">
          <div className="flex flex-row py-3 pr-2.5 pl-0 items-center justify-start gap-[10px]">
            <img className="relative w-5 h-5 overflow-hidden shrink-0" alt="" src="/location.svg" />
            <div className="relative leading-[24px] font-medium">Location</div>
          </div>
          <input
            className="relative text-xl leading-[24px] rounded-lg border-gray-300 focus:outline-none"
            type="text"
            placeholder="Delhi, India"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
        <button
          className="cursor-pointer border-none py-[39px] px-[37px] bg-darkslateblue-100 absolute top-0 left-[993px] rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-none overflow-hidden flex flex-row items-start justify-start"
          onClick={handleSearch}
        >
          <b className="relative text-5xl leading-[24px] uppercase font-lato text-white text-center">Search</b>
        </button>
        <div className="absolute top-0 left-[24px] flex flex-col items-start justify-start gap-[4px]">
          <div className="flex flex-row py-3 pr-2.5 pl-0 items-center justify-start gap-[10px]">
            <img className="relative w-5 h-5 overflow-hidden shrink-0" alt="" src="/man.svg" />
            <div className="relative leading-[24px] font-medium">Activities</div>
          </div>
          <input
            className="relative text-xl leading-[24px] rounded-lg border-gray-300 focus:outline-none"
            type="text"
            placeholder="Scuba Diving"
            value={activity}
            onChange={handleActivityChange}
          />
        </div>
      </div>
      <b className="absolute top-[30.32px] left-[430px] text-5xl leading-[24px] uppercase text-center">
        Find Experiences & Activities!
      </b>
      <div className="absolute top-[207px] left-[40px] rounded-lg bg-white shadow-[1.9500000476837158px 1.9500000476837158px 2.6px rgba(0, 0, 0, 0.15)] w-[1161px] h-[77px]">
        <div className="absolute top-[14.5px] left-[19.67px] flex flex-row py-3 pr-2.5 pl-0 items-center justify-start gap-[10px]">
          <img className="relative w-6 h-6 overflow-hidden shrink-0" alt="" src="/gps-fixed.svg" />
          <div className="relative leading-[24px] font-medium">Experience near me</div>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
