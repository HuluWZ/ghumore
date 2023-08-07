import React from 'react'
import './search.css'
import NavbarSearch from '../Components/Navbar Search'
import SearchHeader from '../Components/SearchHeader'
import SearchResult from '../Components/SearchResult'
import Footer from '../Components/Footer'
export default function Search() {
  return (
    <div className='Search'>
        {/* <NavbarSearch/> */}
        <SearchHeader/>
        <SearchResult/>
        {/* <Footer/> */}
    </div>
  )
}
