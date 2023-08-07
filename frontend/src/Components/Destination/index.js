import React, { useEffect, useState } from "react";
import "./destination.css";
import { fetchAllLocations } from "../../apiCalls/location";
import { useNavigate } from "react-router-dom";

export default function Destination() {
    const navigate = useNavigate()
  const [locationList, setLocationList] = useState([]);
  const addLocationToDestinationList = async () => {
    try {
      const response = await fetchAllLocations();
      console.log(response.location, "my response data");
      console.log(typeof response.location);
      if (response.success) {
        const locations = response.location;

        // Update the state with the fetched data
        console.log(response.location, "my response locarion");
        const element = []
        for (let index = 0; index < 10; index++) {
            element.push(response.location[index])
            
        }
        setLocationList(element);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    addLocationToDestinationList();
  },[]);

  return (
    <div className="Destinaiton">
      <h1>Top Destination & Cities</h1>
      <button 
      onClick={() => {
        navigate(`/destinations`);
      }}
      className="destn-btn py-2 px-4 bg-darkslateblue-100 rounded-md shadow-md flex items-center m-8 justify-center gap-2 border border-solid w-32 border-button-stroke">
        <div className="text-base font-semibold text-white">View All</div>
      </button>
      <div className="destination-cards">
        {locationList.map((destination) => {
            console.log(locationList, "list");
            return (<div 
                onClick={()=>navigate(`/search?category=&location=${destination.name}&activity=`)}
            style={{backgroundImage: `url(${destination.image})`}} 
            className={`destination-card bg-cover bg-no-repeat bg-[top] rounded-2xl w-[330px] h-[224.03px]`}>
            <h1>{destination.name}</h1>
          </div>)
        })}
      </div>
    </div>
  );
}
