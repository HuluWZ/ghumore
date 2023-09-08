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


  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false)
  const [suggestions, setSuggestions] = useState([]);
  const [categorySuggestions, setCategorySuggestions] = useState([]);

  const handleLocationChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);

    // Perform API call or any other logic to fetch suggestions based on the input value
    // For this example, we'll use a static list of suggestions
    const locationNamesList = location.map(item => item.name);
    const suggestions = locationNamesList.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(suggestions);

    // Show or hide the dropdown based on the input value
    setShowDropdown(value.length > 0);
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setCategoryValue(value);

    // Perform API call or any other logic to fetch suggestions based on the input value
    // For this example, we'll use a static list of suggestions
    const locationNamesList = category.map(item => item.name);
    const suggestions = locationNamesList.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setCategorySuggestions(suggestions);

    // Show or hide the dropdown based on the input value
    setCategoryDropdown(value.length > 0);
  };

  const handleLocationClick = (suggestion) => {
    setIsLocationOpen(false);
    setSelectedLocation(suggestion);
    setSearchValue(suggestion);
    // setSearchTerm(suggestion);
    setShowDropdown(false)
    // Do something with the selected suggestion, such as initiating a search
  };

  const handleCategoryClick = (suggestion) => {
    setSelectedCategory(suggestion);
    setIsCategoryOpen(false);
    setCategoryValue(suggestion)
    // setSearchTerm(suggestion);
    setCategoryDropdown(false);
    // Do something with the selected suggestion, such as initiating a search
  };

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (inputRef1.current && !inputRef1.current.contains(event.target)) ||
        (inputRef2.current && !inputRef2.current.contains(event.target))
      ) {
        setShowDropdown(false);
        setCategoryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className="Header flex items-center overflow-x-hidden justify-center">
      <div className="search-conainer w-[70%] rounded-2xl bg-gray md:w-[90%] mt-10">
        <h2 style={{ fontSize: "1rem", marginBottom: "10px" }}>
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

          <div className="activities ">
            <div className="location-tag">
              <img className="" alt="" src="/location.svg" />
              Location
            </div>
            <div className="">
              <input
                type="text"
                // ref={inputRef1}
                value={searchValue}
                onChange={handleLocationChange}
                className="px-4 py-2 border-0 rounded-md focus:outline-none  "
                placeholder="Delhi,Inidia"
              />
              {showDropdown && (
                <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleLocationClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="activities">
            <div className="location-tag">
              <img className="" alt="" src="/location.svg" />
              Category
            </div>
            <div className="">
              <input
                type="text"
                // ref={inputRef2}
                value={categoryValue}
                onChange={handleCategoryChange}
                className=" px-4 py-2 border-0 rounded-md focus:outline-none "
                placeholder="SkyDiving"
              />
              {categoryDropdown && (
                <ul className="absolute left-0 right-0  bg-white border border-gray-300 rounded-md shadow-lg">
                  {categorySuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleCategoryClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
         
          </div>



          {/* <div className="rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-none bg-darkslateblue w-full overflow-hidden flex flex-row py-[2.44rem] px-[2.31rem] box-border items-start justify-start cursor-pointer text-center text-[1.5rem] text-white font-lato search sm:flex-col sm:items-center sm:justify-center"> */}
          <div>
            <button
              onClick={handleSearch}
              className="button-khart  uppercase text-white bg-darkslateblue-100 py-7 md:ml-[-30px] md:mt-2 lg:mt-0 lg:ml-0  px-7 md:px-5 lg:py-10 lg:px-7 rounded ">
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
