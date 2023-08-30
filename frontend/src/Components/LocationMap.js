import React from 'react'

function LocationMap({ item }) {
    return (
        <div>
            <div className=" md:flex justify-start md:flex-col md:px-48  px-10">

                {/* <h1 className=" text-[35px] ml-[500px]  w-32 mb-8 bg-black-200 text-white"> Location</h1> */}
                <div className="">
                    <div className="">
                        <iframe
                            className=" md:w-[2500px] md:h-[450px] ml-[-113px] w-[410px]"
                            src={item.location.url}
                            // width="2000"
                            // height="450"
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LocationMap