import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/loaderSlice";
import { Form, message } from "antd";
import { RegisterUser, UpdateUserProfile } from "../apiCalls/users";

const rules = [
  {
    // required: true,
    // message: "required",
  },
];
export default function ProfileModal() {
  const { user } = useSelector((state) => state.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const onFinish = async (values) => {
    values.phoneNumber = phone;
    console.log( values, "finish");
    try {
      dispatch(setLoader(true));
      const response = await UpdateUserProfile(user._id, values);
      console.log(response, "response");
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      console.log(error.message, "error");
    }
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
  };
  useEffect(() => {
    if (user) {
      setPhone(user.phoneNumber);
    }
  }, [user]);
  if (!user) {
    return null; // or display a loading state
  }
  return (
    <div className="flex flex-grow">
      <Form
        onFinish={onFinish}
        className="absolute left-[293px] bg-white w-[1334px] h-[982px] overflow-hidden text-left text-base text-grey-grey-800 font-lato">
        <img
          className="absolute top-[0px] left-[0px] rounded w-[601px] h-[982px] object-cover"
          alt=""
          src="/rectangle-10891@2x.png"
        />
        <div className="absolute top-[196px] left-[813.5px] w-[311px] flex flex-row p-2.5 box-border items-start justify-start text-center text-13xl text-gray-100 font-outfit">
          <b className="relative tracking-[0.02em] leading-[48px] inline-block w-[291px] shrink-0">{`Update  Account `}</b>
        </div>

        <button
          type="submit"
          className="absolute top-[875.5px] left-[714px] rounded-lg bg-darkslateblue-100 w-[502px] h-12 flex flex-row p-2.5 box-border items-start justify-start cursor-pointer text-center text-xl text-white">
          <div className="flex-1 relative font-semibold">{`Update Account `}</div>
        </button>

        <div className="absolute top-[271.5px] left-[714px] flex flex-col items-start justify-start gap-[6px]">
          <div className="relative leading-[150%] font-medium">
            Full Name : {user.fullName}
          </div>
          <div className="rounded-lg bg-white box-border w-[510px] flex flex-row py-3 px-4 items-center justify-start text-xl text-black-200 border-[1px] border-solid border-grey-grey-200">
            <div className="relative leading-[150%] font-medium inline-block w-72 shrink-0">
              <Form.Item name="firstName" rules={rules}>
                <input
                  className="relative text-xl leading-[24px] rounded-lg border-gray-300 focus:outline-none"
                  // className="w-full h-12 px-4 py-2 text-xl rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Travis Scott"
                  value={user.fullName}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="absolute top-[395.5px] left-[714px] leading-[150%] font-medium">
          Mobile Number
        </div>

        <Form.Item
          className="absolute top-[425.5px] left-[803.97px] rounded-lg bg-white box-border w-[273px] flex flex-row py-3 px-4 items-center justify-start text-xl text-black-200 border-[1px] border-solid border-grey-grey-200"
          rules={rules}>
          <PhoneInput
            country={"us"}
            value={phone}
            onChange={handlePhoneChange}
          />
        </Form.Item>
        <div className="absolute top-[506.5px] left-[714px] flex flex-col items-start justify-start gap-[6px]">
          <div className="relative leading-[150%] font-medium">
            Email : {user.email}
          </div>
          <div className="rounded-lg bg-white box-border w-[510px] flex flex-row py-3 px-4 items-center justify-start text-xl text-black-200 border-[1px] border-solid border-grey-grey-200">
            <div className="relative leading-[150%] font-medium inline-block w-72 shrink-0">
              <Form.Item name="email" rules={rules}>
                <input
                  className="relative text-xl leading-[24px] rounded-lg border-gray-300 focus:outline-none"
                  // className="w-full h-12 px-4 py-2 text-xl rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  placeholder="johnkevin@gmail.com"
                  value={user.email}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="absolute top-[630.5px] left-[714px] flex flex-col items-start justify-start gap-[6px]">
          <div className="relative leading-[150%] font-medium">
            Address : {user.address || ""}
          </div>
          <div className="rounded-lg bg-white box-border w-[510px] h-[54px] flex flex-row py-3 px-4 items-center justify-start gap-[162px] text-xl text-black-200 border-[1px] border-solid border-grey-grey-200">
            <Form.Item name="address" rules={rules}>
              <input
                className="relative text-xl leading-[24px] rounded-lg border-gray-300 focus:outline-none"
                // className="w-full h-12 px-4 py-2 text-xl rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="Address"
                placeholder="Washington St"
                value={user.address || ""}
              />
            </Form.Item>

            {/* <b className="relative flex items-center w-72 shrink-0">*********</b> */}
          </div>
        </div>
        <div className="absolute top-[760.5px] left-[714px] flex flex-col items-start justify-start gap-[6px]">
          <div className="relative leading-[150%] font-medium">
            City : {user.city || ""}
          </div>
          <div className="rounded-lg bg-white box-border w-[510px] h-[54px] flex flex-row py-3 px-4 items-center justify-start gap-[162px] text-xl text-black-200 border-[1px] border-solid border-grey-grey-200">
            <Form.Item name="city" rules={rules}>
              <input
                className="relative text-xl leading-[24px] rounded-lg border-gray-300 focus:outline-none"
                // className="w-full h-12 px-4 py-2 text-xl rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Mumbai"
                value={user.city || ""}
              />
            </Form.Item>

            {/* <b className="relative flex items-center w-72 shrink-0">*********</b> */}
          </div>
        </div>
        <img
          className="absolute top-[50.5px] left-[919.5px] w-[99px] h-[118px] overflow-hidden"
          alt=""
          src="/gumo-re-indiafinal-128.svg"
        />
      </Form>
    </div>
  );
}
