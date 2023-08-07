import React from 'react'
import './poster.css'

export default function Poster() {
  return (
    <div className='Poster  w-[1920px] h-[400px] bg-[url(/public/sign-up-section@3x.png)] bg-cover bg-no-repeat bg-[top] font-lato'>
        <div className="poster-header leading-[48px] font-semibold font-outfit text-center [text-shadow:0px_2px_3px_rgba(0,_0,_0,_0.25)]">{`Sign Up with us & Explore the World`}</div>
        <div className="text-5xl leading-[40px] font-medium">{`Sign up & Create your account to get better experience`}</div>
        <div
          className=" rounded-lg bg-darkorange flex flex-row py-4 px-[50px] items-center justify-center cursor-pointer text-xl border-[1px] border-solid border-button-stroke"
          onClick={()=>{
            navigator('/register')
          }}>
          <b className="relative">Sign up</b>
        </div>
    </div>
  )
}
