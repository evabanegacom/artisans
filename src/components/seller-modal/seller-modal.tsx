import React from 'react'

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const SellerModal = ({ isOpen, setIsOpen}: Props) => {
  if (!isOpen) return null;
  return (
    <div className='modal-overlay'>
      <div className='modal-content-body'>
        <div>Seller popup</div>
      </div>
    </div>
  )
}

export default SellerModal