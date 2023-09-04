import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllActivity } from "../apiCalls/activities";

export default function SimilarActivity({ item }) {
    const [result, setResult] = useState([]);
    const navigate = useNavigate();

    console.log('current item ID', item._id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllActivity();
                if (response.success) {
                    setResult(response.activity);
                    console.log("this is the top activities", response.activity);
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
        <div className="md:ml-[1000px] lg:ml-60 xl:ml-[800px]">
            <div className=" md:flex  w-[1800px] justify-start  md:flex-col  lg:items-center mt-10  md:px-48 ">
                <h1 className=" md:text-[35px] md:px-12 text-[23px] pb-5 ml-[-27px]">Similar Tours & Experiences</h1>
                <div className=" flex flex-col md:flex-row gap-16 md:m-7">
                    {result.slice(0, 4).map((i) => {
                        if (i._id !== item._id) {
                            return (
                                <div className="md:recomendation-cards flex flex-col md:w-[250px]  items-start ml-[-30px]  gap-3">
                                    <div
                                        onClick={() => {
                                            console.log(i, "book");
                                            navigate("/select", {
                                                state: { item: { ...i } },
                                            });
                                        }}
                                        className="recomendation-card mb-4"
                                    >
                                        <div className="recomendation-card-image h-[250px] md:w-[250px]">
                                            <img src={i.images[0]} alt="" />
                                        </div>
                                        {/* <h2 className="px-2">{i.name}</h2> */}
                                        <h2>{i.name.length > 15 ? i.description.substring(0, 15) + "..." : i.name}</h2>

                                        <p>{i.location.name}</p>
                                        <span>{i.description.length > 45 ? i.description.substring(0, 45) + "..." : i.description}</span>
                                    </div>
                                </div>
                            );
                        }

                    })}
                </div>
            </div>
        </div>
    );

}
