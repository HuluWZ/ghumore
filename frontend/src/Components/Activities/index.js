import React, { useEffect, useState } from "react";
import "./activity.css";
import { getAllActivity } from "../../apiCalls/activities";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BlurImageLoader from 'react-blur-image-loader';


export default function Activity() {
  const [result, setResult] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllActivity();
        if (response.success) {
          setResult(response.activity);
          console.log('this is the top activities', response.activity);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        message.error(error.message);
      }
    };
    fetchData();
  }, []);
  console.log(result[1]);

  return (
    <div className="Activity">
      <h1 className="md:font-semibold text-[30px]">Best Activities Of The Year</h1>
      <div className=' bg-orange-600 p-[2px] w-48  mb-10  flex justify-center' ><hr /></div>


      <div className="activities">
        {result.slice(0, 4).map((i) => {
          return (
            <div className="activity-card">
              <div className="activity-image">

                {/* <LazyLoadImage src={ i.images[0] || "/image4@2x.png" } lazy="lazy" /> */}
                <BlurImageLoader
                  src={i.images[0]}

                  fullCover={true}
                  maxBlurLevel={0}
                  transitionTime={0} />

              </div>
              <h2 className="activity-title">{i.name}</h2>
              <span className="font-bold text-4xl">{i.area}</span>

              <span className="font-thin">{i.location.name} </span>
              <span className="font-thin">{i.category.name}</span>

              <p className="font-thin">
                from <span className="font-bold text-6xl">{i.price}$</span> per person
              </p>
              <div className=" text-sm font-semibold flex font-barlow text-secondary text-left">
                {/* {[0, 1, 3, 4].map(() => (
                  
                ))} */}
                <img
                  className=" w-[15.55px] h-[15.64px]"
                  alt=""
                  src="/magicstar20.svg"
                />
                {i?.averageRating?.toFixed(1) || 0}
              </div>

              <div className="card-footer">
                {console.log('item to add', i)}
                <div
                  onClick={() => {
                    console.log(i, "book");
                    navigate("/select", {
                      state: { item: { ...i } },

                    });
                  }}

                  className="btn-book rounded-lg bg-darkslateblue-100 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row py-1.5 px-6 items-center justify-center border-[1px] border-solid border-button-stroke">
                  <div className=" text-white leading-[24px]">
                    Book Now
                  </div>
                </div>
                <div className="btn-book rounded-23xl bg-ghumore-orange flex flex-row py-1.5 px-2.5 items-center justify-start text-left text-xs">
                  <div className="  text-white leading-[132%] font-medium">
                    {i.duration} {i.durationType ?? "days"}  tour
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          navigate(`/search?category=&location=&activity=`);
        }}
        className="py-2 px-4 bg-darkslateblue-100 rounded-md shadow-md flex items-center justify-center gap-2 border border-solid border-button-stroke">
        <div className="text-base font-semibold text-white">View More</div>
      </button>
    </div>
  );
}
