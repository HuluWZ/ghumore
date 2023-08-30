import React, { useState, useEffect, useRef } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllLocations } from "../../apiCalls/location";
import { fetchAllCategories } from "../../apiCalls/categories";

export default function Header() {
  const [activity, setActivity] = useState("");

  const [location, setLocation] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, SetError] = useState('');

  const dropdownRef = useRef();
  const navigate = useNavigate();

  //activity
  const handleActivityChange = (event) => {
    setIsCategoryOpen(false)
    setIsLocationOpen(false)
    const { value } = event.target;
    if (/^[a-zA-Z]*$/.test(value)) {
      SetError(''); // Validation successful
    } else {
      SetError('Only alphabets are allowed'); // Validation failed
    }
    setActivity(value);
  };

  // location change
  const addLocationToList = async () => {
    try {
      const response = await fetchAllLocations();
      console.log(typeof response.location);
      if (response.success) {
        // Update the state with the fetched data
        console.log(response.location, "my response location");
        const element = [];
        for (let index = 0; index < response.location.length; index++) {
          element.push(response.location[index]);
        }
        setLocation(element);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // const locations = [
  //   "Delhi, India",
  //   "Mumbai, India",
  //   "Bangalore, India",
  //   "Chennai, India",
  //   "Kolkata, India",
  //   "Hyderabad, India",
  //   "Pune, India",
  //   "Ahmedabad, India",
  //   "Jaipur, India",
  //   "Surat, India",
  //   // Add more locations here...
  // ];
  // Location dropdown functionality


  const handleSearchChange = (event) => {
    console.log(isLocationOpen)
    setIsCategoryOpen(false)
    setIsLocationOpen(false)
    const searchTerm = event.target.value.toLowerCase();
    setSearchValue(searchTerm);
    const locationNamesList = location.map(item => item.name);
    const filtered = locationNamesList.filter((location) =>
      location.toLowerCase().includes(searchTerm)
    );
    setFilteredLocations(filtered);
    setIsLocationOpen(true);
  };

  const handleLocationSelect = (option) => {
    // setSelectedLocation(selectedLocation);
    setIsLocationOpen(false);
    setSelectedLocation(option);
    setSearchValue(option);
  };


  const addCategoryToList = async () => {
    try {
      const response = await fetchAllCategories();
      if (response.success) {
        // Update the state with the fetched data
        console.log(response.category, "my response category");
        const element = [];
        for (let index = 0; index < response.category.length; index++) {
          element.push(response.category[index]);
        }
        setCategory(element);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Category dropdown functionality
  const handleCategorySearchChange = (event) => {

    const searchTerm = event.target.value.toLowerCase();
    setCategoryValue(searchTerm)
    const locationNamesList = category.map(item => item.name);
    const filtered = locationNamesList.filter((category) =>
      category.toLowerCase().includes(searchTerm)
    );
    setFilteredCategories(filtered);
    setIsCategoryOpen(true);
    setIsLocationOpen(false)
  };

  const handleCategorySelect = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    setIsCategoryOpen(false);
    setCategoryValue(selectedCategory)
  };

  //search

  const handleSearch = () => {
    // Navigate to the search route with location and activity as query parameters
    const searchParams = new URLSearchParams();
    console.log(selectedCategory, selectedLocation, "selected");
    searchParams.append("category", selectedCategory);
    searchParams.append("location", selectedLocation);
    searchParams.append("activity", activity);
    navigate(`/search?${searchParams.toString()}`);
  };

  useEffect(() => {
    addLocationToList();
    addCategoryToList();
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLocationOpen(false);

      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLocationOpen]);

  return (
    <div className="Header flex items-center overflow-x-hidden justify-center">
      <div className="search-conainer rounded-2xl bg-gray w-full mt-10">
        <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
          Find Experiences & Activities!
        </h2>
        <div className="search-container-children">
          <div className="activities w-10">
            <div className="activities-tag">
              <img className="" alt="" src="/man.svg" />
              Activities
            </div>
            <input
              type="text"
              placeholder="Scuba Diving"
              value={activity}
              onChange={handleActivityChange}
            />
          </div>

          <div className="activities">
            <div className="location-tag">
              <img className="" alt="" src="/location.svg" />
              Location
            </div>
            <input
              type="text"
              placeholder="Delhi, India"
              value={searchValue}
              onChange={handleSearchChange}
              onClick={() => setIsLocationOpen(true)}
            />
            {isLocationOpen && (

              <div className="dropdown md:ml-[580px] ml-14 mt-20 md:mt-20">

                <ul className="dropdown-list px-16 ">
                  {filteredLocations.slice(0, 10).map((item) => (
                    <li key={item} onClick={() => handleLocationSelect(item)}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>


            )}
          </div>

          <div className="activities">
            <div className="location-tag">
              <img className="" alt="" src="/location.svg" />
              Category
            </div>
            <input
              type="text"
              placeholder="SkyDiving"
              value={categoryValue}
              onChange={handleCategorySearchChange}
              onClick={() => setIsCategoryOpen(true)}
            />
            {/* <input
              type="text"
              placeholder="Delhi, India"
              value={searchValue}
              onChange={handleSearchChange}
              onClick={() => setIsLocationOpen(true)}
            /> */}
            {isCategoryOpen && (

              <div className="dropdown md:ml-[840px] ml-14 mt-20 md:mt-20">
                <ul className="dropdown-list px-16 ">
                  {filteredCategories.slice(0, 10).map((item) => (
                    <li key={item} onClick={() => handleCategorySelect(item)}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              // </div>
            )}
          </div>
          {/* <div className="activities">
            <div className="location-tag">
              <img className="" alt="" src="/location.svg" />
              Category
            </div>
            <input
              type="text"
              placeholder="SkyDiving"
              value={selectedCategory}
              onChange={handleCategorySearchChange}
              onClick={() => setIsCategoryOpen(true)}
            />
            {isCategoryOpen && (
              <div className="dropdown">
                <div className="header-input-search">
                  <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleCategorySearchChange}
                  />
                </div>
                <ul className="dropdown-list">
                  {filteredCategories.slice(0, 10).map((item) => (
                    <li key={item} onClick={() => handleCategorySelect(item)}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div> */}
          {/* <div className="rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-none bg-darkslateblue w-full overflow-hidden flex flex-row py-[2.44rem] px-[2.31rem] box-border items-start justify-start cursor-pointer text-center text-[1.5rem] text-white font-lato search sm:flex-col sm:items-center sm:justify-center"> */}
          <div>
            <button
              onClick={handleSearch}
              className="button-khart relative uppercase text-white bg-darkslateblue-100 py-4 md:py-10 px-10 rounded ">
              Search
            </button>
          </div>
          {/* <div className="rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-none bg-darkslateblue w-full overflow-hidden flex flex-row py-[2.44rem] px-[2.31rem] box-border items-start justify-start cursor-pointer text-center text-[1.5rem] text-white font-lato search">
            <button
              onClick={handleSearch}
              className="button-khart relative leading-[1.5rem] uppercase font-">
              Search
            </button>
          </div> */}
        </div>
        <span style={{ color: "red" }}>{error}</span>
      </div>
      <div>

      </div>
      <div className="near-me p-5 my-2">
        <img className="" alt="" src="/gps-fixed.svg" />
        <p style={{ marginLeft: "10px" }}>Experiences Near Me</p>
      </div>
    </div>
  );
}
