import React, { useState, useEffect } from "react";
import "./searchresult.css";
import { useLocation, useParams } from "react-router-dom";
import { message } from "antd";
import { SearchActivity } from "../../apiCalls/activities";
import SearchItemCard from "../SearchItemCard";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { fetchAllLocations } from "../../apiCalls/location";
import { fetchAllCategories } from "../../apiCalls/categories";
import { useNavigate } from "react-router-dom";


const SearchResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const locationParam = queryParams.get("location");
  const activityParam = queryParams.get("activity");
  const categoryParam = queryParams.get("category");
  const [result, setResult] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showMoreExperiences, setShowMoreExperiences] = useState(false);
  const [showMoreLocations, setShowMoreLocations] = useState(false);
  const [locations, setLocations] = useState([]);
  const [experiences, setExperiences] = useState([]);

  const maxExperiencesToShow = 3;
  const maxLocationsToShow = 3;

  const addLocationToDestinationList = async () => {
    // console.log("here")
    try {
      const response = await fetchAllLocations();
      if (response.success) {
        const element = [];
        for (let index = 0; index < response.location.length; index++) {
          element.push(response.location[index].name);
        }
        setLocations(element);
        // console.log(element, "location");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addCatagoryToExperienceList = async () => {
    try {
      const response = await fetchAllCategories();
      if (response.success) {
        const element = [];
        for (let index = 0; index < response.category.length; index++) {
          element.push(response.category[index].name);
        }
        // console.log(element, "exprerience");
        setExperiences(element);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const durations = [
    { min: 0, max: 2 },
    { min: 2, max: 4 },
    { min: 4, max: 6 },
    { min: 6, max: 8 },
    { min: 8, max: 10 },
  ];

  // Slice the experiences and locations based on showMore state
  const visibleExperiences = showMoreExperiences
    ? experiences
    : experiences.slice(0, maxExperiencesToShow);

  const visibleLocations = showMoreLocations
    ? locations
    : locations.slice(0, maxLocationsToShow);

  // Experience selection
  const handleExperienceSelection = (experience) => {
    navigate(`/search?category=${experience}&location=&activity=`);
    window.location.reload();
    setSelectedExperience(experience === selectedExperience ? null : experience);
  };

  // Location selection

  const handleLocationSelection = (location) => {
    navigate(`/search?category=&location=${location}&activity=`);
    window.location.reload();
  };

  const [selectedDurations, setSelectedDurations] = useState([]);

  const handleDurationSelection = (duration) => {
    const { min, max } = duration;

    // Check if the duration with the same min and max is already selected
    const isDurationSelected = selectedDurations.some(
      (selectedDuration) =>
        selectedDuration.min === min && selectedDuration.max === max
    );

    if (isDurationSelected) {
      setSelectedDurations(
        selectedDurations.filter(
          (selectedDuration) =>
            selectedDuration.min !== min || selectedDuration.max !== max
        )
      );
    } else {
      setSelectedDurations([...selectedDurations, { min, max }]);
    }
  };

  // Slider
  const price = [{ min: 0, max: 50000 }];

  const [selectedPriceRange, setSelectedPriceRange] = useState({
    min: Math.min(...price.map((p) => p.min)),
    max: Math.max(...price.map((p) => p.max)),
  });

  const handlePriceChange = (value) => {
    setSelectedPriceRange({
      min: value[0],
      max: value[1],
    });
  };

  // Filter the results

  const filteredResults = result.filter((item) => {
    const categoryMatch =
      !selectedExperience || item.category === selectedExperience;
    const locationMatch = !selectedLocation || item.area === selectedLocation;
    const durationMatch =
      selectedDurations.length === 0 ||
      selectedDurations.some(
        (duration) =>
          item.duration >= duration.min && item.duration <= duration.max
      );
    const priceMatch =
      item.price >= selectedPriceRange.min &&
      item.price <= selectedPriceRange.max;

    return categoryMatch && locationMatch && durationMatch && priceMatch;
  });

  console.log(filteredResults, 'filtered result checker in detail ...............')


  useEffect(() => {
    addLocationToDestinationList();
    addCatagoryToExperienceList();
    const fetchData = async () => {
      try {
        const response = await SearchActivity(
          locationParam,
          activityParam,
          categoryParam
        );
        if (response.success) {
          console.log(response)
          setResult(response.searchResult);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        console.log(error);
        message.error(error.message);
      }
    };

    fetchData();
  }, [locationParam, activityParam, categoryParam, locations, experiences]);

  return (
    <div className="SearchResult">
      <div className="search-container">
        <div className="filter">
          <div className="  experience-filter">
            <h2>All things to do</h2>
            {visibleExperiences.map((experience) => (
              <div
                key={experience}
                className={`experience-item ${experience === selectedExperience ? "selected" : ""
                  }`}
                onClick={() => handleExperienceSelection(experience)}>
                <span>{experience}</span>
              </div>
            ))}
            {experiences.length > maxExperiencesToShow && (
              <div
                className="show-more-less"
                onClick={() => setShowMoreExperiences(!showMoreExperiences)}>
                {showMoreExperiences ? "Show Less" : "Show More"}
              </div>
            )}
          </div>
          <div className="  location-filter">
            <h2>All locations</h2>
            {visibleLocations.map((location) => (
              <div
                key={location}
                className={`location-item ${location === selectedLocation ? "selected" : ""
                  }`}
                onClick={() => handleLocationSelection(location)}>
                <span
                  className={
                    location === selectedLocation ? "selected-text" : ""
                  }>
                  {location}
                </span>
              </div>
            ))}
            {locations.length > maxLocationsToShow && (
              <div
                className="show-more-less"
                onClick={() => setShowMoreLocations(!showMoreLocations)}>
                {showMoreLocations ? "Show Less" : "Show More"}
              </div>
            )}
          </div>
          <div className="duration-filter">
            <h2>Durations</h2>
            {durations.map((duration) => (
              <div
                key={`${duration.min}-${duration.max}`}
                className="duration-item">
                <input
                  type="checkbox"
                  id={`duration-${duration.min}-${duration.max}`}
                  checked={selectedDurations.some(
                    (selectedDuration) =>
                      selectedDuration.min === duration.min &&
                      selectedDuration.max === duration.max
                  )}
                  onChange={() => handleDurationSelection(duration)}
                />
                <label htmlFor={`duration-${duration.min}-${duration.max}`}>
                  {duration.min} to {duration.max} hours
                </label>
              </div>
            ))}
          </div>
          <div className="hidden price-filter">
            <h2>Price Range</h2>
            <div className="price-slider">
              <Slider
                min={Math.min(...price.map((p) => p.min))}
                max={Math.max(...price.map((p) => p.max))}
                range
                value={[selectedPriceRange.min, selectedPriceRange.max]}
                onChange={handlePriceChange}
              />
              <div className="price-range-values">
                <span>Min: {selectedPriceRange.min}</span>
                <span>Max: {selectedPriceRange.max}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="main">

          <div className="search-list">
            {filteredResults.length > 0 ? (
              filteredResults.map((item) => (
                <SearchItemCard
                  key={item._id}
                  name={item.name}
                  description={item.description}

                  price={item.price}
                  location={item.location.name}
                  rating={item?.averageRating?.toFixed(1) || 0}
                  id={item._id}
                  organizer={item.organizer}
                  duration={item.duration}
                  durationType={item.durationType}
                  images={item.images}
                  item={item}
                />
              ))
            ) : (
              <>No Result Found</>
            )}
          </div>
        </div>
      </div>
      {/* <h1 className=" text-[25px]">Recommended Tours & Experiences</h1>
      <div className="recomendation-cards">
        Recommended tours and experiences can be added here
      </div> */}
    </div>
  );
};

export default SearchResult;
