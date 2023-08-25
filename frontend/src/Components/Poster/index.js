import React from 'react'
import './poster.css'
import { useProgressiveImage } from '../../customHooks/ProgressiveImages'
import { Link } from 'react-router-dom';

export default function Poster() {

  const Component = (props) => {
    const loaded = useProgressiveImage(props.url)
    
    return (
      <div 
      style={{ backgroundImage: `url(${loaded || props.placeholder})` }} 
       className={`Poster  w-[1920px] h-[400px]  bg-cover bg-no-repeat bg-[top] font-lato`}

       >
            <div className="poster-header leading-[48px] font-semibold font-outfit text-center [text-shadow:0px_2px_3px_rgba(0,_0,_0,_0.25)]">{`Sign Up with us & Explore the World`}</div>
        <div className="text-5xl leading-[40px] font-medium">{`Sign up & Create your account to get better experience`}</div>
        <div
          className=" rounded-lg bg-darkorange flex flex-row py-4 px-[50px] items-center justify-center cursor-pointer text-xl border-[1px] border-solid border-button-stroke">
          <b className="relative"><Link to='/register'>Sign up</Link></b>
        </div>
       </div>
    )}


  return (
    <Component url="sign-up-section@3x.png" placeholder="sign up"/>
      
    
  )
}
