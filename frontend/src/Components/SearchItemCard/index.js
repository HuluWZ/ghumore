import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function SearchItemCard({
  id,
  name,
  description,
  area,
  price,
  images,
  duration,
  durationType,
  location,
  options,
  totalCapacity,
  organizer,
  rating,
  createdAt,
  updatedAt,
  item,
}) {
  const navigate = useNavigate();
  console.log(images[0]);
  return (
    // .item - image{
    //     border - radius: 1rem;
    //     width: 300px;
    //     height: 250px;
    //   }
    <div className="search-item flex-row">
      <div className="md:item-image md:w-[300px]">
        <img src={images[0]} alt="img" className="img-search-item" />
      </div>
      <div className="item-detail">
        <h2>{name}</h2>

        <span className="flex flex-row">
          {[0, 1, 2, 3, 4].map(() => (
            <img
              className="relative w-[15.55px] h-[15.64px]"
              alt=""
              src="/magicstar20.svg"
            />
          ))}
          {rating}
        </span>
        <div className="flex flex-row">
          <img
            className="relative w-5 h-5 overflow-hidden shrink-0"
            alt=""
            src="/location1.svg"
          />

          <span className="font-bold">{location}</span>
        </div>
        <span>* BY {organizer}</span>
        <div>
          <div>
            <span className="item-description">{description}</span>
          </div>
        </div>
        {/*  */}
        <div>
          <h2>₹{price}</h2>
        </div>
        <span
          onClick={() => {
            console.log(item, "book now error why");
            navigate("/select", {
              state: { item: { ...item } },
            });
          }}
          className="hover:cursor-pointer bg-blue-700 px-[45px] py-[10px] w-48 md:ml-64 rounded-md">
          BOOK NOW
        </span>
      </div>
      <span className="item-duration">
        {duration} {durationType}
      </span>

    </div>
  );
}
