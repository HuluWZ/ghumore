import React, { useState } from "react";
import SearchItemCard from "./SearchItemCard";
import { useParams } from 'react-router-dom';
import { message } from "antd";
import { useEffect } from "react";
import { SearchActivity } from "../apiCalls/activities";


export default function SearchResult() {
  const { location, activity } = useParams();
  const [result, setResult] = useState('');

  // const GetSearchResult = async ()=>{
  //   try {
  //       const response = await SearchActivity(location, activity); 
  //       if(response.success){
  //           console.log(response.searchResult, 'result')
  //           result = response.searchResult;
  //       }else{
  //           throw new Error(response.message)
  //       }
  //   } catch (error) {
  //       message.error(error.message)
  //   }
  // }
  useEffect(()=>{
    const fetchData = async () => {
      // Simulating an asynchronous operation
      let response;
      try {
        console.log(activity, location, "actLoc");
        response = await SearchActivity(location, activity); 
        if(response.success){
            console.log(response.searchResult, 'result')
            setResult(response.searchResult);
        }else{
            throw new Error(response.message)
        }
    } catch (error) {
        message.error(error.message)
    }
    };

    fetchData();
  },[])

  return (
    <div className="relative bg-white w-full h-[2957px] overflow-hidden text-left text-base text-black-200 font-lato">
      <div className="absolute top-[412px] left-[70px] bg-button-stroke w-[310px] h-[1162.11px]" />
      <div className="absolute top-[325px] left-[calc(50%_-_960px)] bg-white w-[1920px] overflow-hidden flex flex-row py-4 pr-[133px] pl-3.5 box-border items-center justify-center gap-[27px] text-center">
        <div className="rounded-26xl bg-whitesmoke-200 overflow-hidden flex flex-row py-[13px] px-[15px] items-center justify-center border-[1px] border-solid border-whitesmoke-200">
          <div className="relative leading-[14px] font-semibold">{`Cruises & Sailing`}</div>
        </div>
        <div className="rounded-26xl bg-whitesmoke-200 overflow-hidden flex flex-row py-[13px] px-4 items-center justify-center border-[1px] border-solid border-whitesmoke-200">
          <div className="relative leading-[14px] font-semibold">
            Water Tours
          </div>
        </div>
        <div className="rounded-26xl bg-whitesmoke-200 overflow-hidden flex flex-row py-[13px] px-[15px] items-center justify-center border-[1px] border-solid border-whitesmoke-200">
          <div className="relative leading-[14px] font-semibold">
            City Tours
          </div>
        </div>
        <div className="rounded-26xl bg-whitesmoke-200 overflow-hidden flex flex-row py-[13px] px-4 items-center justify-center border-[1px] border-solid border-whitesmoke-200">
          <div className="relative leading-[14px] font-semibold">
            Half-day Tours
          </div>
        </div>
        <div className="rounded-26xl bg-whitesmoke-200 overflow-hidden flex flex-row py-[13px] px-[15px] items-center justify-center border-[1px] border-solid border-whitesmoke-200">
          <div className="relative leading-[14px] font-semibold">
            Full-day Tours
          </div>
        </div>
        <div className="rounded-26xl bg-whitesmoke-200 overflow-hidden flex flex-row py-[13px] px-4 items-center justify-center border-[1px] border-solid border-whitesmoke-200">
          <div className="relative leading-[14px] font-semibold">Safaris</div>
        </div>
        <div className="rounded-26xl bg-whitesmoke-200 overflow-hidden flex flex-row py-[13px] px-4 items-center justify-center border-[1px] border-solid border-whitesmoke-200">
          <div className="relative leading-[14px] font-semibold">
            Water Parks
          </div>
        </div>
        <div className="rounded-26xl bg-whitesmoke-200 overflow-hidden flex flex-row py-[13px] px-[15px] items-center justify-center border-[1px] border-solid border-whitesmoke-200">
          <div className="relative leading-[14px] font-semibold">
            Private and Luxury
          </div>
        </div>
        <div className="rounded-26xl bg-whitesmoke-200 overflow-hidden flex flex-row py-[13px] px-4 items-center justify-center border-[1px] border-solid border-whitesmoke-200">
          <div className="relative leading-[14px] font-semibold">Bus Tours</div>
        </div>
        <div className="rounded-26xl bg-whitesmoke-200 overflow-hidden flex flex-row py-[13px] px-4 items-center justify-center border-[1px] border-solid border-whitesmoke-200">
          <div className="relative leading-[14px] font-semibold">Trekking</div>
        </div>
        <div className="rounded-26xl bg-whitesmoke-200 overflow-hidden flex flex-row py-[13px] px-3 items-center justify-center border-[1px] border-solid border-whitesmoke-200">
          <div className="relative leading-[14px] font-semibold">
            Nature and Wildlife Tours
          </div>
        </div>
      </div>
      <div
        className="absolute top-[195px] left-[70px] w-[92.1px] h-4 cursor-pointer text-dimgray-100 font-helvetica"
        // onClick={onHomeSearchDubaiContainerClick}
        onClick={() => {}}>
        <div className="absolute top-[0px] left-[0px] leading-[16px]">
          Home /
        </div>
        <div className="absolute top-[0px] left-[57.1px] leading-[16px] text-darkslategray-200">
          India
        </div>
      </div>
      <div className="absolute top-[251px] left-[70px] text-21xl font-semibold font-outfit">{`India Tours, Activities & Excursions`}</div>
      {/* <CategoryContainer /> */}
      {/* <LocationContainer /> */}
      {/* <TimeContainer /> */}
      {/* {map the array of results here} */}
      <div className="bg-white p-4 shadow rounded-md">
        {/* Render the content of each card here */}
        {console.log(result)}
        {result?
        result.map((item) => {
          <SearchItemCard
          image={item.images[0]}
          fourDayPrivateLuxuryGolde={item.name}
          prop="566"
          newDelhiIndia={item.location}
          byGhumoReTours={`By ${item.organizer}`}
          exploreIndiasGoldenTriang={item.description}
          prop1={item.price}
          // onSearchResultCardClick={onSearchResultCardClick}
          onSearchResultCardClick={() => {}}
        />
        })
        :<></>}

        {/* <SearchItemCard
          image="/image9@2x.png"
          fourDayPrivateLuxuryGolde="Four-Day Private Luxury Golden Triangle Tour to Agra and Jaipur From New Delhi"
          prop="566"
          newDelhiIndia="New Delhi, India"
          byGhumoReTours=" By GhumoRe Tours"
          exploreIndiasGoldenTriang="Explore India's Golden Triangle on this four-day private tour traveling by air- conditioned vehicle with a local guide. In Delhi, visit Qutb Minar, Lotus Temple, India Gate, and Parliament House. Watch the sun rise..."
          prop1="₹15,959.84"
          // onSearchResultCardClick={onSearchResultCardClick}
          onSearchResultCardClick={() => {}}
        />
        <SearchItemCard
          image="/image10@2x.png"
          fourDayPrivateLuxuryGolde="Private Full Day New and Old Delhi City Tour"
          prop="134"
          newDelhiIndia="New Delhi, India"
          byGhumoReTours=" By GhumoRe Tours"
          exploreIndiasGoldenTriang="First-time visitors to Delhi will love touring the most beautiful and interesting sites in both Old and New Delhi on a private tour. Customize the tour to suit your interests or trust your experienced driver, who can..."
          prop1="₹2,554.00"
          propTop="873px"
          propCursor="unset"
          propHeight="308.11px"
        />
        <SearchItemCard
          image="/image10@2x.png"
          fourDayPrivateLuxuryGolde="Private Full Day New and Old Delhi City Tour"
          prop="134"
          newDelhiIndia="New Delhi, India"
          byGhumoReTours=" By GhumoRe Tours"
          exploreIndiasGoldenTriang="First-time visitors to Delhi will love touring the most beautiful and interesting sites in both Old and New Delhi on a private tour. Customize the tour to suit your interests or trust your experienced driver, who can..."
          prop1="₹2,554.00"
          propTop="873px"
          propCursor="unset"
          propHeight="308.11px"
        />
        <SearchItemCard
          image="/image10@2x.png"
          fourDayPrivateLuxuryGolde="Private Full Day New and Old Delhi City Tour"
          prop="134"
          newDelhiIndia="New Delhi, India"
          byGhumoReTours=" By GhumoRe Tours"
          exploreIndiasGoldenTriang="First-time visitors to Delhi will love touring the most beautiful and interesting sites in both Old and New Delhi on a private tour. Customize the tour to suit your interests or trust your experienced driver, who can..."
          prop1="₹2,554.00"
          propTop="873px"
          propCursor="unset"
          propHeight="308.11px"
        />
        <SearchItemCard
          image="/image10@2x.png"
          fourDayPrivateLuxuryGolde="Private Full Day New and Old Delhi City Tour"
          prop="134"
          newDelhiIndia="New Delhi, India"
          byGhumoReTours=" By GhumoRe Tours"
          exploreIndiasGoldenTriang="First-time visitors to Delhi will love touring the most beautiful and interesting sites in both Old and New Delhi on a private tour. Customize the tour to suit your interests or trust your experienced driver, who can..."
          prop1="₹2,554.00"
          propTop="873px"
          propCursor="unset"
          propHeight="308.11px"
        /> */}

      </div>

      {/* <SearchItemCard
            image="/image10@2x.png"
            fourDayPrivateLuxuryGolde="Private Full Day New and Old Delhi City Tour"
            prop="134"
            newDelhiIndia="New Delhi, India"
            byGhumoReTours=" By GhumoRe Tours"
            exploreIndiasGoldenTriang="First-time visitors to Delhi will love touring the most beautiful and interesting sites in both Old and New Delhi on a private tour. Customize the tour to suit your interests or trust your experienced driver, who can..."
            prop1="₹2,554.00"
            propTop="873px"
            propCursor="unset"
            propHeight="308.11px"
          />
          
          <SearchItemCard
            image="/image11@2x.png"
            fourDayPrivateLuxuryGolde="Munnar Trekking"
            prop="56"
            newDelhiIndia="Munnar, Kerala"
            byGhumoReTours={` By ABC Tours & Travels`}
            exploreIndiasGoldenTriang="Our trek is something that one can know all surviving Technics in forest and can learn more things about tea and history of Munnar with attach with nature."
            prop1="₹1,599.00"
            propTop="1253px"
            propCursor="unset"
            propHeight="308.11px"
          /> */}
      <div className="absolute top-[425px] left-[1418px] flex flex-row items-start justify-start">
        <div className="rounded-lg bg-white box-border w-[312px] flex flex-row p-3 items-center justify-between border-[1px] border-solid border-silver-100">
          <div className="relative w-[94px] h-[19px]">
            <div className="absolute top-[0%] left-[0%] font-medium">
              Featured
            </div>
          </div>
          <img className="relative w-6 h-6" alt="" src="/arrowdown.svg" />
        </div>
      </div>
      <div className="absolute h-[0.64%] w-[4.11%] top-[14.84%] left-[20.83%] font-medium inline-block">
        {}
      </div>

      {/* <TourContainer
            similarToursExperiences={`Recommended Tours & Experiences`}
            image="/image12@2x.png"
            days1NightJaipurExperienc="Scuba Diving Experience In Malvan"
            jaipurRajasthanIndia="Malvan Beach, Goa, Maharashtra"
            d1N="12 hours"
            image1="/image13@2x.png"
            image2="/image14@2x.png"
            image3="/image15@2x.png"
            propTop="1813px"
            propLeft="calc(50% - 328.5px)"
            propBorderRadius="16px 16px 0px 0px"
          /> */}
      {/* <div className="absolute top-[1190.03px] left-[74px] w-[266px] h-[96.03px] text-lg font-helvetica">
            <b className="absolute top-[calc(50%_-_48.01px)] left-[calc(50%_-_133px)] leading-[22px]">
              Price
            </b>
            <img
              className="absolute top-[69.11px] left-[-8px] w-[276.18px] h-[38px]"
              alt=""
              src="/price-range-slider.svg"
            />
            <div className="absolute top-[43.75%] right-[167px] text-base tracking-[0.03em] font-medium font-roboto text-darkslategray-300">
              ₹0 - ₹50000+
            </div>
          </div> */}
      <div className="absolute top-[0px] left-[-0.3px] bg-button-stroke w-[1920px] h-[54px]" />
    </div>
  );
}
