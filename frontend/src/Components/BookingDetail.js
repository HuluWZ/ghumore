import React, { useState } from "react";
import DrawerAppBar from "./Navbar/DrawerAppBar";
import Footer from "./Footer";

const BookingDetail = () => {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const [numOfAdults, setNumOfAdults] = useState("");
    const [numOfChildren, setNumOfChildren] = useState("");

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        // Perform save operation here
        setEditing(false);
        // Show a success message or perform any other necessary actions
    };
    return (
        <>
            <DrawerAppBar />
            <div className="w-[90%] my-16 mx-auto p-4 bg-blue-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* div one  */}
                    <div className="bg-gray-200 p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-bold">Booking Information</h1>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                                onClick={handleEdit}
                            >
                                Edit
                            </button>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="mb-4">
                                <h2 className="text-lg font-bold">Booking ID - Ref</h2>
                                <p className="text-gray-700">6e94a243ea</p>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-lg font-bold">Booking Date</h2>
                                <p className="text-gray-700">September 1, 2023 - (25 days ago)</p>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-lg font-bold">Booking Status</h2>
                                <p className="text-gray-700">Cancelled</p>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-lg font-bold">Booking Total</h2>
                                <p className="text-gray-700">23642.32</p>
                            </div>
                        </div>
                    </div>

                    {/* div two  */}
                    <div className="bg-gray-200 p-4">
                        <div className="mb-4">
                            <h2 className="text-lg font-bold">Contact Details Information</h2>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <h3 className="font-semibold">Customer Name</h3>
                                    <p>-</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Customer Email</h3>
                                    <p>-</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Customer Phone</h3>
                                    <p>-</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* div 3 */}
                    <div className="bg-gray-200 p-4 flex flex-col gap-4">
                        <div>
                            <h2 className="text-2xl font-bold">Activity Details</h2>
                            <div className="flex flex-col py-7 gap-4">
                                <div className="flex flex-col">
                                    <h3 className="font-semibold">Activity Name</h3>
                                    <p>
                                        Four-Day Private Luxury Golden Triangle Tour to Agra and Jaipur From New Delhi
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-semibold pt-5">Booking Description</h3>
                                    <p>
                                        See some of India's most iconic cities on this comprehensive 4-day Golden Triangle
                                        tour. Relax in the comfort of a private air-conditioned vehicle and make your way
                                        between Delhi, Agra, and Jaipur. Your driver shares details, insight, and the history
                                        of historic landmarks along the way. See the sunrise over the Taj Mahal—a UNESCO World
                                        Heritage Site—head up to Amber Fort, and explore the Maharaja’s City Palace, with
                                        guides provided at each sight.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-semibold">Activity Images</h3>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    <img
                                        src="/gumo-re-indiafinal-11.svg"
                                        alt="Activity Image 1"
                                        className="w-1/4 h-auto"
                                    />
                                    <img
                                        src="/gumo-re-indiafinal-11.svg"
                                        alt="Activity Image 2"
                                        className="w-1/4 h-auto"
                                    />
                                    <img
                                        src="/gumo-re-indiafinal-11.svg"
                                        alt="Activity Image 3"
                                        className="w-1/4 h-auto"
                                    />
                                    <img
                                        src="/gumo-re-indiafinal-11.svg"
                                        alt="Activity Image 4"
                                        className="w-1/4 h-auto"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-semibold">Activity Location</h3>
                                <p>New Delhi, Agra, Jaipur</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default BookingDetail;
