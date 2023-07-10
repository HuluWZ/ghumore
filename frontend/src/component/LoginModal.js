import React, { useEffect } from 'react'
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { LoginUser } from '../apiCalls/users';
import { setLoader } from '../redux/loaderSlice';
import { Form,message } from 'antd'


const rules = [
  {
    required: true,
    message: 'required'
  }
]

export default function LoginModal() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = async (values) => {
      console.log(values, 'login')
      try {
        dispatch(setLoader(true))
        const response = await LoginUser(values)

        dispatch(setLoader(false))

        console.log(response, 'response')
        if(response.success){
          message.success(response.message)
          console.log(response.token, 'response token')
          localStorage.setItem("token", response.token)
          window.location.href = "/"
        }else{
          throw new Error(response.message)
        }
      } catch (error) {
        message.error(error.message)
        // console.log(error.message,'error')
      }
    };
    useEffect(()=>{
      if(localStorage.getItem("token")){
        navigate("/")
      }
    },[navigate])

  const onDontHaveAnClick = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  const onForgotPasswordTextClick = useCallback(() => {
    navigate("/ghumore-account-sign-up-3-jun");
  }, [navigate]);

  const onGumoReIndiaFinal1Click = useCallback(() => {
    navigate("/");
  }, [navigate]);
    return (
        <div className="absolute left-[calc(50%_-_667px)] bg-white w-[1334px] h-[982px] overflow-hidden text-left text-base text-gray-1100 font-inter">

          <img
            className=" rounded w-[601px] h-[982px] object-cover"
            alt=""
            src="/rectangle-1089@2x.png"
          />
          <Form onFinish={onFinish} className="absolute top-[50.5px] left-[711px] w-[513px] h-[881.5px] text-center text-gray-900 font-lato">
            <div className="absolute top-[145.5px] left-[102.5px] w-[311px] flex flex-row p-2.5 box-border items-start justify-start text-13xl text-gray-100 font-outfit">
              <b className="relative tracking-[0.02em] leading-[48px] inline-block w-[291px] shrink-0">
                Login
              </b>
            </div>
            <div className="absolute top-[743.5px] left-[0px] rounded-lg bg-white box-border w-[220px] flex flex-row py-2.5 pr-0 pl-2 items-center justify-start gap-[5px] text-left border-[1px] border-solid border-gray-1200">
              <img
                className="relative w-9 h-9 overflow-hidden shrink-0"
                alt=""
                src="/google-logo.svg"
              />
              <div className="flex-1 relative">{`Login with Google `}</div>
            </div>
            <div className="absolute top-[743.5px] left-[259px] rounded-lg bg-white box-border w-[249px] flex flex-row py-2.5 pr-0 pl-2 items-center justify-start gap-[5px] text-left border-[1px] border-solid border-gray-1200">
              <img
                className="relative w-9 h-9 overflow-hidden shrink-0"
                alt=""
                src="/facebook3-logo.svg"
              />
              <div className="flex-1 relative">{`Login with Facebook `}</div>
            </div>
            <div className="absolute top-[664.5px] left-[190px] bg-white w-[91px] flex flex-row p-2.5 box-border items-start justify-start text-left text-5xl text-gray-1300 font-inter">
              <div className="flex-1 relative tracking-[0.18em] font-extrabold">
                -OR-
              </div>
            </div>
            <div className="absolute top-[273.5px] left-[3px] w-[510px] h-[413px] text-xl text-grey-grey-800">
              <button
              type
                className="absolute top-[278.5px] left-[0px] rounded-lg bg-darkslateblue-100 w-[502px] h-12 flex flex-row p-2.5 box-border items-start justify-start cursor-pointer text-white"
                typeof='submit'
              >
                <div className="flex-1 relative font-semibold">Login</div>
              </button>
              <div className="absolute top-[346.5px] left-[0px] w-[330px] h-11 flex flex-row p-2.5 box-border items-start justify-start text-gray-1400">
                <div
                  className="flex-1 relative font-medium cursor-pointer"
                  onClick={onDontHaveAnClick}
                >
                  <span>{`Don’t have an account ? `}</span>
                  <span className="text-darkslateblue-100">Sign up</span>
                </div>
              </div>
              <div className="absolute top-[369px] left-[0px] w-[330px] h-11" />
              <div className="absolute top-[0px] left-[0px] flex flex-col items-start justify-start gap-[6px] text-left text-base">
                <div className="relative leading-[150%] font-medium">Email</div>
                <div className="rounded-lg bg-white box-border w-[510px] flex flex-row py-3 px-4 items-center justify-start text-xl text-black-200 border-[1px] border-solid border-grey-grey-200">
                  <div className="relative leading-[150%] font-medium inline-block w-72 shrink-0">
                    <Form.Item
                    rules={rules}
                    name="email"
                    >
                  <input
                    className="relative text-xl leading-[24px] rounded-lg border-gray-300 focus:outline-none"
                    // className="w-full h-12 px-4 py-2 text-xl rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    placeholder="johnkevin@yahoo.com"
                  />
                  </Form.Item>
                  </div>
                </div>
              </div>
              <div className="absolute top-[124px] left-[0px] flex flex-col items-start justify-start gap-[6px] text-left text-base">
                <div className="relative leading-[150%] font-medium">Password</div>
                <div className="rounded-lg bg-white box-border w-[510px] h-[54px] flex flex-row py-3 px-4 items-center justify-start gap-[162px] text-xl text-black-200 border-[1px] border-solid border-grey-grey-200">
                  <b className="relative flex items-center w-72 shrink-0">
                    <Form.Item
                    rules={rules}
                    name="password"
                    >
                  <input
                    className="relative text-xl leading-[24px] rounded-lg border-gray-300 focus:outline-none"
                    // className="w-full h-12 px-4 py-2 text-xl rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    placeholder="Password"
                  />
                  </Form.Item>
                  </b>
                  <img
                    className="relative w-5 h-5 overflow-hidden shrink-0"
                    alt=""
                    src="/eyeslashfill.svg"
                  />
                </div>
              </div>
            </div>
            <div
              className="absolute top-[499.74px] left-[365.98px] text-xl font-medium text-darkslateblue-100 cursor-pointer"
              onClick={onForgotPasswordTextClick}
            >
              Forgot Password
            </div>
            <img
              className="absolute top-[0px] left-[208.5px] w-[99px] h-[118px] overflow-hidden cursor-pointer"
              alt=""
              src="/gumo-re-indiafinal-114.svg"
              onClick={onGumoReIndiaFinal1Click}
            />
          </Form>
        </div>
      );
}
