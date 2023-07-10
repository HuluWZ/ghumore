import React from 'react';
// import { getAllActivity } from '../apicalls/activity';

const activities = [
  {
    id: 1,
    title: 'Cycling Tour Through Srilanka',
    location: 'Colombo, Sri Lanka',
    image: '/image4@2x.png',
    rating: 4.9,
    price: 2436,
    duration: '2 days tour',
    details: [
      'Hybrid bicycles/Road bikes',
      'Breakfast, Lunch & Dinner',
      'Sightseeing'
    ]
  },
  {
    id: 2,
    title: 'Doongi Dives',
    location: 'Havelock Island, India',
    image: '/image5@2x.png',
    rating: 4.9,
    price: 2000,
    duration: '2 hours',
    details: [
      'Scuba & Snorkelling'
    ]
  },
  {
    id: 3,
    title: 'Hiking & Trekking at Mount Abu',
    location: 'Mount Abu, India',
    image: '/image6@2x.png',
    rating: 4.9,
    price: 1800,
    duration: '4 days tour',
    details: [
      'Hiking & Camping Tours'
    ]
  },
  {
    id: 4,
    title: 'Shimla Sightseeing Tour',
    location: 'Shimla, Himachal Pradesh, India',
    image: '/image7@2x.png',
    rating: 4.9,
    price: 999,
    duration: '2 days tour',
    details: [
      'Private Bus Tour',
      'Sightseeing tour'
    ]
  }
];

export default function Activities(onBestActivitiesOfTheYearClick) {
    // const getData = async() => {
    //     try {
    //         console.log('trying')
    //         const response = await getAllActivity();
    //         if (response.success){
    //             console.log(response, 'success');
    //         }
    //     } catch (error) {
    //         console.log(error, 'fail');
    //     }
    // }
    // React.useEffect(()=>{
    //     getData();
    // },[])

  return (
    <div className="absolute top-[1055px] left-[calc(50%_-_889.25px)] h-[811px] flex flex-col items-center justify-start gap-[50px] cursor-pointer text-gray-100 font-lato" onClick={onBestActivitiesOfTheYearClick}>
      <div className="flex flex-row p-2.5 items-start justify-start text-center font-outfit">
        <div className="relative leading-[48px] font-semibold">
          Best Activities Of The Year
        </div>
      </div>
      <div className="flex flex-row items-start justify-start gap-[60px] text-sm text-secondary">
        {activities.map(activity => (
          <div key={activity.id} className="relative shadow-[0px_12px_40px_rgba(0,_0,_0,_0.08)] w-[400px] h-[571px] text-black-100">
            <img className="absolute h-[52.54%] w-[99.73%] top-[0.07%] right-[0.08%] bottom-[47.39%] left-[0.19%] rounded-t-2xl rounded-b-none max-w-full overflow-hidden max-h-full object-cover" alt="" src={activity.image} />
            <div className="absolute top-[300.38px] left-[0.76px] rounded-t-none rounded-b-2xl bg-white w-[398.92px] overflow-hidden flex flex-col py-4 px-6 box-border items-start justify-center gap-[10px]">
              <div className="flex flex-col items-start justify-start gap-[12px]">
                <b className="relative text-xl leading-[132%] inline-block w-80">{activity.title}</b>
                <b className="relative text-black-200 leading-[132%] inline-block">{activity.location}</b>
              </div>
              <div className="flex flex-row items-center justify-start text-base text-black-200 gap-[15px]">
                <span className="relative">
                  {activity.rating}
                  <svg xmlns="http://www.w3.org/2000/svg" className="relative inline-block w-4 h-4 ml-0.5 -mb-1" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </span>
                <span className="relative">${activity.price}</span>
                <span className="relative">{activity.duration}</span>
              </div>
              <ul className="relative list-disc list-inside text-black-200 text-sm">
                {/* {activity.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))} */}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-md bg-darkslateblue-100 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] box-border w-[162.96px] h-[55.96px] flex flex-row py-4 px-10 items-center justify-center text-xl text-white border-[1px] border-solid border-button-stroke">
        <div className="relative">View More</div>
      </div>
    </div>
  );
}

// function App() {
//   const handleClick = () => {
//     console.log('View More clicked');
//   };

//   return (
//     <div>
//       {/* Render other components */}
//       {newFunction(handleClick)}
//     </div>
//   );
// }

// export default App;
