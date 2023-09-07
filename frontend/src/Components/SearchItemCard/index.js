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
    <div className="search-item">
      <div className="item-image">
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
      </div>
      <span className="item-duration">
        {duration} {durationType}
      </span>
      <span
        onClick={() => {
          console.log(item, "book");
          navigate("/select", {
            state: { item: { ...item } },
          });
        }}
        className="book-now hover:cursor-pointer">
        BOOK NOW
      </span>
    </div>
  );
}
