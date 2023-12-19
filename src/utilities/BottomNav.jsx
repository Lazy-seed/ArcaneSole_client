import React from 'react'
import { Link } from 'react-router-dom'
import shoe from './shoe.png'
import { IoBagOutline } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import { CgProfile } from "react-icons/cg";

export default function BottomNav() {
  return (
    <div className='border bg-white border-top fixed-bottom py-2' >
        
        <div className='d-flex  justify-content-around  '> 
            <Link to="/" className='d-flex flex-column  justify-content-end align-items-center '>
                <img src={shoe} alt="" width={32} />
                <h6 className='m-0 p-0 ' style={{fontSize:"12px"}}>Borwse</h6>
            </Link>
            <Link to="/" className='d-flex flex-column  justify-content-end align-items-center '>
                <IoBagOutline size={22} />
                <h6 className='m-0 p-0 ' style={{fontSize:"12px"}}>Cart</h6>
            </Link>
            <Link to="/" className='d-flex flex-column  justify-content-end align-items-center '>
                <GoHeartFill size={22} />
                <h6 className='m-0 p-0 ' style={{fontSize:"12px"}}>Liked</h6>
            </Link>
            <Link to="/" className='d-flex flex-column  justify-content-end align-items-center '>
                <CgProfile size={22} />
                <h6 className='m-0 p-0 ' style={{fontSize:"12px"}}>Account</h6>
            </Link>
        </div>
      
    </div>
  )
}
