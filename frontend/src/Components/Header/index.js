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

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const dropdownRef = useRef();
  const navigate = useNavigate();

  //activity
  const handleActivityChange = (event) => {
    setIsCategoryOpen(false)
    setIsLocationOpen(false)
    setActivity(event.target.value);
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
    setIsCategoryOpen(false)
    setIsLocationOpen(false)
    const searchTerm = event.target.value.toLowerCase();
    const locationNamesList = location.map(item => item.name);
    const filtered = locationNamesList.filter((location) => 
      location.toLowerCase().includes(searchTerm)
    );
    setFilteredLocations(filtered);
    setIsLocationOpen(true);
  };

  const handleLocationSelect = (selectedLocation) => {
    setSelectedLocation(selectedLocation);
    setIsLocationOpen(false);
  };

  // category selection
  // const categories = [
  //   "Adventure",
  //   "Nature",
  //   "Cultural",
  //   "Food",
  //   "Sports",
  //   "Music",
  //   // Add more categories here...
  // ];
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
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="Header">
      <div className="search-conainer rounded-2xl bg-gray w-full">
        <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
          Find Experiences & Activities!
        </h2>
        <div className="search-container-children">
          <div className="activities">
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

          <div className="location">
            <div className="location-tag">
              <img className="" alt="" src="/location.svg" />
              Location
            </div>
            <input
              type="text"
              placeholder="Delhi, India"
              value={selectedLocation}
              onChange={handleSearchChange}
              onClick={() => setIsLocationOpen(true)}
            />
            {isLocationOpen && (
              <div className="dropdown">
                <div className="header-input-search">
                  <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearchChange}
                  />
                </div>
                <ul className="dropdown-list">
                  {filteredLocations.slice(0, 10).map((item) => (
                    <li key={item} onClick={() => handleLocationSelect(item)}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="location">
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
          </div>

          <div className="rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-none bg-darkslateblue w-full overflow-hidden flex flex-row py-[2.44rem] px-[2.31rem] box-border items-start justify-start cursor-pointer text-center text-[1.5rem] text-white font-lato search">
            <button
              onClick={handleSearch}
              className="button-khart relative leading-[1.5rem] uppercase font-">
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="near-me">
        <img className="" alt="" src="/gps-fixed.svg" />
        <p style={{ marginLeft: "10px" }}>Experiences Near Me</p>
      </div>
    </div>
  );
}
