// FilterSection.js
import React from "react";

const experiences = [
  "Flyboarding",
  "Jet Ski",
  "Bungee Jumping",
  "Rafting",
  "Sightseeing",
  "Skydiving",
  "Trekking",
  "Paragliding",
  "Rainforest Tours",
  "Multi-Day Experiences",
  "Tree Ziplining",
];
const locations = [
  "Ahmedabad",
  "Rishikesh",
  "Shimla",
  "Bengaluru",
  "Jaipur",
  "Agra",
  "Kolkata",
  "Mumbai",
  "Chennai",
  "Port Blair",
  "Delhi",
  "Hyderabad",
  "Paris",
];
const durations = [
  { min: 0, max: 2 },
  { min: 2, max: 4 },
  { min: 4, max: 6 },
  { min: 6, max: 8 },
  { min: 8, max: 10 },
];
const price = [{ min: 1500, max: 3500 }];

const FilterSection = ({

}) => {
  return (
    <div className="filter">
      <div className="experience-filter">
        <h2>All things to do</h2>
        {experiences.map((experience) => {
          return (
            <div>
              <input
                type="checkbox"
                name="experience"
                // checked={filters.experience.includes(experience)}
                // onChange={(e) => {
                //   if (e.target.checked) {
                //     setFilters({
                //       ...filters,
                //       category: [...filters.experience, experience],
                //     });
                //   }else {
                //     setFilters({
                //       ...filters,
                //       category: filters.experience.filter(
                //         (item)=> item !== experience
                //       )
                //     })
                //   }
                // }}
              />
              <label htmlFor="experience">{experience}</label>
            </div>
          );
        })}
      </div>
      <div className="location-filter"></div>
      <div className="duration-filter"></div>
      <div className="price-filter"></div>
    </div>
  );
};

export default FilterSection;
