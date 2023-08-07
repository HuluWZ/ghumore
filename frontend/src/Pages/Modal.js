import React from 'react';
import './modal.css';

export default function Modal({ open, children, onClose }) {
  if (!open) return null;
  
  const handleBackdropClick = (event) => {
    // Only close the modal if the click occurs on the backdrop (transparent area)
    if (event.target.classList.contains('Backdrop')) {
      onClose();
    }
  };

  return (
    <>
      {/* Fullscreen transparent div */}
      <div className='Backdrop' onClick={handleBackdropClick}>
        {/* Modal content */}
        <div className='Modal'>
          {children}
        </div>
      </div>
    </>
  );
}
