import React from 'react'
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
                <a href='#'>SignUp</a>
                <a href='#'>Login</a>
                <a href='#'>Cart</a>
            </div>
        </div>
    </div>
  )
}
