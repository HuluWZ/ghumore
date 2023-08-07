import React from 'react'
import './selecteditem.css'
import Navbar from '../Components/Navbar'
import SelectedItemBody from '../Components/SelectionItemBody'
import SearchHeader from '../Components/SearchHeader'
import Footer from '../Components/Footer'
import { useLocation } from 'react-router-dom'

export default function SelectedItem() {
  let locate = useLocation();
  console.log(locate, 'selected')
  return (
    <div className='SelectedItem'>
        {/* <NavbarSearch/>
         */}
         {/* <Navbar/> */}
        <SearchHeader item={locate.state.item}/>
        <SelectedItemBody item={locate.state.item}/>
        {/* <Footer/> */}
    </div>
  )
}
