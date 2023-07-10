import React from 'react'

export default function SearchItemCard(
    {
        image,
        fourDayPrivateLuxuryGolde,
        prop,
        newDelhiIndia,
        byGhumoReTours,
        exploreIndiasGoldenTriang,
        prop1,
        propTop,
        propCursor,
        propHeight,
        onSearchResultCardClick,
      }  
) {
    return (
        <div
          className="relative top-[493px] left-[400px] w-[1330px] h-[340px] cursor-pointer text-left text-sm text-white font-lato"
          onClick={onSearchResultCardClick}
          // style={searchResultCardStyle}
        >
          {/* <OptionsListItem /> */}
          <div className="absolute top-[267px] left-[1163px] rounded-md bg-darkslateblue-100 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] flex flex-row py-3.5 px-8 items-center justify-center text-base font-helvetica border-[1px] border-solid border-button-stroke">
            <b className="relative">Book Now</b>
          </div>
          <img
            className="relative top-[7px] left-[7px] rounded-sm w-[392px] h-[326px] object-cover"
            alt=""
            src={image}
          />
          <div
            className="absolute top-[13px] left-[419px] flex flex-col items-start justify-start gap-[12px] text-darkslategray-200"
            // style={frameDiv6Style}
          >
            <b className="relative text-5xl leading-[132%] inline-block font-helvetica text-black-100 w-[737px]">
              {fourDayPrivateLuxuryGolde}
            </b>
            <div className="flex flex-row items-center justify-start gap-[3px] font-helvetica">
              <img className="relative w-4 h-[15.11px]" alt="" src="/star.svg" />
              <img className="relative w-4 h-[15.11px]" alt="" src="/star.svg" />
              <img className="relative w-4 h-[15.11px]" alt="" src="/star.svg" />
              <img className="relative w-4 h-[15.11px]" alt="" src="/star.svg" />
              <img className="relative w-4 h-[15.11px]" alt="" src="/star.svg" />
              <div className="flex flex-row py-0 pr-0 pl-0.5 items-center justify-center">
                <div className="relative leading-[14px]">{prop}</div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start gap-[10px] text-base text-black-200">
              <img
                className="relative w-5 h-5 overflow-hidden shrink-0"
                alt=""
                src="/location1.svg"
              />
              <b className="relative">{newDelhiIndia}</b>
            </div>
            <div className="relative text-[inherit] font-medium font-inherit text-black-200">
              <ul className="m-0 pl-[21px]">{byGhumoReTours}</ul>
            </div>
            <div className="relative text-base leading-[27px] font-medium inline-block w-[737px]">
              {exploreIndiasGoldenTriang}
            </div>
            <div className="w-80 flex flex-col items-start justify-center text-lightslategray">
              <div className="relative">from</div>
              <b className="relative text-5xl leading-[132%] font-barlow text-black-200">
                {prop1}
              </b>
            </div>
          </div>
          <div className="absolute top-[25px] left-[1245px] rounded-23xl bg-ghumore-orange flex flex-row py-1.5 px-2.5 items-start justify-start">
            <div className="relative leading-[132%] font-semibold">4 days</div>
          </div>
        </div>
      );
}
