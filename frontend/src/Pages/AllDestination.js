import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { fetchAllLocations } from '../apiCalls/location';


export default function AllDestination() {
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
        for (let index = 0; index < response.location.length; index++) {
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
  }, []);
  return (
    <div className="Destinaiton mt-5">

      <h1>All Destination & Cities</h1>

      <div className="destination-cards">
        {locationList.map((destination) => {
          console.log(locationList, "list");
          return (<div
            onClick={() => navigate(`/search/${destination.name}/ / `)}
            style={{ backgroundImage: `url(${destination.image})` }}
            className={`destination-card bg-cover bg-no-repeat bg-[top] rounded-2xl w-[330px] h-[224.03px]`}>
            <h1>{destination.name}</h1>
          </div>)
        })}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}
