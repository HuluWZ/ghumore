import React from 'react'
import './modal.css'

export default function ModalSign({ open, setOpen, children }) {
    if (!open) return null
  return (
    <div className='ModalSign'>
      <div className='shadow' onClick={()=>setOpen(false)}></div>
        { children }
        </div>
  )
}
