import React from 'react'
import './loader.css'
export default function Loader() {
    return (
        <div className=' d-grid justify-content-center  align-items-center ' style={{height:'70vh'}}>
            <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}
