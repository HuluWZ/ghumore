import React, { useEffect, useState } from "react";
import "./destination.css";
import { fetchAllLocations } from "../../apiCalls/location";
import { useNavigate } from "react-router-dom";
import { useProgressiveImage } from "../../customHooks/ProgressiveImages";

export default function Destination() {




  const Component = (props) => {
    console.log(props)
    const loaded = useProgressiveImage(props.source)

    return (
      <div
        onClick={() => navigate(`/search?category=&location=${props.name}&activity=`)}
        style={{ backgroundImage: `url(${loaded || props.placeholder})` }}
        className={`destination-card bg-cover bg-no-repeat bg-[top] rounded-2xl w-[330px] h-[224.03px]`}
      >
        <div className=" bg-black-100 bg-opacity-25 w-full "><h1 >{props.name}</h1></div>
      </div>
    )
  }

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
        console.log(response.location, "my response Location");
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
  }, []);

  return (
    <div className="Destinaiton mt-4">
      <h1 className="text-[30px]">Top Destination & Cities</h1>
      <div className=' bg-orange-600 p-[2px] w-48   flex justify-center' ><hr /></div>
      {/* <button
        onClick={() => {
          navigate(`/destinations`);
        }}
        className="destn-btn py-2 px-4 bg-darkslateblue-100 rounded-md shadow-md flex items-center m-8 justify-center gap-2 border border-solid w-32 border-button-stroke">
        <div className="text-base font-semibold text-white ">View All</div>
      </button> */}
      <div className="destination-cards">
        {locationList.map((destination) => {
          console.log(locationList, "list");
          return (
            <Component
              name={destination.name}
              source={destination.image}
              placeholder="new image"
            >
              <h1>{destination.name}</h1>
            </Component>)
        })}
      </div>
      <button
        onClick={() => {
          navigate(`/destinations`);
        }}
        className="md:destn-btn py-2 px-4 bg-darkslateblue-100 rounded-md shadow-md flex items-center m-8 sm:flex sm:items-center-center justify-center gap-2 border border-solid w-32 border-button-stroke">
        <div className="text-base font-semibold text-white ">View All</div>
      </button>
    </div>
  );
}
