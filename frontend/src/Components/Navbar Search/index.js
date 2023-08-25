import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './navbarsearch.css'

export default function NavbarSearch() {
  return (
    <div className='Navbar'>
        <div className='yellow-bar'>Book tour</div>
        <div className='main-navbar'>
            <div className='logo'></div>
            <div className='search-input'>
                <input placeholder='search'/>
            </div>
            <div className='main-items-navbar'>
                <ul className='item-list'>
                    <li>Home</li>
                    <li>Experience</li>
                    <li>Destination</li>
                    <li>Testimoneis</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                </ul>
            </div>
            <div className='auth-items-navbar'>
                <a href='/login'><Link to='login'>Loginn</Link></a>
                <a href='/register'><Link to='register'>SignUp</Link></a>
                <a href='#'>Cart</a>
            </div>
        </div>
    </div>
  )
}
