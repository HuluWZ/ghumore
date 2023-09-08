import React from 'react'
import './selecteditem.css'
import Navbar from '../Components/Navbar'
import SelectedItemBody from '../Components/SelectionItemBody'
import SearchHeader from '../Components/SearchHeader'
import Footer from '../Components/Footer'
import { useLocation } from 'react-router-dom'

export default function SelectedItem() {
  let locate = useLocation();
  console.log(locate.state.item, 'selected item cehck for search')
  return (
    <div className='SelectedItem overflow-x-hidden max-w-screen'>
      {/* <NavbarSearch/>
         */}
      {/* <Navbar/> */}
      <SearchHeader item={locate.state.item} />
      <SelectedItemBody item={locate.state.item} />
      {/* <Footer/> */}
    </div>
  )
}
